import { apiResult } from "./cardTypes";

export interface tableState {
  users: {
    results: [];
  };

  filteredUsers: [];
  useColors: boolean;
  currentSort: string;
  isOrdered: boolean;
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
    };
