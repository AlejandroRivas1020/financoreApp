import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState<any>(null);
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password || !phone) {
        Alert.alert('Error', 'Please fill in all fields.');
        return;
      }
      if (!file) {
        Alert.alert('Error', 'Please select a profile picture.');
        return;
      }
      await register(name, email, password, phone, file);
      Alert.alert('Registered Successfully!');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error?.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  const handleSelectImage = async () => {
    const cameraPermission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA
    );

    const photoLibraryPermission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
    );

    if (
      cameraPermission === RESULTS.GRANTED &&
      photoLibraryPermission === RESULTS.GRANTED
    ) {
      Alert.alert('Profile Picture', 'Choose an option', [
        {
          text: 'Take Photo',
          onPress: () => {
            launchCamera(
              { mediaType: 'photo', quality: 0.8 },
              response => {
                if (response.assets && response.assets.length > 0) {
                  setFile(response.assets[0]);
                } else if (response.errorMessage) {
                  Alert.alert('Camera Error', response.errorMessage);
                }
              }
            );
          },
        },
        {
          text: 'Choose from Gallery',
          onPress: () => {
            launchImageLibrary(
              { mediaType: 'photo', quality: 0.8 },
              response => {
                if (response.assets && response.assets.length > 0) {
                  setFile(response.assets[0]);
                } else if (response.errorMessage) {
                  Alert.alert('Gallery Error', response.errorMessage);
                }
              }
            );
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]);
    } else {
      Alert.alert('Permissions Required', 'Please grant camera and gallery access to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handleSelectImage}>
        <View style={styles.imageWrapper}>
          {file ? (
            <Image
              source={{ uri: file.uri }}
              style={styles.imagePreview}
            />
          ) : (
            <Text style={styles.imagePlaceholder}>+</Text>
          )}
        </View>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#212121',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#F7F7F7',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#aba9a9',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: '#34C759',
    fontSize: 16,
    fontWeight: '500',
  },
  imagePicker: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aba9a9',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    fontSize: 50,
    color: '#bbb',
  },
});

export default RegisterScreen;
