import { Button, Card, Input } from 'antd';

export const CardCreateItem = () => {
  return (
    <>
      <Card
        style={{
          width: '100%',
          marginTop: '10px',
          height: 360,
          borderRadius: 5,
          boxShadow: '0px 0px 9px 0px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Input/><br/>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </Card>
    </>
  );
};
