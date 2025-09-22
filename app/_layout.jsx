import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs
    tabBar={props => <TabBar {...props} />}
    >
          <Tabs.Screen name="index"
          options={{
            title: 'FREE TIPS',
            headerTitleAlign: "center",
            tabBarLabelStyle: styles.tabLabel,   
            headerStyle: styles.headerContainer, 
            headerTitleStyle: styles.headerText,
          }}
          />
          <Tabs.Screen name = "premium"
            options ={{
              title: 'PREMIUM TIPS',
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
    backgroundColor: "#708090",
    
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