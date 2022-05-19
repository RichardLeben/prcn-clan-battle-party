const exEquipLevels = [
"-",
"1",
"30",
"50",
"70",
"90",
"110",
"130",
"140",
"150",
"160",
"170",
"180",
"190",
"200",
"210",
"220",
"230",
"240",
];

const getExEquipLevelDataListOptions = (exEquipLevels) => {
  return exEquipLevels.map((exEquipLevel) => `<option value="${exEquipLevel}">`).join("");
};
