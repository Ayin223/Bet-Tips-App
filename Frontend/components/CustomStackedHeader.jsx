// app/components/CustomStackedHeader.js
import { StyleSheet, Text, View } from 'react-native';
import DateFilterHeader from './DateFilterHeader'; // Your horizontal date filter

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
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    dateBarContainer: {
        flexDirection: 'row', 
        alignItems: 'center',
    }
});