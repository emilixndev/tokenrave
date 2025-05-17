import { useState } from 'react';

const useTokenSelection = () => {
  const [tokenCounter, setTokenCounter] = useState<number>(0);

  function addTokenToCounter(amount: number) {
    setTokenCounter(tokenCounter + amount);
  }

  function removeTokenToCounter(amount: number) {
    setTokenCounter(tokenCounter - amount);
  }

  function resetTokenCounter() {
    setTokenCounter(0);
  }

  return {
    tokenCounter,
    addTokenToCounter,
    removeTokenToCounter,
    resetTokenCounter,
  };
};

export default useTokenSelection;
