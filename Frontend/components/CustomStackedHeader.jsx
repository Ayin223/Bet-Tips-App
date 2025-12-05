import { PixelRatio, StyleSheet, Text, View } from 'react-native';
import DateFilterHeader from './DateFilterHeader';
const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const CustomStackedHeader = ({ title }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            
            <View style={styles.dateBarContainer}>
                <DateFilterHeader />
            </View>
        </View>
    );
};

export default CustomStackedHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#081d3fff",
        paddingTop: 40, 
        paddingBottom: 5,
        //height: 150, 
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5,
    },
    headerText: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: 'white',
    },
    dateBarContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    }
});