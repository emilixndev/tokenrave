import React, { useState } from 'react';
import { Button, ScrollView, Text, View } from 'tamagui';
import AddTokenModal from '../../components/modals/AddTokenModal';
import AddExpenseModal from '../../components/modals/AddExpenseModal';
import { EventType } from '@/db/types/eventType';
import { StyleSheet } from 'react-native';

interface TokenListProps {
  event: EventType | null;
  setTokenExpenseInput: (token: number) => void;
  tokenExpenseInput: number;
  saveExpense: () => void;
  setTokenInput: (token: number) => void;
  setPriceInput: (price: number) => void;
  addToken: () => void;
}

export default function TokenList({
  event,
  setTokenExpenseInput,
  tokenExpenseInput,
  saveExpense,
  setTokenInput,
  setPriceInput,
  addToken,
}: TokenListProps) {
  return (
    <View flex={1}>
      {/* Content area now scrollable */}
      <ScrollView flex={1} contentContainerStyle={{ paddingBottom: '$14' }}>
        {event && (
          <>
            <Text textAlign={'center'} fontWeight={'bold'} fontSize={30} marginBottom="$2">
              {event.name}
            </Text>
            <View flexDirection="row" width="100%" paddingHorizontal="$2">
              <View flex={1}>
                <Text textAlign="left">{event.total_price} €</Text>
              </View>
              <View flex={1}>
                <Text textAlign="center">
                  {event.token_count} T

                </Text>
              </View>
              <View flex={1}>
                <Text textAlign="right">1T/{Math.round(event.token_price * 100) / 100}€ </Text>
              </View>
            </View>

            {/* New Button Grid */}
            <View marginTop="$4" paddingHorizontal="$2" alignItems="center">
              {Array.from({ length: 18 }, (_, i) => i).map((rowIndex) => (
                <View
                  key={`row-${rowIndex}`}
                  flexDirection="row"
                  justifyContent="center"
                  width="100%"
                  marginBottom="$1.5"
                >
                  {[0, 1, 2, 3, 4].map((buttonIndex) => (
                    <Button
                      paddingVertical="$2.5"
                      paddingHorizontal="$3.5"
                      borderWidth={1}
                      key={`button-${rowIndex}-${buttonIndex}`}
                      borderRadius="$4"
                      alignItems="center"
                      justifyContent="center"
                      backgroundColor="$color5"
                      marginHorizontal="$1"
                      fontSize="$6"
                    >
                      $
                    </Button>

                  ))}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <View position="absolute" bottom="$0" left="$0" right="$0" width="100%">
        <View
          paddingVertical="$2"
          paddingHorizontal="$3"
          backgroundColor="$color6"
          alignItems="center"
          justifyContent="center"
          borderTopWidth={1}
          borderColor="$borderColor"
        >
          <Text fontSize="$5">3 Token / 10€</Text>
        </View>

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
          {event && (
            <AddExpenseModal
              event={event}
              saveExpense={saveExpense}
              setTokenExpenseInput={setTokenExpenseInput}
              tokenExpenseInput={tokenExpenseInput}
            ></AddExpenseModal>
          )}
        </View>
      </View>
    </View>
  );
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnNormal: {
    borderColor: 'red',
  },
  btnPress: {
    borderColor: 'blue',
  },
});
