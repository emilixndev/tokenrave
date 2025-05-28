import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { EventType } from '@/db/types/eventType';
import { HistoryType } from '@/db/types/historyType';
import { addExpenseToHistory, getHistoryById } from '@/db/repositories/historyRepository';
import {
  getEventById,
  updateTokenAmountAndTotalPrice,
  updateTokenAmountAndTotalPriceWithExpense,
  updateTokenPrice,
} from '@/db/repositories/eventRepository';
import ExpenseType from '@/Enums/ExpenseTypeEnum';

const useTokenManagement = (id: number) => {
  const database = useSQLiteContext();
  const [tokenInput, setTokenInput] = useState<number>(0);
  const [priceInput, setPriceInput] = useState<number>(0);

  const [event, setEvent] = useState<EventType | null>(null);
  const [history, setHistory] = useState<HistoryType[]>([]);
  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    getHistory();
  }, []);

  async function getHistory() {
    const historySelected = await getHistoryById(database, Number(id));
    setHistory(historySelected);
  }

  async function getEvent() {
    const eventSelected = await getEventById(database, Number(id));
    setEvent(eventSelected);
  }

  async function addToken() {
    await updateTokenAmountAndTotalPrice(database, tokenInput, priceInput, Number(id));
    await updateTokenPrice(database, Number(id));
    await addExpenseToHistory(database, tokenInput, Number(id), ExpenseType.TOKEN_PURCHASE);
    setTokenInput(0);
    setPriceInput(0);
    await getEvent();
    await getHistory();
  }

  function saveExpense(tokenExpenseCount: number) {
    if (event) {
      console.log(ExpenseType.TOKEN_SPEND);
      addExpenseToHistory(database, tokenExpenseCount, Number(id), ExpenseType.TOKEN_SPEND);

      updateTokenAmountAndTotalPriceWithExpense(
        database,
        event.token_count - tokenExpenseCount,
        tokenExpenseCount * event.token_price,
        Number(id)
      );

      getHistory();
      getEvent();
    }
  }

  return { event, history, tokenInput, setTokenInput, priceInput, setPriceInput, addToken, saveExpense };
};

export default useTokenManagement;
