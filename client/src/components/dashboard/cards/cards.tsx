import { Row } from 'antd';
import { Reorder } from 'framer-motion';
import { useState } from 'react';
import { CardItem } from './card/card-item';

export interface CardItemProps {
  title?: string;
  countUpEnd: number;
  rate: number;
  updateStatus: string;
}
const data: CardItemProps[] = [
  {
    title: 'Available Money',
    countUpEnd: 25,
    rate: 8700,
    updateStatus: 'since last week',
  },
  {
    title: 'Total order',
    countUpEnd: 25,
    rate: 8700,
    updateStatus: 'since last week',
  },
  {
    title: 'Total sales',
    countUpEnd: 14,
    rate: 8700,
    updateStatus: 'since last week',
  },
  {
    title: 'Available ticket',
    countUpEnd: 25,
    rate: 1200,
    updateStatus: 'since last week',
  },
];

export const CardBoard = () => {
  const [cards, setCards] = useState<(CardItemProps & { index: number })[]>(
    data.map((item, index) => ({ ...item, index }))
  );
  const SIZE_GUTTER = 18;
  return (
    <>
      <div className='site-card-wrapper'>
        <Row gutter={SIZE_GUTTER}>
          <Reorder.Group
            axis='x'
            values={cards}
            style={{ display: 'flex' }}
            onReorder={setCards}
          >
            {cards.map((card, index) => (
              <Reorder.Item
                style={{ width: '15vw', marginLeft: index === 0 ? '0' : '4vw' }}
                key={card.index}
                value={card}
                as='div'
              >
                <CardItem
                  countUpEnd={card.countUpEnd}
                  rate={card.rate}
                  updateStatus={card.updateStatus}
                  title={card.title}
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </Row>
      </div>
    </>
  );
};
