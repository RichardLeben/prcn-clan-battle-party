const concatArrays = (...arrays) => {
  return arrays.reduce((previous, current) => {
    return [...previous, ...current];
  }, []);
}

const getDuplicateValues = (...valuesArray) => {
  return concatArrays(...valuesArray).filter((val, idx, _valuesArray) => {
    return _valuesArray.indexOf(val) === idx && idx !== _valuesArray.lastIndexOf(val);
  });
}

const getCandidateParties = (characters, duplicateCharacters) => {
  const supportCandidateCharacters = getDuplicateValues(characters, duplicateCharacters);
  return supportCandidateCharacters.map((dupChara) => {
    return characters.filter((chara) => chara !== dupChara);
  })
}

const candidatePartySets = [];
const party1 = [1,2,3,4,5];
const party2 = [1,3,6,7,8];
const party3 = [2,3,9,10,11];
const duplicateCharacters = getDuplicateValues(party1, party2, party3);

getCandidateParties(party1, duplicateCharacters).forEach(candidateParty1 => {
  getCandidateParties(party2, duplicateCharacters).forEach(candidateParty2 => {
    getCandidateParties(party3, duplicateCharacters).forEach(candidateParty3 => {
      candidatePartySets.push([candidateParty1, candidateParty2, candidateParty3]);
    });
  });
});
const result = candidatePartySets.filter((candidatePartySet)=> getDuplicateValues(...candidatePartySet).length === 0)