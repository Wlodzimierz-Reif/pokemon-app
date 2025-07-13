# Pokémon App
This is a React Native app built with Expo that displays Pokémon data from the PokeAPI.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/): `npm install -g expo-cli`
- [ExpoGo] find in your app store

### Installation
1. Clone the repository or download the source code.
2. Install dependencies:
   npm install

### Running the App
1. Start the Expo development server:
   npm run start
   
2. Use the QR code in the terminal or browser to open the app on your device with the Expo Go app, or run it in an emulator/simulator.

### Notes
- Make sure your device or emulator is on the same network as your development machine for QR code scanning.
- If you encounter issues with dependencies, try deleting `node_modules` and running `npm install` again.

### Scripts
- `npm start`: Start the Expo server
    - I've added `--tunnel` flag as it was needed for the app to start on my iPhone 12
- `npm run android`: Run on Android emulator/device
- `npm run ios`: Run on iOS simulator/device (Mac only)

---

Enjoy catching Pokémon!


# Should/could know
- no types for pokemons, species etc - I found out that there's a Typescript library to handle the fetching and it comes with types, buy due to time constrains I can't implement it
- I'd rather use db for storing favourites
- No ability to fetch initials(10 or more) after leaving the initial empty state(ie. coming back from detail screen)
- Could have added pagination for initial random pokemons
- Haptics and animations could differ so the user can feel(!) the difference
- I left the default app images(/assets) folder
- Only header has colours based on the device theme