import { PixelRatio, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const MyBarChart = ({ data, barKeys }) => {
  const barData = Object.entries(data)
    .filter(([key]) => barKeys.includes(key))
    .map(([key, value]) => ({
      value: Number(value),
      label: key,
    }));

  return (
    <View>
      <BarChart
        data={barData}
        showGradient
        gradientColor="blue"
        hideRules={true}
        width={150}
        barWidth={30}
        height={200}
        yAxisThickness={0}
        xAxisThickness={0}
        noOfSections={1}
        initialSpacing={0}
        barBorderRadius={10}
        
      />
    </View>
  );
};

export default MyBarChart

const styles = StyleSheet.create({})