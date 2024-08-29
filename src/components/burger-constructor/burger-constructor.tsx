import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructorItems,
  getConstructorItemsSelector
} from '../../services/slices/burgerConstructor';
import {
  clearOrderModalData,
  getOrderModalDataSelector,
  getOrderRequestSelector,
  orderBurger
} from '../../services/slices/order';
import { getUserSelector } from '../../services/slices/user';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(getConstructorItemsSelector);

  const orderRequest = useSelector(getOrderRequestSelector);

  const orderModalData = useSelector(getOrderModalDataSelector);
  const user = useSelector(getUserSelector);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id
      ])
    );
  };

  useEffect(() => {
    if (orderModalData) {
      dispatch(clearConstructorItems());
    }
  }, [orderModalData]);

  const closeOrderModal = () => {
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
