import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventType } from '@/db/types/eventType';

interface addTokenModalProps {
  setTokenInput: (token: number) => void;
  setPriceInput: (price: number) => void;
  addToken: () => void;
  event: EventType | null;
  priceInput: number;
}

export default function AddTokenModal({
  setTokenInput,
  setPriceInput,
  addToken,
  event,
  priceInput,
}: addTokenModalProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tokenValue, setTokenValue] = useState('');
  const [priceValue, setPriceValue] = useState('');

  const handleChangePrice = (txt: string) => {
    setPriceValue(txt);
    if (event?.token_price === 0) {
      const newPrice = txt === '' ? 0 : parseFloat(txt);
      setPriceInput(newPrice);
    }
  };

  const handleChangeToken = (txt: string) => {
    setTokenValue(txt);
    const tokenNumber = parseInt(txt) || 0;
    setTokenInput(tokenNumber);

    if (event && event.token_price !== 0) {
      const newPrice = event.token_price * tokenNumber;
      setPriceInput(newPrice);
      setPriceValue(newPrice.toString());
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Add Token</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Token</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>Add tokens to your wallet</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Number of tokens</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="#999"
                value={tokenValue}
                onChangeText={handleChangeToken}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Price in €</Text>
              <TextInput
                style={[styles.input, event?.token_price === 0 ? styles.activeText : styles.disabledText]}
                value={event?.token_price === 0 ? priceValue : priceInput?.toString() || '0'}
                keyboardType="numeric"
                placeholder="0.00"
                editable={event?.token_price === 0}
                placeholderTextColor="#999"
                onChangeText={handleChangePrice}
              />
            </View>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                addToken();
                setModalVisible(false);
                setTokenValue('');
                setPriceValue('');
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0d6efd',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 4,
  },
  modalDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 18,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  saveButton: {
    backgroundColor: '#0d6efd',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.3,
  },
  activeText: {
    opacity: 1,
  },
});
