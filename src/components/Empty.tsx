import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Empty = () => {
  return (
    <View style={styles.box}>
      <Ionicons
        name='add'
        size={46}
        color='black'
        style={{
          paddingVertical: 16,
        }}
      />
      <Text>No Existing todos</Text>
      <Text>Click to add todo</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 16,
    width: width - 64,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
});
