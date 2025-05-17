import { Text, View } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import TokenValue from '@/Enums/TokenValueEnum';

interface TokensProps {
  addTokenToCounter: () => void;
  removeTokenToCounter: () => void;
  resetSelection: boolean;
  addHalfTokenToCounter: () => void;
  tokenStatue: TokenValue;
}

export default function Tokens({
  addTokenToCounter,
  removeTokenToCounter,
  resetSelection,
  addHalfTokenToCounter,
  tokenStatue
}: TokensProps) {
  const [pressed, setPressed] = useState<TokenValue>(tokenStatue);
  const [backGroundColors, setBackGroundColors] = useState<string>('white');
  const [borderColor, setborderColor] = useState<string>('white');

  useEffect(() => {

    setPressed(TokenValue.NONE);
    setBackGroundColors('white');
    setborderColor('white');
  }, [resetSelection]);

  function handlePress() {

    switch (pressed) {
      case TokenValue.NONE:
        setPressed(TokenValue.HALF);
        setBackGroundColors('white');
        setborderColor('lightblue');
        addHalfTokenToCounter();
        console.log('pressed none');
        break;
      case TokenValue.HALF:
        setBackGroundColors('lightblue');
        setborderColor('lightblue');

        setPressed(TokenValue.FULL);
        addHalfTokenToCounter();
        console.log('pressed half');
        break;
      case TokenValue.FULL:
        setBackGroundColors('white');
        setborderColor('white');
        setPressed(TokenValue.NONE);
        removeTokenToCounter();
        console.log('pressed full');
        break;
      default:
        setPressed(TokenValue.NONE);
        setBackGroundColors('white');
        setborderColor('white');
        break;
    }
  }

  return (
    <Pressable onPress={handlePress} style={{ marginHorizontal: 4 }}>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 14,
          borderRadius: 10,
          borderWidth: 5,
          borderColor: borderColor,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: backGroundColors,
        }}
      >
        <Text fontSize="$6" >
          $
        </Text>
      </View>
    </Pressable>
  );
}
