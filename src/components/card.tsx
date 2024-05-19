import { useContext } from "react";
import { card } from "../types/cardTypes";
import { reduceContext } from "../App";
import { reduceArgs } from "../types/reducer";

export default function Card({
  img,
  name,
  lname,
  country,
  colorIndex,
  id,
}: card) {
  const [tableState, dispatch] = useContext<reduceArgs>(reduceContext);

  return (
    <tr className={colorIndex}>
      <th>
        <img
          className="mx-auto rounded-full w-16 h-16 my-2"
          src={img}
          alt={name + " user image"}
        ></img>
      </th>
      <th>{name}</th>
      <th>{lname}</th>
      <th>{country}</th>
      <th>
        <button
          onClick={() =>
            dispatch({
              type: "delete-user",
              payload: id,
            })
          }
          className="hover:bg-red-600 px-5 py-2 rounded-md text-black hover:text-white transition-all outline-black outline-2 duration-200 outline hover:outline-none  "
        >
          Delete
        </button>
      </th>
    </tr>
  );
}
