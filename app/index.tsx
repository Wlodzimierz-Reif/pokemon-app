import * as Haptics from "expo-haptics";
import { Link, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import useFadeAnimation from "../components/hooks/ButtonAnimation";
import PokemonCard from "../components/PokemonCard";
import { Colors } from "../constants/Colors";
import type { BasePokemon } from "../types";
import { FavouritesContext } from "./_layout";

const Home = () => {
  const [pokemons, setPokemons] = useState<BasePokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [displayLoadMoreButton, setDisplayLoadMoreButton] =
    useState<boolean>(true);
  const [displayLoadInitial, setDisplayLoadInitial] = useState<boolean>(false);

  const favouritesContext = useContext(FavouritesContext);
  const { favourites } = favouritesContext || {};

  const router = useRouter();
  const searchAnim = useFadeAnimation();
  const favAnim = useFadeAnimation();

  const fetchInitialData = async () => {
    try {
      const offset = pokemons && pokemons?.length > 0 ? pokemons.length : 0;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
      );
      const data = await response.json();
      setPokemons((prev) => [...prev, ...data.results]);
      setDisplayLoadMoreButton(true);
      setDisplayLoadInitial(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSearchedPokemon = async (searchTerm: string) => {
    try {
      setIsFetching(true);
      setPokemons([]);
      setDisplayLoadMoreButton(false);
      setDisplayLoadInitial(true);
      const trimmedSearchTerm = searchTerm.trim();
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${trimmedSearchTerm}`
      );
      const data = await response.json();
      setPokemons([data]);
      setIsFetching(false);
    } catch {
      setIsFetching(false);
    }
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    fetchSearchedPokemon(searchTerm.toLowerCase());
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const displayNoResults = pokemons && pokemons.length === 0 && !isFetching;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Find your pokemon!</Text>
      <TextInput
        style={[styles.input, { height: 40, padding: 5 }]}
        placeholder="Enter pokemon name"
        onChangeText={(newSearchTerm) => setSearchTerm(newSearchTerm)}
        defaultValue={searchTerm}
        onSubmitEditing={handleSearch}
      />
      <Pressable
        onPress={() => {
          handleSearch();
        }}
        onPressIn={searchAnim.fadeIn}
        onPressOut={searchAnim.fadeOut}
      >
        <Animated.View
          style={{
            opacity: searchAnim.animated,
            margin: 10,
            padding: 10,
            backgroundColor: Colors.orangeSoda,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Search</Text>
        </Animated.View>
      </Pressable>
      <Pressable
        onPress={() => {
          router.push("/Favourites");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }}
        onPressIn={favAnim.fadeIn}
        onPressOut={favAnim.fadeOut}
      >
        <Animated.View
          style={{
            opacity: favAnim.animated,
            margin: 10,
            padding: 10,
            backgroundColor: Colors.shandy,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Favourites</Text>
        </Animated.View>
      </Pressable>
      <ScrollView
        style={{ width: "100%", gap: 10 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {pokemons?.map((pokemon) => (
          <Link
            href={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            style={{ marginVertical: 5 }}
            onPress={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            }
          >
            <PokemonCard
              name={pokemon.name}
              isFavourite={favourites?.includes(pokemon.name)}
            />
          </Link>
        ))}
        {displayNoResults && !isFetching && (
          <View>
            <Text>No results found for "{searchTerm}"</Text>
          </View>
        )}
        {displayLoadInitial && !isFetching && (
          <Button
            title="Load initial"
            onPress={() => {
              fetchInitialData();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
        )}
        {isFetching && <ActivityIndicator size="large" />}
        {displayLoadMoreButton && !displayNoResults && (
          <Button
            title="Load more"
            onPress={() => {
              fetchInitialData();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.Linen,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    margin: 10,
    padding: 50,
    backgroundColor: Colors.orangeSoda,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
