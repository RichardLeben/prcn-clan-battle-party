const concatArrays = (...arrays) => {
  return arrays.reduce((previous, current) => {
    return [...previous, ...current];
  }, []);
};

const getDuplicateValues = (...valuesArray) => {
  return concatArrays(...valuesArray).filter((val, idx, _valuesArray) => {
    return (
      _valuesArray.indexOf(val) === idx && idx !== _valuesArray.lastIndexOf(val)
    );
  });
};

const getCandidateParties = (characters, duplicateCharacters) => {
  const supportCandidateCharacters = getDuplicateValues(
    characters,
    duplicateCharacters
  );
  return supportCandidateCharacters.map((dupChara) => {
    return characters.filter((chara) => chara !== dupChara);
  });
};

const makeComb = function (...array) {
  const make = (arr1, arr2) => {
    if (arr1.length === 0) {
      return arr2;
    }
    return arr1.reduce((arr, v1) => {
      arr2.forEach((v2) => {
        const group = [].concat(v1, v2);
        arr.push(group);
      });
      return arr;
    }, []);
  };

  return array.reduce(make, []);
};

const getAllCandidateParties = function (...array) {
  const duplicateCharacters = getDuplicateValues(...array);
  const _array = array.map((arr) =>
    getCandidateParties(arr, duplicateCharacters)
  );
  return makeComb(..._array);
};

const party1 = [1, 2, 4, 5, 6];
const party2 = [1, 3, 7, 8, 9];
const party3 = [2, 3, 10, 11, 12];
const array = [party1, party2, party3];
const _result = getAllCandidateParties(...array).filter(
  (candidatePartySet) => getDuplicateValues(candidatePartySet).length === 0
);
