import { Alert, Drawer, Switch } from 'antd';
import { useState } from 'react';

interface HeaderDrawerProps {
  visible: boolean;
  handleClose: () => void;
}

const HeaderDrawer: React.FC<HeaderDrawerProps> = ({
  visible = false,
  handleClose,
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [menuStyle, setMenuStyle] = useState<'collapse' | 'show'>('show');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleMenuStyle = () =>
    setMenuStyle(menuStyle === 'collapse' ? 'show' : 'collapse');
  return (
    <>
      <Drawer
        title='Settings'
        placement='right'
        onClose={handleClose}
        visible={visible}
      >
        <Alert
          showIcon
          message={
            <p>
              <b> Customize</b> the overall color scheme, sidebar menu, etc.
            </p>
          }
          type='warning'
          description=''
        />
        <div>
          <p
            style={{
              fontSize: '17px',
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.7)',
              marginTop: '50px',
            }}
          >
            Color schema
          </p>
          <div>
            <div>
              <Switch checked={theme === 'light'} onChange={toggleTheme} />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginLeft: 20,
                  color: 'rgba(0,0,0,0.7)',
                }}
              >
                Light mode
              </span>
            </div>
            <div
              style={{
                marginTop: 10,
              }}
            >
              <Switch checked={theme === 'dark'} onChange={toggleTheme} />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginLeft: 20,
                  color: 'rgba(0,0,0,0.7)',
                }}
              >
                Dark mode
              </span>
            </div>
          </div>
        </div>
        <div>
          <p
            style={{
              fontSize: '17px',
              fontWeight: 'bold',
              color: 'rgba(0,0,0,0.7)',
              marginTop: '30px',
            }}
          >
            Side menu
          </p>
          <div>
            <div>
              <Switch
                checked={menuStyle === 'show'}
                onChange={toggleMenuStyle}
              />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginLeft: 20,
                  color: 'rgba(0,0,0,0.7)',
                }}
              >
                Show all
              </span>
            </div>
            <div style={{ marginTop: 10 }}>
              <Switch
                checked={menuStyle === 'collapse'}
                onChange={toggleMenuStyle}
              />
              <span
                style={{
                  fontSize: 15,
                  fontWeight: '600',
                  marginLeft: 20,
                  color: 'rgba(0,0,0,0.7)',
                }}
              >
                Collapse
              </span>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HeaderDrawer;
