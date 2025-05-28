import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
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
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>TokenRave</Text>

        <ScrollView style={styles.scrollView}>
          {events.length > 0 ? (
            events.map((value: EventType) => (
              <View key={value.id}>
                <Link
                  href={{
                    pathname: '/events/[id]',
                    params: { id: value.id },
                  }}
                  asChild
                >
                  <Pressable>
                    <View style={styles.card}>
                      <View style={styles.cardContent}>
                        <View>
                          <Text style={styles.eventName}>
                            {value.name.substring(0,26) + (value.name.length > 26 ? '...' : '')}
                          </Text>
                          <Text style={styles.tokenCount}>
                            {value.token_count} tokens remaining
                          </Text>
                        </View>
                        <View>
                          {/*<ChevronRight size={20} color="#000" />*/}
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </Link>
              </View>
            ))
          ) : (
            <Text style={styles.noEventsText}>No events created</Text>
          )}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </View>
      <AddEventButton onEventAdded={fetchEvents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
  },
  scrollView: {
    height: '90%',
  },
  card: {
    padding: 15,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  tokenCount: {
    fontSize: 15,
    color: '#666',
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16,
    color: '#666',
  },
  bottomSpacing: {
    height: 100,
  },
});
