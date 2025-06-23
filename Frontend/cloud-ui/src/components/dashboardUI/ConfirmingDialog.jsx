import React from 'react';
import Modal from './Modal';
import Card from './Card';
import Button from './Button';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Card className="p-6 text-center">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">{title}</h3>
      <p className="text-slate-600 mb-6">{message}</p>
      <div className="flex gap-4 justify-center">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>Delete</Button>
      </div>
    </Card>
  </Modal>
);

export default ConfirmDialog;
