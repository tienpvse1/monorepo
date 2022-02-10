import { LeftOutlined } from '@ant-design/icons';
import React, { RefObject, useEffect, useState } from 'react';
import { Arrow } from './arrow';

interface ArrowLeftProps {
  elementScrollBar: RefObject<HTMLDivElement> | null;
}

export const ArrowLeft: React.FC<ArrowLeftProps> = ({ elementScrollBar }) => {

  const [disableArrowLeft, setDisableArrowLeft] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setDisableArrowLeft(elementScrollBar.current.scrollLeft == 0);
    }

    elementScrollBar.current.addEventListener("scroll", handleScroll)

    return () => {
      elementScrollBar.current?.removeEventListener("scroll", handleScroll);
    }
  }, [])

  return (
    <>
      <Arrow
        styleName="scroll-left"
        elementScrollBar={elementScrollBar}
        valueScrollLeft={-5}
        disable={disableArrowLeft}
      >
        <div className="arrow-left">
          <LeftOutlined style={{ fontSize: '26px', color: 'white' }} />
        </div>
      </Arrow>
    </>
  );
};
