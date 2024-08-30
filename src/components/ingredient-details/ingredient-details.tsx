import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientSelector
} from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const ingredientId = useParams().id || '';
  const ingredientData = useSelector((state) =>
    getIngredientSelector(state, ingredientId)
  );

  useEffect(() => {
    if (!ingredientData) dispatch(getIngredients());
  }, []);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
