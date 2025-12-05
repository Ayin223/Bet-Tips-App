import { PixelRatio, StyleSheet, Text, View } from 'react-native';

const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const Disclaimer = () => {
  return (
    <View>
      <Text style = {{color: "#B8C3D1", fontWeight: "bold"}}>Bet responsibly. 18+ only</Text>
    </View>
  )
}

export default Disclaimer

const styles = StyleSheet.create({})