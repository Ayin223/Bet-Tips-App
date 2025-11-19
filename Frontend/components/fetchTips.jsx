import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import moment from 'moment';
import { db } from "../firebase.jsx";

const fetchTips = async () => {
    const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');
    
    try {
        const collectionRef = collection(db, "tips");
        const collectionStatRef = collection(db, "stat");
        
        const q = query(
            collectionRef,
            where("matchDate", ">=", sevenDaysAgo),
            orderBy("matchTime", "asc"),
        );

        const snapshot = await getDocs(q); 
        const snapshotStatData = await getDocs(collectionStatRef); 

        const statData = snapshotStatData.docs.map(stat =>{
            const data = stat.data();
            return{
                id: stat.id,
                ...data
            }
        })
        

        const tipsData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id, 
                ...data,
            };
        });

        //console.log(`Fetched ${tipsData.length} tips for the last 7 days.`);

        return {tipsData, statData};
    } catch (err) {
        console.error("Error fetching tips: ", err);
        return []; 
    }
}

export default fetchTips;