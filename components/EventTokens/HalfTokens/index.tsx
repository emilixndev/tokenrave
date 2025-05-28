import React, { useEffect, useState } from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';
import HalfTokenValue from '@/Enums/HalfTokenValueEnum';
import { TokenSelectedType } from '@/Types/TokenSelectedType';

interface HalfTokensProps {
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

export default function HalfTokens({
  addTokenToCounter,
  removeTokenToCounter,
  resetSelection,
  rowId,
  tokenId,
  reloadTokens,
  setReloadTokens,
  selectedToken,
  isPreviousToken,
}: HalfTokensProps) {
  const [tokenValue, setTokenValue] = useState<HalfTokenValue>(HalfTokenValue.NONE);

  //? Triggered each time the ui need to be cleared
  useEffect(() => {
    setTokenValue(HalfTokenValue.NONE);
  }, [resetSelection]);

  //? Triggered each time a token is selected to all the tokens
  useEffect(() => {
    //? If currentToken is same that selected do nothing
    if (rowId === selectedToken?.rowId && tokenId === selectedToken?.tokenId) {
      return;
    }
    //? If the token is previous the one selected
    if (isPreviousToken(rowId, tokenId, selectedToken)) {
      if (tokenValue === HalfTokenValue.FULL) {
        return;
      }

      setTokenValue(HalfTokenValue.FULL);
      addTokenToCounter(0.5);
    } else {
      if (tokenValue === HalfTokenValue.FULL) {
        removeTokenToCounter(0.5);
      }
      setTokenValue(HalfTokenValue.NONE);
    }
  }, [reloadTokens]);

  function handlePress() {
    setReloadTokens({ tokenId: tokenId, rowId: rowId });
    switch (tokenValue) {
      case HalfTokenValue.NONE:
        setTokenValue(HalfTokenValue.FULL);
        addTokenToCounter(0.5);
        break;
      case HalfTokenValue.FULL:
        setTokenValue(HalfTokenValue.NONE);
        removeTokenToCounter(0.5);
        break;
      default:
        setTokenValue(HalfTokenValue.NONE);
        break;
    }
  }

  return (
    <Pressable onPress={handlePress} style={styles.container}>
      {tokenValue === HalfTokenValue.NONE && (
        <Image
          source={require('@/assets/images/tokens/half_blue.png')}
          style={styles.image}
        />
      )}

      {tokenValue === HalfTokenValue.FULL && (
        <Image
          source={require('@/assets/images/tokens/half_blue_selected.png')}
          style={styles.image}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
  },
  image: {
    width: 50,
    height: 50,
  },
});
