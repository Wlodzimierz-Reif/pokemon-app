import { Link } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import PokemonCard from "../components/PokemonCard";
import { FavouritesContext } from "./_layout";

const Favourites = () => {
  const favouritesContext = useContext(FavouritesContext);
  const { favourites } = favouritesContext || {};

  return (
    <View style={styles.container}>
      {favourites && favourites.length > 0 ? (
        favourites.map((favPokemon) => (
          <Link
            href={`/pokemon/${favPokemon}`}
            key={favPokemon}
            style={{ marginVertical: 5 }}
          >
            <PokemonCard name={favPokemon} />
          </Link>
        ))
      ) : (
        <Text>No favourites added yet.</Text>
      )}
    </View>
  );
};

export default Favourites;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.Linen,
    flex: 1,
  },
});
