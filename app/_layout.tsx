import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];
  return (
    <>
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
          name="pokemon/[id]"
          options={{
            title: "Pokemon details",
          }}
        />
        <Stack.Screen name="favourites" options={{ title: "Favourites" }} />
      </Stack>
    </>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
