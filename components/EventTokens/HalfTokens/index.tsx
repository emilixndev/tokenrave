import { Image } from 'tamagui';
import React, { useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import HalfTokenValue from '@/Enums/HalfTokenValueEnum';

interface HalfTokensProps {
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
}

export default function HalfTokens({ addTokenToCounter, removeTokenToCounter, resetSelection }: HalfTokensProps) {
  const [pressed, setPressed] = useState<HalfTokenValue>(HalfTokenValue.NONE);

  useEffect(() => {
    setPressed(HalfTokenValue.NONE);
  }, [resetSelection]);

  function handlePress() {
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
