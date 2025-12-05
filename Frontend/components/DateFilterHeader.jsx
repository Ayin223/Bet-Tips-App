import moment from 'moment';
import { PixelRatio, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';
import { useDateContext } from '../context/DateContext';

const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const DateFilterHeader = () => {
    const { selectedDate, setSelectedDate, allAvailableDates } = useDateContext();

    const datesToShow = allAvailableDates.slice(2, 9);

    if (datesToShow.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Dates...</Text>
            </View>
        );
    }

    return (
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            {datesToShow.map((dateString) => {
                const isSelected = dateString === selectedDate;
                
                const formattedDay = moment(dateString).format('ddd');
                const formattedDate = moment(dateString).format('DD');

                return (
                    <Pressable
                        key={dateString}
                        onPress={() => setSelectedDate(dateString)}
                        style={[
                            styles.dateButton,
                            isSelected && styles.dateButtonSelected
                        ]}
                    >
                        <Text style={[styles.dayText, isSelected && styles.textSelected]}>
                            {formattedDay}
                        </Text>
                        <Text style={[styles.dateText, isSelected && styles.textSelected]}>
                            {formattedDate}
                        </Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
};

export default DateFilterHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingLeft: 10,
    },
    contentContainer: {
        alignItems: 'center',
    },
    dateButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 10,
        backgroundColor: colors.background,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)', 
        alignItems: 'center',
    },
    dateButtonSelected: {
        backgroundColor: 'white', 
        borderColor: 'white',
    },
    dayText: {
        fontSize:scaleFont(12),
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.8)', 
    },
    dateText: {
        fontSize:scaleFont(18),
        fontWeight: 'bold',
        color: 'white', 
    },
    textSelected: {
        color: colors.background, 
    },
    loadingContainer: {
        paddingLeft: 10,
        justifyContent: 'center',
    },
    loadingText: {
        color: 'white',
        fontSize:scaleFont(14),
    }
});