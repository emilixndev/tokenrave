import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Airplay } from '@tamagui/lucide-icons';
import { useState } from 'react';

export default function ButtonWithBadge() {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setCounter(counter + 1)}
      >
        <Airplay size={24} color="#000" />
      </TouchableOpacity>
      {counter > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {counter > 99 ? '99+' : counter}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  badge: {
    position: 'absolute',
    top: -5,
    left: -5,
    backgroundColor: 'cyan',
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
