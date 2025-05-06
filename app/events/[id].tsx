import { useLocalSearchParams } from 'expo-router';
import { View, Text, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Button, Dialog, Fieldset, H5, Input, Label, Separator, SizableText, Tabs, Unspaced, XStack } from 'tamagui';
import { X } from '@tamagui/lucide-icons';

export default function Index() {
  const { id, limit } = useLocalSearchParams();
  const database = useSQLiteContext();
  const [token, setToken] = useState<number>(0);
  const [tokenInput, setTokenInput] = useState<number>(0);
  const [priceInput, setPriceInput] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const [event, setEvent] = useState<any>([]);
  useEffect(() => {
    getEvent();
  }, []);

  function getEvent() {
    const eventSelected = database.getFirstSync(`SELECT *
                                                 FROM events
                                                 WHERE id = ${id}`);
    setEvent(eventSelected);
    console.log(eventSelected);
  }

  return (
    <View>
      <Tabs
        defaultValue="tab1"
        width="100%"
        orientation="horizontal"
        flexDirection="column"
        height="100%"
        borderRadius="$4"
        borderWidth="$0.25"
        overflow="hidden"
        borderColor="$borderColor"
      >
        <Tabs.List separator={<Separator vertical />} disablePassBorderRadius="bottom" aria-label="Manage your account">
          <Tabs.Tab
            focusStyle={{
              backgroundColor: '$color3',
            }}
            flex={1}
            value="tab1"
          >
            <SizableText>Tokens</SizableText>
          </Tabs.Tab>
          <Tabs.Tab
            focusStyle={{
              backgroundColor: '$color3',
            }}
            flex={1}
            value="tab2"
          >
            <SizableText>History</SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="tab1">
          <Text>{price} €</Text>
          <Text>{token} Tokens</Text>
          <Text>{price/token}€ = 1 Token</Text>
          <Text>Event {event.name}</Text>
          <Text>Token</Text>
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
                  <Input flex={1} id="price_token" placeholder="xx,xx"   onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    setPriceInput(parseFloat(e.nativeEvent.text));
                  }} />
                </Fieldset>

                <XStack alignSelf="flex-end" gap="$4">
                  <Dialog.Close displayWhenAdapted asChild>
                    <Button
                      theme="accent"
                      aria-label="Close"
                      onPress={() => {
                        setToken(token + tokenInput);
                        setPrice(price + priceInput);
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

          <Dialog modal>
            <Dialog.Trigger asChild>
              <Button>Add expense</Button>
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
                  <Input flex={1} id="price_token" placeholder="xx,xx"   onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                    setPriceInput(parseFloat(e.nativeEvent.text));
                  }} />
                </Fieldset>

                <XStack alignSelf="flex-end" gap="$4">
                  <Dialog.Close displayWhenAdapted asChild>
                    <Button
                      theme="accent"
                      aria-label="Close"
                      onPress={() => {
                        setToken(token + tokenInput);
                        setPrice(price + priceInput);
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
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <H5>Tab 2</H5>
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
