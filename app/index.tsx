import {Link, router} from "expo-router";
import {Button, Pressable, Text, View, StyleSheet} from "react-native";
import {navigate} from "expo-router/build/global-state/routing";
import {SQLiteDatabase, useSQLiteContext} from "expo-sqlite";
import {useEffect, useState} from "react";

export default function Index() {

    const database = useSQLiteContext()

    const [events, setEvents] = useState<any>([])

    useEffect(() => {
        database.runSync(`INSERT INTO events (name)
                          VALUES ('test')`)
        database.runSync(`INSERT INTO events (name)
                          VALUES ('test')`)
        let eventsTest = database.getAllSync(`SELECT *
                                              FROM events`)
        console.log(eventsTest)
        setEvents(eventsTest)
        console.log(events)
    }, []);
    return (
        <View>

            {events ? events.map((value: any) => (
                    <View key={value.id}>
                        <Link style={styles.card}
                              href={{
                                  pathname: '/events/[id]',
                                  params: {id: value.id}
                              }}>
                            <Text>{value.name}</Text>
                        </Link>
                    </View>

                ))
                : <Text>RIEN</Text>};


        </View>
    );
}
const styles = StyleSheet.create({
    card: {
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        textAlign: "center",
        padding: 15,
        margin: 15,
        borderRadius: 10

    },

});