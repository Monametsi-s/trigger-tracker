import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAllEntries } from '../utils/storage';
import { getColorForScore, getRangeForScore } from '../utils/colorMapping';

export default function HistoryScreen({ navigation }) {
  const [entries, setEntries] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  const loadEntries = async () => {
    const allEntries = await getAllEntries();
    const sortedEntries = allEntries.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    setEntries(sortedEntries);
  };

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadEntries();
    setRefreshing(false);
  };

  const getFilteredEntries = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    return entries.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      
      switch (filter) {
        case 'today':
          return entryDate >= today;
        case 'week':
          return entryDate >= weekAgo;
        case 'month':
          return entryDate >= monthAgo;
        default:
          return true;
      }
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) {
      return `Today at ${date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderEntry = ({ item }) => (
    <TouchableOpacity
      style={styles.entryCard}
      onPress={() => navigation.navigate('Detail', { entry: item })}
    >
      <View style={styles.entryHeader}>
        <View
          style={[
            styles.colorIndicator,
            { backgroundColor: getColorForScore(item.score) },
          ]}
        >
          <Text style={styles.scoreText}>{item.score}</Text>
        </View>
        <View style={styles.entryInfo}>
          <Text style={styles.rangeLabel}>{getRangeForScore(item.score)}</Text>
          <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
        </View>
      </View>
      
      {item.feelings?.before && (
        <Text style={styles.feelingPreview} numberOfLines={1}>
          Before: {item.feelings.before}
        </Text>
      )}
      
      {item.notes && (
        <Text style={styles.notesPreview} numberOfLines={2}>
          {item.notes}
        </Text>
      )}
    </TouchableOpacity>
  );

  const filteredEntries = getFilteredEntries();

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['all', 'today', 'week', 'month'].map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.activeFilterTab]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[styles.filterText, filter === f && styles.activeFilterText]}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Entries List */}
      <FlatList
        data={filteredEntries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No entries yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to create your first entry
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeFilterTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  entryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorIndicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  entryInfo: {
    flex: 1,
  },
  rangeLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  feelingPreview: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  notesPreview: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});
