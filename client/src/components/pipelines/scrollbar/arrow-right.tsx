import { RightOutlined } from '@ant-design/icons';
import { RefObject, useEffect, useState } from 'react';
import { Arrow } from './arrow';

interface ArrowRightProps {
  elementScrollBar: RefObject<HTMLDivElement> | null;
}

export const ArrowRight: React.FC<ArrowRightProps> = ({ elementScrollBar }) => {
  const [disableArrowRight, setDisableArrowRight] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      let clientWidth = elementScrollBar.current.clientWidth;
      let scrollWidth = elementScrollBar.current.scrollWidth;
      let scrollPosition = elementScrollBar.current.scrollLeft;

      setDisableArrowRight(scrollPosition == scrollWidth - clientWidth);
    };

    elementScrollBar.current.addEventListener('scroll', handleScroll);

    return () => {
      elementScrollBar.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Arrow
        styleName='scroll-right'
        elementScrollBar={elementScrollBar}
        valueScrollLeft={5}
        disable={disableArrowRight}
      >
        <div className='arrow-right'>
          <RightOutlined style={{ fontSize: '26px', color: 'white' }} />
        </div>
      </Arrow>
    </>
  );
};
