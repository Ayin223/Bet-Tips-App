import { Tabs } from 'expo-router';
import { PixelRatio, StyleSheet } from 'react-native';
import CustomStackedHeader from "../components/CustomStackedHeader";
import TabBar from '../components/TabBar';
import { DateProvider } from '../context/DateContext';

const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const _layout = () => {
    return (
        <DateProvider>
            <Tabs
                tabBar={props => <TabBar {...props} />}
            >
                <Tabs.Screen name="index"
                    options={{
                        headerTitle: 'FREE TIPS',
                        title: 'FREE',
                        header: ({options}) => <CustomStackedHeader title = {options.headerTitle}/>
                    }}
                />
                <Tabs.Screen name = "premium"
                    options ={{
                        headerTitle: 'PREMIUM TIPS',
                        title: 'PREMIUM',
                        header: ({options}) => <CustomStackedHeader title = {options.headerTitle}/>
                    }} 
                />
                <Tabs.Screen name = "statistics"
                    options ={{
                        title: 'DASHBOARD',
                        headerTitleAlign: "center",
                        tabBarLabelStyle: styles.tabLabel, 
                        headerStyle: styles.headerContainer, 
                        headerTitleStyle: styles.headerText,
                    }} 
                />
                <Tabs.Screen name ="info"
                    options={{
                        title: 'INFO',
                        headerTitleAlign: "center",
                        tabBarLabelStyle: styles.tabLabel, 
                        headerStyle: styles.headerContainer, 
                        headerTitleStyle: styles.headerText,
                    }}
                />
            </Tabs>
        </DateProvider>
    )
}

export default _layout

const styles = StyleSheet.create({
    headerContainer: {
        //flexDirection: "column",
        backgroundColor: "#081d3fff",
        //height: 200,
    },
    headerText: {
        fontSize: scaleFont(20),
        fontWeight: 'bold',
        color: 'white', 
    },
    headerLeftStyle: {
        width: '60%', 
    },
    tabLabel: {
        fontSize: scaleFont(16),
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: 'white', 
    },
})