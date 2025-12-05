import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Disclaimer from '../components/disclaimer.jsx';
import InfopageCard from '../components/InfopageCard.jsx';
import { colors } from "../constants/colors.jsx";
import { useDateContext } from '../context/DateContext.jsx';

const InfoPage = () => {
    const { 
        allStatistics,  
        isRefreshing, 
        loadTips
    } = useDateContext();

    if (allStatistics.length === 0 && !isRefreshing) {
        return <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />;
    }

    return (
        <LinearGradient
            colors={['rgba(56, 64, 75, 1)', 'rgba(0, 44, 102, 0.86)', "rgba(66, 64, 68, 0.94) "]}    // your preferred colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{flex:1}} 
        >
            <FlatList
                data={allStatistics}
                keyExtractor={(item) => item.id || item.key}
                renderItem={() => <InfopageCard/>}
                onRefresh={loadTips}
                refreshing={isRefreshing}
                contentContainerStyle={styles.listContent}
                // style={styles.container}
                ListFooterComponent={()=> <Disclaimer/>}
                ListFooterComponentStyle = {{alignItems: "center", marginBottom: 100}}
            />
        </LinearGradient>
        
    );
}

export default InfoPage

const styles = StyleSheet.create({
  container: {
        backgroundColor: colors.background,
        flex: 1,
    },
    listContent: { 
        // paddingBottom: 120, 
        paddingTop: 20
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})