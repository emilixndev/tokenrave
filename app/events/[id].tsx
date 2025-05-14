import { useLocalSearchParams } from 'expo-router';
import { Separator, SizableText, Tabs, View } from 'tamagui';
import TokenList from '@/app/events/TokenList';
import HistoryList from '@/app/events/HistoryList';
import useTokenManagement from '@/hooks/useTokenManagement';

export default function Index() {
  const { id, limit } = useLocalSearchParams();
  const {
    event,
    history,
    setTokenExpenseInput,
    setTokenInput,
    setPriceInput,
    saveExpense,
    tokenExpenseInput,
    tokenInput,
    priceInput,
    addToken,
  } = useTokenManagement(Number(id));
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
          <TokenList
            event={event}
            setTokenExpenseInput={setTokenExpenseInput}
            tokenExpenseInput={tokenExpenseInput}
            saveExpense={saveExpense}
            setTokenInput={setTokenInput}
            setPriceInput={setPriceInput}
            addToken={addToken}
          ></TokenList>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <HistoryList history={history}></HistoryList>
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
