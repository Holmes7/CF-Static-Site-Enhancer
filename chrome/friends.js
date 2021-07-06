// console.log("friends");
let tbodylist = document.querySelectorAll("tbody");
let tbody = tbodylist[tbodylist.length-2];
let tdlist = tbody.querySelectorAll("td");

let friends = []
for(let i=1; i<tdlist.length; i+=3){
    friends.push(tdlist[i].innerText);
}
//console.log(friends);
let alist = document.querySelector("#header").querySelectorAll("a");
let username = alist[alist.length-2].innerText;
// console.log(username);
localStorage = window.localStorage;
localStorage.setItem(username, friends.join());
//console.log(localStorage.getItem(username));