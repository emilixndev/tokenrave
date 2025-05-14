import { Button, Dialog, Fieldset, Input, Label, Text, Unspaced, XStack } from 'tamagui';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { X } from '@tamagui/lucide-icons';
import ButtonWithBadge from '@/components/common/ButtonWithBadge';
import AddTokenModal from '@/components/modals /AddTokenModal';
import AddExpenseModal from '@/components/modals /AddExpenseModal';
import { EventType } from '@/db/types/eventType';

interface TokenListProps {
  event: EventType | null;
  setTokenExpenseInput: (token: number) => void;
  tokenExpenseInput: number;
  saveExpense: () => void;
  setTokenInput: (token: number) => void;
  setPriceInput: (price: number) => void;
  addToken: () => void;
}

export default function TokenList({
  event,
  setTokenExpenseInput,
  tokenExpenseInput,
  saveExpense,
  setTokenInput,
  setPriceInput,
  addToken,
}: TokenListProps) {
  return (
    <>
      {event && (
        <>
          <Text>Event name : {event.name}</Text>
          <Text>{event.total_price} €</Text>
          <Text>{event.token_count} Tokens</Text>
          <Text>1 Token = {Math.round(event.token_price * 100) / 100}€ </Text>
          <AddTokenModal
            addToken={addToken}
            setTokenInput={setTokenInput}
            setPriceInput={setPriceInput}
          ></AddTokenModal>
          <AddExpenseModal
            event={event}
            saveExpense={saveExpense}
            setTokenExpenseInput={setTokenExpenseInput}
            tokenExpenseInput={tokenExpenseInput}
          ></AddExpenseModal>
        </>
      )}
    </>
  );
}
