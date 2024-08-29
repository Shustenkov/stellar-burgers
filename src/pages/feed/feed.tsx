import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getFeedErrorSelector,
  getFeedLoadingSelector,
  getFeedOrdersSelector,
  getFeeds
} from '../../services/slices/feed';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const refreshFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    refreshFeeds();
  }, []);

  const orders: TOrder[] = useSelector(getFeedOrdersSelector);
  const loading = useSelector(getFeedLoadingSelector);
  const error = useSelector(getFeedErrorSelector);

  if (error) {
    console.error(`Запрос завершился с ошибкой: ${error}`);
  }

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={refreshFeeds} />;
};
