import React, { useState } from 'react';
import { Button, ScrollView, Text, View } from 'tamagui';
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
    <View flex={1}>
      <ScrollView flex={1} contentContainerStyle={{ paddingBottom: '$14' }}>
        {event && (
          <>
            <Text textAlign={'center'} fontWeight={'bold'} fontSize={30} marginBottom="$2">
              {event.name}
            </Text>
            <View flexDirection="row" width="100%" paddingHorizontal="$2">
              <View flex={1}>
                <Text textAlign="left">{Math.round(event.total_price * 100) / 100} €</Text>
              </View>
              <View flex={1}>
                <Text textAlign="center">{event.token_count} T</Text>
              </View>
              <View flex={1}>
                <Text textAlign="right">1T/{Math.round(event.token_price * 100) / 100}€ </Text>
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
            ></TokensGrid>
          </>
        )}
      </ScrollView>

      <View position="absolute" bottom="$0" left="$0" right="$0" width="100%">
        {tokenCounter > 0 && event && (
          <View
            paddingVertical="$2"
            paddingHorizontal="$3"
            backgroundColor="$color6"
            alignItems="center"
            justifyContent="center"
            borderTopWidth={1}
            borderColor="$borderColor"
          >
            <Text fontSize="$5">
              {tokenCounter} Token / {Math.round(event.token_price * tokenCounter * 100) / 100}€
            </Text>
          </View>
        )}

        <View
          flexDirection="row"
          justifyContent="space-around"
          padding="$3"
          backgroundColor="$background"
          borderTopWidth={1}
          borderColor="$borderColor"
        >
          <AddTokenModal
            addToken={addToken}
            setTokenInput={setTokenInput}
            setPriceInput={setPriceInput}
          ></AddTokenModal>
          {event &&
            (tokenCounter !== 0 ? (
              <Button
                onPress={() => {
                  saveNewExpense();
                }}
              >
                Add expense
              </Button>
            ) : (
              <Button disabled opacity={0.5}>
                Add expense
              </Button>
            ))}
        </View>
      </View>
    </View>
  );
}
