import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../lib/format-time';

export const TimerDisplay = ({ timeLeft, status, completedSessions = 0 }) => {
  const getStatusText = () => {
    switch (status) {
      case 'work': return 'Работа';
      case 'short_break': return 'Короткий отдых';
      case 'long_break': return 'Длинный отдых';
      default: return 'Готов к работе';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'work': return '#FF6B6B';
      case 'short_break': return '#4ECDC4';
      case 'long_break': return '#45B7D1';
      default: return '#95A5A6';
    }
  };

  const sessionNumber = (completedSessions || 0) + 1;

  return (
    <View style={styles.container}>
      <Text style={[styles.status, { color: getStatusColor() }]}>
        {getStatusText()}
      </Text>
      <Text style={styles.time}>{formatTime(timeLeft)}</Text>
      <Text style={styles.progress}>Сессия {sessionNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 30,
  },
  status: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  time: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  progress: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 10,
  },
});