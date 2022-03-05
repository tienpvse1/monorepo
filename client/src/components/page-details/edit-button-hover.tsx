import { EditOutlined } from '@ant-design/icons';
import { useHover } from '@mantine/hooks';

interface EditButtonHover {
  toggleEditForm: () => void;
} 

export const EditButtonHover: React.FC<EditButtonHover> = ({ toggleEditForm ,children }) => {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      {hovered ? <EditOutlined onClick={toggleEditForm} className="edit-details-form" /> : ''}
      {children}
    </div>
  )
}
