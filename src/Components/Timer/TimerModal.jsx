import { useState } from 'react';
import Modal from 'react-modal';
import Timer from './Timer';
import './TimerModal.css';

const TimerModal = ({ task_id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    console.log(task_id);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(task_id);
  };
  const handleTimerStart = () => {
    setTimerRunning(true); // 타이머 시작 시 timerRunning 상태를 true로 변경
  };

  const handleTimerEnd = () => {
    setTimerRunning(false); // 타이머 종료 시 timerRunning 상태를 false로 변경
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
