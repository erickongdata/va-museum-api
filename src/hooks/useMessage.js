import { useState, useEffect } from 'react';

function useMessage(initialTime, initialMessage) {
  const [messageTimer, setMessageTimer] = useState(initialTime);
  const [messageText, setMessageText] = useState(initialMessage);

  useEffect(() => {
    const tick = setInterval(() => {
      if (messageTimer > 0) {
        setMessageTimer((curr) => curr - 1);
      }
    }, 1000);

    return () => clearInterval(tick);
  });

  return [messageTimer, setMessageTimer, messageText, setMessageText];
}

export default useMessage;
