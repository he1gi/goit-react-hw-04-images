import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, tags, preview }) {
  useEffect(() => {
    const onKeyPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  });

  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="overlay" onClick={handleBackDropClick}>
      <div className="modal">
        <img src={preview} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.string,
  preview: PropTypes.string.isRequired,
};
