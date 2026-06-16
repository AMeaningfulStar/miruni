import { router } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { getTodayDateKey } from '@/utils/date'

export default function HomeScreen() {
  const today = getTodayDateKey()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>미루니?</Text>
          <Text style={styles.subtitle}>오늘 할 일을 미루지 말고 시작해봐요</Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push('/todo/new')}
        >
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <View style={styles.todayCard}>
        <Text style={styles.todayLabel}>오늘 날짜</Text>
        <Text style={styles.todayDate}>{today}</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>오늘의 할 일</Text>
        <Text style={styles.sectionDescription}>
          완료하지 못하면 내일의 부담이 커져요
        </Text>
      </View>

      <View style={styles.previewCard}>
        <Text style={styles.previewTitle}>TODO 목록 영역</Text>
        <Text style={styles.previewDescription}>
          다음 커밋에서 저장된 할 일을 이곳에 보여줄 예정이에요.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 24,
    paddingTop: 72,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },

  greeting: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#6B7280',
  },

  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 4,
  },

  addButtonText: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  todayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  todayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8B5CF6',
    marginBottom: 8,
  },

  todayDate: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },

  sectionHeader: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },

  sectionDescription: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },

  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  previewTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },

  previewDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6B7280',
  },
})