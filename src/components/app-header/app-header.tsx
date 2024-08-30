import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserSelector } from '../../services/slices/user';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(getUserSelector);
  return <AppHeaderUI userName={user?.name} />;
};
