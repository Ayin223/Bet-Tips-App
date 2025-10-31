import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import StatsCard from "../components/StatsCard";
import TipsCard from "../components/TipsCard";
import { colors } from "../constants/colors";
import { db } from "../firebase";

const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);
  const [stat, setStat] = useState([]);

  useEffect(() => {
        
      const tipsRef = collection(db, "tips");
      const statRef = collection(db, "stat");

// tips query
      const freeTipsQuery = query(
        tipsRef, where("status", "==", true),
                 where("outcome", "in", ["WON", "LOST"]),
                 orderBy("matchDate", "desc"),
                 orderBy("matchTime", "desc"));
  
      const unsubscribeTips = onSnapshot(freeTipsQuery, (querySnapshot) => {
        const tipsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        }));
        setTips(tipsData);
        setLoading(false);
      });

      const unsubscribeStat = onSnapshot(statRef, (querySnapshot) => {
        const statData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        }));
        setStat(statData);
        setLoading(false);
      });


// stat query


    return () => {unsubscribeTips(); unsubscribeStat};
  }, []);


  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      data={tips}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <TipsCard tip={item} />}
      contentContainerStyle={{ paddingBottom: 120, paddingTop: 20 }}
      style = {{backgroundColor: colors.background} }


      ListHeaderComponent = {
        <FlatList
          data = {stat}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => <StatsCard stat={item} />}
        />

      }
    />
  );
}

export default ResultsPage

const styles = StyleSheet.create({})