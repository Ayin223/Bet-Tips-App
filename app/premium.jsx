import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import TipsCard from "../components/TipsCard";
import { db } from "../firebase";

const PremiumTips = () => {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);

  useEffect(() => {
        // 🔹 Create a query to fetch only non-premium tips
      const tipsRef = collection(db, "tips");
      const freeTipsQuery = query(tipsRef, where("isPremium", "==", true));
  
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
      contentContainerStyle={{ paddingVertical: 20 }}
    />
  );
};

export default PremiumTips;

const styles = StyleSheet.create({});
