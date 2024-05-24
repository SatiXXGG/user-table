import { customPerson, person } from "../types/cardTypes";
import { reducerType, tableState } from "../types/coreTypes";
import compareByCountry from "./compareByCountry";
import resetUsers from "./resetUsers";
import { initialState } from "./variables";

export default function updateTable(
  state: tableState,
  action: reducerType
): tableState {
  const filterClone: customPerson[] =
    state.filteredUsers != null ? [...state.filteredUsers] : [];
  let index = 0;

  switch (action.type) {
    case "set-users":
      return {
        ...state,
        users: action.payload,
        filteredUsers: action.payload.results,
      };
    case "set-colors-enabled":
      return {
        ...state,
        useColors: action.payload,
      };
      break;
    case "delete-user":
      index = filterClone.findIndex(
        (user: person) => user.email === action.payload
      );

      filterClone[index].deleted = true;

      return {
        ...state,
        filteredUsers: filterClone,
      };

    case "reset":
      resetUsers(state.users.results);
      resetUsers(state.filteredUsers);
      return {
        ...initialState,
        filteredUsers: state.users.results,
        users: state.users,
      };
    case "order-by-country":
      if (state.isOrdered !== true) {
        filterClone.sort(compareByCountry);

        return {
          ...state,
          filteredUsers: filterClone,
          isOrdered: true,
        };
      } else {
        return {
          ...state,
          filteredUsers: state.users.results,
          isOrdered: false,
        };
      }
    case "order-input-update":
      if (action.payload != "") {
        filterClone.forEach((person: customPerson, index: number, theArray) => {
          const item: customPerson = theArray[index];

          if (
            person.location.country
              .toLowerCase()
              .includes(action.payload.toLowerCase())
          ) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        });
      } else {
        filterClone.forEach((_, index: number, theArray) => {
          const item: customPerson = theArray[index];
          item.hidden = false;
        });
      }

      return {
        ...state,
        filteredUsers: filterClone,
      };
    case "set-loading":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "add-users":
      return {
        ...state,
        filteredUsers: filterClone.concat(action.payload),
      };
  }

  return state;
}
