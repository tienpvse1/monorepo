import { ReactNode } from 'react';

interface SaleManagerCardProps {
  total: number;
  icon?: ReactNode;
  title: ReactNode;
  up?: boolean;
  trend?: ReactNode;
  loading?: boolean;
}

export const SaleManagerCard: React.FC<SaleManagerCardProps> = ({}) => {
  return <div></div>;
};
