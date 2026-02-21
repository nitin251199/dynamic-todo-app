import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import Empty from '../components/Empty';
import BottomModal from '../components/bottomModal';
import TodoForm from '../components/TodoForm';
import { setShowTodoForm } from '../store/reducer/temp';
import TodoCard from '../components/TodoCard';
import ProgressBar from '../components/ProgressBar';
import { Ionicons } from '@expo/vector-icons';
import Animated, { LinearTransition } from 'react-native-reanimated';

const Root = () => {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(state => state.root);

  const openAddModal = () => {
    dispatch(setShowTodoForm(true));
  };

  const closeAddModal = () => {
    dispatch(setShowTodoForm(false));
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {todos.length === 0 && (
        <View style={styles.container}>
          <TouchableOpacity onPress={openAddModal}>
            <Empty />
          </TouchableOpacity>
        </View>
      )}

      {todos.length > 0 && (
        <View style={styles.box}>
          <Text style={{ fontSize: 16, fontWeight: '800' }}>Your Todos</Text>

          <View style={{ marginTop: 16 }}>
            <ProgressBar />
          </View>

          <TouchableOpacity
            onPress={openAddModal}
            style={styles.bottomContainer}
          >
            <Ionicons name='add' size={24} color='black' />
            <Text style={styles.bottomText}>Add More Todo</Text>
          </TouchableOpacity>

          <Animated.FlatList
            data={todos}
            itemLayoutAnimation={LinearTransition}
            keyExtractor={(item) => item.id.toString()}
            renderItem={props => <TodoCard {...props} />}
            style={{
              marginTop: 16,
              marginBottom: 160,
            }}
            contentContainerStyle={{
              gap: 16,
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      <BottomModal onClose={closeAddModal}>
        <TodoForm />
      </BottomModal>
    </View>
  );
};

export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    padding: 16,
  },
  bottomContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
