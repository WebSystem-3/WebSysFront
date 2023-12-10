import { useState } from 'react';
import Modal from 'react-modal';
import FriendSearch from './FriendSearch';
import { MdClose } from "react-icons/md";

const FriendSearchModal = () => {
  const [searchIsOpen, setSearchIsOpen] = useState(false);

  const openSearchFr = () => {
    setSearchIsOpen(true);
  };

  const closeSearchFr = () => {
    setSearchIsOpen(false);
  };
  
  const modalStyle = {
    content: {
      width:'700px',
      height: '150px',
      top:'80%',
      left:'50%',
      right:'auto',
      bottom:'auto',
      transform:'translate(-50%,-50%)',
      borderRadius: '10px',
      backgroundColor:'#D9D9D9',
    }
  }
  return (
    <div>
      <button className='addFrBtn' onClick={openSearchFr}>+</button>
      <Modal
        style={modalStyle}
        isOpen = {searchIsOpen}
        onRequestClose={closeSearchFr}
      >
        <FriendSearch /> 
        <MdClose className='modalCloseBt' size='30' onClick={closeSearchFr} />
      </Modal>
    </div>
  );
};

export default FriendSearchModal;