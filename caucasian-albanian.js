//finding the text boxes
const input = document.querySelector('#input-text');
const output = document.querySelector('#caucalb-output-text');
/*
sorting the letters into separate objects based on the number of graphemes,
so that our substitutions can be applied in the right order - otherwise,
we might not be able to do substitute "ch'" because "ch" will have
taken precedence
*/
const table1 = {};
const table2 = {};
const table3 = {};
// object full of letters
const full_table = {
            'a': {letter: '饜敯', ipa: "a"},
            'b': {letter: '饜敱', ipa: "b"},
            'g': {letter: '饜敳', ipa: "g"},
            'd': {letter: '饜敵', ipa: "d"},
            'e': {letter: '饜敶', ipa: "e"},
            'z': {letter: '饜數', ipa: "z"},
            "E": {letter: '饜敹', ipa: "e藧"},
            "zh": {letter: '饜敺', ipa: "蕭"},
            't': {letter: '饜敻', ipa: "t"},
            "tC'": {letter: '饜敼', ipa: "t蓵始"},
            'y': {letter: '饜敽', ipa: "j"},
            "Z": {letter: '饜敾', ipa: "蕬"},
            'i': {letter: '饜敿', ipa: "i"},
            'Q': {letter: '饜斀', ipa: "蕰"},
            'l': {letter: '饜斁', ipa: "l"},
            "ny": {letter: '饜斂', ipa: "n什"},
            'x': {letter: '饜晙', ipa: "x"},
            "dy": {letter: '饜晛', ipa: "d什"},
            "c'": {letter: '饜晜', ipa: "ts始"},
            "J": {letter: '饜晝', ipa: "d蕬"},
            "k'": {letter: '饜晞', ipa: "k始"},
            "ly": {letter: '饜晠', ipa: "l什"},
            'h': {letter: '饜晢', ipa: "h"},
            'q': {letter: '饜晣', ipa: "q"},
            "O": {letter: '饜晥', ipa: "蓲"},
            "tC": {letter: '饜晧', ipa: "t蓵"},
            "ch'": {letter: '饜晩', ipa: "t蕛始"},
            "cy": {letter: '饜晪', ipa: "ts什"},
            'm': {letter: '饜晫', ipa: "m"},
            "q'": {letter: '饜晬', ipa: "q始"},
            'n': {letter: '饜晭', ipa: "n"},
            "jy": {letter: '饜晱', ipa: "dz什"},
            "sh": {letter: '饜晲', ipa: "蕛"},
            "jh": {letter: '饜晳', ipa: "d蕭"},
            'o': {letter: '饜晵', ipa: "o"},
            "ty'": {letter: '饜晸', ipa: "t什始"},
            'f': {letter: '饜晹', ipa: "f"},
            'j': {letter: '饜晻', ipa: "dz"},
            "ch": {letter: '饜晼', ipa: "t蕛"},
            "p'": {letter: '饜晽', ipa: "p始"},
            "gh": {letter: '饜晿', ipa: "桑"},
            'r': {letter: '饜暀', ipa: "r"},
            's': {letter: '饜暁', ipa: "s"},
            'v': {letter: '饜暃', ipa: "v"},
            "t'": {letter: '饜暅', ipa: "t始"},
            "C": {letter: '饜暆', ipa: "蓵"},
            'A': {letter: '饜暈', ipa: "蓹"},
            "cy'": {letter: '饜暉', ipa: "ts什始"},
            'c': {letter: '饜暊', ipa: "ts"},
            'w': {letter: '饜暋', ipa: "w"},
            'p': {letter: '饜暍', ipa: "p"},
            'k': {letter: '饜暎', ipa: "k"},
            '"': {letter: '饜暞', ipa: ""},
            'u': {letter: '饜晵饜暋' ,ipa: "u"}, 
            "Y": {letter: "饜暈饜暋", ipa: "y"}
        };
/*
deciding which letters go into which object - letter sequences with
apostrophes take predence over other letter sequences which take
predence over single letters

*/
for(const k in full_table){
  if(k.match(/'/)){
    table1[k] = full_table[k];
  }
  else if(k.length > 1){
    table2[k] = full_table[k];
  }
  else {
    table3[k] = full_table[k];
  }
}
//using the full object of letters to fill a guide to the script
const letters = document.querySelector("#letters > tbody");
function udiReplacement(str){
    function udiCharacter(string){
        for(const k in table1){
            let rx = new RegExp(k, 'g');
            string = string.replace(rx, table1[k].letter);
        }
        return string;
    }
    function udiDigraph(string){
        
        for(const k in table2){
            let rx = new RegExp(k, 'g');
            string = string.replace(rx, table2[k].letter);
        }
        return string;
    }
    function udiMonograph(string){
        for(const k in table3){
            let rx = new RegExp(k, 'g');
            string = string.replace(rx, table3[k].letter);
        }
        return string;
    }
    str = udiCharacter(str); 
    str = udiDigraph(str);
    str = udiMonograph(str);
    return str;

}
input.addEventListener('keyup', function(){
    output.value = udiReplacement(input.value);
})
for(const k in full_table){
  let row = document.createElement('tr');
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  td1.innerText = k;
  td2.innerText = full_table[k].letter;
  td3.innerText = full_table[k].ipa;
  td4.innerText = `U+${full_table[k].letter.codePointAt(0).toString(16).toUpperCase()}`;
  row.appendChild(td1);
  row.appendChild(td2);
  row.appendChild(td3);
  row.appendChild(td4);
  letters.appendChild(row);
}

document.querySelector("#nojs").innerText = "";
