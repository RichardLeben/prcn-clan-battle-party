const stars = [
"★1",
"★2",
"★3",
"★4",
"★5",
"★6",
];

const getStarDataListOptions = (stars) => {
  return stars.map((star) => `<option value="${star}">`).join("");
};
