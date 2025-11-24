import { StyleSheet, Text, View } from 'react-native'
import { colors } from "../constants/colors"
import MyBarChart from "./myBarChart"
import MyPieChart from "./myPieChart"
import MySpeedometer from './mySpeedometer'
import Quote from './Quote'

const StatsCard = ({stat}) => {
  return (
    <View>
      <View style = {styles.container}>
        <Text style = {{color: "white", marginBottom: 20, fontWeight: "bold", fontSize: 18}}>OVERALL WINRATE</Text>
        <MySpeedometer data = {stat} speedometerKeys={['winRate']}/>
      
      </View>
      
      <View style = {styles.chartContainer}>
        <Text style = {{color: "white", marginBottom: 20, fontWeight: "bold", fontSize: 18}}>PREMIUM  VS  FREE TIPS</Text>

        <View style = {{flexDirection: "row", alignItems: "center"}}>
          <MyBarChart data = {stat} barKeys={["premium", "free"]}/>
          <MyPieChart data = {stat} pieKeys={["wins" , "losses"]}/>
        </View>
        
      </View>
      
      <View style = {styles.chartContainer}>
        <Quote/>
      </View>
      
    </View>
    

    
  )
}

export default StatsCard

const styles = StyleSheet.create({
    container: {
      //flex: 1,
              // flexDirection: "column",
              width: "90%",
              height: 200,
              marginBottom: 20,
              backgroundColor: colors.card,
              // justifyContent: "center",
              alignItems: "center",
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
        paddingHorizontal: 60,
        marginBottom: 50,
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
      paddingTop: 25,
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
    },

    chartContainer: {
      // flexDirection: "row",
      width: "90%",
      // height: 150,
      marginBottom: 20,
      backgroundColor: colors.card,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.borderColor,
      paddingTop: 10,
    }
})