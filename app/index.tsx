import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Card, H2, ScrollView } from 'tamagui';
import AddEventButton from '@/components/home/AddEventButton';
import { getAllEvents } from '@/db/repositories/eventRepository';
import { EventType } from '@/db/types/eventType';

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
    <View>
      <ScrollView>
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
                <Card elevate size="$1" style={styles.card}>
                  <Card.Header padded>
                    <H2 textAlign="center">{value.name} </H2>
                  </Card.Header>
                </Card>
              </Link>
            </View>
          ))
        ) : (
          <Text style={styles.centerTxt}>No events created</Text>
        )}
        <AddEventButton onEventAdded={fetchEvents} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    textAlign: 'center',
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
