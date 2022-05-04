import { Menu } from 'antd';
import { Dispatch, SetStateAction } from 'react';

interface DetailDropdownProps {
  onViewMore: (id: string) => void;
  pipelineItemId: string;
  setDrawerVisible: Dispatch<SetStateAction<boolean>>;
}

export const DetailDropdown: React.FC<DetailDropdownProps> = ({
  onViewMore,
  pipelineItemId,
  setDrawerVisible,
}) => {
  return (
    <Menu>
      <Menu.Item onClick={() => onViewMore(pipelineItemId)}>Detail</Menu.Item>
      <Menu.Item onClick={() => setDrawerVisible(true)}>
        Schedule activity
      </Menu.Item>
    </Menu>
  );
};
