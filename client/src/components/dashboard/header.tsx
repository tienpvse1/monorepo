import { Reorder } from 'framer-motion';
import React from 'react';
import { Card } from './card';
import { ICardData } from './data';

interface HeaderProps {
  data: (ICardData & { index: number })[];
  setData: React.Dispatch<
    React.SetStateAction<(ICardData & { index: number })[]>
  >;
}

export const DashboardHeader: React.FC<HeaderProps> = ({ setData, data }) => {
  return (
    <Reorder.Group
      onReorder={setData}
      axis='x'
      values={data}
      as='div'
      style={{
        display: 'flex',
        gap: '2vw',
      }}
    >
      {data.map((item) => (
        <Reorder.Item value={item} key={item.index} as='div'>
          <Card {...item} />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};
