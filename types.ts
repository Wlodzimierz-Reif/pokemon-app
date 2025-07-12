export type BasePokemon = {
	name: string;
	url: string;
};

export type FavouritesContextType = {
	favourites: string[];
	handleAddToFavourites: (name: string) => void;
	handleRemoveFromFavourites: (name: string) => void;
};
