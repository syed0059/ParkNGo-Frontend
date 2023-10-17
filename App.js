import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import Map from './src/components/MapView/MapView';
import CarparkInfo from './src/components/CarparkInfo/CarparkInfo';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const onClick = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Map />
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={onClick}>
          <Text>Hello World</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <CarparkInfo onClose={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 0.5,
  },
  textContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
