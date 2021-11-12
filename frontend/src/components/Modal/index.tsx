import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Button from 'components/Button';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  closeModal: any;
  isPending?: boolean;
  title?: string;
  buttonLabel?: string;
  buttonClick?: React.MouseEventHandler<HTMLButtonElement>;
  content?: string;
};
const Modal: React.FC<Props> = ({
  isOpen,
  closeModal,
  title,
  buttonLabel,
  content,
  buttonClick,
  isPending = false,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles.dialog} onClose={closeModal}>
        <div className={styles.wrapper}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className={styles.overlay} />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className={styles.contentWrapper}>
              {title && (
                <Dialog.Title as="h3" className={styles.title}>
                  {title}
                </Dialog.Title>
              )}
              {content && <div className={styles.content}>{content}</div>}
              {buttonLabel && (
                <Button className="mx-auto mt-10" disabled={isPending} onClick={buttonClick} type="button">
                  {buttonLabel}
                </Button>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
