let li = "<li>Test</li>";
$('ul').append(li);
let last = document.querySelector('#test');
last.addEventListener('click', function(){
  console.log(Cookies.get());
});