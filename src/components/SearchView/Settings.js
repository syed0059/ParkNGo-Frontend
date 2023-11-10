import React, { useState , useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { Switch, Text, Divider } from 'react-native-paper'
import { RadiusContext } from '../RadiusContext'

export default function Settings() {
    const [darkMode, setDarkMode] = useState(false);
    const [colorblindMode, setColorblindMode] = useState(false);

    const { radius, setRadius } = useContext(RadiusContext);
    const [sliderValue, setSliderValue] = useState(radius);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text>Radius</Text>
                <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={1}
                    maximumValue={3}
                    step={0.1}
                    value={sliderValue}
                    onValueChange={(value) => setSliderValue(value)}
                    onSlidingComplete={(value) => setRadius(value)}
                />
                <Text> {sliderValue.toFixed(1)} km</Text>
            </View>
            <Divider />
            <View style={styles.row}>
                <Text>Dark Mode</Text>
                <Switch value={darkMode} onValueChange={() => setDarkMode(!darkMode)} />
            </View>
            <Divider />
            <View style={styles.row}>
                <Text>Colourblind Mode</Text>
                <Switch
                    value={colorblindMode}
                    onValueChange={() => setColorblindMode(!colorblindMode)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
});
