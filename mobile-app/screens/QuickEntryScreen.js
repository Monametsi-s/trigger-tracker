import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { getColorForScore } from '../utils/colorMapping';
import { saveEntry } from '../utils/storage';

export default function QuickEntryScreen({ navigation }) {
  const [score, setScore] = useState(5);
  const [feelingBefore, setFeelingBefore] = useState('');
  const [feelingDuring, setFeelingDuring] = useState('');
  const [feelingAfter, setFeelingAfter] = useState('');
  const [surroundings, setSurroundings] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const entry = {
        score,
        color: getColorForScore(score),
        feelings: {
          before: feelingBefore.trim(),
          during: feelingDuring.trim(),
          after: feelingAfter.trim(),
        },
        surroundings: surroundings.split(',').map(s => s.trim()).filter(Boolean),
        notes: notes.trim(),
      };

      await saveEntry(entry);
      
      Alert.alert('Success', 'Entry saved!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setScore(5);
            setFeelingBefore('');
            setFeelingDuring('');
            setFeelingAfter('');
            setSurroundings('');
            setNotes('');
            navigation.navigate('History');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save entry');
    } finally {
      setSaving(false);
    }
  };

  const currentColor = getColorForScore(score);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quick Entry</Text>

        {/* Score Selector */}
        <View style={styles.section}>
          <Text style={styles.label}>How severe was it? (1-10)</Text>
          <View style={[styles.colorPreview, { backgroundColor: currentColor }]}>
            <Text style={styles.scoreText}>{score}</Text>
          </View>
          
          <View style={styles.scoreButtons}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <TouchableOpacity
                key={num}
                style={[
                  styles.scoreButton,
                  { backgroundColor: getColorForScore(num) },
                  score === num && styles.selectedScore,
                ]}
                onPress={() => setScore(num)}
              >
                <Text style={styles.scoreButtonText}>{num}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feelings */}
        <View style={styles.section}>
          <Text style={styles.label}>Feeling Before</Text>
          <TextInput
            style={styles.input}
            value={feelingBefore}
            onChangeText={setFeelingBefore}
            placeholder="e.g., anxious, stressed"
          />

          <Text style={styles.label}>Feeling During</Text>
          <TextInput
            style={styles.input}
            value={feelingDuring}
            onChangeText={setFeelingDuring}
            placeholder="e.g., numb, relieved"
          />

          <Text style={styles.label}>Feeling After</Text>
          <TextInput
            style={styles.input}
            value={feelingAfter}
            onChangeText={setFeelingAfter}
            placeholder="e.g., guilty, regretful"
          />
        </View>

        {/* Surroundings */}
        <View style={styles.section}>
          <Text style={styles.label}>Surroundings (comma-separated)</Text>
          <TextInput
            style={styles.input}
            value={surroundings}
            onChangeText={setSurroundings}
            placeholder="e.g., home, alone, evening"
          />
        </View>

        {/* Notes */}
        <View style={styles.section}>
          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Any additional context..."
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[styles.saveButton, saving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save Entry'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  colorPreview: {
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoreButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scoreButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedScore: {
    borderWidth: 3,
    borderColor: '#000',
  },
  scoreButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  saveButtonDisabled: {
    backgroundColor: '#999',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
