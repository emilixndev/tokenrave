import { SQLiteDatabase, SQLiteRunResult } from 'expo-sqlite';
import { EventType } from '../types/eventType';

export const insertEvent = async (db: SQLiteDatabase, name: string): Promise<void> => {
  await db.runAsync('INSERT INTO events (name) VALUES (?);', [name]);
};

export const getAllEvents = async (db: SQLiteDatabase): Promise<EventType[]> => {
  return await db.getAllAsync<EventType>('SELECT * FROM events ORDER BY created_at DESC;');
};

export const getEventById = async (db: SQLiteDatabase, id: number): Promise<EventType | null> => {
  const result = await db.getFirstAsync<EventType>(`SELECT *
                                                    FROM events
                                                    WHERE id = ${id}`);
  return result ?? null;
};

export const updateTokenAmountAndTotalPrice = async (
  db: SQLiteDatabase,
  amountToken: number,
  totalPrice: number,
  id: number
): Promise<SQLiteRunResult> => {
  return await db.runAsync(`UPDATE events
                            set token_count = token_count + ${amountToken},
                                total_price = total_price + ${totalPrice}
                            WHERE events.id = ${id}`);
};
export const updateTokenPrice = async (db: SQLiteDatabase, id: number): Promise<SQLiteRunResult> => {
  return await db.runAsync(`UPDATE events
                            set token_price = total_price / token_count
                            WHERE events.id = ${id}`);
};

export const updateTokenAmountAndTotalPriceWithExpense = async (
  db: SQLiteDatabase,
  tokenCount: number,
  priceExpense: number,
  id: number
): Promise<SQLiteRunResult> => {
  return await db.runAsync(`UPDATE events
                            set token_count = ${tokenCount},
                                total_price = total_price - ${priceExpense}
                            WHERE events.id = ${id}`);
};

export const addNewEvent = async (db: SQLiteDatabase, name: string): Promise<SQLiteRunResult> => {
  return await db.runAsync(`INSERT INTO events (name, token_count, token_price, total_price,created_at)
                            VALUES ('${name}', 0, 0, 0,datetime('now','localtime'))`);
};
