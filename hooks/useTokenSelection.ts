import { useState } from 'react';

const useTokenSelection = () => {
  const [tokenCounter, setTokenCounter] = useState<number>(0);
  const [tokenList, setTokenList] = useState<string[]>([]);

  function addTokenToCounter(amount: number) {
    setTokenCounter((prevCounter) => prevCounter + amount);
  }

  function removeTokenToCounter(amount: number) {
    setTokenCounter((prevCounter) => prevCounter - amount);
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
