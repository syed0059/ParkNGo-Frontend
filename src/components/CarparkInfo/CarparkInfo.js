import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CarparkInfo({ onClose }) {
  return (
    <View style={styles.carparkContent}>
      <Text>Carpark Information</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text>Close Modal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  carparkContent: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});

export default CarparkInfo;
