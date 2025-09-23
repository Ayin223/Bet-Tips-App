import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import TipsCard from "./TipsCard";

const TipsFeed = () => {
  const [loading, setLoading] = useState(true);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tips"), (querySnapshot) => {
      const tipsData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        key: doc.id,
      }));
      setTips(tipsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  console.log(tips);

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

export default TipsFeed;
