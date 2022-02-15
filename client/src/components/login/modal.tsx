/* eslint-disable react/prop-types */
import { Modal as Dialog } from 'antd';
interface ModalProps {
  reset: () => void;
}

const Modal: React.FC<ModalProps> = ({ reset }) => {
  return (
    <>
      <Dialog
        title='Unauthorize'
        onCancel={() => reset()}
        onOk={() => reset()}
        visible
      >
        <p>Please check your email and password</p>
      </Dialog>
    </>
  );
};

export default Modal;
