import { PixelRatio, StyleSheet, Text, View } from 'react-native'
import { colors } from "../constants/colors"
import MyBarChart from "./myBarChart"
import MyPieChart from "./myPieChart"
import MySpeedometer from './mySpeedometer'


const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const StatsCard = ({stat}) => {
  return (
    <View>
      <View style = {styles.container}>
        <Text style = {{color: "white", marginBottom: 20, fontWeight: "bold", fontSize: scaleFont(18)}}>OVERALL WINRATE</Text>
        <MySpeedometer data = {stat} speedometerKeys={['winRate']}/>
      
      </View>
      
      <View style = {styles.chartContainer}>
        <Text style = {{color: "white", marginBottom: 20, fontWeight: "bold", fontSize: scaleFont(18)}}>PREMIUM  VS  FREE TIPS</Text>

        <View style = {{flexDirection: "row", alignItems: "center"}}>
          <MyBarChart data = {stat} barKeys={["premium", "free"]}/>
          <MyPieChart data = {stat} pieKeys={["wins"]}/>
        </View>
        
      </View>
      
      <View style = {styles.statCard}>
        <View style={[styles.statCardText, {backgroundColor: "#41d4f53d"}]}>
          <Text style = {styles.statText}>
            {stat.totalTips}
          </Text>
          <Text style = {{color: "black", fontWeight: "bold"}}>TOTAL</Text>
        </View>
        
        <View style={[styles.statCardText, {backgroundColor: "#78f97175"}]}>
          <Text style = {styles.statText}>
            {stat.wins}
          </Text>
          <Text style = {{color: "black", fontWeight: "bold"}}>WINS</Text>
        </View>
        
        <View style={[styles.statCardText, {backgroundColor: "#fe5500ff"}]}>
          <Text style = {styles.statText}>
            {stat.losses}
          </Text>
          <Text style = {{color: "black", fontWeight: "bold"}}>LOSSES</Text>
        </View>
        
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

    statCardText :{
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

    statCard :{
       flexDirection: "row",
      width: "90%",
      // height: 80,
      marginBottom: 20,
      backgroundColor: colors.card,
      justifyContent: "space-evenly",
      // alignItems: "center",
      alignSelf: "center",
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.borderColor,
      paddingTop: 10,
    },

    statText: {
      color: colors.text,
      fontSize: scaleFont(26),
      fontWeight: "bold"
    },

    statDesc: {
      color: colors.text,
      fontSize: scaleFont(14),
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