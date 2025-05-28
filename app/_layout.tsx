import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { initSchema } from '@/db/shema';
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  const createDB = async (db: SQLiteDatabase) => {
    await initSchema(db);
  };

  return (
    <SQLiteProvider databaseName="tokenrave.db" onInit={createDB}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SQLiteProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
