import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'components/Modal';

export default function ImageGalleryItem({ id, pic, tags, preview }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <li className="imagegalleryitem " id={id}>
        <img
          className="imagegalleryitem-image"
          onClick={() => setShowModal(!showModal)}
          src={pic}
          alt={tags}
        />
      </li>
      {showModal && (
        <Modal
          onClose={() => setShowModal(!showModal)}
          preview={preview}
          tags={tags}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string,
  pic: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};
