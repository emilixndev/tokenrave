import { Image } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import TokenValue from '@/Enums/TokenValueEnum';

interface TokensProps {
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
}

export default function Tokens({
  addTokenToCounter,
  removeTokenToCounter,
  resetSelection,
}: TokensProps) {
  const [pressed, setPressed] = useState<TokenValue>(TokenValue.NONE);

  useEffect(() => {
    setPressed(TokenValue.NONE);
  }, [resetSelection]);

  function handlePress() {
    switch (pressed) {
      case TokenValue.NONE:
        setPressed(TokenValue.HALF);

        addTokenToCounter(0.5);
        break;
      case TokenValue.HALF:
        setPressed(TokenValue.FULL);
        addTokenToCounter(0.5);


        break;
      case TokenValue.FULL:
        setPressed(TokenValue.NONE);
        removeTokenToCounter(1);
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
