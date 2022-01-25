import { useRef } from "react";
import { ArrowLeft } from "./arrow-left";
import { ArrowRight } from "./arrow-right";

export const ScrollBarHorizontal: React.FC = ({ children }) => {
  const elementScrollBar = useRef<HTMLDivElement>(null);
  return (
    <>
      <ArrowLeft elementScrollBar={elementScrollBar} />
      <ArrowRight elementScrollBar={elementScrollBar} />

      <div id='scroll-menu' ref={elementScrollBar} >
        {children}
      </div>
    </>
  );
};
