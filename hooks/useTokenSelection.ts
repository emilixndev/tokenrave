import { useState } from 'react';

const useTokenSelection = () => {
  const [tokenCounter, setTokenCounter] = useState<number>(0);


  function addTokenToCounter() {
    setTokenCounter(tokenCounter + 1);
  }
  function removeTokenToCounter() {
    setTokenCounter(tokenCounter - 1);
  }

  return {
    tokenCounter,
    addTokenToCounter,
    removeTokenToCounter}
}

export default useTokenSelection;