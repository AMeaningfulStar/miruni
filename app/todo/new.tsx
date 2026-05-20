import { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import { router } from 'expo-router'

export default function NewTodoScreen() {
  const [title, setTitle] = useState('')

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>할 일 추가</Text>

        <Text style={styles.label}>오늘 무엇을 해야 하나요?</Text>

        <TextInput
          placeholder="할 일을 입력해주세요"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>취소</Text>
          </Pressable>

          <Pressable style={[styles.button, styles.saveButton]}>
            <Text style={styles.saveButtonText}>저장</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },

  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 32,
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 12,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    fontSize: 16,
    color: '#111827',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },

  button: {
    flex: 1,
    height: 56,
    borderRadius: 18,

    justifyContent: 'center',
    alignItems: 'center',
  },

  cancelButton: {
    backgroundColor: '#E5E7EB',
  },

  saveButton: {
    backgroundColor: '#8B5CF6',
  },

  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
})