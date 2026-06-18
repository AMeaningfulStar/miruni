import { StyleSheet, Text, View } from 'react-native'

import { Todo } from '@/types/todo'

type TodoCardProps = {
  todo: Todo
}

const getBurdenLevel = (count: number) => {
  if (count === 0) return '새로운 할 일 🌱'
  if (count <= 2) return '조금 미뤘어요 🙂'
  if (count <= 5) return '부담이 쌓이고 있어요 😅'

  return '위험! 많이 미뤘어요 🔥'
}

export function TodoCard({ todo }: TodoCardProps) {
  return (
    <View style={styles.todoCard}>
      <View style={styles.todoContent}>
        <View
          style={[
            styles.checkCircle,
            todo.status === 'completed' && styles.checkCircleCompleted,
          ]}
        >
          {todo.status === 'completed' && (
            <Text style={styles.checkMark}>✓</Text>
          )}
        </View>

        <View style={styles.todoInfo}>
          <Text
            style={[
              styles.todoTitle,
              todo.status === 'completed' && styles.todoTitleCompleted,
            ]}
          >
            {todo.title}
          </Text>

          <View style={styles.todoFooter}>
            <View style={styles.metaContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{todo.postponedCount}회</Text>
              </View>

              <Text style={styles.burdenText}>
                {getBurdenLevel(todo.postponedCount)}
              </Text>
            </View>

            <View style={styles.postponeButton}>
              <Text style={styles.postponeButtonText}>미루기</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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

  todoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
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

  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  badge: {
    backgroundColor: '#EDE9FE',

    paddingHorizontal: 10,
    paddingVertical: 4,

    borderRadius: 999,
  },

  badgeText: {
    color: '#7C3AED',
    fontWeight: '700',
    fontSize: 12,
  },

  burdenText: {
    fontSize: 12,
    color: '#6B7280',
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