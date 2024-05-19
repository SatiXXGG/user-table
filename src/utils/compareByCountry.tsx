import { person } from "../types/cardTypes";

export default function compareByCountry(person1: person, person2: person) {
  return person1.location.country.localeCompare(person2.location.country);
}
