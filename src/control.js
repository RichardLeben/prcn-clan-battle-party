let selectedParty = '';
const partyMap = {};

const initializePanel = () => {
  const html = characterNames.map(
    (characterName) => `<img id="${characterName}" class="character" src="icons/${characterName}.png" width="50" height="50" onclick="clickChara('${characterName}')" />`
  ).join('')
  jQuery('#panel').html(html);
  jQuery('.character').css('opacity', '0.6');
}

const selectParty = (partyId) => {
  selectedParty = partyId;
  jQuery('.party').css('background-color', 'transparent');
  jQuery(`#${partyId}`).css('background-color', 'yellow');
  jQuery('.character').css('opacity', '0.6');
  partyMap[selectedParty].characters.forEach((character) => {
    jQuery(`#${character}`).css('opacity', '1.0');
  });
}

const addParty = () => {
  const partyId = new Date().getTime().toString();
  partyMap[partyId] = {
    characters: [],
    support: ''
  }
  jQuery("#party-list").append(
    `<div id="${partyId}" class="party">
      <input type="radio" name="target" value="${partyId}" onchange="selectParty('${partyId}')" />
      <span class="party"></span>
      <button onclick="removeParty('${partyId}')">-</button>
    </div>`
  );
  return partyId;
}

const removeParty = (partyId) => {
  delete partyMap[partyId];
  jQuery(`#${partyId}`).remove();
  jQuery('.character').css('opacity', '0.6');
}

const setSupportChara = (characterName) => {
  if (partyMap[selectedParty].support !== characterName) {
    partyMap[selectedParty].support = characterName;
    
  } else {
    partyMap[selectedParty].support = '';
  }
}

const clickChara = (charaterName) => {
  if (partyMap[selectedParty].characters.includes(charaterName)) {
    removeChara(charaterName);
  } else {
    addChara(charaterName);
  }
} 

const addChara = (characterName) => {
  if (partyMap[selectedParty].characters.length < 5) {
    const tempCharacters = [...partyMap[selectedParty].characters, characterName];
    const newCharacters = characterNames.filter((character) => tempCharacters.includes(character)).reverse();
    partyMap[selectedParty].characters = newCharacters;
    jQuery(`#${selectedParty} .party`).html(
      newCharacters.map(
        (character) => `<img src="icons/${character}.png" width="50" height="50" onclick="setSupportChara('${character}')" />`
      ).join('')
    )
    jQuery(`#${characterName}`).css('opacity', '1.0');
  }
}

const removeChara = (characterName) => {
  const tempCharacters = [...partyMap[selectedParty].characters].filter((character) => character !== characterName);
  const newCharacters = characterNames.filter((character) => tempCharacters.includes(character)).reverse();
  partyMap[selectedParty].characters = newCharacters;
  if (partyMap[selectedParty].support === characterName) {
    partyMap[selectedParty].support = '';
  }
  jQuery(`#${selectedParty} .party`).html(
    newCharacters.map(
      (character) => `<img src="icons/${character}.png" width="50" height="50" onclick="setSupportChara('${character}')" />`
    ).join('')
  )
  jQuery(`#${characterName}`).css('opacity', '0.6');
}