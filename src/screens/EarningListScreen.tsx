import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useEarnings } from '../hooks/useEarnings';
import { useDeleteEarning } from '../hooks/useDeteleEarning';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EarningsListScreen: React.FC<{ navigation: any }> = ({ navigation })=> {
  const { earnings, isLoading, error, fetchEarnings } = useEarnings();
  const { deleteEarningHandler } = useDeleteEarning(fetchEarnings);


  const handleDelete = (id: string) => {
    Alert.alert('Delete Earning', 'Are you sure you want to delete this earning?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteEarningHandler(id),
      },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => navigation.navigate('EarningDetails', { id: item.id })}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>
            {item.startDate} - {item.endDate}
          </Text>
          <Text style={styles.amount}>{item.generalAmount}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={earnings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateEarning')}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  card: {
    backgroundColor: '#87CEEB',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  infoContainer: {
    flex: 1,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
  },
  date: {
    fontSize: 14,
    color: '#212121',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
  },
  deleteButton: {
    padding: 8,
  },
  floatingButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 60,
    height: 60,
    backgroundColor: '#34C759',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default EarningsListScreen;
