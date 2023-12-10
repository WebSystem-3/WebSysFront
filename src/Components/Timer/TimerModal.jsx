import { useState } from 'react';
import Modal from 'react-modal';
import Timer from './Timer';
import './TimerModal.css';

const TimerModal = ({ task_id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleTimerStart = () => {
    setTimerRunning(true);
  };

  const handleTimerEnd = () => {
    setTimerRunning(false);
    closeModal();
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
        <Timer
          task_id={task_id}
          onTimerEnd={handleTimerEnd}
          onTimerStart={handleTimerStart}
        />
        <button
          onClick={closeModal}
          className='closebtn'
          disabled={timerRunning}
        >
          Close Timer
        </button>
      </Modal>
    </div>
  );
};

export default TimerModal;
