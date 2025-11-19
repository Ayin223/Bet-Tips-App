import moment from 'moment';
import { createContext, useContext, useEffect, useState } from 'react';
import fetchTips from '../components/fetchTips';

const DateContext = createContext();

export const useDateContext = () => useContext(DateContext);

const getAvailableDates = (tips) => {
    const dates = new Set(tips.map(tip => tip.matchDate)); 
    return Array.from(dates).sort(); 
};

export const DateProvider = ({ children }) => {
    const [allTips, setAllTips] = useState([]);
    const [allStatistics, setAllStats] = useState([]);
    const [allAvailableDates, setAllAvailableDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
    const [isRefreshing, setIsRefreshing] = useState(false);

    const loadTips = async () => {
        setIsRefreshing(true);
        try {
            let data = await fetchTips();
            const tipsData = data.tipsData
            const statData = data.statData
            // console.log(tipsData)
            setAllTips(tipsData);
            setAllStats(statData)
            
            const dates = getAvailableDates(tipsData);
            setAllAvailableDates(dates);
            
            setSelectedDate(dates[7] || moment().format('YYYY-MM-DD'));
        } catch (error) {
            console.error("Failed to load tips:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        loadTips();
    }, []); 

    const value = {
        allTips, 
        allStatistics,
        allAvailableDates,
        selectedDate, 
        setSelectedDate,
        isRefreshing,
        loadTips,
    };

    return (
        <DateContext.Provider value={value}>
            {children}
        </DateContext.Provider>
    );
};