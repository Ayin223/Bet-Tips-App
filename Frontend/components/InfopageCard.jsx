import { Linking, PixelRatio, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from "../constants/colors";

const scaleFont = (size) => (size+2) * PixelRatio.getFontScale();

const InfopageCard = () => {

  const links = [
    { label: "Get Premium", url: "https://google.com" },
    { label: "Restore Purchase", url: "https://playstore.com" },
    { label: "Privacy Policy", url: "https://playstore.com" },
    { label: "Terms & Conditions", url: "https://playstore.com" },
    { label: "Disclaimer", url: "https://playstore.com" },
    { label: "Share", url: "https://playstore.com" },
    { label: "Rate Us", url: "https://playstore.com" },
  ];

  const openURL = (url) => {
    Linking.openURL(url);
  };

  return (
    <View>
      {links.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => openURL(item.url)}
          style={styles.button}
        >
          <View style={styles.infoCard}>
            <Text style={[styles.text, {fontSize: scaleFont(16)}]}>{item.label}</Text>
            <Text style={[styles.text, {color: colors.textMuted}]}>⟩</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default InfopageCard;

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: colors.card,
    flexDirection: "row",
    height: 60,
    width: "90%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 40,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: scaleFont(18),
    fontWeight: "bold",
    color: colors.text
  },
  button: {
    marginBottom: 20
  }
});
