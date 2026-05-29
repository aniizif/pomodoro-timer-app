import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ControlButtons = ({
  isRunning,
  status,
  onStart,
  onPause,
  onReset
}) => {
  return (
    <View style={styles.container}>
      {status !== 'idle' && (
        <TouchableOpacity
          style={styles.button}
          onPress={onReset}
        >
          <Text style={styles.buttonText}>Сброс</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={[styles.button, styles.mainButton]}
        onPress={isRunning ? onPause : onStart}
      >
        <Text style={styles.mainButtonText}>
          {isRunning ? 'Пауза' : status === 'idle' ? 'Старт' : 'Продолжить'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#ECF0F1',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  mainButton: {
    backgroundColor: '#3498DB',
  },
  mainButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});