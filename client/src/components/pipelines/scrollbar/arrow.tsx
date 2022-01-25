import React, { RefObject, useRef } from 'react';

interface ArrowProps {
  elementScrollBar: RefObject<HTMLDivElement> | null;
  styleName: string;
  valueScrollLeft: number;
  disable?: boolean;
}

export const Arrow: React.FC<ArrowProps> = ({
  valueScrollLeft,
  styleName,
  elementScrollBar,
  disable = false,
  children }) => {
  
  const refId = useRef<number>();

  const scrollLeft = (value: number) => {
    elementScrollBar!.current!.scrollLeft += value;
  }

  const mouseHover = (scroll: () => void) => {
    refId.current = setInterval(scroll, 10);
  }

  const mouseOut = () => {
    clearInterval(refId.current);
  }

  return (
    <>
      <div
        style={{ display: disable ? 'none' : '' }}
        className={styleName}
        onMouseOver={() => mouseHover(() => scrollLeft(valueScrollLeft))}
        onMouseOut={mouseOut}
      >
        {children}
      </div>
    </>
  );
};
