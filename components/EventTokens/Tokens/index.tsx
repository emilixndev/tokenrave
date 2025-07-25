import React, { useEffect, useState } from 'react';
import { Pressable, Image, StyleSheet, GestureResponderEvent, View } from 'react-native';
import TokenValue from '@/Enums/TokenValueEnum';
import { TokenSelectedType } from '@/Types/TokenSelectedType';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    borderRadius: 18,
    backgroundColor: 'transparent',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: 'transparent',
    transform: [{ scale: 0.96 }],
  },
  tokenWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: 48,
    height: 48,
  },
});

interface TokensProps {
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
  rowId: number;
  tokenId: number;
  reloadTokens: boolean;
  setReloadTokens: (TokenSelected: TokenSelectedType) => void;
  selectedToken: TokenSelectedType | null;
  isPreviousToken: (rowId: number, tokenId: number, tokenSelected: TokenSelectedType | null) => boolean;
}

export default function Tokens({
  addTokenToCounter,
  removeTokenToCounter,
  resetSelection,
  rowId,
  tokenId,
  reloadTokens,
  setReloadTokens,
  selectedToken,
  isPreviousToken,
}: TokensProps) {
  const [tokenValue, setTokenValue] = useState<TokenValue>(TokenValue.NONE);
  const [pressed, setPressed] = useState(false);

  //? Triggered each time the ui need to be cleared
  useEffect(() => {
    setTokenValue(TokenValue.NONE);
  }, [resetSelection]);

  //? Triggered each time a token is selected to all the tokens
  useEffect(() => {
    //? If currentToken is same that selected do nothing
    if (rowId === selectedToken?.rowId && tokenId === selectedToken?.tokenId) {
      return;
    }
    //? If the token is previous the one selected
    if (isPreviousToken(rowId, tokenId, selectedToken)) {
      if (tokenValue === TokenValue.FULL) {
        return;
      }
      if (tokenValue === TokenValue.HALF) {
        setTokenValue(TokenValue.FULL);
        addTokenToCounter(0.5);

        return;
      }

      setTokenValue(TokenValue.FULL);
      addTokenToCounter(1);
    } else {
      if (tokenValue === TokenValue.FULL) removeTokenToCounter(1);
      else if (tokenValue === TokenValue.HALF) removeTokenToCounter(0.5);
      setTokenValue(TokenValue.NONE);
    }
  }, [reloadTokens]);

  function handlePress(event: GestureResponderEvent) {
    //? Location used to select half or full token
    const { locationX } = event.nativeEvent;
    setReloadTokens({ tokenId: tokenId, rowId: rowId });

    switch (tokenValue) {
      case TokenValue.NONE:
        if (locationX > 30) {
          setTokenValue(TokenValue.FULL);
          addTokenToCounter(1);
          break;
        }
        setTokenValue(TokenValue.HALF);
        addTokenToCounter(0.5);
        break;
      case TokenValue.HALF:
        setTokenValue(TokenValue.FULL);
        addTokenToCounter(0.5);
        break;
      case TokenValue.FULL:
        if (locationX < 30) {
          setTokenValue(TokenValue.HALF);
          removeTokenToCounter(0.5);
        }
        break;
      default:
        setTokenValue(TokenValue.NONE);
        break;
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View style={styles.tokenWrapper}>
        {tokenValue === TokenValue.NONE && (
          <Image source={require('@/assets/images/tokens/full_blue.png')} style={styles.image} />
        )}
        {tokenValue === TokenValue.HALF && (
          <Image source={require('@/assets/images/tokens/full_blue_half_selected.png')} style={styles.image} />
        )}
        {tokenValue === TokenValue.FULL && (
          <Image source={require('@/assets/images/tokens/full_blue_selected.png')} style={styles.image} />
        )}
      </View>
    </Pressable>
  );
}
