import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../constants/colors"

const StatsCard = () => {
  return (
    <View style = {styles.container}>
      <Text style = {{textAlign: "center" , color: colors.text, fontWeight: "bold", fontSize: 20}}>STATISTICS</Text>
      <View style = {styles.statCardContainer}>
        <View style = {styles.statCard}>
          <Text style = {styles.statText}> 74%</Text>
          <Text style = {styles.statDesc}> WIN RATE</Text>
        </ View>

        <View style = {styles.statCard}>
          <Text style = {styles.statText}> 128</Text>
          <Text style = {styles.statDesc}> TOTAL TIPS</Text>
        </View>
      </View>
    </View>
  )
}

export default StatsCard

const styles = StyleSheet.create({
    container: {
      //flex: 1,
              flexDirection: "column",
              width: "90%",
              height: 150,
              marginBottom: 20,
              backgroundColor: colors.card,
              justifyContent: "space-between",
              alignItems: "left",
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.borderColor,
              paddingTop: 10,
    },

    statCardContainer :{
        height: 100,
        //backgroundColor: "red",
        justifyContent: 'space-between',
        alignItems: "flex-end",
        flexDirection: "row",
        paddingHorizontal: 60
    },

    statCard :{
      //flex: 1,

      height: 90,
      width: 90,
      backgroundColor: colors.cardmini,
      marginBottom: 10,
      borderRadius:10,
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: 30,
      paddingBottom: 10,
    },

    statText: {
      color: colors.accent,
      fontSize: 26,
      fontWeight: "bold"
    },

    statDesc: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "bold"
    }
})