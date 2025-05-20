import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Button, Card, H4, H5, H6, ScrollView, Separator, XStack, YStack } from 'tamagui';
import AddEventButton from '@/components/home/AddEventButton';
import { getAllEvents } from '@/db/repositories/eventRepository';
import { EventType } from '@/db/types/eventType';
import { ChevronRight, Trash2 } from '@tamagui/lucide-icons';

export default function Index() {
  const database = useSQLiteContext();

  const [events, setEvents] = useState<EventType[] | []>([]);

  async function fetchEvents() {
    const eventsTest = await getAllEvents(database);
    setEvents(eventsTest);
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <View>
        <H4 padding={15}>TokenRave</H4>

        <ScrollView height={'90%'}>
          {events.length > 0 ? (
            events.map((value: EventType) => (
              <View key={value.id}>
                <Link
                  style={styles.card}
                  href={{
                    pathname: '/events/[id]',
                    params: { id: value.id },
                  }}
                >
                  <Card elevate size="$1" style={styles.card} borderRadius="$6">
                    <XStack justifyContent="space-between" alignItems="center">
                      <YStack>
                        <H5>{value.name}</H5>
                        <Text style={{ fontSize: 15 }}>{value.token_count} tokens remaining</Text>
                      </YStack>
                      <YStack>
                        <ChevronRight size={20} />
                      </YStack>
                    </XStack>
                  </Card>
                </Link>
              </View>
            ))
          ) : (
            <Text style={styles.centerTxt}>No events created</Text>
          )}
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
      <AddEventButton onEventAdded={fetchEvents} />
    </>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 15,
    width: '100%',
  },
  addBtn: {
    marginTop: 50,
  },
  centerTxt: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});
