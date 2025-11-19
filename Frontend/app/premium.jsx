import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import TipsCard from "../components/TipsCard";
import { colors } from "../constants/colors.jsx";
import { useDateContext } from '../context/DateContext.jsx';

const PremiumTips = () => {

    const { 
        allTips, 
        selectedDate, 
        isRefreshing, 
        loadTips
    } = useDateContext();

    const filteredTips = allTips.filter(tip => 
        tip.matchDate === selectedDate && tip.isPremium === true
    );

    if (allTips.length === 0 && !isRefreshing) {
        return <ActivityIndicator size="large" color={colors.primary} style={styles.loading} />;
    }

    return (
        <FlatList
            data={filteredTips}
            keyExtractor={(item) => item.id || item.key}
            renderItem={({ item }) => <TipsCard tip={item} />}
            onRefresh={loadTips}
            refreshing={isRefreshing}
            contentContainerStyle={styles.listContent}
            style={styles.container}
        />
    );
}

export default PremiumTips

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