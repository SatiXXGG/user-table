import { card } from "../types/cardTypes";

const someId =
  "https://bcw-media.s3.ap-northeast-1.amazonaws.com/yce_ai_anime_topbanner_mb_01_a51ba67c67.jpg";

export default function Card({ img, name, lname, country }: card) {
  return (
    <tr>
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
        <button className="hover:bg-red-600 px-5 py-2 rounded-md text-black hover:text-white transition-all outline-black outline-2 duration-200 outline hover:outline-none">
          Delete
        </button>
      </th>
    </tr>
  );
}
