import React, { createContext, useEffect, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";
import type { FavouritesContextType } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext<
  FavouritesContextType | undefined
>(undefined);

const RootLayout = () => {
  const restoreFavourites = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem("favourites");
      if (storedFavourites) {
        return storedFavourites.split(",");
      }
    } catch (error) {
      console.error("Error restoring favourites:", error);
    }
    return [];
  };
  const [favourites, setFavourites] = useState<string[]>([]);

  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const handleAddToFavourites = async (name: string) => {
    console.log("%c [qq]: adding new favourite ");
    const withAdded = [...favourites, name];
    setFavourites(withAdded);
    await AsyncStorage.setItem("favourites", withAdded.join(","));
  };
  const handleRemoveFromFavourites = async (name: string) => {
    console.log("%c [qq]: removing favourite ");
    setFavourites((prev) => prev.filter((f) => f !== name));
    await AsyncStorage.setItem(
      "favourites",
      favourites.filter((f) => f !== name).join(",")
    );
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      const restored = await restoreFavourites();
      setFavourites(restored);
    };
    fetchFavourites();
  });

  return (
    <FavouritesContext.Provider
      value={{ favourites, handleAddToFavourites, handleRemoveFromFavourites }}
    >
      <StatusBar style="auto" backgroundColor="#00ff00" />
      <Stack
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
          headerTitleStyle: { fontWeight: "bold" },
          headerTitle: "Pokemon details",
        })}
      >
        <Stack.Screen
          name="index"
          options={{ title: "PokeSearch", headerShown: true }}
        />
        <Stack.Screen
          name="pokemon/[name]"
          options={{
            title: "Pokemon details",
          }}
        />
        <Stack.Screen name="favourites" options={{ title: "Favourites" }} />
      </Stack>
    </FavouritesContext.Provider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
