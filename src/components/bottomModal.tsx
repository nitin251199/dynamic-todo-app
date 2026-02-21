import { View, StyleSheet, Platform } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedTodo } from '../store/reducer/temp';

type Props = PropsWithChildren<{
  onClose: () => void;
}>;

const BottomModal = (props: Props) => {
  const { onClose, children } = props;

  const dispatch = useAppDispatch();
  const { showTodoForm } = useAppSelector(state => state.temp);

  const closeModal = () => {
    dispatch(setSelectedTodo(undefined));
    onClose();
  };

  return (
    <SafeAreaView>
      <Modal
        useNativeDriver
        useNativeDriverForBackdrop
        isVisible={showTodoForm}
        backdropColor='rgba(0, 0, 0, 0.26)'
        style={{ margin: 0 }}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        onModalHide={closeModal}
      >
        <View style={styles.endView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  endView: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default BottomModal;
