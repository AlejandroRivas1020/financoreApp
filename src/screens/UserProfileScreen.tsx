import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Alert, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useUserProfile from '../hooks/useUserProfile';

const UserProfileScreen: React.FC = ({ })  => {
  const { user, loading, error } = useUserProfile();

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    Alert.alert('Error', error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB', '#f7f7f7']} style={styles.background}>
        <View style={styles.circle} />
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
          <Text style={styles.name}>{user.name}</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" style={styles.icon} />
            <TextInput value={user.email} editable={false} style={styles.input} />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="call-outline" size={20} color="#555" style={styles.icon} />
            <TextInput value={user.phone} editable={false} style={styles.input} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  circle: {
    backgroundColor: '#fff',
    width: '100%',
    height: 300,
    borderRadius: 150,
    position: 'absolute',
    top: -150,
    alignSelf: 'center',
  },
  profileContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#555',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#212121',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default UserProfileScreen;
