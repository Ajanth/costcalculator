import React from 'react';
import Modal from 'react-modal';

import './info-modal.css';

function InfoModal({ infoModalOpen, closeModal }: any) {
  return (
    <Modal
      isOpen={infoModalOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="modal"
    >
      <h3 className="header">
        What are the tax classes in Germany?
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>
      </h3>
      <ul className="checkmarks">
        <li>
          <strong>Class I</strong>: Single/widowed/civil partnership/divorced.
          Married persons not in tax classes II, III or IV
        </li>
        <li>
          <strong>Class II</strong>:&nbsp;Single but entitled to single parent
          allowance
        </li>
        <li>
          <strong>Class III</strong>:&nbsp;Married but spouse does not earn
          wages/is classified under tax category V/recently deceased
        </li>
        <li>
          <strong>Class IV</strong>: Married (not separated); both earning and
          residing in Germany
        </li>
        <li>
          <strong>Class V</strong>: Married but one spouse is classified under
          tax class III
        </li>
        <li>
          <strong>Class VI</strong>: Individuals on multiple wages from more
          than one employer
        </li>
      </ul>
    </Modal>
  );
}

export default InfoModal;
