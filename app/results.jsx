import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import TipsCard from '../components/TipsCard'


const Results_Page = () => {
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

export default Results_Page

const styles = StyleSheet.create({})