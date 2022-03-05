import React from 'react'

interface MyFormProps {
  label: string;
}

export const MyForm: React.FC<MyFormProps> = ({ label, children }) => {
  return (
    <>
      <div className="my-form-details">
        <label className="my-form-label">{label}</label>
        <div className="my-form-content">
          {children}
        </div>
      </div>
    </>
  )
}
