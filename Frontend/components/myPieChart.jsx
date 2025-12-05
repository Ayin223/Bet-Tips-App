import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { Animated, PixelRatio, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();


const MyPieChart = ({data, pieKeys}) => {
    const getData = Object.entries(data)
    .filter(([key]) => pieKeys.includes(key))
    .map(([key, value]) => ({
      value: Number(value),
      label: key,
    }));

    let value = 79

    const fillAnim = useRef(new Animated.Value(0)).current;

 useFocusEffect(
        useCallback(() => {
            fillAnim.setValue(0) 

            const fillAnimation = Animated.timing(fillAnim, {
                toValue: value, 
                delay: 50, 
                useNativeDriver: false,
            });
            Animated.parallel([fillAnimation]).start();

            return () => {
                fillAnimation.stop(); 
                fillAnim.setValue(0);
            };
            
        }, [ fillAnim, value]) 
    );

    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={160}
                width={30}
                fill={fillAnim}
                tintColor="#09d292"
                backgroundColor="#ff6060"
                rotation={-90}
                // arcSweepAngle={360}
                // delay = {185}
                // duration={ANIMATION_DURATION}
            />

            <View style = {{position: "absolute" , alignItems: "center"}}>
                <Text style = {{color: "white", fontWeight: "bold"}}> {value} %</Text>
            </View>
            
        </View>
    );
};

export default MyPieChart;

const styles = StyleSheet.create({
    container: {
        width: 180,
        height: 180,
        justifyContent: "center",
        alignItems: "center",
    },
    
    needleBase: {
        position: 'absolute', 
        width: 180, 
        height: 180, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    needleAssembly: {
        flexDirection: 'row', 
        alignItems: 'center',
        position: 'absolute', 
    },

    needleBody: {
        width: 40, 
        height: 3, 
        backgroundColor: "#09d292", 
        borderRadius: 1,
    },

    needlePointer: {
        width: 0,
        height: 0,
        borderTopWidth: 5,
        borderBottomWidth: 5,
        borderLeftWidth: 10, 
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#09d292', 
    },
});