import { Menu } from 'antd';
import { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';

interface PluginItemProps {
  style: CSSProperties;
  id: string;
  title: string;
  dest: string;
  image: string;
}

export const PluginItem: React.FC<PluginItemProps> = ({
  id,
  style,
  title = '',
  dest = '',
  image = '',
}) => {
  const navigate = useNavigate();
  return (
    <Menu.Item
      icon={
        <img
          src={image}
          height={20}
          width={20}
          style={{
            marginRight: 10,
          }}
        />
      }
      onClick={() => navigate(dest)}
      key={id}
      style={style}
    >
      {title}
    </Menu.Item>
  );
};
