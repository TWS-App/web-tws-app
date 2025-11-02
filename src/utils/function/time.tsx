export const formatTime = (value: string) => {
  const _new = new Date(value);

  if (isNaN(_new.getTime())) {
    // console.error("Invalid date string provided:", dateString);
    return "Invalid Date";
  }

  const day = _new.getDate().toString().padStart(2, "0");
  const month = (_new.getMonth() + 1).toString().padStart(2, "0");
  const year = _new.getFullYear();

  const hours = _new.getHours().toString().padStart(2, "0");
  const minutes = _new.getMinutes().toString().padStart(2, "0");
  const seconds = _new.getSeconds().toString().padStart(2, "0");

  //   console.log(_new);
  //   console.log(_new.toLocaleDateString());

  // return _new.toLocaleTimeString();
  return `${hours}:${minutes}:${seconds}, ${day}-${month}-${year}`;
  //   return new Intl.DateTimeFormat("id-ID").format(_new);
};
