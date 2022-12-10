import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function MessageModal() {
  const { messageTimer, messageText } = useContext(AuthContext);

  return (
    <div className="message-modal">
      {messageTimer > 0 ? (
        <div className="message-modal__display">{messageText}</div>
      ) : null}
    </div>
  );
}

export default MessageModal;
