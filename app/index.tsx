import {Link, router} from "expo-router";
import {Pressable, Text, View} from "react-native";

export default function Index() {
  return (
      <View>


          <Link
              href={{
                  pathname: '/events/[id]',
                  params: { id: '1' }
              }}>
              Event 1
          </Link>

      </View>
  );
}
