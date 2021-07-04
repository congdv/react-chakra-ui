import { useEffect, useRef } from 'react';
import { isEqual } from 'lodash';

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref || !ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};


export const useOnClickOutsideDeeply = ($ignoredElementRefs, isListening, onOutsideClick, $listeningElementRef) => {
  const $mouseDownTargetRef = useRef();
  const $ignoredElementRefsMemoized = useDeepCompareMemoize([$ignoredElementRefs].flat());

  useEffect(() => {
    const handleMouseDown = (event) => {
      $mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = (event) => {
      const isAnyIgnoredElementAncestorOfTarget = $ignoredElementRefsMemoized.some(
        ($elementRef) =>
          $elementRef.current.contains($mouseDownTargetRef.current) || $elementRef.current.contains(event.target),
      );
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown);
      $listeningElement.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown);
      $listeningElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$ignoredElementRefsMemoized, $listeningElementRef, isListening, onOutsideClick]);
};

export const useDeepCompareMemoize = value => {
  const valueRef = useRef();

  if (!isEqual(value, valueRef.current)) {
    valueRef.current = value;
  }
  return valueRef.current;
};
