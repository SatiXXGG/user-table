import { apiResult, customPerson } from "./cardTypes";

export interface tableState {
  users: {
    results: [];
  };

  filteredUsers: customPerson[] | null;
  useColors: boolean;
  currentSort: string;
  isOrdered: boolean;
  isLoading: boolean;
}

export type reducerType =
  | {
      type: "set-users";
      payload: apiResult;
    }
  | {
      type: "set-colors-enabled";
      payload: boolean;
    }
  | {
      type: "delete-user";
      payload: string;
    }
  | {
      type: "reset";
    }
  | {
      type: "order-by-country";
    }
  | {
      type: "order-input-update";
      payload: string;
    }
  | {
      type: "set-loading";
      payload: boolean;
    }
  | {
      type: "add-users";
      payload: customPerson[];
    }
  | {
      type: "default";
      payload: null;
    };
