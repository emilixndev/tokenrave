import { X } from '@tamagui/lucide-icons';
import { Button, Dialog, Fieldset, Input, Label, Unspaced, View, XStack } from 'tamagui';
import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

export default function AddEventButton({ onEventAdded }: { onEventAdded?: () => void }) {
  // ... existing code

  const [nameTxt, setNameTxt] = useState('s');

  const database = useSQLiteContext();

  function addEvent() {
    database.runSync(`INSERT INTO events (name,token_count,token_price,total_price)
                      VALUES ('${nameTxt}',0,0,0)`);
    onEventAdded && onEventAdded();
  }

  return (
    <View gap="$4" justifyContent="center" alignItems="center">
      <Dialog modal>
        <Dialog.Trigger asChild>
          <Button>Add event</Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            backgroundColor="$shadow6"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ opacity: 0, scale: 0.95 }}
            exitStyle={{ opacity: 0 }}
          />

          <Dialog.Content
            bordered
            width="95%"
            height={'auto'}
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quicker',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
          >
            <Dialog.Title>New event</Dialog.Title>
            <Dialog.Description>Add a new event to your list</Dialog.Description>
            <Fieldset gap="$4" horizontal>
              <Label justifyContent="flex-end" htmlFor="name">
                Name :
              </Label>
              <Input
                flex={1}
                id="name"
                placeholder="Event name"
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setNameTxt(e.nativeEvent.text);
                }}
              />
            </Fieldset>

            <XStack alignSelf="flex-end" gap="$4">
              <Dialog.Close displayWhenAdapted asChild>
                <Button theme="accent" aria-label="Close" onPress={addEvent}>
                  Save changes
                </Button>
              </Dialog.Close>
            </XStack>

            <Unspaced>
              <Dialog.Close asChild>
                <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
              </Dialog.Close>
            </Unspaced>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
