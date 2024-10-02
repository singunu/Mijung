# recommend.py
from fastapi import APIRouter, Query
from typing import List
from pyspark.sql.functions import col, count, when
import numpy as np
import logging
from app.models.models import get_embedding_model, get_recipe_model, get_exploded_df

router = APIRouter(
    tags=['carts'],
    responses={404: {"description": "Not found"}}
)

def find_similar_recipes(recipe_vector, threshold=0.7):
    recipe_model = get_recipe_model()
    similar_words_recipe = recipe_model.similar_by_vector(recipe_vector, topn=300)
    
    if isinstance(similar_words_recipe, list):
        filtered_keys = [word for word, similarity in similar_words_recipe if similarity >= threshold]
    else:
        logging.error("Unexpected structure returned from similar_by_vector")
        filtered_keys = []
    
    return filtered_keys

def find_top_6_common_rcp_sno(ingredient, nearby_recipe_keys, cnt):
    exploded_df = get_exploded_df()
    filtered_df = exploded_df.filter(col("RCP_SNO").isin(nearby_recipe_keys))
    
    result_df = filtered_df.groupBy("RCP_SNO").agg(
        count(when(col("Number").isin(ingredient), 1)).alias("count")
    )
    
    top_6_rcp_sno = result_df.orderBy(col("count").desc()).limit(cnt).collect()
    return [(row['RCP_SNO'], row['count']) for row in top_6_rcp_sno]


# 코사인 유사도
def find_similar_ingredients(embedding_model, recipe_vector, cnt):
    """
    embedding_model과 recipe_vector 간의 코사인 유사도를 계산하여
    가장 유사도가 높은 ingredients를 반환합니다.
    
    Args:
        embedding_model: Word2Vec 모델
        recipe_vector: 레시피의 평균 벡터
        cnt: 반환할 상위 결과의 개수
    
    Returns:
        List of tuples: (ingredient_key, similarity_score)
    """
    try:
        # Word2Vec 모델의 most_similar 메서드를 사용하여 코사인 유사도 계산
        similar_ingredients = embedding_model.wv.similar_by_vector(
            recipe_vector,
            topn=cnt
        )
        
        # 결과 로깅
        logging.info(f"Found {len(similar_ingredients)} similar ingredients")
        for ing, score in similar_ingredients[:5]:  # 상위 5개만 로깅
            logging.debug(f"Ingredient: {ing}, Similarity: {score:.4f}")
        
        return similar_ingredients
    
    except Exception as e:
        logging.error(f"Error finding similar ingredients: {str(e)}")
        raise


def find_cosine_similarity(recipe_vector, cnt):
    recipe_model = get_recipe_model()
    similar_words_recipe = recipe_model.similar_by_vector(recipe_vector, topn=cnt)
    
    if isinstance(similar_words_recipe, list):
        filtered_keys = [word for word, similarity in similar_words_recipe]
    else:
        logging.error("Unexpected structure returned from similar_by_vector")
        filtered_keys = []
    
    return filtered_keys

def find_cosine_similarity_ingredients(embedding, cnt, ingredientsIdx):
    ingredient = get_embedding_model()
    print("Word2Vec 객체:", type(ingredient), ingredient)

    similar_ingredient = ingredient.wv.most_similar(embedding, topn=cnt*2)
    filtered_keys =[]
    
    if isinstance(similar_ingredient, list):
        for word, similarity in similar_ingredient:  # word, similarity로 언팩
            if len(filtered_keys) == cnt:
                break
            if word in ingredientsIdx:  # ingredientsIdx에 있는 경우를 건너띄게 하는 조건
                continue
            filtered_keys.append(word)  # ingredientsIdx에 없는 경우에만 추가
            
    else:
        logging.error("Unexpected structure returned from similar_by_vector")
        filtered_keys = []
    
    return filtered_keys

    

@router.get("/carts/recommends/recipes")
async def getRecipeRecommend(
    ingredients: List[str] = Query(..., description="나의 식탁에 담긴 식재료들"),
    count: int = Query(..., description="response 개수")
):
    embedding_model = get_embedding_model()
    embeddings = []
    
    for ing in ingredients:
        if ing in embedding_model.wv.key_to_index:
            embeddings.append(embedding_model.wv[ing].tolist())
        else:
            logging.warning(f"Ingredient {ing} not found in embeddings, skipping.")
    
    if not embeddings:
        raise ValueError("No valid embeddings found for the provided ingredients.")
    
    recipe_vector = np.mean(embeddings, axis=0)
    #nearby_recipe_keys = find_similar_recipes(recipe_vector, threshold=0.8)
    
    #logging.info("Recipe 모델에서 유사도가 0.7 이상인 레시피 키: %s", nearby_recipe_keys)
    
    #top_6_rcp_sno = find_top_6_common_rcp_sno(ingredients, nearby_recipe_keys, cnt=count)
    top_6_rcp_sno = find_cosine_similarity(recipe_vector, cnt= count)

    return {
        "recipe_id": top_6_rcp_sno
    }


@router.get("/carts/recommends/ingredients")
async def getIngredientRecommend(
    ingredients: List[str] = Query(..., description="나의 식탁에 담긴 식재료들"),
    count: int = Query(..., description="response 개수")
):
    embedding_model = get_embedding_model()
    embeddings = []
    
    for ing in ingredients:
        if ing in embedding_model.wv.key_to_index:
            embeddings.append(embedding_model.wv[ing].tolist())
        else:
            logging.warning(f"Ingredient {ing} not found in embeddings, skipping.")
    
    if not embeddings:
        raise ValueError("No valid embeddings found for the provided ingredients.")
    
    ingredient_vector = np.mean(embeddings, axis=0)
    #nearby_recipe_keys = find_similar_recipes(recipe_vector, threshold=0.8)
    
    #logging.info("Recipe 모델에서 유사도가 0.7 이상인 레시피 키: %s", nearby_recipe_keys)
    
    #top_6_rcp_sno = find_top_6_common_rcp_sno(ingredients, nearby_recipe_keys, cnt=count)
    top_6_rcp_sno = find_cosine_similarity_ingredients(ingredient_vector, cnt= count, ingredientsIdx= ingredients)

    return {
        "ingredient_id": top_6_rcp_sno
    }
