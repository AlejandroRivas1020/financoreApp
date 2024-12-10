import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import { useAuth } from '../context/AuthContext';

const ValidateCodeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [code, setCode] = useState('');
  const { validateRecoveryCode } = useAuth();

  const handleValidateCode = async () => {
    try {
      await validateRecoveryCode(code);
      Alert.alert('Success', 'Code validated');
      navigation.navigate('ResetPassword');
    } catch (error: any) {
      Alert.alert('Error', error || 'Invalid recovery code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validate Recovery Code</Text>
      <OTPTextInput
        handleTextChange={setCode}
        inputCount={6}
        tintColor="#34C759"
        offTintColor="#ccc"
        inputCellLength={1}
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
      />
      <TouchableOpacity style={styles.button} onPress={handleValidateCode}>
        <Text style={styles.buttonText}>Validate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginBottom: 24,
    textAlign: 'center',
  },
  otpContainer: {
    marginBottom: 24,
    width: '100%',
    justifyContent: 'space-between',
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ValidateCodeScreen;

