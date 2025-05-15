import { Separator, Text, View } from 'tamagui';
import { useState } from 'react';
import { HistoryType } from '@/db/types/historyType';

interface HistoryListProps {
  history: HistoryType[];
}

export default function HistoryList({ history }: HistoryListProps) {
  return (
    <>
      {history && history.length > 0 ? (
        history.map((value: any) => (
          <View key={value.id}>
            <Text>{value.amount} Token </Text>
            <Text>{new Date(value.created_at).toLocaleDateString('fr-FR')}</Text>
            <Separator></Separator>
          </View>
        ))
      ) : (
        <Text>No history</Text>
      )}
    </>
  );
}
