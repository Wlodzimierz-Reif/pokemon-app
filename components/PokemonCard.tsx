import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";

const PokemonCard = ({
  name,
  isFavourite,
}: {
  name: string;
  isFavourite?: boolean;
}) => {
  const capitalisedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View style={styles.container}>
      <Text>{capitalisedName}</Text>
      {isFavourite && <Text>★</Text>}
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: Colors.mellowApricot,
  },
});
