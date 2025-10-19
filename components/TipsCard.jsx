import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors.jsx';

const TipsCard = ({tip}) => {

  if (!tip) return null;
   
  return (
    <View style={styles.container}>
        <View style = {[styles.decorContainer, {justifyContent: tip.isPremium === false? "flex-end": "space-between" }]}>
            
            {tip.isPremium? (
                <View style={styles.premiumContainer}>
                    <Text style={{ fontSize: 18, }}>💎</Text>
                </View>
                ) : null}

            <View style = {[styles.statusContainer, {backgroundColor: tip.outcome === "WON" ? "green" : tip.outcome ==="LOST" ? "red": colors.accent }]}>
                <Text style= {{fontSize: 12, color: colors.text, fontWeight: "bold"}}>{tip.outcome}</Text>
            </View>            
        </View>

        <View style = {styles.leagueContainer}>
         <Text style= {{fontWeight: "bold", fontSize: 16, color: colors.accent,}}>{tip.league}</Text>
         <Text style= {{fontWeight: "bold", fontSize: 14, color: colors.textMuted,}}>{tip.matchDate} @ {tip.matchTime}</Text>
        </View>
        
        <View style = {styles.teamsContainer}>
            <Text style= {[styles.teams, {textAlign: "right", fontSize: 16,fontWeight: "bold", color: colors.text,}]}>{tip.homeTeam}</Text>
             <Text style= {{fontSize: 18,fontWeight: "bold", color: colors.text, }}>vs</Text>
            <Text style= {[styles.teams, {textAlign:"left",fontSize: 16,fontWeight: "bold", color: colors.text,}]}>{tip.awayTeam}</Text>
        </View>

        <View style = {styles.tipsContainer}>
            <Text style = {[styles.tips,{textAlign: "right",}]}>Prediction:</Text>
            <Text style= {[styles.tips,{textAlign: "left", fontWeight: "bold", fontSize: 16, color: colors.text}]}>{tip.prediction}</Text>        
        </View>

        <View style = {styles.tipsContainer}>
            <Text style = {[styles.tips,{textAlign: "right",}]}>Odds:</Text>

            <View style= {[styles.tipsButton,{}]}>
                <Text style= {[styles.tips,{textAlign: "left", color: colors.accent, fontWeight: "bold"}]}>{tip.odds}</Text>        
            </View>

        </View>

        <View style = {styles.tipsContainer}>
            <Text style = {[styles.tips,{textAlign: "right",}]}>Confidence:</Text>
            
            <View style= {[styles.tipsButton,{}]}>
                <Text style= {[styles.tips,{textAlign: "left", color: colors.accent, fontWeight: "bold"}]}>{Math.round(tip.confidence*100)}%</Text>        
            </View>

        </View>

    </View>
  )
}

export default TipsCard


const styles = StyleSheet.create({
    textColors:{
        color: colors.text,
    },

    container:{
        //flex: 1,
        flexDirection: "column",
        width: "90%",
        //height: 240,
        marginBottom: 20,
        backgroundColor: colors.card,
        //justifyContent: "space-between",
        //alignItems: "flex-end",
        alignSelf: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.borderColor,
        
    },

    statusContainer:{
        backgroundColor: colors.accent,
        //flex: 1,
        //marginLeft: 240,
        marginTop: 10,
        //width: 50,
        paddingHorizontal: 5,
        paddingVertical: 1,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        //marginLeft: 50,
        
    },

    decorContainer: {
        //flex: 2,
        flexDirection: "row",
        //backgroundColor: "red",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal:10,
    },

    premiumContainer: {
        //backgroundColor: colors.accent,
        //flex: 1,
        //marginLeft: 300,
        marginTop: 5,
        // width: 50,
        // height: 20,
        paddingHorizontal: 5,
        //borderRadius: 20,
        //justifyContent: "center",
        //alignItems: "center",
        //flexDirection: "row",
    },

    leagueContainer:{
        flexDirection: "row",
        //backgroundColor: "green",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 10,

    },

    teamsContainer:{
        //backgroundColor: colors.accent,
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 15,
        flexDirection: "row"
    },

    tipsContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 15,
        marginBottom: 10,
    },

    tipsButton: {
        backgroundColor: colors.cardmini,
        paddingHorizontal: 5,
        paddingVertical: 1,
        //height: 20,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    tips:{
        fontSize: 14,
        color: colors.textMuted,
    },  
        
})