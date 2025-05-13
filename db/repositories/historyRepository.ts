import { SQLiteDatabase, SQLiteRunResult } from 'expo-sqlite';
import { HistoryType } from '../types/historyType';

export const getHistoryById = async (db: SQLiteDatabase, id: number): Promise<HistoryType[]> => {
  return await db.getAllAsync<HistoryType>(`SELECT *
                                            FROM history
                                            WHERE events_reference = ${id}
                                            ORDER BY created_at DESC`);
};

export const addExpenseToHistory = async (
  db: SQLiteDatabase,
  date: number,
  amountToken: number,
  idEvent: number
): Promise<SQLiteRunResult> => {
  return await db.runAsync(`INSERT INTO history (created_at, amount, events_reference)
                        values (${date}, ${amountToken}, ${idEvent})`);
};
