import { Card, H5, H6, Image, Separator, Text, View, XStack, YStack } from 'tamagui';
import { HistoryType } from '@/db/types/historyType';
import { ChevronRight } from '@tamagui/lucide-icons';
import { StyleSheet } from 'react-native';
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
    <View marginTop={10}>
      {history && history.length > 0 ? (
        history.map((value: HistoryType, index) => (
          <View key={value.id}>
            <View>
              {index === 0 && (
                <>
                  <H6 padding={15}>{new Date(value.created_at).toLocaleDateString('en-EN', {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}</H6>
                </>
              )}
              {index > 0 && isNotTheSameDay(new Date(value.created_at), new Date(history[index - 1].created_at)) && (
                <>
                  <H6 padding={15}>
                    {new Date(value.created_at).toLocaleDateString('en-EN', {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </H6>
                </>
              )}
            </View>
            <View justifyContent="center" alignItems="center">
              <Card elevate size="$1" style={styles.card} borderRadius="$6" marginBottom={15}>
                <XStack justifyContent="space-between" alignItems="center">
                  <YStack>
                    <Text>{new Date(value.created_at).toLocaleTimeString('en-EN')}</Text>
                  </YStack>
                  <YStack>
                    <XStack>
                      <Text marginRight={10}>- {value.amount}</Text>
                      <Image
                        source={{
                          uri: require('@/assets/images/tokens/full_blue.png'),
                          width: 20,
                          height: 20,
                        }}
                      ></Image>
                    </XStack>
                  </YStack>
                </XStack>
              </Card>
            </View>
            <Separator></Separator>
          </View>
        ))
      ) : (
        <Text>No history</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    padding: 15,
    width: '95%',
  },
  addBtn: {
    marginTop: 50,
  },
  centerTxt: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
});
