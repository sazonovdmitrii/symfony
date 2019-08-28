import { useEffect } from 'react';

const useOnce = callback => useEffect(callback, []);

export default useOnce;
