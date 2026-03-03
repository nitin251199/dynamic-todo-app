import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import InputBox from './inputBox';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addTodo, updateTodo } from '../store/reducer';
import { Todo } from '../@types';
import { setSelectedTodo, setShowTodoForm } from '../store/reducer/temp';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const { selectedTodo } = useAppSelector(state => state.temp);

  const [todoText, setTodoText] = useState('');

  const handlePress = () => {
    if (!todoText) {
      return Alert.alert('Error', 'Todo text cannot be empty');
    }
    if (selectedTodo) {
      dispatch(updateTodo({ ...selectedTodo, text: todoText }));

      ToastAndroid.show('Todo updated successfully', ToastAndroid.LONG);
    } else {
      const newTodo: Todo = {
        id: Date.now(),
        text: todoText,
        complete: false,
        deleted: false,
      };

      dispatch(addTodo(newTodo));

      ToastAndroid.show('Todo added successfully', ToastAndroid.LONG);
    }

    dispatch(setSelectedTodo(undefined));
    dispatch(setShowTodoForm(false));
  };

  useEffect(() => {
    if (selectedTodo) {
      setTodoText(selectedTodo.text);
    }
  }, [selectedTodo]);

  return (
    <View>
      <Text style={styles.title}>
        {!!selectedTodo ? 'Edit' : 'Add New'} Todo{' '}
      </Text>

      <InputBox autoFocus onChangeText={setTodoText} value={todoText} />

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>{!!selectedTodo ? 'Edit' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 16,
    backgroundColor: 'blue',
    padding: 18,
    borderRadius: 8,
    elevation: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
  },
});

export default TodoForm;
