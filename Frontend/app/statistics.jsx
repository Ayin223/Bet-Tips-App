import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import StatsCard from "../components/StatsCard.jsx";
import { colors } from "../constants/colors.jsx";
import { useDateContext } from '../context/DateContext.jsx';

const results = () => {
  
    const { 
        allStatistics,  
        isRefreshing, 
        loadTips
    } = useDateContext();

    if (allStatistics.length === 0 && !isRefreshing) {
        return <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />;
    }

    return (
        <FlatList
            data={allStatistics}
            keyExtractor={(item) => item.id || item.key}
            renderItem={({ item }) => <StatsCard stat={item} />}
            onRefresh={loadTips}
            refreshing={isRefreshing}
            contentContainerStyle={styles.listContent}
            style={styles.container}
        />
    );
}

export default results

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