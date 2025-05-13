import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { createTamagui, TamaguiProvider, View } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';
import { initSchema } from '@/db/shema';

export default function RootLayout() {
  const createDB = async (db: SQLiteDatabase) => {
    await initSchema(db);
  };

  const config = createTamagui(defaultConfig);
  return (
    <TamaguiProvider config={config}>
      <SQLiteProvider databaseName="tokenrave.db" onInit={createDB}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </SQLiteProvider>
    </TamaguiProvider>
  );
}
