import Tokens from '@/components/EventTokens/Tokens';
import { View } from 'tamagui';
import HalfTokens from '@/components/EventTokens/HalfTokens';
import { TokenSelectedType } from '@/Types/TokenSelectedType';

interface TokensRowProps {
  numberOfTokensPerLine: number;
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
  rowId: number;
  setReloadTokens: (TokenSelected:TokenSelectedType) => void;
  reloadTokens: boolean;
  selectedToken: TokenSelectedType | null;
  isPreviousToken: (rowId: number, tokenId: number, tokenSelected: TokenSelectedType | null) => boolean;
}

export default function TokensRow({
  numberOfTokensPerLine,
  removeTokenToCounter,
  addTokenToCounter,
  resetSelection,
  rowId,
  reloadTokens,
  setReloadTokens,
                                    selectedToken,
  isPreviousToken
}: TokensRowProps) {
  return (
    <View flexDirection="row" justifyContent="center" width="100%" marginBottom="$1.5">
      {[...Array(Math.ceil(numberOfTokensPerLine))].map((x, i) =>
        numberOfTokensPerLine % 1 != 0 && Math.ceil(numberOfTokensPerLine) - 1 == i ? (
          <HalfTokens
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            resetSelection={resetSelection}
            rowId={rowId}
            tokenId={i}
            key={i}
            reloadTokens={reloadTokens}
            setReloadTokens={setReloadTokens}
            selectedToken={selectedToken}
            isPreviousToken={isPreviousToken}

          />
        ) : (
          <Tokens
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            resetSelection={resetSelection}
            rowId={rowId}
            tokenId={i}
            key={i}
            reloadTokens={reloadTokens}
            setReloadTokens={setReloadTokens}
            selectedToken={selectedToken}
            isPreviousToken={isPreviousToken}

          />
        )
      )}
    </View>
  );
}
