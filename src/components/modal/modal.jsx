import { CloseIcon } from '@krgaa/react-developer-burger-ui-components';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import ModalOverlay from '../modal-overlay/modal-overlay.jsx';

import styles from './modal.module.css';

export const Modal = ({ title, onClose, children }) => {
  const [modalRoot, setModalRoot] = useState(null);
  useEffect(() => {
    const root = document.getElementById('modals');
    setModalRoot(root);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key == 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <section>
      <div className={`${styles.modal} `}>
        <div className={`${styles.title} pt-10 pl-10 pr-10`}>
          <div className="text text_type_main-large">{title}</div>
          <button className={styles.close} onClick={onClose}>
            <CloseIcon type="primary"></CloseIcon>
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </section>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
