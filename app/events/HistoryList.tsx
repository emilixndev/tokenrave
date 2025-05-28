import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { HistoryType } from '@/db/types/historyType';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {history && history.length > 0 ? (
        <>
          <View style={styles.statsHeader}>
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>42</Text>
              <Text style={styles.statsLabel}>Total Tokens</Text>
            </View>
            <View style={styles.statsDivider} />
            <View style={styles.statsCard}>
              <Text style={styles.statsValue}>84.00€</Text>
              <Text style={styles.statsLabel}>Total Spent</Text>
            </View>
          </View>
          {history.map((value: HistoryType, index) => (
            <View key={value.id}>
              {((index === 0) || isNotTheSameDay(new Date(value.created_at), new Date(history[index - 1].created_at))) && (
                <View style={styles.dateHeaderContainer}>
                  <Text style={styles.dateHeader}>
                    {new Date(value.created_at).toLocaleDateString('en-EN', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              )}
              <View style={styles.cardContainer}>
                <View style={styles.card}>
                  <View style={styles.cardContent}>
                    <View style={styles.timeContainer}>
                      <Ionicons name="time-outline" size={18} color="#666" style={{ marginRight: 4 }} />
                      <Text style={styles.timeText}>
                        {new Date(value.created_at).toLocaleTimeString('en-EN', { hour: '2-digit', minute: '2-digit' })}
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
            </View>
          ))}
        </>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="document-text-outline" size={48} color="#b0b8c1" />
          <Text style={styles.noHistoryText}>No history yet</Text>
          <Text style={styles.emptyStateSubtext}>Your token usage will appear here</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flex: 1,
    backgroundColor: '#fff',
  },
  dateHeaderContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 8,
  },
  dateHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 18,
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 15,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenAmount: {
    marginRight: 10,
    fontSize: 16,
    color: '#0d6efd',
    fontWeight: '600',
  },
  tokenImage: {
    width: 22,
    height: 22,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  noHistoryText: {
    textAlign: 'center',
    marginTop: 18,
    fontSize: 18,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: 32,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  statsValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  statsDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 8,
  },
});
