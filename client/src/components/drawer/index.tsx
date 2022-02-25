import { Button, Drawer, DrawerProps, Space } from "antd";

interface DrawerDetailsProps extends DrawerProps {
  onClose: () => void;
  visible: boolean;
}

export const DrawerDetails: React.FC<DrawerDetailsProps> = ({
  title,
  placement,
  children,
  width,
  onClose,
  visible
}) => {
  return (
    <>
      <Drawer
        destroyOnClose
        title={title}
        placement={placement}
        width={"100vw"}
        onClose={onClose}
        visible={visible}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        {children}
      </Drawer>
    </>
  );
};
