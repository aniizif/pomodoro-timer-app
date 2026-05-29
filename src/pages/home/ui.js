import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { TimerDisplay } from '../../shared/ui/timer-display';
import { ControlButtons } from '../../shared/ui/control-buttons';
import { MusicControl } from '../../shared/ui/music-control';
import { useTimer } from '../../features/timer/model';
import { useMusic } from '../../features/music/model';
import { storage } from '../../shared/lib/storage';

export const HomePage = ({ navigation }) => {
  const [settings, setSettings] = useState(null);
  const timer = useTimer(settings || { workDuration: 25, shortBreak: 5, longBreak: 15, sessionsBeforeLongBreak: 4 });
  const music = useMusic();

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkSettingsUpdate();
    });
    return unsubscribe;
  }, [navigation, settings]);

  const checkSettingsUpdate = async () => {
    const savedSettings = await storage.getSettings();
    if (savedSettings) {
      if (JSON.stringify(savedSettings) !== JSON.stringify(settings)) {
        setSettings(savedSettings);
        timer.resetTimer();
      }
    }
  };

  useEffect(() => {
    if (timer.timeLeft === 0 && timer.isRunning) {
      const message = timer.status === 'work' 
        ? 'Время отдохнуть!' 
        : 'Время поработать!';
      
      Alert.alert('Pomodoro', message);
      
      if (timer.status === 'work') {
        saveStatistics(timer.completedSessions + 1, settings.workDuration);
      }
    }
  }, [timer.timeLeft]);

  const loadSettings = async () => {
    const savedSettings = await storage.getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    } else {
      const defaultSettings = { workDuration: 25, shortBreak: 5, longBreak: 15, sessionsBeforeLongBreak: 4 };
      setSettings(defaultSettings);
    }
  };

  const saveStatistics = async (completedSessions, workDuration) => {
    const stats = await storage.getStatistics();
    const updatedStats = {
      totalMinutes: stats.totalMinutes + workDuration,
      completedSessions: stats.completedSessions + 1,
    };
    await storage.saveStatistics(updatedStats);
  };

  if (!settings) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TimerDisplay 
          timeLeft={timer.timeLeft}
          status={timer.status}
          completedSessions={timer.completedSessions}
        />
        
        <ControlButtons
          isRunning={timer.isRunning}
          status={timer.status}
          onStart={timer.startTimer}
          onPause={timer.pauseTimer}
          onReset={timer.resetTimer}
        />

        <View style={styles.navigation}>
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.navButtonText}>Настройки</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.navButton}
            onPress={() => navigation.navigate('Statistics')}
          >
            <Text style={styles.navButtonText}>Статистика</Text>
          </TouchableOpacity>
        </View>

        <MusicControl
          isPlaying={music.isPlaying}
          currentSoundName={music.currentSoundName}
          volume={music.volume}
          onPlaySound={music.playSound}
          onTogglePlayback={music.togglePlayback}
          onStop={music.stopMusic}
          onChangeVolume={music.changeVolume}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 30,
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
  },
  navButtonText: {
    color: '#2C3E50',
    fontWeight: '600',
  },
});