import Tokens from '@/components/EventTokens/Tokens';
import { View } from 'tamagui';
import { useEffect } from 'react';
import TokenValue from '@/Enums/TokenValueEnum';

interface TokensRowProps {
  numberOfTokensPerLine: number;
  addTokenToCounter: () => void;
  removeTokenToCounter: () => void;
  resetSelection: boolean;
  addHalfTokenToCounter: () => void;
  rowId:number;
}

export default function TokensRow({
  numberOfTokensPerLine,
  removeTokenToCounter,
  addTokenToCounter,
  resetSelection,
  addHalfTokenToCounter,
}: TokensRowProps) {
  return (
    <View flexDirection="row" justifyContent="center" width="100%" marginBottom="$1.5">
      {[...Array(Math.ceil(numberOfTokensPerLine))].map((x, i) => (
        numberOfTokensPerLine % 1 != 0 && Math.ceil(numberOfTokensPerLine)-1==i)?(
        <Tokens
          removeTokenToCounter={removeTokenToCounter}
          addTokenToCounter={addTokenToCounter}
          resetSelection={resetSelection}
          key={i}
          addHalfTokenToCounter={addHalfTokenToCounter}
          tokenStatue={TokenValue.HALF}
        />):( <Tokens
          removeTokenToCounter={removeTokenToCounter}
          addTokenToCounter={addTokenToCounter}
          resetSelection={resetSelection}
          key={i}
          addHalfTokenToCounter={addHalfTokenToCounter}
          tokenStatue={TokenValue.FULL}
        />)
      )}
    </View>
  );
}
