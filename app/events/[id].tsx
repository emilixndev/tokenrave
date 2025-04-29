import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function Index() {
    const { id, limit } = useLocalSearchParams();
    return (
        <View>
            <Text>Event {id}</Text>
            <Text>Token</Text>
        </View>
    );
}
