import { EditOutlined } from '@ant-design/icons';
import { useHover } from '@mantine/hooks';

interface ButtonEditHoverProps {
  toggleEditForm: () => void;
} 

export const ButtonEditHover: React.FC<ButtonEditHoverProps> = ({ toggleEditForm ,children }) => {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      {hovered ? <EditOutlined onClick={toggleEditForm} className="edit-details-form" /> : ''}
      {children}
    </div>
  )
}
