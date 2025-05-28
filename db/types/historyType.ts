import expenseTypeEnum from '@/Enums/ExpenseTypeEnum';

export interface HistoryType {
  id: number;
  created_at: number;
  amount: number;
  expense_type: expenseTypeEnum;
}
