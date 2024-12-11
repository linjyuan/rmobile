import { useCallback, useEffect, useState } from 'react';

const useToggle = (
  initialState: boolean,
): [boolean, () => void, (val: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialState);

  useEffect(() => {
    setValue(initialState);
  }, [initialState]);

  const toggleValue = useCallback(() => setValue((prev) => !prev), []);
  const toggleSetValue = useCallback((val) => setValue(val), []);

  return [value, toggleValue, toggleSetValue];
};

export default useToggle;
