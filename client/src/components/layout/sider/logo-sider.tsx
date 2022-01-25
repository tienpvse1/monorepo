import { MenuOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

interface LogoSiderProps {
  onCollapse: () => void;
  collapsed: boolean;
}

export const LogoSider = ({ collapsed, onCollapse }: LogoSiderProps) => {
  return (
    <div className='logo-sider'>
      <div className='icon-menu-outlined-sider' onClick={onCollapse}>
        <MenuOutlined
          style={{
            fontSize: 20,
          }}
        />
      </div>
      {!collapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src='/vjaa-logo.svg'
            width={'100%'}
            height={'100%'}
          />
        </motion.div>
      )}
    </div>
  );
};
