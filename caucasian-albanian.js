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
            'a': {letter: '𐔰', ipa: "a"},
            'b': {letter: '𐔱', ipa: "b"},
            'g': {letter: '𐔲', ipa: "g"},
            'd': {letter: '𐔳', ipa: "d"},
            'e': {letter: '𐔴', ipa: "e"},
            'z': {letter: '𐔵', ipa: "z"},
            "E": {letter: '𐔶', ipa: "eː"},
            "zh": {letter: '𐔷', ipa: "ʒ"},
            't': {letter: '𐔸', ipa: "t"},
            "tC'": {letter: '𐔹', ipa: "tɕʼ"},
            'y': {letter: '𐔺', ipa: "j"},
            "Z": {letter: '𐔻', ipa: "ʑ"},
            'i': {letter: '𐔼', ipa: "i"},
            'Q': {letter: '𐔽', ipa: "ʕ"},
            'l': {letter: '𐔾', ipa: "l"},
            "ny": {letter: '𐔿', ipa: "nʲ"},
            'x': {letter: '𐕀', ipa: "x"},
            "dy": {letter: '𐕁', ipa: "dʲ"},
            "c'": {letter: '𐕂', ipa: "tsʼ"},
            "J": {letter: '𐕃', ipa: "dʑ"},
            "k'": {letter: '𐕄', ipa: "kʼ"},
            "ly": {letter: '𐕅', ipa: "lʲ"},
            'h': {letter: '𐕆', ipa: "h"},
            'q': {letter: '𐕇', ipa: "q"},
            "O": {letter: '𐕈', ipa: "ɒ"},
            "tC": {letter: '𐕉', ipa: "tɕ"},
            "ch'": {letter: '𐕊', ipa: "tʃʼ"},
            "cy": {letter: '𐕋', ipa: "tsʲ"},
            'm': {letter: '𐕌', ipa: "m"},
            "q'": {letter: '𐕍', ipa: "qʼ"},
            'n': {letter: '𐕎', ipa: "n"},
            "jy": {letter: '𐕏', ipa: "dzʲ"},
            "sh": {letter: '𐕐', ipa: "ʃ"},
            "jh": {letter: '𐕑', ipa: "dʒ"},
            'o': {letter: '𐕒', ipa: "o"},
            "ty'": {letter: '𐕓', ipa: "tʲʼ"},
            'f': {letter: '𐕔', ipa: "f"},
            'j': {letter: '𐕕', ipa: "dz"},
            "ch": {letter: '𐕖', ipa: "tʃ"},
            "p'": {letter: '𐕗', ipa: "pʼ"},
            "gh": {letter: '𐕘', ipa: "ɣ"},
            'r': {letter: '𐕙', ipa: "r"},
            's': {letter: '𐕚', ipa: "s"},
            'v': {letter: '𐕛', ipa: "v"},
            "t'": {letter: '𐕜', ipa: "tʼ"},
            "C": {letter: '𐕝', ipa: "ɕ"},
            'A': {letter: '𐕞', ipa: "ə"},
            "cy'": {letter: '𐕟', ipa: "tsʲʼ"},
            'c': {letter: '𐕠', ipa: "ts"},
            'w': {letter: '𐕡', ipa: "w"},
            'p': {letter: '𐕢', ipa: "p"},
            'k': {letter: '𐕣', ipa: "k"},
            '"': {letter: '𐕯', ipa: ""},
            'u': {letter: '𐕒𐕡' ,ipa: "u"}, 
            "Y": {letter: "𐕞𐕡", ipa: "y"}
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
