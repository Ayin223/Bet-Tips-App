import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'
import TabBar from '../components/TabBar'
import { colors } from '../constants/colors'

const _layout = () => {
  return (
    <Tabs
    tabBar={props => <TabBar {...props} />}
    >
          <Tabs.Screen name="index"
          options={{
            //headerShown: false,
            title: 'FREE',
            headerTitleAlign: "center",
            tabBarLabelStyle: styles.tabLabel,   
            headerStyle: styles.headerContainer, 
            headerTitleStyle: styles.headerText,
          }}
          />
          <Tabs.Screen name = "premium"
            options ={{
              title: 'PREMIUM',
              headerTitleAlign: "center",
              tabBarLabelStyle: styles.tabLabel,   
              headerStyle: styles.headerContainer, 
              headerTitleStyle: styles.headerText,
            }} 
          />
          <Tabs.Screen name ="info"
            options={{
              title: 'INFO',
              headerTitleAlign: "center",
              tabBarLabelStyle: styles.tabLabel,   
              headerStyle: styles.headerContainer, 
              headerTitleStyle: styles.headerText,
            }}
          />
          <Tabs.Screen name = "results"
          options ={{
            title: 'RESULTS',
            headerTitleAlign: "center",
            tabBarLabelStyle: styles.tabLabel,   
            headerStyle: styles.headerContainer, 
            headerTitleStyle: styles.headerText,

          }} 
          
          />


    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.background,
    //borderBottomWidth: 1,
    
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', 
   
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: 'white', 
  },
})