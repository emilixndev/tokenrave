import { useState } from 'react';

const useTokenSelection = () => {
  const [tokenCounter, setTokenCounter] = useState<number>(0);

  function addTokenToCounter() {
    setTokenCounter(tokenCounter + 1);
  }

  function addHalfTokenToCounter() {
    setTokenCounter(tokenCounter + 0.5);
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
    resetTokenCounter,
    addHalfTokenToCounter
  };
};

export default useTokenSelection;
