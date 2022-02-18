import { CreateContactDto } from '@modules/contact/dto/create-contact.dto';
import { contactSchema } from '@modules/contact/schema/contact.schema';
import { removeDuplicate, removeMissingProps } from '@util/array';
import { Modal, Radio } from 'antd';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Types } from './preview-contact-table';

interface SaveModalProps {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  handleSave: (contacts: CreateContactDto[]) => void;
  rawContacts: CreateContactDto[];
}

const SaveModal: React.FC<SaveModalProps> = ({
  setShowModal,
  handleSave,
  rawContacts,
}) => {
  const [type, setType] = useState<Types>(Types.ALL);
  const onOk = async (event: any) => {
    if (type === Types.ALL) {
      handleSave(rawContacts);
    }
    if (type === Types.CLEANED) {
      handleSave(removeDuplicate<CreateContactDto>(rawContacts, 'phone'));
    } else {
      const filteredData = await removeMissingProps<CreateContactDto>(
        rawContacts,
        contactSchema
      );
      handleSave(filteredData);
    }
    setShowModal(false);
  };

  return (
    <>
      <Modal
        title='Save as...'
        visible={true}
        onCancel={() => setShowModal(false)}
        onOk={(e) => onOk(e)}
      >
        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          defaultValue={type}
        >
          <Radio value={Types.ALL}>All</Radio> <br />
          <Radio style={{ margin: '12px 0' }} value={Types.CLEANED}>
            Cleaned
          </Radio>{' '}
          <br />
          <Radio value={Types.FULL_FILLED}>Full-filled</Radio>
        </Radio.Group>
      </Modal>
    </>
  );
};

export default SaveModal;
