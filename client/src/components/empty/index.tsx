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
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={imageStyle}
      description={description}
    >
      {children}
    </Empty>
  )
}
