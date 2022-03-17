import { Menu } from 'antd';

interface DetailDropdownProps {
  onViewMore: (id: string) => void;
  pipelineItemId: string;
}

export const DetailDropdown: React.FC<DetailDropdownProps> = ({
  onViewMore,
  pipelineItemId,
}) => {
  return (
    <Menu>
      <Menu.Item onClick={() => onViewMore(pipelineItemId)}>Detail</Menu.Item>
      <Menu.Item>2nd menu item</Menu.Item>
      <Menu.Item>3rd menu item</Menu.Item>
    </Menu>
  );
};
