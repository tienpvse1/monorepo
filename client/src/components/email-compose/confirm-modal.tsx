import { Modal, ModalFuncProps } from 'antd';

const commonModalProps: ModalFuncProps = {
  okText: 'Agree',
  cancelText: 'Abort',
  closable: true,
  content: '',
  onOk: () => console.log('ok'),
  onCancel: () => console.log('canceled'),
};

export const errorProps = (
  content = '',
  onOk?: () => void
): ModalFuncProps => ({
  ...commonModalProps,
  content,
  onOk,
  onCancel: Modal.destroyAll,
});

export const warningProps = (
  content = '',
  onOk?: () => void
): ModalFuncProps => ({
  ...commonModalProps,
  content,
  title: 'This email will be sent to',
  onOk,
});
