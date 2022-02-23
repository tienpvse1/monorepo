import {
  Inplace as InplaceComponent,
  InplaceContent,
  InplaceDisplay,
} from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import React, { CSSProperties, useState } from 'react';
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
  const [active, setActive] = useState(false);
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
              style={inputStyle}
              id={label}
              defaultValue={defaultValue}
            />
          </InplaceContent>
        </InplaceComponent>
      </div>
    </div>
  );
};
