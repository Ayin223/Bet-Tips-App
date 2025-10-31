import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import TipsCard from "../components/TipsCard";
import { colors } from "../constants/colors.jsx";
import { db } from "../firebase";

const FreeTips = () => {

const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);

  useEffect(() => {
      // 🔹 Create a query to fetch only non-premium tips
    const tipsRef = collection(db, "tips");
    const freeTipsQuery = query(
      tipsRef, where("isPremium", "==", false), 
               where("outcome", "==", "PENDING"),
              orderBy("matchDate", "asc"),
              orderBy("matchTime", "asc"));


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
          contentContainerStyle={{ paddingBottom: 120 , paddingTop: 20}}
          style={{backgroundColor: colors.background}}
        />
 
  );

}

export default FreeTips

const styles = StyleSheet.create({})