import {
  Inplace as InplaceComponent,
  InplaceContent,
  InplaceDisplay,
} from 'primereact/inplace';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import React, { CSSProperties, useRef, useState } from 'react';
interface InplaceProps {
  defaultValue: string;
  label: string;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
}

export const Inplace: React.FC<InplaceProps> = ({
  defaultValue,
  label,
  inputStyle,
  labelStyle = { fontSize: 20, paddingLeft: 10 },
}) => {
  const toast = useRef<Toast>(null);
  const [active, setActive] = useState(false);
  const handleEnter = () => {
    setActive(false);
    toast.current.show({
      severity: 'success',
      summary: 'success',
      detail: 'profile has been updated',
      
    });
  };
  return (
    <div>
      <label style={labelStyle} htmlFor={label}>
        {label}
      </label>
      <div style={{ margin: 10 }}>
        <InplaceComponent
          style={{ ...inputStyle }}
          active={active}
          onToggle={(e) => setActive(e.value)}
        >
          <InplaceDisplay>
            <InputText
              disabled
              style={{ ...inputStyle, transform: 'translateX(-10px)' }}
              id={label}
              defaultValue={defaultValue}
            />
          </InplaceDisplay>
          <InplaceContent>
            <InputText
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleEnter();
              }}
              style={inputStyle}
              id={label}
              defaultValue={defaultValue}
            />
          </InplaceContent>
        </InplaceComponent>
      </div>
      <Toast ref={toast} />
    </div>
  );
};
