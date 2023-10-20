import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import Map from './src/components/MapView/MapView';
import CarparkInfo from './src/components/CarparkInfo/CarparkInfo';
import { Button, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const onClick = () => {
    setModalVisible(true);
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.mapContainer}>
          <Map />
        </View>
        <View style={styles.textContainer}>
          <Button mode="contained" onPress={onClick}>
            <Text>Hello World</Text>
          </Button>
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
    </PaperProvider>
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
