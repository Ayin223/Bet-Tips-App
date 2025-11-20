import { StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
const Charts = ({data, keysToShow}) => {
  const chartData = Object.entries(data)
   .filter(([key]) => keysToShow.includes(key))
  .map(([key, value]) => ({
    value: value,
    label: key,
  }));

  return (
    <BarChart 
        data = {chartData}
        showGradient
        gradientColor={"blue"}
        hideRules = {true}
    />
  )
}

export default Charts

const styles = StyleSheet.create({})