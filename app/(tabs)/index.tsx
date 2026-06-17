import { router } from 'expo-router'
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

import { getTodayDateKey } from '@/utils/date'

import { useTodoStore } from '@/stores/todo-store'

export default function HomeScreen() {
  const today = getTodayDateKey()

  const todos = useTodoStore((state) => state.todos)

  const hydrated = useTodoStore((state) => state.hydrated)

  const todayTodos = todos.filter(
    (todo) => todo.date === today,
  )

  const toggleTodo = useTodoStore(
    (state) => state.toggleTodo,
  )

  if (!hydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
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

      <FlatList
        data={todayTodos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.todoCard}>
            <View style={styles.todoContent}>
              <Pressable
                onPress={() =>
                  toggleTodo({
                    id: item.id,
                  })
                }
                style={[
                  styles.checkCircle,
                  item.status === 'completed' &&
                    styles.checkCircleCompleted,
                ]}
              >
                {item.status === 'completed' && (
                  <Text style={styles.checkMark}>
                    ✓
                  </Text>
                )}
              </Pressable>

              <View style={styles.todoInfo}>
                <Text
                  style={[
                    styles.todoTitle,
                    item.status === 'completed' &&
                      styles.todoTitleCompleted,
                  ]}
                >
                  {item.title}
                </Text>

                <View style={styles.todoFooter}>
                  <Text style={styles.todoMeta}>
                    미룬 횟수: {item.postponedCount}
                  </Text>

                  <Pressable style={styles.postponeButton}>
                    <Text style={styles.postponeButtonText}>
                      미루기
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              🌱
            </Text>

            <Text style={styles.emptyTitle}>
              오늘의 할 일이 없어요
            </Text>

            <Text style={styles.emptyDescription}>
              첫 번째 할 일을 추가하고
              미루지 않는 하루를 시작해보세요.
            </Text>

            <Pressable
              style={styles.emptyButton}
              onPress={() => router.push('/todo/new')}
            >
              <Text style={styles.emptyButtonText}>
                할 일 추가하기
              </Text>
            </Pressable>
          </View>
        }
      />
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

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  listContainer: {
    gap: 12,
  },

  todoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  todoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  todoMeta: {
    marginTop: 6,
    fontSize: 13,
    color: '#6B7280',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 60,

    backgroundColor: '#FFFFFF',

    borderRadius: 24,

    paddingVertical: 40,
    paddingHorizontal: 24,
  },

  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  emptyDescription: {
    marginTop: 8,

    textAlign: 'center',

    fontSize: 14,
    lineHeight: 22,

    color: '#6B7280',
  },

  emptyButton: {
    marginTop: 24,

    backgroundColor: '#8B5CF6',

    paddingHorizontal: 24,
    paddingVertical: 14,

    borderRadius: 16,
  },

  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  todoInfo: {
    flex: 1,
  },

  checkCircle: {
    width: 28,
    height: 28,

    borderRadius: 14,

    borderWidth: 2,
    borderColor: '#D1D5DB',

    marginRight: 14,

    alignItems: 'center',
    justifyContent: 'center',
  },

  checkCircleCompleted: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },

  checkMark: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  todoTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },

  todoFooter: {
    marginTop: 10,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'space-between',
  },

  postponeButton: {
    backgroundColor: '#F3F4F6',

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 10,
  },

  postponeButtonText: {
    fontSize: 13,
    fontWeight: '600',

    color: '#6B7280',
  },
})