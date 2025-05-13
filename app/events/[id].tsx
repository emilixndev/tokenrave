import { useLocalSearchParams } from 'expo-router';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Separator,
  SizableText,
  Tabs,
  Text,
  Unspaced,
  View,
  XStack,
} from 'tamagui';
import { X } from '@tamagui/lucide-icons';
import ButtonWithBadge from '@/app/components/common/ButtonWithBadge';
import { addExpenseToHistory, getHistoryById } from '@/db/repositories/historyRepository';
import {
  getEventById,
  updateTokenAmountAndTotalPrice,
  updateTokenAmountAndTotalPriceWithExpense,
  updateTokenPrice,
} from '@/db/repositories/eventRepository';
import { EventType } from '@/db/types/eventType';
import { HistoryType } from '@/db/types/historyType';

export default function Index() {
  const { id, limit } = useLocalSearchParams();
  const database = useSQLiteContext();
  const [tokenInput, setTokenInput] = useState<number>(0);
  const [tokenExpenseInput, setTokenExpenseInput] = useState<number>(0);
  const [priceInput, setPriceInput] = useState<number>(0);

  const [event, setEvent] = useState<EventType | null>(null);
  const [history, setHistory] = useState<HistoryType[]>([]);
  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  async function getHistory() {
    const historySelected = await getHistoryById(database, Number(id));
    setHistory(historySelected);
    console.log(historySelected);
  }

  async function getEvent() {
    const eventSelected = await getEventById(database, Number(id));
    console.log(eventSelected);
    setEvent(eventSelected);
  }

  async function addToken() {
    await updateTokenAmountAndTotalPrice(database, tokenInput, priceInput, Number(id));
    await updateTokenPrice(database, Number(id));
    setTokenInput(0);
    setPriceInput(0);
    await getEvent();
  }

  function saveExpense() {
    if (event) {
      addExpenseToHistory(database, Date.now(), tokenExpenseInput, Number(id));

      updateTokenAmountAndTotalPriceWithExpense(
        database,
        event.token_count - tokenExpenseInput,
        tokenExpenseInput * event.token_price,
        Number(id)
      );
      setTokenExpenseInput(0);
      getHistory();
      getEvent();
    }
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
          {event && (
            <>
              <Text>Event name : {event.name}</Text>
              <Text>{event.total_price} €</Text>
              <Text>{event.token_count} Tokens</Text>
              <Text>1 Token = {Math.round(event.token_price * 100) / 100}€ </Text>
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
          )}
        </Tabs.Content>
        <Tabs.Content value="tab2">
          {history && history.length > 0 ? (
            history.map((value: any) => (
              <View key={value.id}>
                <Text>{value.amount} Token </Text>
                <Text>{new Date(value.created_at).toLocaleDateString('fr-FR')}</Text>
                <Separator></Separator>
              </View>
            ))
          ) : (
            <Text>No history</Text>
          )}
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
