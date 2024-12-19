import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEarningDetails } from '../hooks/useEarningsDetails';

const EarningDetailsScreen: React.FC<{ route: any }> = ({ route }) => {
  const { id } = route.params;
  const { earning, isLoading, error, fetchEarningDetails } = useEarningDetails(id);

  useEffect(() => {
    fetchEarningDetails();
  }, []);

  if (isLoading) {return <Text>Loading...</Text>;}
  if (error) {return <Text>Error: {error}</Text>;}
  if (!earning) {return null;}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{earning.name}</Text>
      <Text style={styles.date}>
        {earning.startDate} - {earning.endDate}
      </Text>
      <Text style={styles.amount}>Amount: {earning.generalAmount}</Text>
      <Text style={styles.budgeted}>Budgeted: {earning.amountBudgeted}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F7F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    color: '#212121',
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
  },
  budgeted: {
    fontSize: 16,
    color: '#87CEEB',
  },
});

export default EarningDetailsScreen;
