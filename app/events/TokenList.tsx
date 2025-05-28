import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import AddTokenModal from '../../components/modals/AddTokenModal';
import { EventType } from '@/db/types/eventType';
import useTokenSelection from '@/hooks/useTokenSelection';
import TokensGrid from '@/components/EventTokens/TokensGrid';
import { TokenSelectedType } from '@/Types/TokenSelectedType';

interface TokenListProps {
  event: EventType | null;
  saveExpense: (tokenExpenseCount: number) => void;
  setTokenInput: (token: number) => void;
  setPriceInput: (price: number) => void;
  addToken: () => void;
}

export default function TokenList({ event, saveExpense, setTokenInput, setPriceInput, addToken }: TokenListProps) {
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
        {event && (
          <>
            <View style={styles.headerContainer}>
              <View style={styles.headerItem}>
                <Text style={styles.headerText}>
                  {Math.round(event.total_price * 100) / 100} €
                </Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.headerText}>
                  {event.token_count} T
                </Text>
              </View>
              <View style={styles.headerItem}>
                <Text style={styles.headerText}>
                  1T/{Math.round(event.token_price * 100) / 100}€{' '}
                </Text>
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
        )}
      </ScrollView>

      <View style={styles.bottomContainer}>
        {tokenCounter > 0 && event && (
          <View style={styles.tokenCounterContainer}>
            <Text style={styles.tokenCounterText}>
              {tokenCounter} Token / {Math.round(event.token_price * tokenCounter * 100) / 100}€
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <AddTokenModal
            addToken={addToken}
            setTokenInput={setTokenInput}
            setPriceInput={setPriceInput}
          />
          {event && (
            <TouchableOpacity
              style={[
                styles.addExpenseButton,
                tokenCounter === 0 && styles.disabledButton
              ]}
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  tokenCounterText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  addExpenseButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
