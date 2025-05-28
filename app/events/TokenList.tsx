import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AddTokenModal from '../../components/modals/AddTokenModal';
import { EventType } from '@/db/types/eventType';
import useTokenSelection from '@/hooks/useTokenSelection';
import TokensGrid from '@/components/EventTokens/TokensGrid';
import { TokenSelectedType } from '@/Types/TokenSelectedType';
import { Ionicons } from '@expo/vector-icons';

interface TokenListProps {
  event: EventType | null;
  saveExpense: (tokenExpenseCount: number) => void;
  setTokenInput: (token: number) => void;
  setPriceInput: (price: number) => void;
  addToken: () => void;
  priceInput: number;
}

export default function TokenList({
  event,
  saveExpense,
  setTokenInput,
  setPriceInput,
  addToken,
  priceInput,
}: TokenListProps) {
  const { addTokenToCounter, removeTokenToCounter, tokenCounter, resetTokenCounter, isPreviousToken } =
    useTokenSelection();
  const [resetSelection, setResetSelection] = useState(false);
  const [reloadTokens, setReloadTokens] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenSelectedType | null>(null);

  function saveNewExpense() {
    saveExpense(tokenCounter);
    resetTokenCounter();
    setResetSelection(!resetSelection);
  }

  function reloadTokensTest(TokenSelected: TokenSelectedType) {
    setSelectedToken(TokenSelected);
    setReloadTokens(!reloadTokens);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {event ? (
          event.token_count > 0 ? (
            <>
              <View style={styles.statsHeader}>
                <View style={styles.statsCard}>
                  <Text style={styles.statsValue}>{Math.round(event.total_price * 100) / 100}€</Text>
                  <Text style={styles.statsLabel}>Total</Text>
                </View>
                <View style={styles.statsDivider} />
                <View style={styles.statsCard}>
                  <Text style={styles.statsValue}>{event.token_count}</Text>
                  <Text style={styles.statsLabel}>Tokens</Text>
                </View>
                <View style={styles.statsDivider} />
                <View style={styles.statsCard}>
                  <Text style={styles.statsValue}>{Math.round(event.token_price * 100) / 100}€</Text>
                  <Text style={styles.statsLabel}>Price/Token</Text>
                </View>
              </View>
              <TokensGrid
                numberOfTokens={event.token_count}
                addTokenToCounter={addTokenToCounter}
                removeTokenToCounter={removeTokenToCounter}
                resetSelection={resetSelection}
                setReloadTokens={reloadTokensTest}
                reloadTokens={reloadTokens}
                selectedToken={selectedToken}
                isPreviousToken={isPreviousToken}
              />
            </>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="ticket-outline" size={48} color="#b0b8c1" />
              <Text style={styles.noTokensText}>No tokens yet</Text>
              <Text style={styles.emptyStateSubtext}>Add tokens to begin your journey</Text>
            </View>
          )
        ) : null}
      </ScrollView>

      <View style={styles.bottomContainer}>
        {tokenCounter > 0 && event && (
          <View style={styles.tokenCounterContainer}>
            <View style={styles.tokenCounterContent}>
              <View style={styles.tokenCounterLeft}>
                <Text style={styles.tokenCounterLabel}>Selected</Text>
                <Text style={styles.tokenCounterValue}>{tokenCounter} Token</Text>
              </View>
              <View style={styles.tokenCounterDivider} />
              <View style={styles.tokenCounterRight}>
                <Text style={styles.tokenCounterLabel}>Total</Text>
                <Text style={styles.tokenCounterValue}>
                  {Math.round(event.token_price * tokenCounter * 100) / 100}€
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <AddTokenModal
            addToken={addToken}
            setTokenInput={setTokenInput}
            setPriceInput={setPriceInput}
            event={event}
            priceInput={priceInput}
          />
          {event && (
            <TouchableOpacity
              style={[styles.addExpenseButton, tokenCounter === 0 && styles.disabledButton]}
              onPress={tokenCounter !== 0 ? saveNewExpense : undefined}
              disabled={tokenCounter === 0}
            >
              <Text style={styles.buttonText}>Add expense</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 56,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 8,
  },
  headerItem: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  tokenCounterContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  tokenCounterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenCounterLeft: {
    flex: 1,
    alignItems: 'center',
  },
  tokenCounterRight: {
    flex: 1,
    alignItems: 'center',
  },
  tokenCounterLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  tokenCounterValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0d6efd',
  },
  tokenCounterDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    gap: 12,
  },
  addExpenseButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d6efd',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  noTokensText: {
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
});
