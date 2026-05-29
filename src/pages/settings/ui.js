import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { storage } from '../../shared/lib/storage';

export const SettingsPage = ({ navigation }) => {
  const [settings, setSettings] = useState({
    workDuration: '25',
    shortBreak: '5',
    longBreak: '15',
    sessionsBeforeLongBreak: '4',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const saved = await storage.getSettings();
    if (saved) {
      setSettings({
        workDuration: saved.workDuration.toString(),
        shortBreak: saved.shortBreak.toString(),
        longBreak: saved.longBreak.toString(),
        sessionsBeforeLongBreak: saved.sessionsBeforeLongBreak.toString(),
      });
    }
  };

  const saveSettings = async () => {
    const settingsToSave = {
      workDuration: parseInt(settings.workDuration) || 25,
      shortBreak: parseInt(settings.shortBreak) || 5,
      longBreak: parseInt(settings.longBreak) || 15,
      sessionsBeforeLongBreak: parseInt(settings.sessionsBeforeLongBreak) || 4,
    };

    await storage.saveSettings(settingsToSave);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Длительность работы (мин)</Text>
          <TextInput
            style={styles.input}
            value={settings.workDuration}
            onChangeText={(text) => setSettings({ ...settings, workDuration: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Короткий перерыв (мин)</Text>
          <TextInput
            style={styles.input}
            value={settings.shortBreak}
            onChangeText={(text) => setSettings({ ...settings, shortBreak: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Длинный перерыв (мин)</Text>
          <TextInput
            style={styles.input}
            value={settings.longBreak}
            onChangeText={(text) => setSettings({ ...settings, longBreak: text })}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Сессий до длинного перерыва</Text>
          <TextInput
            style={styles.input}
            value={settings.sessionsBeforeLongBreak}
            onChangeText={(text) => setSettings({ ...settings, sessionsBeforeLongBreak: text })}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>Сохранить</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  form: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2C3E50',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});