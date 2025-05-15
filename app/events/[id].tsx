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
    setTokenInput,
    setPriceInput,
    saveExpense,
    addToken,
  } = useTokenManagement(Number(id));
  return (
    <View flex={1}>
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

        <Tabs.Content value="tab1" flex={1}>
          <TokenList
            event={event}
            saveExpense={saveExpense}
            setTokenInput={setTokenInput}
            setPriceInput={setPriceInput}
            addToken={addToken}
            setTokenExpenseInput={saveExpense}
            tokenExpenseInput={0}
          ></TokenList>
        </Tabs.Content>
        <Tabs.Content value="tab2" flex={1}>
          <HistoryList history={history}></HistoryList>
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
