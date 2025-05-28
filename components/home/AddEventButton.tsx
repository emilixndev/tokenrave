import { useState } from 'react';
import { Keyboard, NativeSyntheticEvent, TextInputChangeEventData, Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { addNewEvent } from '@/db/repositories/eventRepository';

export default function AddEventButton({ onEventAdded }: { onEventAdded?: () => void }) {
  const [nameTxt, setNameTxt] = useState('');
  const [btnOpacity, setBtnOpacity] = useState(0.5);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const database = useSQLiteContext();

  async function addEvent() {
    if (!nameTxt.trim()) {
      return;
    }
    await addNewEvent(database, nameTxt);
    setNameTxt('');
    setModalVisible(false);
    Keyboard.dismiss();
    onEventAdded && onEventAdded();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Add new event</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>New event</Text>
            <Text style={styles.modalDescription}>Add a new event to your list</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name :</Text>
              <TextInput
                style={styles.input}
                placeholder="Event name"
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  if (e.nativeEvent.text.trim()) {
                    setBtnOpacity(1);
                    setDisabledBtn(false);
                  } else {
                    setBtnOpacity(0.5);
                    setDisabledBtn(true);
                  }
                  setNameTxt(e.nativeEvent.text);
                }}
                maxLength={30}
              />
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.saveButton,
                  { opacity: btnOpacity }
                ]}
                onPress={addEvent}
                disabled={disabledBtn}
              >
                <Text style={styles.saveButtonText}>Save changes</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
             <Text>x</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: '50%',
    backgroundColor: '#0d6efd',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#0d6efd',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
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
