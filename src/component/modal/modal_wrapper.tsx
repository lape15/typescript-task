import Modal from './portal';
import './modal.css';
interface ReceivedProps {
  showModal: boolean;
}

const ModalWrapper: React.FC<ReceivedProps> = ({ children, showModal }) => {
  return (
    <Modal>
      <div className={`modal ${showModal ? 'open' : ''}`}>{children}</div>
    </Modal>
  );
};

export default ModalWrapper;
