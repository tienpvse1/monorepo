import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'

interface TypeOfCompanyProps {
  type: 'Individual' | 'Company' | string
}

export const TypeOfCompany: React.FC<TypeOfCompanyProps> = ({ type }) => {

  if(type === 'Individual')
    return <><UserOutlined /> Individual</>;

  return (
    <><HomeOutlined /> Company</>
  )
}
