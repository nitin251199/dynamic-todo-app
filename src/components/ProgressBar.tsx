import { View, Text, useWindowDimensions } from 'react-native';
import React, { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import { Bar } from 'react-native-progress';

const ProgressBar = () => {
  const { todos } = useAppSelector(state => state.root);
  const { width } = useWindowDimensions();

  const completedTodos = useMemo(
    () => todos.filter(el => el.isComplete),
    [todos],
  );

  const percentage = useMemo(
    () => completedTodos.length / todos.length,
    [completedTodos, todos],
  );

  return (
    <View>
      <Bar
        progress={percentage}
        width={width - 32}
        height={10}
        useNativeDriver
      />
      <View style={{ alignSelf: 'flex-end', marginTop: 6 }}>
        <Text style={{ fontStyle: 'italic' }}>
          {completedTodos.length}/{todos.length}
        </Text>
      </View>
    </View>
  );
};

export default ProgressBar;
