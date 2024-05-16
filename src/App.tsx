import { useEffect, useState } from "react";
import Card from "./components/card";
//import { GetUsers } from "./utils/getUsers";
import { apiResult, person } from "./types/cardTypes";
import Button from "./components/button";

async function GetUsers(setState: CallableFunction) {
  await fetch("https://randomuser.me/api/?page=1&results=100&seed=abc").then(
    (res) => {
      res.json().then((res) => {
        setState(res);
        console.log(res);
      });
    }
  );
}

function App() {
  const [users, setUsers] = useState<apiResult>();

  useEffect(() => {
    GetUsers(setUsers);
  }, []);

  return (
    <>
      <h1 className="text-center text-6xl mt-12 mb-5 font-bold">
        React test 💻
      </h1>
      <div className="text-center justify-center mt-5 mx-auto w-full flex">
        <Button title="Use Colors" func={() => {}}></Button>
        <Button title="Reset" func={() => {}}></Button>
        <Button title="Order by country" func={() => {}}></Button>
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
          {users?.results?.map((info: person) => {
            return (
              <Card
                img={info.picture.medium}
                name={info.name.first}
                lname={info.name.last}
                country={info.location.country}
                key={info.id.value}
              ></Card>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
