import { useContext } from 'react';
import { NotifierContext } from './NotifierProvider';
/**
 * Wrapper hook for notifer context
 * @returns
 */
function useNotifier() {
  const {
    message,
    severity,
    showMessage,
    showErrorMessage,
    removeMessage,
    subMessages,
  } = useContext(NotifierContext);
  return { message, severity, subMessages,
    showMessage, showErrorMessage, removeMessage };
}

export default useNotifier;
