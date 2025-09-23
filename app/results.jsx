import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import TipsCard from "../components/TipsCard";


const ResultsPage = () => {
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
}

export default ResultsPage

const styles = StyleSheet.create({})