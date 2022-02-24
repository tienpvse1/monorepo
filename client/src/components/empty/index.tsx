import { Empty } from 'antd'

interface EmptyComponentProps {
  imageStyle: React.CSSProperties;
  description: React.ReactNode;
}

export const EmptyComponent: React.FC<EmptyComponentProps> = ({
  children,
  imageStyle,
  description
}) => {
  return (
    <Empty
      imageStyle={imageStyle}
      description={description}
    >
      {children}
    </Empty>
  )
}
