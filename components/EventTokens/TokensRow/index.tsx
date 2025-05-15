import Tokens from '@/components/EventTokens/Tokens';
import { View } from 'tamagui';

interface TokensRowProps {
  numberOfTokensPerLine: number;
  addTokenToCounter: () => void;
  removeTokenToCounter: () => void;
  resetSelectionKey: number;
}

export default function TokensRow({ numberOfTokensPerLine, removeTokenToCounter, addTokenToCounter, resetSelectionKey }: TokensRowProps) {
  return (
    <View  flexDirection="row"
           justifyContent="center"
           width="100%"
           marginBottom="$1.5">
      {[...Array(numberOfTokensPerLine)].map((x, i) =>
        <Tokens removeTokenToCounter={removeTokenToCounter} addTokenToCounter={addTokenToCounter} resetSelectionKey={resetSelectionKey} key={i}/>
      )}


    </View>
  );
}
