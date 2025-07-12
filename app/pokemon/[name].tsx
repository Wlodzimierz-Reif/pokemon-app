import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { FavouritesContext } from "../_layout";
import { Colors } from "../../constants/Colors";

const pokemonView = () => {
  const { name } = useLocalSearchParams();
  // TODO: Add types for pokemon and species
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);
  const [isFavourite, setIsFavourite] = useState<boolean | undefined>(
    undefined
  );

  const favouritesContext = useContext(FavouritesContext);
  const { favourites, handleAddToFavourites, handleRemoveFromFavourites } =
    favouritesContext || {};

  const fetchSpecies = React.useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data?.varieties;
    } catch (error) {
      console.error("Error fetching species data:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (name) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        let species = null;
        if (data?.species) {
          // Fetch species data separately
          species = await fetchSpecies(data.species.url);
          setSpecies(species);
        }
        setPokemon(data);
      }
    };
    fetchPokemon();
  }, [name, fetchSpecies]);

  useEffect(() => {
    if (favourites && pokemon) {
      setIsFavourite(favourites.includes(pokemon.name));
    }
  }, [favourites, pokemon]);

  // TODO: add type for species
  const speciesList = species
    ? species.map((s: any) => {
        return { key: s.pokemon.name, name: s.pokemon.name };
      })
    : [];

  // TODO: add type for stats
  const baseStats = pokemon?.stats
    ? pokemon.stats.map((stat: any) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      }))
    : [];

  return (
    <ScrollView style={styles.container}>
      {pokemon ? (
        <>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text>Name: {pokemon.name}</Text>
          <Text>Height: {pokemon.height}</Text>
          <View>
            {baseStats.length > 0 && (
              <>
                <Text>Base Stats:</Text>
                {baseStats.map((stat: any) => (
                  <Text key={stat.name} style={styles.listEl}>
                    {stat.name}: {stat.value}
                  </Text>
                ))}
              </>
            )}
          </View>
          <View>
            {/* TODO: add type for species */}
            <Text>Species:</Text>
            {speciesList.map((item: any) => (
              <Text key={item.key} style={styles.listEl}>
                {item.name}
              </Text>
            ))}
          </View>
          <Text>Number of games: {pokemon.game_indices.length}</Text>
          <Pressable
            onPress={() => {
              if (!isFavourite && handleAddToFavourites && pokemon) {
                handleAddToFavourites(pokemon.name);
              }
              if (isFavourite && handleRemoveFromFavourites && pokemon) {
                handleRemoveFromFavourites(pokemon.name);
              }
            }}
            style={[
              styles.favourite,
              {
                backgroundColor: isFavourite
                  ? Colors.orangeSoda
                  : Colors.shandy,
              },
            ]}
          >
            {isFavourite === false && <Text>Add to favourites</Text>}
            {isFavourite === true && <Text>Remove from favourites</Text>}
          </Pressable>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </ScrollView>
  );
};

export default pokemonView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 25,
  },
  image: { width: 200, height: 200 },
  listEl: { paddingLeft: 20 },
  favourite: {
    fontSize: 20,
    padding: 10,
  },
});
