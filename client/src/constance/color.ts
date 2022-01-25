import { ConfigProvider } from 'antd';
import style from '../stylesheets/base/_export.module.scss';

export const ThemeColor = {
  primaryColor: style.primaryColor,
  percentColorIncrease: style.percentColorIncrease,
  percentColorDecrease: style.percentColorDecrease,
  cardBorder: style.cardBorder,
  boxShadowCardDashBoard: style.boxShadowCardDashBoard
}

//Config global color for ant design
ConfigProvider.config({
  theme: {
    primaryColor: style.primaryColor,
  },
});