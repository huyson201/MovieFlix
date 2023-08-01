export interface Favorite {
  _id: string;
  id: string;
  type: "movie" | "tv";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FavoritePaginate {
  totalDoc: number;
  page: number;
  limit: number;
  docs: Favorite[];
  next_page: number | null;
  prev_page: number | null;
}

export interface CheckFavoriteResponse {
  added: boolean;
}
