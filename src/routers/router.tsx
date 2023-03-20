import {
  createBrowserRouter,
  RouteObject
} from "react-router-dom";
import App from "../App";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader/Loader";

const ListMovie = lazy(() => import("../pages/ListMoive/ListMovie"))
const Home = lazy(() => import("../pages/Home/Home"))
const Detail = lazy(() => import("../pages/Detail/Detail"))
const Search = lazy(() => import("../pages/Search/Search"))
const Error404Page = lazy(() => import("../pages/Error/Error404Page"))

const routeObj: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loader />}> <Home /></Suspense>
      },
      {
        path: "/movies/:name/:id",
        element: <Suspense fallback={<Loader />}><Detail mediaType="movie" /></Suspense>
      },
      {
        path: "/tv-series/:name/:id",
        element: <Suspense fallback={<Loader />}> <Detail mediaType="tv" /></Suspense>
      },
      {
        path: "/movies",
        element: <Suspense fallback={<Loader />}> <ListMovie media_type="movie" key={"movie"} /></Suspense>
      },
      {
        path: "/tv-series",
        element: <Suspense fallback={<Loader />}> <ListMovie media_type="tv" key={"tv-series"} /></Suspense>
      },
      {
        path: "/search",
        element: <Suspense fallback={<Loader />}><Search /></Suspense>
      }
    ]
  },
  {
    path: "/notfound",
    element: <Suspense fallback={<Loader />}> <Error404Page /></Suspense>
  },
  {
    path: "*",
    element: <Suspense fallback={<Loader />}> <Error404Page /></Suspense>
  }
]
const routers = createBrowserRouter(routeObj)


export default routers