import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { createTamagui, TamaguiProvider, View } from 'tamagui';
import { defaultConfig } from '@tamagui/config/v4';

export default function RootLayout() {
  const createDB = async (db: SQLiteDatabase) => {
    // TODO REMOVE
    await db.execAsync(`


        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS events
        (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            token_count INTEGER NOT NULL,
            token_price FLOAT   NOT NULL,
            total_price FLOAT   NOT NULL
        );

        CREATE TABLE IF NOT EXISTS history
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME NOT NULL,
            amount BIGINT NOT NULL,
            purchasable_items_reference INTEGER,
            events_reference INTEGER,
            FOREIGN KEY (purchasable_items_reference) REFERENCES purchasable_items(id),
            FOREIGN KEY (events_reference) REFERENCES events(id)

            );

    `);
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
