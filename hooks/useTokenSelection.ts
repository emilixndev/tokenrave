import { useState } from 'react';
import { TokenSelectedType } from '@/Types/TokenSelectedType';

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

  function isPreviousToken(rowId: number, tokenId: number, tokenSelected: TokenSelectedType | null) {
    if (tokenSelected === null) {
      return false;
    }
    if (tokenSelected.rowId >= rowId) {
      if (tokenSelected.rowId == rowId) {
        if (tokenSelected.tokenId > tokenId) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  return {
    tokenCounter,
    addTokenToCounter,
    removeTokenToCounter,
    resetTokenCounter,
    isPreviousToken,
  };
};

export default useTokenSelection;
