import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import AddEventButton from '@/components/home/AddEventButton';
import { getAllEvents } from '@/db/repositories/eventRepository';
import { EventType } from '@/db/types/eventType';
import { Ionicons } from '@expo/vector-icons';

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
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.title}>TokenRave</Text>
        <Text style={styles.subtitle}>Manage your event tokens</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {events.length > 0 ? (
          events.map((value: EventType, index) => (
            <View key={value.id} style={[
              styles.cardWrapper,
              index % 2 === 0 ? styles.cardWrapperEven : styles.cardWrapperOdd
            ]}>
              <Link
                href={{
                  pathname: '/events/[id]',
                  params: { id: value.id },
                }}
                asChild
              >
                <Pressable style={({ pressed }) => [
                  styles.card,
                  pressed && styles.cardPressed
                ]}>
                  <View style={styles.cardContent}>
                    <View style={styles.cardLeft}>
                      <Text style={styles.eventName}>
                        {value.name.substring(0,26) + (value.name.length > 26 ? '...' : '')}
                      </Text>
                      <View style={styles.tokenInfo}>
                        <Ionicons name="ticket-outline" size={16} color="#666" />
                        <Text style={styles.tokenCount}>
                          {value.token_count} tokens remaining
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={24} color="#666" />
                  </View>
                </Pressable>
              </Link>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color="#666" />
            <Text style={styles.noEventsText}>No events created yet</Text>
            <Text style={styles.emptyStateSubtext}>Tap the button below to create your first event</Text>
          </View>
        )}
        <View style={styles.bottomSpacing} />
      </ScrollView>
      <AddEventButton onEventAdded={fetchEvents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  cardWrapper: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardWrapperEven: {
    backgroundColor: '#fff',
  },
  cardWrapperOdd: {
    backgroundColor: '#f0f4fa',
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cardLeft: {
    flex: 1,
    marginRight: 12,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tokenCount: {
    fontSize: 14,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noEventsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
  bottomSpacing: {
    height: 100,
  },
});
