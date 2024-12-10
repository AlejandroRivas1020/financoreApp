import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../assets/logo.jpeg')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.appName}>Financore App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
  },
  containerLogo: {
    width: 300,
    height: 300,
    marginBottom:20,
    elevation:10,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 130,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F7F7F7',
    marginBottom: 20,
  },
});

export default SplashScreen;
