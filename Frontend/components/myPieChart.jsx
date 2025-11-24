import { StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const MyPieChart = ({ data, pieKeys}) => {

  const pieData = Object.entries(data)
    .filter(([key]) => pieKeys.includes(key))
    .map(([key, value]) => ({
      value: Number(value),
      label: key,
    }));

  return (
      <PieChart
        data={pieData}
        radius={80}
        donut
        innerRadius={40}
        innerCircleColor={"#1A2B44"}
        focusOnPress
        strokeWidth={0}
        width={200}
        height={200}
        showText
      />
  );
};

export default MyPieChart

const styles = StyleSheet.create({})