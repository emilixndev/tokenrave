import { SQLiteDatabase } from 'expo-sqlite';

export const initSchema = async (db: SQLiteDatabase) => {
  await db.execAsync(`

        CREATE TABLE IF NOT EXISTS events
        (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            token_count FLOAT NOT NULL,
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
