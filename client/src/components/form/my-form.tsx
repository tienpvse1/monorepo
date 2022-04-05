import React from 'react'

interface MyFormProps {
  label: string;
  customStyle?: React.CSSProperties
  customStyleContent?: React.CSSProperties
  fontSizeLabel?: string | number;
}

export const MyForm: React.FC<MyFormProps> = ({
  label, children, customStyle, customStyleContent, fontSizeLabel }) => {
  return (
    <>
      <div key={label} style={customStyle} className="my-form-details">
        <label style={{ fontSize: fontSizeLabel }} className="my-form-label">{label}</label>
        <div style={customStyleContent} className="my-form-content">
          {children}
        </div>
      </div>
    </>
  )
}
