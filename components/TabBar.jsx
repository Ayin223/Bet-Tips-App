import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';


const TabBar = ({ state, descriptors, navigation }) => {

  const icons= {
    index:  (props) => <AntDesign name="home"      {...props} />,
    info:   (props) => <AntDesign name="info"      {...props} />,
    premium:(props) => <AntDesign name="star"      {...props} />,
    results:(props) => <AntDesign name="clock-circle"      {...props} />,
  }

  return (
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
                fontSize: 11,
                fontWeight: "bold"
              } 
            }>
              {label}
              
          </Text>
           
          </TouchableOpacity>
        );
      })}
    </View>

  )
}

export default TabBar

const styles = StyleSheet.create({
    container:{
        position: "absolute",
        bottom: 25,
        right: 0,
        left: 0,
        backgroundColor: "rgba(149, 164, 177, 0.8)",
        flexDirection: "row",
        justifyContent: "space-between",
        itemsAlign: "center",
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 25,
        borderCurved: "continuous",
        shadowColor: "#000",
        shadowOffset: {
            width: 0, height: 10
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        //opacity: 0.1,
        
    },

    TextColors:{
        flex: 1,
        color: colors.text,
        //backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    }

})