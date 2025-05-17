import { View } from 'tamagui';
import TokensRow from '@/components/EventTokens/TokensRow';
import React from 'react';
import Tokens from '@/components/EventTokens/Tokens';

interface TokensGridProps {
  numberOfTokens: number;
  addTokenToCounter: () => void;
  removeTokenToCounter: () => void;
  resetSelection: boolean;
  addHalfTokenToCounter: () => void;
}

export default function TokensGrid({
  numberOfTokens,
  removeTokenToCounter,
  addTokenToCounter,
  resetSelection,
  addHalfTokenToCounter,
}: TokensGridProps) {
  return (
    <View marginTop="$4" paddingHorizontal="$2" alignItems="center">
      {[...Array(Math.ceil(numberOfTokens / 5))].map((x, i) =>
        i == Math.ceil(numberOfTokens / 5) - 1 && numberOfTokens % 5 !== 0 ? (
          <TokensRow
            key={i}
            numberOfTokensPerLine={numberOfTokens % 5}
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            resetSelection={resetSelection}
            addHalfTokenToCounter={addHalfTokenToCounter}
            rowId={i}
          ></TokensRow>
        ) : (
          <TokensRow
            numberOfTokensPerLine={5}
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            addHalfTokenToCounter={addHalfTokenToCounter}
            resetSelection={resetSelection}
            key={i}
            rowId={i}
          ></TokensRow>
        )
      )}
    </View>
  );
}
