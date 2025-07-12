import { Link } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import PokemonCard from "../components/PokemonCard";
import { FavouritesContext } from "./_layout";

const Favourites = () => {
	const favouritesContext = useContext(FavouritesContext);
	const { favourites } = favouritesContext || {};
	console.log(
		"%c [qq]: favourites",
		"background: #fbff00;",
		"\n",
		favourites,
		"\n",
	);

	return (
		<View>
			{favourites && favourites.length > 0 ? (
				favourites.map((favPokemon) => (
					<Link href={`/pokemon/${favPokemon}`} key={favPokemon}>
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

const styles = StyleSheet.create({});
