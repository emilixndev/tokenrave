import { Image } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import HalfTokenValue from '@/Enums/HalfTokenValueEnum';
import TokenValue from '@/Enums/TokenValueEnum';
import { TokenSelectedType } from '@/Types/TokenSelectedType';

interface HalfTokensProps {
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
  rowId: number;
  tokenId: number;
  reloadTokens: boolean;
  setReloadTokens: (TokenSelected: TokenSelectedType) => void;
  tokenList: TokenSelectedType | null;
}

export default function HalfTokens({ addTokenToCounter, removeTokenToCounter, resetSelection,  rowId,
                                     tokenId,
                                     reloadTokens,
                                     setReloadTokens,
                                     tokenList, }: HalfTokensProps) {
  const [pressed, setPressed] = useState<HalfTokenValue>(HalfTokenValue.NONE);

  useEffect(() => {
    setPressed(HalfTokenValue.NONE);
  }, [resetSelection]);


  useEffect(() => {
    if(rowId == tokenList?.rowId && tokenId == tokenList?.tokenId){
      return;
    }
    if (isPreviousToken(rowId, tokenId, tokenList)) {
      if (pressed == HalfTokenValue.FULL) {
        return;
      }


      setPressed(HalfTokenValue.FULL);
      addTokenToCounter(0.5);
    }else {
      if(pressed == HalfTokenValue.FULL)
        removeTokenToCounter(0.5);
      setPressed(HalfTokenValue.NONE);

    }
  }, [reloadTokens]);


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

  function handlePress() {
    setReloadTokens({ tokenId: tokenId, rowId: rowId });
    switch (pressed) {
      case HalfTokenValue.NONE:
        setPressed(HalfTokenValue.FULL);

        addTokenToCounter(0.5);
        console.log('pressed none');
        break;
      case HalfTokenValue.FULL:
        setPressed(HalfTokenValue.NONE);
        removeTokenToCounter(0.5);

        console.log('pressed half');
        break;

      default:
        setPressed(HalfTokenValue.NONE);

        break;
    }
  }

  return (
    <Pressable onPress={handlePress} style={{ marginHorizontal: 4 }}>
      {pressed == HalfTokenValue.NONE && (
        <Image
          source={{
            uri: require('@/assets/images/tokens/half_blue.png'),
            width: 50,
            height: 50,
          }}
        ></Image>
      )}

      {pressed == HalfTokenValue.FULL && (
        <Image
          source={{
            uri: require('@/assets/images/tokens/half_blue_selected.png'),
            width: 50,
            height: 50,
          }}
        ></Image>
      )}
    </Pressable>
  );
}
