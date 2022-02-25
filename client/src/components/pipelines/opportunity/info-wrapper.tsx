import { MoreOutlined, PlusOutlined } from '@ant-design/icons';
import React from 'react';

interface InfoWrapperProps {
  title?: string;
}

export const InfoWrapper: React.FC<InfoWrapperProps> = ({
  children,
  title = '',
}) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <div>
        <span
          style={{
            fontSize: 16,
            color: 'rgb(255,83,81)',
          }}
        >
          {title}
        </span>
        <span
          style={{
            marginLeft: 20,
            color: 'rgb(255,83,81)',
          }}
        >
          <PlusOutlined />
          <MoreOutlined />
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
};
