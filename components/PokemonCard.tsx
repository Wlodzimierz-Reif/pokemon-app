import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";

const PokemonCard = ({ name }: { name: string }) => {
  const capitalisedName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View style={styles.container}>
      <Text>{capitalisedName}</Text>
      <Text>Star</Text>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    backgroundColor: Colors.mellowApricot,
  },
});
