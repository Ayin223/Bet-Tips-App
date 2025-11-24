import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";


const MySpeedometer = ({data, speedometerKeys}) => {
    const getData = Object.entries(data)
    .filter(([key]) => speedometerKeys.includes(key))
    .map(([key, value]) => ({
      value: Number(value),
      label: key,
    }));

    let value = getData[0].value

    const arcSweepAngle = 220; 
    const rotationStart = -110; 
    const ANIMATION_DURATION = 1000; 

    const angle = (value / 100) * arcSweepAngle; 
    const finalRotation = -200 + angle;
    const pointerStart = -200

    const rotationAnim = useRef(new Animated.Value(pointerStart)).current;
    const fillAnim = useRef(new Animated.Value(0)).current;

 useFocusEffect(
        useCallback(() => {
            rotationAnim.setValue(pointerStart);
            fillAnim.setValue(0) 

            const needleAnimation = Animated.timing(rotationAnim, {
                toValue: finalRotation, 
                duration: ANIMATION_DURATION, 
                useNativeDriver: true, 
            });

            const fillAnimation = Animated.timing(fillAnim, {
                toValue: value, 
                // duration: ANIMATION_DURATION,
                delay: 50, 
                useNativeDriver: false, // Must be false for controlling fill prop
            });
            Animated.parallel([needleAnimation, fillAnimation]).start();

            return () => {
                needleAnimation.stop();
                fillAnimation.stop(); 
                fillAnim.setValue(0);
            };
            
        }, [rotationAnim, fillAnim, finalRotation, value]) 
    );

    const animatedStyle = {
        transform: [{
            rotate: rotationAnim.interpolate({
                inputRange: [rotationStart, rotationStart + arcSweepAngle],
                outputRange: [`${rotationStart}deg`, `${rotationStart + arcSweepAngle}deg`]
            })
        }]
    };

    const totalNeedleLength = 90;
    const translateXPosition = totalNeedleLength / 2;


    return (
        <View style={styles.container}>
            <AnimatedCircularProgress
                size={180}
                width={15}
                fill={fillAnim}
                tintColor="#09d292"
                backgroundColor="#ff6060"
                rotation={rotationStart}
                arcSweepAngle={arcSweepAngle}
                // delay = {185}
                // duration={ANIMATION_DURATION}
            />
            
            <Animated.View 
                style={[
                    styles.needleBase,
                    animatedStyle 
                ]} 
            >
                <View 
                    style={[
                        styles.needleAssembly,
                        { transform: [{ translateX: translateXPosition }] }
                    ]}
                >
                    <View style={styles.needleBody} />
                    <View style={styles.needlePointer} />
                </View>

            </Animated.View>

            <View style = {{position: "absolute" , top: 90, alignItems: "center"}}>
                <Text style = {{color: "white", fontWeight: "bold"}}> {value} %</Text>
            </View>
            
        </View>
    );
};

export default MySpeedometer;

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