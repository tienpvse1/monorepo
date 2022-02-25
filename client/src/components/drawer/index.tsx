import { Button, Drawer, DrawerProps, Space } from 'antd';

interface DrawerDetailsProps extends DrawerProps {
  onClose: () => void;
}

export const DrawerDetails: React.FC<DrawerDetailsProps> = ({
  onClose,
  children,
  ...rest
}) => {
  return (
    <>
      <Drawer
        destroyOnClose
        {...rest}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
};
