import { X } from '@tamagui/lucide-icons';
import { AlertDialog, Button, Dialog, Fieldset, Input, Label, Unspaced, View, XStack, YStack } from 'tamagui';
import { useState } from 'react';
import { Keyboard, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { addNewEvent } from '@/db/repositories/eventRepository';


export default function AddEventButton({ onEventAdded }: { onEventAdded?: () => void }) {
  const [nameTxt, setNameTxt] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(0.5);
  const [disabledBtn, setDisabledBtn] = useState(true);

  const database = useSQLiteContext();

  async function addEvent() {
    if (!nameTxt.trim()) {
      return;
    }
    await addNewEvent(database, nameTxt);
    setNameTxt('');
    Keyboard.dismiss();
    onEventAdded && onEventAdded();
  }

  return (
    <View gap="$4" justifyContent="center" alignItems="center" position="absolute" bottom="$5" left="$0" right="$0">
      <Dialog modal>
        <Dialog.Trigger asChild>
          <Button width={'50%'} bordered backgroundColor={'#0d6efd'} color={'white'}>
            Add new event
          </Button>
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
                  if (e.nativeEvent.text.trim()) {
                    setBtnOpacity(1);
                    setDisabledBtn(false);
                  } else {
                    setBtnOpacity(0.5);
                    setDisabledBtn(true);
                  }
                  setNameTxt(e.nativeEvent.text);
                }}
                maxLength={20}
              />
            </Fieldset>

            <XStack alignSelf="flex-end" gap="$4">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  theme="accent"
                  aria-label="Close"
                  onPress={addEvent}
                  disabled={disabledBtn}
                  opacity={btnOpacity}
                  backgroundColor={'#0d6efd'}
                  color={'white'}
                >
                  Save changes
                </Button>
              </Dialog.Close>
            </XStack>

            <Unspaced>
              <Dialog.Close asChild>
                <Button
                  position="absolute"
                  top="$3"
                  right="$3"
                  size="$2"
                  circular
                  icon={X}
                  backgroundColor={'#dc3545'}
                  color={'white'}
                />
              </Dialog.Close>
            </Unspaced>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
}
