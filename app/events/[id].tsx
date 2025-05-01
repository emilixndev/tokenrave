import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Button, H5, Separator, SizableText, Tabs } from 'tamagui';

export default function Index() {
  const { id, limit } = useLocalSearchParams();
  const database = useSQLiteContext();

  const [event, setEvent] = useState<any>([]);
  useEffect(() => {
    getEvent()
  }, []);

  function getEvent() {
    const eventSelected = database.getFirstSync(`SELECT * FROM events WHERE id = ${id}`);
    setEvent(eventSelected)
    console.log(eventSelected);
  }


  return (
    <View>
      <Tabs defaultValue="tab1" width="100%"
            orientation="horizontal"
            flexDirection="column"
            height={150}
            borderRadius="$4"
            borderWidth="$0.25"
            overflow="hidden"
            borderColor="$borderColor">
        <Tabs.List    separator={<Separator vertical />}
                      disablePassBorderRadius="bottom"
                      aria-label="Manage your account">
          <Tabs.Tab focusStyle={{
            backgroundColor: '$color3',
          }}
                    flex={1}
                    value="tab1">
            <SizableText>Tab 1</SizableText>
          </Tabs.Tab>
          <Tabs.Tab   focusStyle={{
            backgroundColor: '$color3',
          }}
                      flex={1}
                      value="tab2">
            <SizableText>Tab 2</SizableText>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Content value="tab1">
          <Text>xx€</Text>
          <Text>xx Tokens</Text>
          <Text>Event {event.name}</Text>
          <Button>Add Tokens</Button>

          <Button>Add expense</Button>
          <Text>Token</Text>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <H5>Tab 2</H5>
        </Tabs.Content>
      </Tabs>



    </View>
  );
}
