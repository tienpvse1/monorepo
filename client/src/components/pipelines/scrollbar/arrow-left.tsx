import { LeftOutlined } from '@ant-design/icons';
import React, { RefObject } from 'react';
import { Arrow } from './arrow';

interface ArrowLeftProps {
  elementScrollBar: RefObject<HTMLDivElement> | null;
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({ elementScrollBar }) => {

  return (
    <>
      <Arrow
        styleName="scroll-left"
        elementScrollBar={elementScrollBar}
        valueScrollLeft={-5}
        // disable={disable}
      >
        <div className="arrow-left">
          <LeftOutlined style={{ fontSize: '26px', color: 'white' }} />
        </div>
      </Arrow>
    </>
  );
};
