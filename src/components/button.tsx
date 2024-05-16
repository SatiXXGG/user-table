import { buttonData } from "../types/buttonTypes";

export default function Button({ title, func }: buttonData) {
  return (
    <button
      className="active:bg-black active:scale-110 mx-2 flex rounded-md px-2 py-1 bg-blue-600 text-white transition-all hover:scale-105"
      onClick={func}
    >
      {title}
    </button>
  );
}
