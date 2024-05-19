import { person } from "../types/cardTypes";

export default function compareByCountry(person1: person, person2: person) {
  if (person1.location.country < person2.location.country) {
    return -1;
  }
  if (person1.location.country > person2.location.country) {
    return 1;
  }
  return 0;
}
