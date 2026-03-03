import {
  Alert,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Todo } from '../@types';
import { useAppDispatch } from '../store/hooks';
import { deleteTodo, undoDeleteTodo, updateTodo } from '../store/reducer';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { setSelectedTodo, setShowTodoForm } from '../store/reducer/temp';

type Props = ListRenderItemInfo<Todo>;

export default function TodoCard(props: Props) {
  const { item: todo } = props;

  const dispatch = useAppDispatch();

  const markAsComplete = () => {
    dispatch(updateTodo({ id: todo.id, complete: !todo.complete }));
  };

  const openEditModal = () => {
    dispatch(setSelectedTodo(todo));
    dispatch(setShowTodoForm(true));
  };

  const handleDeleteTodo = () => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteTodo({ id: todo.id }));
          ToastAndroid.show('Todo deleted successfully', ToastAndroid.SHORT);
        },
      },
    ]);
  };

  const undoDelete = () => {
    Alert.alert('Undo Delete', 'Are you sure you want to restore this todo?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Undo Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(undoDeleteTodo({ id: todo.id }));
          ToastAndroid.show('Todo restored successfully', ToastAndroid.SHORT);
        },
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={{ flex: 1 }}>{todo.text}</Text>

        <View>
          <View style={styles.actionRow}>
            <TouchableOpacity
              onPress={openEditModal}
              style={[styles.action, { backgroundColor: 'cyan' }]}
            >
              <Ionicons name='pencil-sharp' size={20} color='white' />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteTodo}
              style={[styles.action, { backgroundColor: 'red' }]}
            >
              <Ionicons name='trash' size={20} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={markAsComplete}
        style={{
          ...styles.button,
          backgroundColor: todo.complete ? 'orange' : 'green',
        }}
      >
        <Text style={styles.buttonText}>
          {todo.complete ? 'Mark as pending' : 'Mark as complete'}
        </Text>
      </TouchableOpacity>

      <View style={StyleSheet.absoluteFillObject}>
        {todo.deleted && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'rgba(255, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 8,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>
              Deleted
            </Text>

            <TouchableOpacity
              onPress={undoDelete}
              style={{
                ...styles.button,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'yellow',
              }}
            >
              <FontAwesome name='undo' size={24} color='black' />
              <Text style={{ ...styles.buttonText, color: 'black' }}>
                Undo Delete
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 16,
    flex: 1,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    height: 60,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  action: {
    padding: 8,
    borderRadius: 20,
  },
  button: {
    marginTop: 16,
    backgroundColor: 'green',
    padding: 14,
    borderRadius: 8,
    elevation: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});
