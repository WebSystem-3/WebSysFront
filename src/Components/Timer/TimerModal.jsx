import { useState } from 'react';
import Modal from 'react-modal';
import Timer from './Timer';
import './TimerModal.css';

const TimerModal = ({ task_id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    console.log(task_id);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(task_id);
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
        <Timer task_id={task_id} onTimerEnd={closeModal} />
        <button onClick={closeModal} className='openbtn'>
          Close Timer
        </button>
      </Modal>
    </div>
  );
};

export default TimerModal;
