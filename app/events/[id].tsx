import { useLocalSearchParams, router } from 'expo-router';
import { Separator, SizableText, Tabs, View, Text, Button } from 'tamagui';
import TokenList from '@/app/events/TokenList';
import HistoryList from '@/app/events/HistoryList';
import useTokenManagement from '@/hooks/useTokenManagement';
import { ArrowLeft, ChevronLeft } from '@tamagui/lucide-icons';

export default function Index() {
  const { id } = useLocalSearchParams();
  const { event, history, setTokenInput, setPriceInput, saveExpense, addToken } = useTokenManagement(Number(id));
  return (
    <View flex={1}>
      {event && (
        <View padding="$4" flexDirection="row" alignItems="center">
          <Button
            icon={ArrowLeft}
            onPress={() => router.back()}
            chromeless
            circular
            position="absolute"
            zIndex={1}
            size={40}
          />
          <Text textAlign={'center'} fontWeight={'bold'} fontSize={30} width="100%">
            {event.name}
          </Text>
        </View>
      )}



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
          <Tabs.List separator={<Separator vertical />} disablePassBorderRadius="bottom"
                     aria-label="Manage your account">
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
            ></TokenList>
          </Tabs.Content>
          <Tabs.Content value="tab2" flex={1}>
            <HistoryList history={history}></HistoryList>
          </Tabs.Content>
        </Tabs>
      </View>
    </View>
  );
}
