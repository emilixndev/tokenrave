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



const useTokenManagement = (id:number) => {
  const database = useSQLiteContext();
  const [tokenInput, setTokenInput] = useState<number>(0);
  const [tokenExpenseInput, setTokenExpenseInput] = useState<number>(0);
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
    console.log(historySelected);
  }

  async function getEvent() {
    const eventSelected = await getEventById(database, Number(id));
    console.log(eventSelected);
    setEvent(eventSelected);
  }

  async function addToken() {
    await updateTokenAmountAndTotalPrice(database, tokenInput, priceInput, Number(id));
    await updateTokenPrice(database, Number(id));
    setTokenInput(0);
    setPriceInput(0);
    await getEvent();
  }

  function saveExpense() {
    if (event) {
      addExpenseToHistory(database, Date.now(), tokenExpenseInput, Number(id));

      updateTokenAmountAndTotalPriceWithExpense(
        database,
        event.token_count - tokenExpenseInput,
        tokenExpenseInput * event.token_price,
        Number(id)
      );
      setTokenExpenseInput(0);
      getHistory();
      getEvent();
    }
  }

  return {event, history, tokenInput, setTokenInput, tokenExpenseInput, setTokenExpenseInput, priceInput, setPriceInput, addToken, saveExpense};
}

export default useTokenManagement;