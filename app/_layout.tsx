import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../constants/Colors";
import { StyleSheet, useColorScheme } from "react-native";

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
          name="pokemon/[name]"
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
