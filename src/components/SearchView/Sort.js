import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

export default function Sort({ onSortOptionChanged, ...props }) {
  const [value, setValue] = React.useState('distance');

  React.useEffect(() => {
    if (onSortOptionChanged && typeof onSortOptionChanged === 'function') {
      onSortOptionChanged(value);
    }
  }, [value]);

  return (
    <View style={[styles.container, props.style]}>
        <Text style={styles.sortByText}>Sort by:</Text>
        <SegmentedButtons
            value={value}
            onValueChange={setValue}
            style={styles.segmentedbuttons}
            buttons={[
            {
                value: 'distance',
                label: 'Distance',
            },
            {
                value: 'availability',
                label: 'Availability',
            },
            {   value: 'price', 
                label: 'Price' },
            ]}
        />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  },
  sortByText: {
    marginBottom: 10,
  },
});
