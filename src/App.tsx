import { createContext, useEffect, useReducer, useState } from "react";
import Card from "./components/card";
import { customPerson } from "./types/cardTypes";
import Button from "./components/button";
import updateTable from "./utils/updateTable";
import { initialState } from "./utils/variables";
import { createArgs, reduceArgs } from "./types/reducer";

export const reduceContext = createContext<createArgs | undefined>(undefined);

async function GetUsers(dispatch: CallableFunction, pageNumber: number) {
  await fetch(
    `https://randomuser.me/api/?page=${pageNumber}&results=10&seed=santixxgg`
  ).then((res) => {
    res
      .json()
      .then((res) => {
        if (pageNumber === 1) {
          dispatch({
            type: "set-users",
            payload: res,
          });
        } else {
          dispatch({
            type: "add-users",
            payload: res.results,
          });
        }
      })
      .finally(() => {
        dispatch({
          type: "set-loading",
          payload: false,
        });
      });
  });
}

function App() {
  const [tableState, dispatch] = useReducer<reduceArgs>(updateTable, initialState);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch({
      type: "set-loading",
      payload: true,
    });
    GetUsers(dispatch, 1);
  }, []);

  return (
    <reduceContext.Provider value={[tableState, dispatch]}>
      <h1 className="text-center text-6xl mt-12 mb-5 font-bold">React test 💻</h1>
      <div className="text-center justify-center mt-5 mx-auto w-full flex">
        <Button
          title={tableState.useColors ? "Don't use colors" : "Use colors"}
          func={() => {
            dispatch({
              type: "set-colors-enabled",
              payload: tableState.useColors ? false : true,
            });
          }}
        ></Button>
        <Button
          title="Reset"
          func={() => {
            dispatch({ type: "reset" });
          }}
        ></Button>
        <Button
          title={tableState.isOrdered ? "Dont order by country" : "Order by country"}
          func={() => dispatch({ type: "order-by-country" })}
        ></Button>
        <input
          type="text"
          id="country-input"
          placeholder="Spain, India, United..."
          maxLength={15}
          minLength={0}
          className="px-2 py-1 rounded-xl bg-neutral-100 outline-blue-700 outline-2"
          onChange={() =>
            dispatch({
              type: "order-input-update",
              payload: (document.getElementById("country-input") as HTMLInputElement)
                ?.value,
            })
          }
        ></input>
      </div>
      <table className="w-[90vw] mx-auto mt-6 ">
        <thead className="bg-neutral-100 px-2">
          <tr>
            <th scope="col">Photo</th>
            <th scope="col">Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Country</th>
            <th scope="col">Accions</th>
          </tr>
        </thead>

        <tbody className="">
          {tableState.filteredUsers?.map((info: customPerson) => {
            if (info.deleted === true || info.hidden === true) {
              return;
            }

            const index: number = tableState.filteredUsers?.indexOf(info) ?? 10;
            const isPair: boolean = index % 2 === 1;
            const color = isPair ? "gray" : "whites";

            return (
              <Card
                img={info.picture.medium}
                name={info.name.first}
                lname={info.name.last}
                country={info.location.country}
                key={info.email}
                colorIndex={tableState.useColors ? color : ""}
                id={info.email}
              ></Card>
            );
          })}
        </tbody>
      </table>

      {tableState.isLoading && (
        <h1 className="text-2xl text-center justify-center">Loading...</h1>
      )}

      <div className="my-4 flex justify-center">
        <Button
          title="Load more"
          func={() => {
            GetUsers(dispatch, page + 1);
            setPage(page + 1);
          }}
        ></Button>
      </div>
    </reduceContext.Provider>
  );
}

export default App;
