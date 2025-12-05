import Ionicons from '@expo/vector-icons/Ionicons';
import analytics from '@react-native-firebase/analytics';
import { LinearGradient } from 'expo-linear-gradient';
import { PixelRatio, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const TabBar = ({ state, descriptors, navigation }) => {
  
  const icons= {
    index:  (props) => <Ionicons name="football-outline"      {...props} />,
    info:   (props) => <Ionicons name="ellipsis-horizontal-circle-outline"      {...props} />,
    premium:(props) => <Ionicons name="star-outline"      {...props} />,
    statistics:(props) => <Ionicons name="stats-chart-outline"      {...props} />,
  }

  return (
    <LinearGradient
      colors={['rgba(135, 135, 135, 1)', 'rgba(108, 125, 145, 1)', "rgba(14, 113, 140, 1)"]}    // your preferred colors
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }

            analytics().logScreenView({ 
                screen_name: route.name,
                screen_class: route.name 
            });
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              //styles = {styles.tabbarItem}
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style= {styles.TextColors}
            >

            
            {
              icons[route.name]({ 
                color: isFocused ? colors.accent : colors.background,
                size : 24
              })
              
              
            }
          

          <Text style={
                {
                  color: isFocused ? colors.text : colors.background,
                  fontSize: scaleFont(13),
                  fontWeight: "bold"
                } 
              }>
                {label}
                
            </Text>
            
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
    

  )
}

export default TabBar

const styles = StyleSheet.create({
    container:{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 5, 
    },
    TextColors:{
        flex: 1,
        color: colors.text,
        //backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    gradientContainer: {
      position: "absolute",
      bottom: 30,
      left: 0,
      right: 0,
      marginHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: colors.borderColor,
    },

})