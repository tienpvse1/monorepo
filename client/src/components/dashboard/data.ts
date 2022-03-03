export interface ICardData {
  title: string;
  total: number;
  variance: number;
  updateStatus: string;
}

export const cardData: ICardData[] = [
  {
    title: 'Total Customer',
    total: 79,
    variance: 8,
    updateStatus: 'since last month',
  },
  {
    title: 'On Proposing',
    total: 9,
    variance: 25,
    updateStatus: 'since last month',
  },
  {
    title: 'Won',
    total: 25,
    variance: 20,
    updateStatus: 'since last month',
  },
];
