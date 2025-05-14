import { Button, Dialog, Fieldset, Input, Label, Unspaced, XStack } from 'tamagui';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { X } from '@tamagui/lucide-icons';

interface addTokenModalProps {
  setTokenInput: (token: number) => void;
  setPriceInput: (price: number) => void;
  addToken: () => void;
}
export default function AddTokenModal({ setTokenInput, setPriceInput, addToken }: addTokenModalProps) {
  return (
    <>
      <Dialog modal>
        <Dialog.Trigger asChild>
          <Button>Add Token</Button>
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
            <Dialog.Title>Add token</Dialog.Title>
            <Dialog.Description>Add token to your wallet</Dialog.Description>
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
                  setTokenInput(parseInt(e.nativeEvent.text));
                }}
              />
            </Fieldset>

            <Fieldset gap="$4" horizontal>
              <Label justifyContent="flex-end" htmlFor="name">
                Price in € :
              </Label>
              <Input
                keyboardType={'numeric'}
                flex={1}
                id="price_token"
                placeholder="xx,xx"
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setPriceInput(parseFloat(e.nativeEvent.text));
                }}
              />
            </Fieldset>

            <XStack alignSelf="flex-end" gap="$4">
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  theme="accent"
                  aria-label="Close"
                  onPress={() => {
                    addToken();
                  }}
                >
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
    </>
  );
}
