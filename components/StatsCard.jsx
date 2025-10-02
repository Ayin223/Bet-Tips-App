import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../constants/colors"

const StatsCard = () => {
  return (
    <View style = {styles.container}>
      <Text style = {{textAlign: "center"}}>STATS</Text>
      <View style = {styles.statCardContainer}>
        <View style = {styles.statCard}>
          <Text> 74%</Text>
          <Text> WIN RATE</Text>
        </ View>

        <View style = {styles.statCard}>
          <Text> 128</Text>
          <Text> TOTAL GAMES</Text>
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
              height: 140,
              marginBottom: 20,
              backgroundColor: colors.card,
              justifyContent: "space-between",
              alignItems: "left",
              alignSelf: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: colors.borderColor,
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
      width: 100,
      backgroundColor: colors.cardmini,
      marginBottom: 10,
      borderRadius:10,
      alignItems: "center",
      justifyContent: "space-between",
    }
})