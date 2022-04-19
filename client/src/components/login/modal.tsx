/* eslint-disable react/prop-types */
import { Modal as Dialog } from 'antd';
interface ModalProps {
  reset: () => void;
  setLoading: (value: React.SetStateAction<boolean>) => void;
}

const Modal: React.FC<ModalProps> = ({ reset, setLoading }) => {
  return (
    <>
      <Dialog
        title='Unauthorize'
        onCancel={() => {
          reset();
          setLoading(false);
        }}
        onOk={() => {
          reset();
          setLoading(false);
        }}
        visible
      >
        <p>Please check your email and password</p>
      </Dialog>
    </>
  );
};

export default Modal;
