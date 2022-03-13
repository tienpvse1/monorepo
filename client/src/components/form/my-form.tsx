import React from 'react'

interface MyFormProps {
  label: string;
  customStyle?: React.CSSProperties
  customStyleContent?: React.CSSProperties
}

export const MyForm: React.FC<MyFormProps> = ({ label, children, customStyle, customStyleContent }) => {
  return (
    <>
      <div style={customStyle} className="my-form-details">
        <label className="my-form-label">{label}</label>
        <div style={customStyleContent} className="my-form-content">
          {children}
        </div>
      </div>
    </>
  )
}
