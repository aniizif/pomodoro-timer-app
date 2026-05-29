import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SOUND_OPTIONS = [
  { id: 'track1', name: '🎵 Трек 1', description: 'Музыка 1' },
  { id: 'track2', name: '🎵 Трек 2', description: 'Музыка 2' },
  { id: 'track3', name: '🎵 Трек 3', description: 'Музыка 3' },
];

export const MusicControl = ({
  isPlaying,
  currentSoundName,
  volume,
  onPlaySound,
  onTogglePlayback,
  onStop,
  onChangeVolume,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Фоновая музыка</Text>

      <View style={styles.soundGrid}>
        {SOUND_OPTIONS.map((sound) => (
          <TouchableOpacity
            key={sound.id}
            style={[
              styles.soundButton,
              currentSoundName === sound.id && styles.activeSoundButton,
            ]}
            onPress={() => onPlaySound(sound.id)}
          >
            <Text style={styles.soundEmoji}>{sound.name.split(' ')[0]}</Text>
            <Text style={[
              styles.soundName,
              currentSoundName === sound.id && styles.activeSoundName,
            ]}>
              {sound.name.split(' ')[1]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentSoundName && (
        <View style={styles.controls}>
          <View style={styles.infoText}>
            <Text style={styles.currentSound}>
              {SOUND_OPTIONS.find(s => s.id === currentSoundName)?.description}
            </Text>
          </View>

          <View style={styles.controlRow}>
            <TouchableOpacity
              style={[styles.controlButton, isPlaying && styles.playingButton]}
              onPress={onTogglePlayback}
            >
              <Text style={styles.controlButtonText}>
                {isPlaying ? '⏸ Пауза' : '▶️ Играть'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={onStop}
            >
              <Text style={styles.controlButtonText}>⏹ Стоп</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.volumeControl}>
            <Text style={styles.volumeLabel}>Громкость</Text>
            <View style={styles.volumeButtons}>
              {[0.25, 0.5, 0.75, 1].map((vol) => (
                <TouchableOpacity
                  key={vol}
                  style={[
                    styles.volumeButton,
                    volume === vol && styles.activeVolumeButton,
                  ]}
                  onPress={() => onChangeVolume(vol)}
                >
                  <Text style={[
                    styles.volumeButtonText,
                    volume === vol && styles.activeVolumeButtonText,
                  ]}>
                    {vol * 100}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 15,
    textAlign: 'center',
  },
  soundGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginBottom: 15,
  },
  soundButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 10,
  },
  activeSoundButton: {
    borderColor: '#9B59B6',
    backgroundColor: '#F3E5F5',
  },
  soundEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },
  soundName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
    textAlign: 'center',
  },
  activeSoundName: {
    color: '#9B59B6',
  },
  controls: {
    marginTop: 15,
  },
  infoText: {
    alignItems: 'center',
    marginBottom: 10,
  },
  currentSound: {
    fontSize: 14,
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
  controlRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    alignItems: 'center',
  },
  playingButton: {
    backgroundColor: '#E8DAEF',
  },
  controlButtonText: {
    fontWeight: '600',
    color: '#2C3E50',
    fontSize: 16,
  },
  volumeControl: {
    marginTop: 5,
  },
  volumeLabel: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 8,
  },
  volumeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  volumeButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeVolumeButton: {
    backgroundColor: '#9B59B6',
  },
  volumeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  activeVolumeButtonText: {
    color: '#FFFFFF',
  },
});