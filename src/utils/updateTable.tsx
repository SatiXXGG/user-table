import { customPerson, person } from "../types/cardTypes";
import { reducerType, tableState } from "../types/coreTypes";
import compareByCountry from "./compareByCountry";
import { initialState } from "./variables";

export default function updateTable(
  state: tableState,
  action: reducerType
): tableState {
  // this will only use in case "order-by-country"

  const newUsers = structuredClone(state.users);
  const filterClone = structuredClone(state.filteredUsers);
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
      return initialState;
    case "order-by-country":
      if (state.isOrdered !== true) {
        filterClone.sort(compareByCountry);

        return {
          ...state,
          users: newUsers,
          filteredUsers: filterClone,
          isOrdered: true,
        };
      } else {
        return {
          ...state,
          users: newUsers,
          filteredUsers: newUsers.results,
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
  }

  return state;
}
