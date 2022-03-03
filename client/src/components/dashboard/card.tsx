interface CardProps {
  title: string;
  updateStatus: string;
  total: number;
  variance: number;
}

export const Card: React.FC<CardProps> = ({
  title,
  total,
  updateStatus,
  variance,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '18vw',
        justifyContent: 'space-between',
        padding: '20px 30px',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 10,
        paddingRight: 20,
        background: 'white',
      }}
    >
      <div
        style={{
          paddingTop: 5,
        }}
      >
        <span
          style={{
            fontWeight: 'bold',
            color: 'rgba(0,0,0,0.7)',
          }}
        >
          {title}
        </span>
        <br />
        <span
          style={{
            color: 'rgba(0,0,0,0.5)',
          }}
        >
          {updateStatus}
        </span>
      </div>

      <div
        style={{
          position: 'relative',
          marginRight: 10,
        }}
      >
        <span
          style={{
            fontSize: '35px',
            transform: 'translate',
            color: '#ff4d4f',
          }}
        >
          {total}
        </span>
        <span
          style={{
            top: 0,
            right: -25,
            position: 'absolute',
            color: '#52c41a',
            fontSize: 10,
            textAlign: 'right',
          }}
        >
          +{variance}%
        </span>
      </div>
    </div>
  );
};
