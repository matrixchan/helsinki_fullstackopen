import { useEffect } from 'react';

const Notification = ({ message, notifyType, action }) => {
  console.log('Notification-----');
  console.log(message);
  useEffect(() => {
    if (message) {
      action();
    }
  }, [message, action]);

  if (message === null) {
    return null;
  }
  return <div className={notifyType}>{message}</div>;
};

export default Notification;
