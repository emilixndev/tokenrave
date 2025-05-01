import { Link, router } from 'expo-router';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import { navigate } from 'expo-router/build/global-state/routing';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { CardProps, ScrollView } from 'tamagui';
import { Button, Card, H2, Image, Paragraph, XStack } from 'tamagui';

export default function Index() {
  const database = useSQLiteContext();

  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    database.runSync(`INSERT INTO events (name)
                      VALUES ('test')`);
    database.runSync(`INSERT INTO events (name)
                      VALUES ('test')`);
    let eventsTest = database.getAllSync(`SELECT *
                                          FROM events`);
    console.log(eventsTest);
    setEvents(eventsTest);
    console.log(events);
  }, []);
  return (
    <View>
      <ScrollView>
      {events.length > 0 ? (
        events.map((value: any) => (
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
        <Button style={styles.addBtn}>Add event</Button>
      )}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    textAlign: 'center',
    padding: 15,
    width:'100%'
  },
  addBtn: {
    marginTop: 100,
  },
});
