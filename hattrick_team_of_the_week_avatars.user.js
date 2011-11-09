// ==UserScript==
// @name           HattrickTeamOfTheWeek
// @namespace      HattrickTeamOfTheWeek
// @description    Team Of the week is now displaying avatars.
// @include        http://www*.hattrick.org/World/Series/TeamOfTheWeek.aspx?leagueLevelUnitId=*&teamId=*
// ==/UserScript==

Player = new Array;
allAs = document.getElementsByTagName('a');
allDivisions = document.getElementsByTagName('div');

//Function fills array with player data
function f_gatherPlayerData(p_playerName, p_position) {
  Player[p_position] = new Array;

  PlayerName = p_playerName.replace('  ', ' ');

  //Player's data is stored in array for further need
  Player[p_position][0] = PlayerName;

  //clothing
  Player[p_position][1] = (PlayerName.length % 9) + 1;

  //type of clothing
  Player[p_position][2] = (PlayerName.length % 5) + 1;

  //clothing color
  ClothingColor = 'a';
  if (PlayerName.indexOf('h') == -1) {
    ClothingColor = 'b';
  }

  if (PlayerName.indexOf('h') < 5) {
    ClothingColor = 'c';
  }

  Player[p_position][3] = ClothingColor;

  //head shape
  Player[p_position][4] = (PlayerName.length % 9) + 1;

  //head color
  HeadColor = 'a';

  if (PlayerName.toLowerCase().substring(0,1).charCodeAt(0) > 96 && PlayerName.toLowerCase().substring(0,1).charCodeAt(0) < 110) {
    HeadColor = PlayerName.toLowerCase().substring(0,1);
  }

  Player[p_position][5] = HeadColor;

  //eyes
  Player[p_position][6] = ((PlayerName.length * 10) % 36) + 1;

  //eyes mood
  EyeMood = 'a';
  if (PlayerName.indexOf('h') == -1) {
    EyeMood = 'b';
  }

  if (PlayerName.indexOf('h') < 5) {
    EyeMood = 'c';
  }

  Player[p_position][7] = EyeMood;

  //type of mouth
  Player[p_position][8] = ((PlayerName.length * 10) % 40) + 1;

  //mouth mood
  MouthMood = 'a';
  if (PlayerName.indexOf('h') == -1) {
    MouthMood = 'b';
  }

  if (PlayerName.indexOf('h') < 5) {
    MouthMood = 'c';
  }

  Player[p_position][9] = MouthMood;

  //type of nose
  Player[p_position][10] = ((PlayerName.length * 10) % 40) + 1;

  //hair
  Player[p_position][11] = (PlayerName.length % 9) + 1;

  //hairstyle
  Player[p_position][12] = ((PlayerName.length * 10) % 15) + 1;

  //haircolor
  HairColor = 'a';

  if (PlayerName.toLowerCase().substring(0,1).charCodeAt(0) > 96 && PlayerName.toLowerCase().substring(0,1).charCodeAt(0) < 108) {
    HairColor = PlayerName.toLowerCase().substring(0,1);
  }

  Player[p_position][13] = HairColor;

  return Player[p_position];
}

function f_draw_avatar(counter) {
  return '<img alt="" style="left:9px;top:10px;" src="/Img/Avatar/bodies/f'+Player[counter][1]+'man'+Player[counter][2]+Player[counter][3]+'.png">' +
         '<img alt="" style="left:9px;top:10px;" src="/Img/Avatar/faces/f'+Player[counter][4]+Player[counter][5]+'.png">' +
         '<img alt="" style="left:24px;top:8px;" src="/Img/Avatar/eyes/e'+Player[counter][6]+Player[counter][7]+'.png">' +
         '<img alt="" style="left:31px;top:32px;" src="/Img/Avatar/mouths/m'+Player[counter][8]+Player[counter][9]+'.png">' +
         '<img alt="" style="left:19px;top:8px;" src="/Img/Avatar/noses/n'+Player[counter][10]+'.png">' +
         '<img alt="" style="left:9px;top:10px;" src="/Img/Avatar/hair/f'+Player[counter][11]+'h'+Player[counter][12]+Player[counter][13]+'.png">';
}

function f_set_avatar() {
  counter = 0;
  //we go trough all links
  for (i=0; i < allAs.length; i++) {
    //that refer to player and gather player data
    if (allAs[i].href.indexOf('/Club/Players/Player.aspx?playerId=') != -1) {
      f_gatherPlayerData(allAs[i].innerHTML, counter);
      counter++;
    }
  }

  counter = 0;
  //we now go trough all divisions
  for (i=0; i < allDivisions.length; i++) {
    //and modify ones that are meant for player picture
    if (allDivisions[i].id.indexOf('ctl00_ctl00_CPContent_CPMain_uc') != -1) {
      allDivisions[i].style.backgroundImage = "url(/Img/Avatar/backgrounds/card1.png)";
      allDivisions[i].innerHTML = f_draw_avatar(counter) + allDivisions[i].innerHTML;
      counter++;
    }
  }
}

function f_init() {
  f_set_avatar();
}

f_init();