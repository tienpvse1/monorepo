import { ConfigProvider } from 'antd';
import style from '../stylesheets/base/_export.module.scss';

export const ThemeColor = {
  primaryColor: style.primaryColor,
  primaryTextColor: style.primaryTextColor,
  darkGreyBackgroundColor: style.darkGreyBackgroundColor,
  percentColorIncrease: style.percentColorIncrease,
  percentColorDecrease: style.percentColorDecrease,
  cardBorder: style.cardBorder,
  boxShadowCardDashBoard: style.boxShadowCardDashBoard,
};

//Config global color for ant design
ConfigProvider.config({
  theme: {
    primaryColor: style.primaryColor,
  },
});

export type AntColorType =
  | 'error'
  | 'success'
  | 'warning'
  | 'default'
  | 'pink'
  | 'red'
  | 'yellow'
  | 'orange'
  | 'cyan'
  | 'green'
  | 'blue'
  | 'purple'
  | 'geekblue'
  | 'magenta'
  | 'volcano'
  | 'gold'
  | 'lime'
  | 'processing';

export const antColor: AntColorType[] = [
  'error',
  'success',
  'warning',
  'default',
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
  'processing',
];
