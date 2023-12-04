import { useState } from 'react';
import Modal from 'react-modal';
import Timer from './Timer';
import './TimerModal.css';

const TimerModal = ({ taskId }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal} className='openbtn'>
        Set Timer
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Timer Modal'
      >
        <Timer taskId={taskId} />
        <button onClick={closeModal} className='openbtn'>
          Close Timer
        </button>
      </Modal>
    </div>
  );
};

export default TimerModal;
