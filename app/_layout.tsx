import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { createTamagui,TamaguiProvider, View } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'

export default function RootLayout() {
  const createDB = async (db: SQLiteDatabase) => {
    // TODO REMOVE
    await db.execAsync(`DROP TABLE events`);
    await db.execAsync(`CREATE TABLE IF NOT EXISTS events
                        (
                            id
                            INTEGER
                            PRIMARY
                            KEY
                            AUTOINCREMENT,
                            name
                            TEXT
                            NOT
                            NULL,
                            token_count INTEGER NOT NULL,
                            token_price FLOAT NOT NULL,
                            total_price FLOAT NOT NULL
                        );`);
  };

  const config = createTamagui(defaultConfig)
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
