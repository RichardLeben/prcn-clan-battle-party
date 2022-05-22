let selectedParty = '';
const partyMap = {};

const initializePanel = () => {
  const html = characterNames.map(
    (characterName) => `<img src="icons/${characterName}.png" onclick="clickChara(${characterName})"`
  ).join('')
  jQuery('#panel').html(html);
}

const selectParty = (partyId) => {
  jQuery('.party').css('background-color', 'transparent');
  jQuery(`#${partyId}`).css('background-color', 'yellow');
  jQuery('.character').css('opacity', '0.6');
  partyMap[partyId].characters.forEach((character) => {
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
      <input type="radio" name="target" value="${partyId}" onselect="selectParty(${partyId})"/>
      <span class="party"></span>
      <button onclick="removeParty(${partyId});">-</button>
    </div>`
  );
}

const removeParty = (partyId) => {
  delete partyMap[partyId];
  jQuery(`#${partyId}`).remove();
}

const setSupportChara = (characterName) => {
  const partyId = jQuery('input[name="target"]:checked').val();
  if (partyMap[partyId].support !== characterName) {
    partyMap[partyId].support = characterName;
  } else {
    partyMap[partyId].support = '';
  }
}

const clickChara = (charaterName) => {
  if (partyMap[partyId].characters.includes(charaterName)) {
    removeChara(charaterName);
  } else {
    addChara(charaterName);
  }
} 

const addChara = (characterName) => {
  const partyId = jQuery('input[name="target"]:checked').val();
  const tempCharacters = [...partyMap[partyId].characters, characterName];
  const newCharacters = characterNames.filter((character) => tempCharacters.includes(character));
  partyMap[partyId].characters = newCharacters;
  jQuery(`#${partyId} .party`).html(
    newCharacters.map((character) => `<img src="icons/${character}.png" width="50" height="50" onclick="removeChara(${character})"></img>`).join("")
  )
  jQuery(`#${characterName}`).css('opacity', '1.0');
}

const removeChara = (characterName) => {
  const partyId = jQuery('input[name="target"]:checked').val();
  const tempCharacters = [...partyMap[partyId].characters].filter((character) => character !== characterName);
  const newCharacters = characterNames.filter((character) => tempCharacters.includes(character));
  partyMap[partyId].characters = newCharacters;
  if (partyMap[partyId].support === characterName) {
    partyMap[partyId].support = '';
  }
  jQuery(`#${partyId} .party`).html(
    newCharacters.map((character) => `<img src="icons/${character}.png" width="50" height="50" onclick="removeChara(${character})"></img>`).join("")
  )
  jQuery(`#${characterName}`).css('opacity', '0.6');
}