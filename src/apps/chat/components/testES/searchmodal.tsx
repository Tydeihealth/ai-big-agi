import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import SearchPage from './search'; // Adjust the path as necessary

const SearchModal = ({ isMaudMode, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isMaudMode);

  useEffect(() => {
    setModalIsOpen(isMaudMode);
  }, [isMaudMode]);

  const closeModal = () => {
    if (onClose) {
      onClose(); // Call the onClose function passed from the parent component
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Search Modal"
      >
        <SearchPage />
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default SearchModal;
