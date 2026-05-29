import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  SETTINGS: '@pomodoro_settings',
  STATISTICS: '@pomodoro_statistics',
};

export const storage = {
  async getSettings() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : {
        workDuration: 25,
        shortBreak: 5,
        longBreak: 15,
        sessionsBeforeLongBreak: 4,
      };
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  },

  async saveSettings(settings) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving settings:', error);
      return false;
    }
  },

  async getStatistics() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STATISTICS);
      return data ? JSON.parse(data) : { totalMinutes: 0, completedSessions: 0 };
    } catch (error) {
      console.error('Error loading statistics:', error);
      return { totalMinutes: 0, completedSessions: 0 };
    }
  },

  async saveStatistics(statistics) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(statistics));
      return true;
    } catch (error) {
      console.error('Error saving statistics:', error);
      return false;
    }
  },
};