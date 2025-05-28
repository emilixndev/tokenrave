import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import TokenList from '@/app/events/TokenList';
import HistoryList from '@/app/events/HistoryList';
import useTokenManagement from '@/hooks/useTokenManagement';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  const { id } = useLocalSearchParams();
  const { event, history, setTokenInput, setPriceInput, saveExpense, addToken, priceInput } = useTokenManagement(
    Number(id)
  );
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <View style={styles.container}>
      {event && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={28} color="#0d6efd" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {event.name.substring(0, 26) + (event.name.length > 26 ? '...' : '')}
          </Text>
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Ionicons name="settings-outline" size={24} color="#0d6efd" />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <View style={styles.tabsList}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'tab1' && styles.activeTab]}
              onPress={() => setActiveTab('tab1')}
              activeOpacity={0.7}
            >
              <Ionicons
                name="ticket-outline"
                size={20}
                color={activeTab === 'tab1' ? '#0d6efd' : '#666'}
                style={styles.tabIcon}
              />
              <Text style={[styles.tabText, activeTab === 'tab1' && styles.activeTabText]}>Tokens</Text>
              {activeTab === 'tab1' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'tab2' && styles.activeTab]}
              onPress={() => setActiveTab('tab2')}
              activeOpacity={0.7}
            >
              <Ionicons
                name="time-outline"
                size={20}
                color={activeTab === 'tab2' ? '#0d6efd' : '#666'}
                style={styles.tabIcon}
              />
              <Text style={[styles.tabText, activeTab === 'tab2' && styles.activeTabText]}>History</Text>
              {activeTab === 'tab2' && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          </View>

          <View style={styles.tabContent}>
            {activeTab === 'tab1' && (
              <TokenList
                event={event}
                saveExpense={saveExpense}
                setTokenInput={setTokenInput}
                setPriceInput={setPriceInput}
                addToken={addToken}
                priceInput={priceInput}
              />
            )}
            {activeTab === 'tab2' && <HistoryList history={history} event={event} />}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 32,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4fa',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 20,
    color: '#1a1a1a',
    marginHorizontal: 8,
  },
  content: {
    flex: 1,
    padding: 0,
  },
  tabsContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#0d6efd',
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#0d6efd',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  tabContent: {
    flex: 1,
    padding: 0,
  },
});
