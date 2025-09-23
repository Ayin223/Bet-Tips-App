import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TipsFeed from './TipsFeed';

const TipsCard = ({tip}) => {

  if (!tip) return null;
   
  return (
    <View style={styles.container}>
        <View style = {styles.leagueContainer}>
        <Text style= {{fontWeight: "bold", fontSize: 18,}}>{tip.league}</Text>
        </View>
        
        <View style = {styles.teamsContainer}>
            <Text style= {[styles.teams, {textAlign: "right"}]}>{tip.homeTeam}</Text>
             <Text style= {{ }}>vs</Text>
            <Text style= {[styles.teams, {textAlign:"left"}]}>{tip.awayTeam}</Text>
        </View>

        <View style = {styles.tipsContainer}>
            <Text style = {[styles.tips,{textAlign: "right",}]}>{tip.prediction}</Text>
            <Text style= {{}}> @ </Text>
            <Text style= {[styles.tips,{textAlign: "left",}]}>{tip.odds}</Text>        
        </View>

        <View style = {styles.dateContainer}>
            <Text style= {styles.date}>{tip.date}</Text>
        </View>
    </View>
  )
}

export default TipsCard

 const baseContainer = {
        backgroundColor: "white",
        width: "90%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 0.5,
    };

const styles = StyleSheet.create({
    container:{
        //flex: 1,
        flexDirection: "column",
        width: "80%",
        height: 150,
        marginVertical: 10,
        backgroundColor: "lightgray",
        justifyContent: "space-between",
        alignItems: "center",
        alignSelf: "center",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "black",
        shadowOffset: {
            width: 0, height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    

    leagueContainer:{
        borderBottomWidth: 1,
        backgroundColor: "lightblue",
        width: "100%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ddd",
        borderBottomWidth: 1,
        //borderStyle: "dashed",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        
    
    },
    
    
    teamsContainer:{
        ...baseContainer,
        //width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //gap: 10,
        alignSelf: "center",
    },

    teams: {
        width: "45%", 
        marginHorizontal: 5,
    },

    tipsContainer:{
        ...baseContainer,
    flexDirection: "row",},

    tips:{
        width: "45%",   
        marginHorizontal: 5,
    },


    oddsContainer:baseContainer,

    dateContainer:{
        ...baseContainer,
        marginBottom: 0,
        },
        
})