import Upload from '@common/upload';
import React from 'react';

interface AddContactProps {}

const ImportContact: React.FC<AddContactProps> = ({}) => {
  return (
    <div>
      <Upload />
    </div>
  );
};

export default ImportContact;
