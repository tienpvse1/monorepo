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
        width: '16vw',
        justifyContent: 'space-between',
        padding: '20px 30px',
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: 10,
        paddingRight: 20,
        background: "white"
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

      <div style={{ position: 'relative', marginRight: 30 }}>
        <span
          style={{
            fontSize: '40px',
            transform: 'translate',
            color: '#ff4d4f',
            marginLeft: 10,
          }}
        >
          {total}
        </span>
        <span
          style={{
            top: 0,
            right: -45,
            position: 'absolute',
            color: '#52c41a',
          }}
        >
          +{variance}%
        </span>
      </div>
    </div>
  );
};
