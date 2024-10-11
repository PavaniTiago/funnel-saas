import { useState, useCallback } from 'react';

export const useHelperLines = () => {
  const [snapToGrid, setSnapToGrid] = useState(false);

  const toggleSnapToGrid = useCallback(() => {
    setSnapToGrid((prev) => !prev);
  }, []);

  return { snapToGrid, toggleSnapToGrid };
};