import { View } from 'tamagui';
import TokensRow from '@/components/EventTokens/TokensRow';
import React from 'react';
import { TokenSelectedType } from '@/Types/TokenSelectedType';

interface TokensGridProps {
  numberOfTokens: number;
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
  reloadTokens: boolean;
  setReloadTokens: (TokenSelected: TokenSelectedType) => void;
  selectedToken: TokenSelectedType | null;
  isPreviousToken: (rowId: number, tokenId: number, tokenSelected: TokenSelectedType | null) => boolean;
}

export default function TokensGrid({
  numberOfTokens,
  removeTokenToCounter,
  addTokenToCounter,
  resetSelection,
  reloadTokens,
  setReloadTokens,
  selectedToken,
  isPreviousToken,
}: TokensGridProps) {
  return (
    <View marginTop="$4" paddingHorizontal="$2" alignItems="center">
      {[...Array(Math.ceil(numberOfTokens / 5))].map((x, i) =>
        i === Math.ceil(numberOfTokens / 5) - 1 && numberOfTokens % 5 !== 0 ? (
          <TokensRow
            key={i}
            numberOfTokensPerLine={numberOfTokens % 5}
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            resetSelection={resetSelection}
            rowId={i}
            reloadTokens={reloadTokens}
            setReloadTokens={setReloadTokens}
            selectedToken={selectedToken}
            isPreviousToken={isPreviousToken}
          ></TokensRow>
        ) : (
          <TokensRow
            numberOfTokensPerLine={5}
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            resetSelection={resetSelection}
            key={i}
            rowId={i}
            reloadTokens={reloadTokens}
            selectedToken={selectedToken}
            setReloadTokens={setReloadTokens}
            isPreviousToken={isPreviousToken}
          ></TokensRow>
        )
      )}
    </View>
  );
}
