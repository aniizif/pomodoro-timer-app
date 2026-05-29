import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { storage } from '../../shared/lib/storage';
import { formatMinutes } from '../../shared/lib/format-time';

export const StatisticsPage = () => {
  const [statistics, setStatistics] = useState({ totalMinutes: 0, completedSessions: 0 });

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    const stats = await storage.getStatistics();
    setStatistics(stats);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statCard}>
        <Text style={styles.statValue}>{statistics.completedSessions}</Text>
        <Text style={styles.statLabel}>Завершенных сессий</Text>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statValue}>{formatMinutes(statistics.totalMinutes)}</Text>
        <Text style={styles.statLabel}>Общее время работы</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  statCard: {
    backgroundColor: '#F8F9FA',
    padding: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  statLabel: {
    fontSize: 16,
    color: '#7F8C8D',
  },
});