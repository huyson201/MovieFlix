import {
  createBrowserRouter,
  RouteObject
} from "react-router-dom";

import App from "../App";
import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import ListMovie from "../pages/ListMoive/ListMovie";
import Search from "../pages/Search/Search";
import { Suspense } from "react";

const routeObj: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Suspense> <Home /></Suspense>
      },
      {
        path: "/detail",
        element: <Detail />
      },
      {
        path: "/movies",
        element: <ListMovie media_type="movie" key={"movie"} />
      },
      {
        path: "/tv-series",
        element: <ListMovie media_type="tv" key={"tv-series"} />
      },
      {
        path: "/search",
        element: <Search />
      }
    ]
  }
]
const routers = createBrowserRouter(routeObj)


export default routers