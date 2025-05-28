import { SQLiteDatabase, SQLiteRunResult } from 'expo-sqlite';
import { HistoryType } from '../types/historyType';
import ExpenseType from '@/Enums/ExpenseTypeEnum';

export const getHistoryById = async (db: SQLiteDatabase, id: number): Promise<HistoryType[]> => {
  return await db.getAllAsync<HistoryType>(`SELECT *
                                            FROM history
                                            WHERE events_reference = ${id}
                                            ORDER BY created_at DESC`);
};

export const addExpenseToHistory = async (
  db: SQLiteDatabase,
  amountToken: number,
  idEvent: number,
  expenseType: ExpenseType
): Promise<SQLiteRunResult> => {
  return await db.runAsync(`INSERT INTO history (created_at, amount, events_reference, expense_type)
                        values (datetime('now','localtime'), ${amountToken}, ${idEvent}, '${expenseType}')`);
};
