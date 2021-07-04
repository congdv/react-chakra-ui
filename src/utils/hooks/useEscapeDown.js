import { useEffect } from 'react';

const ESCAPE = 27;

export const useOnEscapeKeyDown = (isListening, onEscapeKeyDown) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
};
