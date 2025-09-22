import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import TipsCard from '../components/TipsCard'

const Premium_Tips = () => {
  return (
     <ScrollView contentContainerStyle = {{paddingBottom: 90}}>
      <TipsCard/>
      <TipsCard/>
      <TipsCard/>
      <TipsCard/>
      <TipsCard/>
      <TipsCard/>
      <TipsCard/>
      <TipsCard/>
      <TipsCard/>
    </ScrollView>
  )
}

export default Premium_Tips

const styles = StyleSheet.create({})