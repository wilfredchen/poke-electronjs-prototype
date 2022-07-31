import { createSlice } from "@reduxjs/toolkit";
const electron = window.require("electron");
const ipc = electron.ipcRenderer;
//reducer
export const pokeList = createSlice({
  name: "pokemon",
  initialState: {
    list: null,
  },
  reducers: {
    listAll: (state, action) => {
      state.list = action.payload;
    },
    deleteFromList: (state, action) => {
      let id = action.payload;
      state.list = state.list.filter(function (item) {
        return item.id !== id;
      });
    },
  },
});

export default pokeList.reducer;
// Action creators are generated for each case reducer function
export const { listAll, deleteFromList } = pokeList.actions;

// Action dispatch
export const listPoke = () => async (dispatch) => {
  try {
    ipc.send("listAllPokemon");
    ipc.on("listAllPokemonResult", (event, result) => {
      dispatch(listAll(result));
    });
  } catch (e) {}
};

export const addPoke = (no, name, desc, type1, type2, file) => async (
  dispatch
) => {
  try {
    console.log(name);
    ipc.send("AddPokemon", {
      no: no,
      name: name,
      desc: desc,
      type1: type1,
      type2: type2,
      originPath: file.path,
      fileName: file.name,
    });
    ipc.on("AddPokemonSuccess", (event, result) => {
      if (result === "success") {
        return "success";
      }
    });
  } catch (e) {}
};

export const deletePoke = (id, path, preloaded) => async (dispatch) => {
  try {
    ipc.send("DeletePokemon", {
      id,
      path,
      preloaded,
    });
    ipc.on("DeletePokemonSuccess", (event, result) => {
      if (result === "success") {
        dispatch(deleteFromList(id));
      }
    });
  } catch (e) {}
};
