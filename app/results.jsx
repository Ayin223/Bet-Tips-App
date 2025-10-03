import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import StatsCard from "../components/StatsCard";
import TipsCard from "../components/TipsCard";
import { colors } from "../constants/colors";
import { db } from "../firebase";


const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);

  useEffect(() => {
        
      const tipsRef = collection(db, "tips");
      const freeTipsQuery = query(
        tipsRef, where("status", "==", true),
                 where("outcome", "in", ["WON", "LOST"]));
  
      const unsubscribe = onSnapshot(freeTipsQuery, (querySnapshot) => {
        const tipsData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          key: doc.id,
        }));
        setTips(tipsData);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);


  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      data={tips}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <TipsCard tip={item} />}
      contentContainerStyle={{ paddingBottom: 70, paddingTop: 20 }}
      style = {{backgroundColor: colors.background} }


      ListHeaderComponent = {
        <StatsCard/>

      }
    />
  );
}

export default ResultsPage

const styles = StyleSheet.create({})