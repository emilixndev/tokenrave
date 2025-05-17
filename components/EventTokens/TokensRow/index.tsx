import Tokens from '@/components/EventTokens/Tokens';
import { View } from 'tamagui';
import HalfTokens from '@/components/EventTokens/HalfTokens';

interface TokensRowProps {
  numberOfTokensPerLine: number;
  addTokenToCounter: (amount: number) => void;
  removeTokenToCounter: (amount: number) => void;
  resetSelection: boolean;
  rowId: number;
}

export default function TokensRow({
  numberOfTokensPerLine,
  removeTokenToCounter,
  addTokenToCounter,
  resetSelection,
}: TokensRowProps) {
  return (
    <View flexDirection="row" justifyContent="center" width="100%" marginBottom="$1.5">
      {[...Array(Math.ceil(numberOfTokensPerLine))].map((x, i) =>
        numberOfTokensPerLine % 1 != 0 && Math.ceil(numberOfTokensPerLine) - 1 == i ? (
          <HalfTokens
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            resetSelection={resetSelection}
            key={i}
          />
        ) : (
          <Tokens
            removeTokenToCounter={removeTokenToCounter}
            addTokenToCounter={addTokenToCounter}
            resetSelection={resetSelection}
            key={i}
          />
        )
      )}
    </View>
  );
}
