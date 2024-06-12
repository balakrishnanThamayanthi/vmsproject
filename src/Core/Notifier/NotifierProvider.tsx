import React, { useState, useCallback, ReactNode } from 'react';
import Notification from './Notification';

type Color = 'success' | 'info' | 'warning' | 'error';

interface INotifierContext {
  message: string;
  subMessages?: string | Array<string>;
    showMessage: (msg: string, sub?: string | Array<string>) => void;
  showErrorMessage: (msg?: string, sub?: string | Array<string>) => void;
  removeMessage: () => void;
  severity: Color;
}

const defaultState = {
  message: '',
  severity: 'success' as Color,
  showMessage: () => {
    return;
  },
  showErrorMessage: () => {
    return;
  },
  removeMessage: () => {
    return;
  },
};
/**
 * Notifier context to show the snack bar message
 */
export const NotifierContext =
  React.createContext<INotifierContext>(defaultState);

/**
 * Notifier provider to manage the store for notification
 * @param {*} param0
 * @returns
 */
const NotifierProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string>('');
  const [subMessages, setSubmessages] =
    useState<string | Array<string>>([]);
  const [severity, setSeverity] = useState<Color>('success');


  const removeMessage = () => {
    setMessage('');
    setSubmessages([]);
  };

  const showMessage = (msg: string, sub?: string | Array<string>) => {
    setSeverity('success');
    setMessage(msg);
    setSubmessages(sub || '');
  };

  const showErrorMessage = useCallback(
    (msg?: string, sub?: string | Array<string>) => {
      setSeverity('error');
      setMessage(msg || "Unable to retrieve data. Please try again");
      setSubmessages(sub || '');
    },
    []
  );

  const contextValue = {
    message,
    subMessages,
    severity,
    showMessage: useCallback((msg: string, sub?: string | Array<string>) =>
      showMessage(msg, sub), []),
    showErrorMessage: useCallback((msg?: string,
      sub?: string | Array<string>) =>
      showErrorMessage(msg, sub), [showErrorMessage]),
    removeMessage: useCallback(() => removeMessage(), []),
  };

  return (
    <NotifierContext.Provider value={contextValue}>
      <Notification />
      {children}
    </NotifierContext.Provider>
  );
};

export default NotifierProvider;
