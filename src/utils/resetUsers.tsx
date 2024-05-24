import { customPerson } from "../types/cardTypes";

export default function resetUsers(array: customPerson[]) {
  array.forEach((_, index, theArray) => {
    theArray[index].deleted = false;
    theArray[index].hidden = false;
  });
}
