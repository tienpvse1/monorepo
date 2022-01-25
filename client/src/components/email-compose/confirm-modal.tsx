import { Button, Modal, ModalFuncProps } from 'antd';
import { FC } from 'react';
import { Design } from 'react-email-editor';
import { TemplateSelection } from './templates-selection';

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
  onOk,
});
