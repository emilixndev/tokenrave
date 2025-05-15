import { Button, Text, View } from 'tamagui';
import { Airplay } from '@tamagui/lucide-icons';
import { useState } from 'react';

export default function ButtonWithBadge() {
  const [counter, setCounter] = useState(0);

  return (
    <View position="relative">
      <Button icon={Airplay} onPress={() => setCounter(counter + 1)} />
      {counter > 0 && (
        <View
          position="absolute"
          top={-5}
          left={-5}
          backgroundColor="cyan"
          borderRadius={9999}
          paddingHorizontal={6}
          paddingVertical={2}
          justifyContent="center"
          alignItems="center"
        >
          <Text color="white" fontSize={10} fontWeight="bold">
            {counter > 99 ? '99+' : counter}
          </Text>
        </View>
      )}
    </View>
  );
}
