import pandas as pd
import ast
from gensim.models import Word2Vec
import numpy as np

# 재료 숫자 시퀀스의 Word2Vec 임베딩 및 벡터 저장 스크립트

# CSV 파일 불러오기
df = pd.read_excel("C:/Users/SSAFY/Desktop/분석/데이터전처리/완료/final_modified_output.xlsx")

# 'Numbers from href' 열의 값이 문자열인 경우에만 eval() 적용
def safe_eval(x):
    if isinstance(x, str):
        try:
            # 안전하게 문자열 리스트를 실제 리스트로 변환
            return ast.literal_eval(x)
        except (ValueError, SyntaxError):
            return []  # 변환에 실패할 경우 빈 리스트 반환
    return []  # NaN 또는 다른 값이 있을 때 빈 리스트 반환

# 'Numbers from href' 열에 안전한 eval() 적용 및 NaN 값 제거
df['Numbers from href'] = df['Numbers from href'].apply(safe_eval)

# NaN 값이 있는 행 제거
df.dropna(subset=['Numbers from href'], inplace=True)

# 'Numbers from href' 열의 값이 빈 리스트가 아닌 행만 선택
df = df[df['Numbers from href'].apply(lambda x: len(x) > 0)]

# 'Numbers from href' 열을 리스트로 변환
ingredients_sequences = df['Numbers from href'].tolist()

# Word2Vec 모델 학습
model = Word2Vec(sentences=ingredients_sequences, vector_size=100, window=5, min_count=1, workers=4)

# 모델 저장
model.save("ingredient_word2vec.model")

# 각 숫자에 대한 벡터를 CSV 파일로 저장
vectors = {word: model.wv[word] for word in model.wv.index_to_key}
vector_df = pd.DataFrame.from_dict(vectors, orient='index')
vector_df.to_csv('ingredient_vectors.csv')

print("임베딩 벡터가 저장되었습니다.")
