import Tokens from '@/components/EventTokens/Tokens';
import { View } from 'tamagui';

interface TokensRowProps {
  numberOfTokensPerLine: number;
  addTokenToCounter: () => void;
  removeTokenToCounter: () => void;

}

export default function TokensRow({ numberOfTokensPerLine, removeTokenToCounter, addTokenToCounter }: TokensRowProps) {
  return (
    <View  flexDirection="row"
           justifyContent="center"
           width="100%"
           marginBottom="$1.5">
      {[...Array(numberOfTokensPerLine)].map((x, i) =>
        <Tokens removeTokenToCounter={removeTokenToCounter} addTokenToCounter={addTokenToCounter} key={i}/>
      )}


    </View>
  );
}
