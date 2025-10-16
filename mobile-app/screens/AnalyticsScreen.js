import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import { getAllEntries, getEntriesByDateRange } from '../utils/storage';
import { COLOR_RANGES, getColorForScore } from '../utils/colorMapping';

export default function AnalyticsScreen() {
  const [stats, setStats] = useState({
    total: 0,
    green: 0,
    yellow: 0,
    red: 0,
    avgScore: 0,
    weekData: [],
  });

  const loadStats = async () => {
    const entries = await getAllEntries();
    
    // Calculate counts by range
    let greenCount = 0;
    let yellowCount = 0;
    let redCount = 0;
    let totalScore = 0;

    entries.forEach(entry => {
      const score = entry.score;
      totalScore += score;
      
      if (score >= COLOR_RANGES.GREEN.min && score <= COLOR_RANGES.GREEN.max) {
        greenCount++;
      } else if (score >= COLOR_RANGES.YELLOW.min && score <= COLOR_RANGES.YELLOW.max) {
        yellowCount++;
      } else {
        redCount++;
      }
    });

    // Get last 7 days data
    const weekData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      const dayEntries = await getEntriesByDateRange(date, endDate);
      
      weekData.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        count: dayEntries.length,
      });
    }

    setStats({
      total: entries.length,
      green: greenCount,
      yellow: yellowCount,
      red: redCount,
      avgScore: entries.length > 0 ? (totalScore / entries.length).toFixed(1) : 0,
      weekData,
    });
  };

  useFocusEffect(
    useCallback(() => {
      loadStats();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Analytics</Text>

        {/* Summary Cards */}
        <View style={styles.cardRow}>
          <View style={styles.card}>
            <Text style={styles.cardValue}>{stats.total}</Text>
            <Text style={styles.cardLabel}>Total Entries</Text>
          </View>
          <View style={styles.card}>
            <Text style={[styles.cardValue, { color: getColorForScore(parseFloat(stats.avgScore)) }]}>
              {stats.avgScore}
            </Text>
            <Text style={styles.cardLabel}>Avg Score</Text>
          </View>
        </View>

        {/* Range Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Breakdown by Severity</Text>
          
          <View style={styles.rangeRow}>
            <View style={[styles.rangeIndicator, { backgroundColor: '#4CAF50' }]} />
            <Text style={styles.rangeLabel}>Good (1-3)</Text>
            <Text style={styles.rangeValue}>{stats.green}</Text>
          </View>
          
          <View style={styles.rangeRow}>
            <View style={[styles.rangeIndicator, { backgroundColor: '#FFEB3B' }]} />
            <Text style={styles.rangeLabel}>Moderate (4-7)</Text>
            <Text style={styles.rangeValue}>{stats.yellow}</Text>
          </View>
          
          <View style={styles.rangeRow}>
            <View style={[styles.rangeIndicator, { backgroundColor: '#F44336' }]} />
            <Text style={styles.rangeLabel}>Severe (8-10)</Text>
            <Text style={styles.rangeValue}>{stats.red}</Text>
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last 7 Days</Text>
          <VictoryChart
            theme={VictoryTheme.material}
            width={Dimensions.get('window').width - 40}
            height={220}
          >
            <VictoryAxis />
            <VictoryAxis dependentAxis />
            <VictoryBar
              data={stats.weekData}
              x="day"
              y="count"
              style={{
                data: { fill: '#007AFF' },
              }}
            />
          </VictoryChart>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          {stats.total === 0 ? (
            <Text style={styles.insightText}>
              Start tracking to see insights about your patterns.
            </Text>
          ) : (
            <>
              {stats.green > stats.red && (
                <Text style={styles.insightText}>
                  ✓ Great job! You have more good days ({stats.green}) than severe ones ({stats.red}).
                </Text>
              )}
              {stats.red > stats.green && (
                <Text style={styles.insightText}>
                  You've had {stats.red} severe episodes. Consider reviewing what triggers them.
                </Text>
              )}
              {parseFloat(stats.avgScore) <= 3 && (
                <Text style={styles.insightText}>
                  ✓ Your average score is in the good range. Keep it up!
                </Text>
              )}
            </>
          )}
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
  cardRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  rangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rangeIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  rangeLabel: {
    flex: 1,
    fontSize: 16,
    color: '#444',
  },
  rangeValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  insightText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 8,
  },
});
