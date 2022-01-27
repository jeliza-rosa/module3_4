export default function colorCode(id, arr) {
  let code;
  let name;
  for (let i = 0; i < arr.length; i++) {
    if (id == arr[i].id) {
      code = arr[i].code;
      name = arr[i].name;
    }
  }
  return {code, name};
}
