import { useState } from 'react';

const useTokenSelection = () => {
  const [tokenCounter, setTokenCounter] = useState<number>(0);


  function addTokenToCounter() {
    setTokenCounter(tokenCounter + 1);
  }
  function removeTokenToCounter() {
    setTokenCounter(tokenCounter - 1);
  }
  function resetTokenCounter() {
    setTokenCounter(0);
  }

  return {
    tokenCounter,
    addTokenToCounter,
    removeTokenToCounter,
    resetTokenCounter
  }
}

export default useTokenSelection;