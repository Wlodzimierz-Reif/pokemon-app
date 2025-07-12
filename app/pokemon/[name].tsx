import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

const pokemonView = () => {
  const { name } = useLocalSearchParams();
  // TODO: Add types for pokemon and species
  const [pokemon, setPokemon] = useState<any>(null);
  const [species, setSpecies] = useState<any>(null);

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
  }, [name]);

  const fetchSpecies = async (url: string) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data?.varieties;
    } catch (error) {
      console.error("Error fetching species data:", error);
      return null;
    }
  };
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
    <View style={styles.container}>
      {pokemon ? (
        <>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text>Name: {pokemon.name}</Text>
          <Text>Height: {pokemon.height}</Text>
          <Text>Weight: {pokemon.weight}</Text>
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
            {species && (
              <FlatList
                data={speciesList}
                renderItem={({ item }) => (
                  <Text style={styles.listEl}>{item.name}</Text>
                )}
                keyExtractor={(item) => item.key}
              />
            )}
          </View>
          <Text>Number of games: {pokemon.game_indices.length}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default pokemonView;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: { width: 200, height: 200 },
  listEl: { paddingLeft: 20 },
});
