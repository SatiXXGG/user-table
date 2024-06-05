import { tableState } from "../types/coreTypes";

export const initialState: tableState = {
  users: {
    results: [],
  },
  useColors: false,
  currentSort: "",
  isOrdered: false,
  filteredUsers: null,
  isLoading: false,
};
