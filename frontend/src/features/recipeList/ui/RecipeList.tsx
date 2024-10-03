import { useRecipeList } from '../api/useRecipeList';
import { useEffect, useState } from 'react';
import { Error } from '@/shared/components';
import { useNavigate } from 'react-router-dom';
import RecipeCardStack from '@/widgets/RecipeCard/RecipeCardStack';
import { RxReload } from 'react-icons/rx';
import { motion } from 'framer-motion';

interface Props {
  keyword: string;
}

export const RecipeList = ({ keyword }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const { data, isFetching, error } = useRecipeList({ page, keyword });
  const navigate = useNavigate();

  // keyword 변경 시 페이지 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  if (error) return <Error />;

  const handleNextPage = () => {
    if (data?.pagination) {
      const lastPage = Math.ceil(
        data.pagination.total / data.pagination.perPage
      );
      setPage((prePage) => (prePage % lastPage) + 1);
      setRotation((rotation + 360) % 360000);
    }
  };

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div className="relative w-full h-full">
      {data?.recipes.length === 0 ? (
        <div>데이터가 없습니다.</div>
      ) : (
        <>
          {/* <ul>
            {data?.recipes.map((recipe) => (
              <li
                key={recipe.recipeId}
                onClick={() => handleRecipeClick(recipe.recipeId)}
                className="cursor-pointer p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-100"
              >
                {recipe.name} - {recipe.kind}
              </li>
            ))}
          </ul> */}
          <RecipeCardStack />
        </>
      )}
      {isFetching ? <span>Loading...</span> : null}
      <motion.button
        onClick={handleNextPage}
        className="absolute right-20 text-5xl"
        animate={{ rotate: rotation }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <RxReload />
      </motion.button>
    </div>
  );
};
