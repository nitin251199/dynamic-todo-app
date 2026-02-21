import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

type InputBoxProps = TextInputProps;

const InputBox = React.memo((props: InputBoxProps) => {
  return (
    <View style={styles.inputBox}>
      <TextInput {...props} style={styles.input} placeholder='Enter text' />
    </View>
  );
});

InputBox.displayName = 'InputBox';

export default InputBox;

const styles = StyleSheet.create({
  inputBox: {
    height: 52,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    overflow: 'hidden',
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
