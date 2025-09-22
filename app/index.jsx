import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import TipsCard from '../components/TipsCard'

const Free_Tips = () => {
  return (
    <ScrollView contentContainerStyle = {{paddingBottom: 90}}>
      <TipsCard/ >
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

export default Free_Tips

const styles = StyleSheet.create({})