import { View } from 'tamagui';
import TokensRow from '@/components/EventTokens/TokensRow';
import React from 'react';
import Tokens from '@/components/EventTokens/Tokens';

interface TokensGridProps {
  numberOfTokens: number;
  addTokenToCounter: () => void;
  removeTokenToCounter: () => void;
}

export default function TokensGrid({ numberOfTokens, removeTokenToCounter, addTokenToCounter }: TokensGridProps) {
  return (
    <View marginTop="$4" paddingHorizontal="$2" alignItems="center">
      {[...Array(Math.ceil(numberOfTokens / 5))].map((x, i) =>
        i == Math.ceil(numberOfTokens / 5) - 1 && numberOfTokens % 5 !== 0 ? (
          <TokensRow key={i}
            numberOfTokensPerLine={numberOfTokens % 5}
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
          ></TokensRow>
        ) : (
          <TokensRow numberOfTokensPerLine={5} removeTokenToCounter={removeTokenToCounter} addTokenToCounter={addTokenToCounter} key={i}></TokensRow>
        )
      )}
    </View>
  );
}
