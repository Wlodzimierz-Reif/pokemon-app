import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

const pokemonView = () => {
  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      if (name) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await res.json();
        setPokemon(data);
      }
    };
    fetchPokemon();
  }, [name]);

  return (
    <View>
      {pokemon ? (
        <>
          <Text>Name: {pokemon.name}</Text>
          <Text>Height: {pokemon.height}</Text>
          <Text>Weight: {pokemon.weight}</Text>
          {/* <Text>Species: {pokemon.species}</Text> */}
          {/* <Text>Stats: {pokemon.weight}</Text> */}
          <Text>Number of games: {pokemon.game_indices.length}</Text>

        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default pokemonView;

const styles = StyleSheet.create({});
