import { MediaType, TmdbMediaType } from "./../../tmdbApi";
import { Auth, LoginResponse } from "../../../Types/Auth";
import {
  CheckFavoriteResponse,
  Favorite,
  FavoritePaginate,
} from "../../../Types/Favorite";
import axiosClient from "../axiosBackend";

interface SignUpType {
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

const authServices = {
  signUp: (data: SignUpType) => {
    return axiosClient.post<LoginResponse>("auth/register", data);
  },
  signIn: ({ email, password }: { email: string; password: string }) => {
    return axiosClient.post<LoginResponse>("auth/login", { email, password });
  },
  logout: () => {
    return axiosClient.post("auth/logout");
  },
  getProfile: () => {
    return axiosClient.get<Auth>("auth/profile");
  },
  refreshToken() {
    const storedToken = localStorage.getItem("tokens");
    if (!storedToken || !JSON.parse(storedToken)) return null;
    const tokens = JSON.parse(storedToken) as {
      access_token: string;
      refresh_token: string;
    };

    return axiosClient.post<{ access_token: string; refresh_token: string }>(
      "auth/refresh_token",
      {
        refresh_token: tokens.refresh_token,
      }
    );
  },
  getFavorites({ page = 1 }: { page: number }) {
    return axiosClient.get<FavoritePaginate>("auth/favorites", {
      params: {
        page,
      },
    });
  },
  addFavorite({ id, type }: { type: TmdbMediaType; id: string }) {
    return axiosClient.post<Favorite>("favorites", {
      id,
      type,
    });
  },
  removeFavorite({ id, type }: { type: TmdbMediaType; id: string }) {
    return axiosClient.delete<Favorite>("favorites", {
      data: {
        type,
        id,
      },
    });
  },
  checkAddedToFavorite({ id, type }: { id: string; type: TmdbMediaType }) {
    return axiosClient.get<CheckFavoriteResponse>("favorites/check", {
      params: {
        id,
        type,
      },
      data: {
        id,
        type,
      },
    });
  },
  updateName({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }) {
    return axiosClient.patch<Auth>("auth/profile", {
      first_name,
      last_name,
    });
  },
  changePassword({
    old_password,
    new_password,
  }: {
    old_password: string;
    new_password: string;
  }) {
    return axiosClient.patch<Auth>("auth/profile", {
      old_password,
      new_password,
    });
  },
  changeAvatar(form: FormData) {
    return axiosClient.patch<Auth>("auth/profile", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default authServices;
