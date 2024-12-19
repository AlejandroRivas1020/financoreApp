import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCreateEarning } from '../hooks/useCreateEarning';

const CreateEarningScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [generalAmount, setGeneralAmount] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const { createEarningHandler, isLoading } = useCreateEarning();

  const handleDateChange = (
    selectedDate: Date | undefined,
    setDate: React.Dispatch<React.SetStateAction<Date>>,
    closePicker: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    closePicker(false);

    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        Alert.alert('Invalid Date', 'Please select a date from today onwards.');
      } else {
        setDate(selectedDate);
      }
    }
  };

  const handleSubmit = async () => {
    if (!name || !generalAmount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (startDate > endDate) {
      Alert.alert('Error', 'The end date must be after the start date.');
      return;
    }

    try {
      await createEarningHandler({
        name,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        generalAmount: Number(generalAmount),
      });

      Alert.alert('Success', 'Earning successfully created', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('EarningList'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the earning');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Earning</Text>

      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Earning name"
        placeholderTextColor="#87CEEB"
      />

      <Text style={styles.label}>Start Date:</Text>
      <TouchableOpacity
        onPress={() => setShowStartDatePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>{startDate.toDateString()}</Text>
      </TouchableOpacity>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) =>
            handleDateChange(selectedDate, setStartDate, setShowStartDatePicker)
          }
        />
      )}

      <Text style={styles.label}>End Date:</Text>
      <TouchableOpacity
        onPress={() => setShowEndDatePicker(true)}
        style={styles.datePicker}
      >
        <Text style={styles.dateText}>{endDate.toDateString()}</Text>
      </TouchableOpacity>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) =>
            handleDateChange(selectedDate, setEndDate, setShowEndDatePicker)
          }
        />
      )}

      <Text style={styles.label}>General Amount:</Text>
      <TextInput
        style={styles.input}
        value={generalAmount}
        onChangeText={setGeneralAmount}
        placeholder="Amount"
        keyboardType="numeric"
        placeholderTextColor="#87CEEB"
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#34C759" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Create Earning</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F7F7F7',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    color: '#F7F7F7',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#87CEEB',
    borderRadius: 8,
    color: '#F7F7F7',
    backgroundColor: '#212121',
  },
  datePicker: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#87CEEB',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#212121',
  },
  dateText: {
    color: '#F7F7F7',
  },
  button: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CreateEarningScreen;
