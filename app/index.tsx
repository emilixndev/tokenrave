import {Link, router} from "expo-router";
import {Button, Pressable, Text, View, StyleSheet} from "react-native";
import {navigate} from "expo-router/build/global-state/routing";

export default function Index() {
    return (
        <View>
        <View>
            <Link style={styles.card}
                  href={{
                      pathname: '/events/[id]',
                      params: {id: '1'}
                  }}>
                test
            </Link>
        </View>
            <View>
                <Link style={styles.card}
                      href={{
                          pathname: '/events/[id]',
                          params: {id: '1'}
                      }}>
                    test
                </Link>
            </View>
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