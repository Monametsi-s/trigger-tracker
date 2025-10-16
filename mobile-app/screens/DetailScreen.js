import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { getColorForScore, getRangeForScore } from '../utils/colorMapping';
import { updateEntry, deleteEntry } from '../utils/storage';

export default function DetailScreen({ route, navigation }) {
  const { entry } = route.params;
  const [editing, setEditing] = useState(false);
  const [score, setScore] = useState(entry.score);
  const [feelingBefore, setFeelingBefore] = useState(entry.feelings?.before || '');
  const [feelingDuring, setFeelingDuring] = useState(entry.feelings?.during || '');
  const [feelingAfter, setFeelingAfter] = useState(entry.feelings?.after || '');
  const [surroundings, setSurroundings] = useState(
    Array.isArray(entry.surroundings) ? entry.surroundings.join(', ') : ''
  );
  const [notes, setNotes] = useState(entry.notes || '');

  const handleSave = async () => {
    try {
      const updates = {
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

      await updateEntry(entry.id, updates);
      Alert.alert('Success', 'Entry updated!');
      setEditing(false);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update entry');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteEntry(entry.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (editing) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Edit Entry</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Score (1-10)</Text>
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

          <View style={styles.section}>
            <Text style={styles.label}>Feeling Before</Text>
            <TextInput
              style={styles.input}
              value={feelingBefore}
              onChangeText={setFeelingBefore}
            />

            <Text style={styles.label}>Feeling During</Text>
            <TextInput
              style={styles.input}
              value={feelingDuring}
              onChangeText={setFeelingDuring}
            />

            <Text style={styles.label}>Feeling After</Text>
            <TextInput
              style={styles.input}
              value={feelingAfter}
              onChangeText={setFeelingAfter}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Surroundings</Text>
            <TextInput
              style={styles.input}
              value={surroundings}
              onChangeText={setSurroundings}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setEditing(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.colorHeader, { backgroundColor: getColorForScore(entry.score) }]}>
          <Text style={styles.scoreDisplay}>{entry.score}</Text>
          <Text style={styles.rangeDisplay}>{getRangeForScore(entry.score)}</Text>
        </View>

        <Text style={styles.timestamp}>{formatDate(entry.timestamp)}</Text>

        {(entry.feelings?.before || entry.feelings?.during || entry.feelings?.after) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Feelings</Text>
            {entry.feelings.before && (
              <View style={styles.feelingRow}>
                <Text style={styles.feelingLabel}>Before:</Text>
                <Text style={styles.feelingValue}>{entry.feelings.before}</Text>
              </View>
            )}
            {entry.feelings.during && (
              <View style={styles.feelingRow}>
                <Text style={styles.feelingLabel}>During:</Text>
                <Text style={styles.feelingValue}>{entry.feelings.during}</Text>
              </View>
            )}
            {entry.feelings.after && (
              <View style={styles.feelingRow}>
                <Text style={styles.feelingLabel}>After:</Text>
                <Text style={styles.feelingValue}>{entry.feelings.after}</Text>
              </View>
            )}
          </View>
        )}

        {entry.surroundings && entry.surroundings.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Surroundings</Text>
            <View style={styles.tagContainer}>
              {entry.surroundings.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {entry.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{entry.notes}</Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => setEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
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
  colorHeader: {
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  rangeDisplay: {
    fontSize: 20,
    color: '#fff',
    marginTop: 8,
  },
  timestamp: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  feelingRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  feelingLabel: {
    fontSize: 16,
    fontWeight: '600',
    width: 80,
    color: '#444',
  },
  feelingValue: {
    fontSize: 16,
    flex: 1,
    color: '#666',
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#fff',
    fontSize: 14,
  },
  notesText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    marginBottom: 40,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  cancelButton: {
    backgroundColor: '#8E8E93',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
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
});
