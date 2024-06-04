import { reducerType, tableState } from "./coreTypes";

export type reduceArgs = (state: tableState, dispatch: reducerType) => tableState;

export type newUsers = [];

export type createArgs = [tableState, dispatch: CallableFunction];
