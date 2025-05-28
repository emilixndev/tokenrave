import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TokenList from '@/app/events/TokenList';
import HistoryList from '@/app/events/HistoryList';
import useTokenManagement from '@/hooks/useTokenManagement';
import { useState } from 'react';

export default function Index() {
  const { id } = useLocalSearchParams();
  const { event, history, setTokenInput, setPriceInput, saveExpense, addToken } = useTokenManagement(Number(id));
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <View style={styles.container}>
      {event && (
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            {/*<ArrowLeft size={24} color="#000" />*/}
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {event.name.substring(0,26) + (event.name.length > 26 ? '...' : '')}
          </Text>
          <TouchableOpacity style={styles.headerButton}>
            {/*<Settings size={24} color="#000" />*/}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          <View style={styles.tabsList}>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'tab1' && styles.activeTab
              ]}
              onPress={() => setActiveTab('tab1')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'tab1' && styles.activeTabText
              ]}>Tokens</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'tab2' && styles.activeTab
              ]}
              onPress={() => setActiveTab('tab2')}
            >
              <Text style={[
                styles.tabText,
                activeTab === 'tab2' && styles.activeTabText
              ]}>History</Text>
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
              />
            )}
            {activeTab === 'tab2' && (
              <HistoryList history={history} />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  tabsContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabsList: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#0d6efd',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#0d6efd',
    fontWeight: '600',
  },
  tabContent: {
    flex: 1,
  },
});
