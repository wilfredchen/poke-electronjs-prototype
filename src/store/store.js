import { configureStore } from "@reduxjs/toolkit";
import pokeList from "./pokelist";

export default configureStore({
  reducer: {
    pokelist: pokeList,
  },
});
