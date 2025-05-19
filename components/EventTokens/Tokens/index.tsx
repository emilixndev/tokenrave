import { Image } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import TokenValue from '@/Enums/TokenValueEnum';
import { TokenSelectedType } from '@/Types/TokenSelectedType';
import { PressableEvent } from 'react-native-gesture-handler/lib/typescript/components/Pressable/PressableProps';
import { GestureReponderEvent } from '@tamagui/web';

interface TokensProps {
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
  rowId: number;
  tokenId: number;
  reloadTokens: boolean;
  setReloadTokens: (TokenSelected: TokenSelectedType) => void;
  tokenList: TokenSelectedType | null;
}

export default function Tokens({
  addTokenToCounter,
  removeTokenToCounter,
  resetSelection,
  rowId,
  tokenId,
  reloadTokens,
  setReloadTokens,
  tokenList,
}: TokensProps) {
  const [pressed, setPressed] = useState<TokenValue>(TokenValue.NONE);
  useEffect(() => {
    setPressed(TokenValue.NONE);
  }, [resetSelection]);
  useEffect(() => {
    if (rowId == tokenList?.rowId && tokenId == tokenList?.tokenId) {
      return;
    }
    if (isPreviousToken(rowId, tokenId, tokenList)) {
      if (pressed == TokenValue.FULL) {
        return;
      }
      if (pressed == TokenValue.HALF) {
        setPressed(TokenValue.FULL);
        addTokenToCounter(0.5);

        return;
      }

      setPressed(TokenValue.FULL);
      addTokenToCounter(1);
    } else {
      if (pressed == TokenValue.FULL) removeTokenToCounter(1);
      else if (pressed == TokenValue.HALF) removeTokenToCounter(0.5);
      setPressed(TokenValue.NONE);
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

  function handlePress(event: GestureReponderEvent) {
    const { locationX, locationY } = event.nativeEvent;
    console.log(locationX, locationY);
    setReloadTokens({ tokenId: tokenId, rowId: rowId });

    switch (pressed) {
      case TokenValue.NONE:
        if (locationX > 25) {
          setPressed(TokenValue.FULL);
          addTokenToCounter(1);
          break;
        }
        setPressed(TokenValue.HALF);
        addTokenToCounter(0.5);
        break;
      case TokenValue.HALF:
        setPressed(TokenValue.FULL);
        addTokenToCounter(0.5);

        break;
      case TokenValue.FULL:
        if (locationX < 25) {
          setPressed(TokenValue.HALF);
          removeTokenToCounter(0.5);
        }
        break;
      default:
        setPressed(TokenValue.NONE);
        break;
    }
  }

  return (
    <Pressable onPress={handlePress} style={{ marginHorizontal: 4 }}>
      {pressed == TokenValue.NONE && (
        <Image
          source={{
            uri: require('@/assets/images/tokens/full_blue.png'),
            width: 50,
            height: 50,
          }}
        ></Image>
      )}
      {pressed == TokenValue.HALF && (
        <Image
          source={{
            uri: require('@/assets/images/tokens/full_blue_half_selected.png'),
            width: 50,
            height: 50,
          }}
        ></Image>
      )}
      {pressed == TokenValue.FULL && (
        <Image
          source={{
            uri: require('@/assets/images/tokens/full_blue_selected.png'),
            width: 50,
            height: 50,
          }}
        ></Image>
      )}
    </Pressable>
  );
}
