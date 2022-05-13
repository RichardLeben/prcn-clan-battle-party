const concatArrays = (...arrays) => {
  return arrays.reduce((previous, current) => {
    return [...previous, ...current];
  }, []);
}

const getDuplicateValues = (...valuesArray) => {
  return concatArrays(valuesArray).filter((val, idx, _valuesArray) => {
    return _valuesArray.indexOf(val) === idx && idx !== _valuesArray.lastIndexOf(val);
  });
}

const getCandidateParties = (characters, duplicateCharacters) => {
  duplicateCharacters.map((dupChara) => {
    return characters.filter((chara) => chara !== dupChara);
  })
}



const result = [];
const party1 = [1,2,3,4,5];
const party2 = [1,3,6,7,8];
const party3 = [2,3,9,10,11];

party1.forEach(v1 => {
  party2.forEach(v2 => {
    party3.forEach(v3 => {
      result.push([v1, v2, v3]);
    });
  });
});
