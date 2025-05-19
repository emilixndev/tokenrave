import { Button, Dialog, Fieldset, Input, Label, Text, Unspaced, XStack } from 'tamagui';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import ButtonWithBadge from '@/components/common/ButtonWithBadge';
import { X } from '@tamagui/lucide-icons';
import { EventType } from '@/db/types/eventType';

interface addTokenModalProps {
  event: EventType;
  setTokenExpenseInput: (token: number) => void;
  tokenExpenseInput: number;
  saveExpense: () => void;
}

export default function AddExpenseModal({
  event,
  setTokenExpenseInput,
  tokenExpenseInput,
  saveExpense,
}: addTokenModalProps) {
  return (
    <>
      <Dialog modal>
        <Dialog.Trigger asChild>
          {event && event.token_price > 0 ? (
            <Button>Add expense</Button>
          ) : (
            <Button disabled opacity={0.5}>
              Add expense
            </Button>
          )}
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
            <Dialog.Title>Add expense</Dialog.Title>
            <Dialog.Description>Consume token from your wallet</Dialog.Description>
            <Fieldset gap="$4" horizontal>
              <Label justifyContent="flex-end" htmlFor="name">
                Number of token :
              </Label>
              <Input
                keyboardType={'numeric'}
                flex={1}
                id="number_token"
                placeholder="xx"
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setTokenExpenseInput(parseInt(e.nativeEvent.text));
                }}
              />
            </Fieldset>

            <Text>Your expense represent {tokenExpenseInput * event.token_price} €</Text>
            <XStack gap="$3">
              <ButtonWithBadge />
            </XStack>

            <XStack alignSelf="flex-end" gap="$4">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  theme="accent"
                  aria-label="Close"
                  onPress={() => {
                    saveExpense();
                  }}
                >
                  Save
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
    </>
  );
}
