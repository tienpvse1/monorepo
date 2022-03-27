import { EditOutlined } from '@ant-design/icons';
import { useHover } from '@mantine/hooks';

interface EditButtonHover {
  toggleEditForm: () => void;
  disabled?: boolean
}

export const EditButtonHover: React.FC<EditButtonHover> = ({
  toggleEditForm,
  children,
  disabled = false
}) => {
  const { hovered, ref } = useHover();

  return (
    <div ref={ref}>
      {hovered && !disabled ? <EditOutlined onClick={toggleEditForm} className="edit-details-form" /> : ''}
      {children}
    </div>
  )
}
