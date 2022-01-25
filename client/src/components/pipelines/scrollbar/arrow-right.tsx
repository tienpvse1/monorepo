import { RightOutlined } from '@ant-design/icons';
import React, { RefObject } from 'react';
import { Arrow } from './arrow';

interface ArrowRightProps {
  elementScrollBar: RefObject<HTMLDivElement> | null;
}

export const ArrowRight: React.FC<ArrowRightProps> = ({ elementScrollBar }) => {

  // if(elementScrollBar) {
  //   setDisable
  // }

  return (
    <>
      <Arrow styleName="scroll-right" elementScrollBar={elementScrollBar} valueScrollLeft={5}>
        <div className="arrow-right">
          <RightOutlined style={{ fontSize: '26px', color: 'white' }} />
        </div>
      </Arrow>
    </>
  );
};
