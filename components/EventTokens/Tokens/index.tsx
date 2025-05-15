import { Button } from 'tamagui';
import React, { useState } from 'react';

interface TokensProps {
  addTokenToCounter: () => void;
  removeTokenToCounter: () => void;
}

export default function Tokens({ addTokenToCounter, removeTokenToCounter }: TokensProps) {
  const [pressed, setPressed] = useState(false);

  function handlePress() {
    setPressed(!pressed)
    pressed ? removeTokenToCounter() : addTokenToCounter();
  }

  return (
    <Button
      onPress={handlePress}
      paddingVertical="$2.5"
      paddingHorizontal="$3.5"
      borderWidth={1}
      borderRadius="$4"
      alignItems="center"
      justifyContent="center"
      backgroundColor={pressed ? 'lightblue' : 'white'}
      marginHorizontal="$1"
      fontSize="$6"
    >
      $
    </Button>
  );
}