export async function GetUsers(setState: CallableFunction) {
  await fetch("https://randomuser.me/api/?page=1&results=100&seed=abc").then(
    (res) => {
      res.json().then((res) => {
        setState(res);
        console.log(res);
      });
    }
  );
}
