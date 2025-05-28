import { Image, StyleSheet, Text, View } from 'react-native';
import { HistoryType } from '@/db/types/historyType';
import { ChevronRight } from '@tamagui/lucide-icons';
import React from 'react';

interface HistoryListProps {
  history: HistoryType[];
}

export default function HistoryList({ history }: HistoryListProps) {
  function isNotTheSameDay(date1: Date, date2: Date) {
    return (
      date1.getDate() !== date2.getDate() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getFullYear() !== date2.getFullYear()
    );
  }

  return (
    <View style={styles.container}>
      {history && history.length > 0 ? (
        history.map((value: HistoryType, index) => (
          <View key={value.id}>
            <View>
              {index === 0 && (
                <Text style={styles.dateHeader}>
                  {new Date(value.created_at).toLocaleDateString('en-EN', {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              )}
              {index > 0 && isNotTheSameDay(new Date(value.created_at), new Date(history[index - 1].created_at)) && (
                <Text style={styles.dateHeader}>
                  {new Date(value.created_at).toLocaleDateString('en-EN', {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </Text>
              )}
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  <View>
                    <Text style={styles.timeText}>
                      {new Date(value.created_at).toLocaleTimeString('en-EN')}
                    </Text>
                  </View>
                  <View>
                    <View style={styles.tokenContainer}>
                      <Text style={styles.tokenAmount}>- {value.amount}</Text>
                      <Image
                        source={require('@/assets/images/tokens/full_blue.png')}
                        style={styles.tokenImage}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        ))
      ) : (
        <Text style={styles.noHistoryText}>No history</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: '600',
    padding: 15,
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 15,
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
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
  timeText: {
    fontSize: 14,
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenAmount: {
    marginRight: 10,
    fontSize: 14,
  },
  tokenImage: {
    width: 20,
    height: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  noHistoryText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});
