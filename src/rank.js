const ranks = [
"R24",
"R25",
];

const getRankDataListOptions = (ranks) => {
  return ranks.map((rank) => `<option value="${rank}">`).join("");
};
