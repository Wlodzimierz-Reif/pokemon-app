import { Link } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import {
	Animated,
	Button,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import PokemonCard from "../components/PokemonCard";
import { Colors } from "../constants/Colors";
import type { BasePokemon } from "../types";
import { FavouritesContext } from "./_layout";

const Home = () => {
	const [initialPokemonsNumber, setInitialPokemonsNumber] =
		useState<number>(10);
	const [pokemons, setPokemons] = useState<BasePokemon[] | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [displayLoadMoreButton, setDisplayLoadMoreButton] =
		useState<boolean>(true);

	const favouritesContext = useContext(FavouritesContext);
	const { favourites } = favouritesContext || {};

	const animated = new Animated.Value(1);
	const fadeIn = () => {
		Animated.timing(animated, {
			toValue: 0.4,
			duration: 100,
			useNativeDriver: true,
		}).start();
	};
	const fadeOut = () => {
		Animated.timing(animated, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};

	const fetchInitialData = async () => {
		try {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon?limit=${initialPokemonsNumber}&offset=${
					initialPokemonsNumber + 10
				}`,
			);
			const data = await response.json();
			setPokemons(data.results);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const fetchSearchedPokemon = async (searchTerm: string) => {
		try {
			setIsFetching(true);
			setPokemons([]);
			const trimmedSearchTerm = searchTerm.trim();
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${trimmedSearchTerm}`,
			);
			const data = await response.json();
			setPokemons([data]);
			setIsFetching(false);
			setDisplayLoadMoreButton(false);
		} catch (error) {
			setIsFetching(false);
			console.error("Error fetching searched pokemon:", error);
		}
	};

	const handleSearch = () => {
		if (!searchTerm.trim()) {
			return;
		}
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
			<Pressable onPress={handleSearch} onPressIn={fadeIn} onPressOut={fadeOut}>
				<Animated.View
					style={{
						opacity: animated,
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
				<Animated.View
					style={{
						opacity: animated,
						margin: 10,
						padding: 10,
						backgroundColor: Colors.shandy,
						borderRadius: 5,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Link href="/Favourites">
						<Text style={{ color: "#fff", fontWeight: "bold" }}>
							Favourites
						</Text>
					</Link>
				</Animated.View>
			</Pressable>
			<ScrollView
				style={{ width: "100%" }}
				contentContainerStyle={{ alignItems: "center" }}
			>
				{pokemons?.map((pokemon) => (
					<Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
						<PokemonCard
							name={pokemon.name}
							isFavourite={favourites?.includes(pokemon.name)}
						/>
					</Link>
				))}
				{displayNoResults && !isFetching && (
					<Text>No results found for "{searchTerm}"</Text>
				)}
				{isFetching && <Text>Loading...</Text>}
				{displayLoadMoreButton && !displayNoResults && (
					<Button
						title="Load more"
						onPress={() => {
							setInitialPokemonsNumber((prev) => prev + 10);
							fetchInitialData();
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
