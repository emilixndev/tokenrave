import { NativeSyntheticEvent, TextInputChangeEventData, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import ButtonWithBadge from '@/components/common/ButtonWithBadge';
import { EventType } from '@/db/types/eventType';
import { useState } from 'react';

interface addTokenModalProps {
  event: EventType;
  setTokenExpenseInput: (token: number) => void;
  tokenExpenseInput: number;
  saveExpense: () => void;
}

export default function AddExpenseModal({
  event,
  setTokenExpenseInput,
  tokenExpenseInput,
  saveExpense,
}: addTokenModalProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.addButton,
          (!event || event.token_price <= 0) && styles.disabledButton
        ]}
        onPress={() => setModalVisible(true)}
        disabled={!event || event.token_price <= 0}
      >
        <Text style={styles.buttonText}>Add expense</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add expense</Text>
            <Text style={styles.modalDescription}>Consume token from your wallet</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number of token :</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="xx"
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  setTokenExpenseInput(parseInt(e.nativeEvent.text));
                }}
              />
            </View>

            <Text style={styles.expenseText}>
              Your expense represent {tokenExpenseInput * event.token_price} €
            </Text>

            <View style={styles.badgeContainer}>
              <ButtonWithBadge />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  saveExpense();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              x
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
  expenseText: {
    fontSize: 16,
    marginBottom: 16,
  },
  badgeContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#dc3545',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
