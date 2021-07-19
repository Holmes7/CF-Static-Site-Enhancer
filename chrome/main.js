let url = window.location.toString();
if(url.length<=39){
	x(url);
}
function addContainers() {
	let tablediv = document.createElement('div');
	tablediv.setAttribute('id', 'standings');
	document.querySelector('main').appendChild(tablediv);

	let th = document.createElement("th");
	th.setAttribute('id', 'delta');
	document.querySelector("main").querySelector("thead").querySelector("tr").appendChild(th);

	let trs = document.querySelector('main').querySelector('tbody').querySelectorAll('tr');
	console.log(trs.length)
	for (tr of trs) {
		let td = document.createElement("td");
		td.setAttribute('class', 'submissions');
		td.setAttribute('style', 'width: 50px');
		tr.appendChild(td);
	}
}
function x(url)
{
	let contest = url.match(/\d\d\d\d/);
	let str = "https://codeforces.com/contest/"+contest[0];
	let text = document.querySelector(".enter-or-register-box").innerText;
	let username = text.split(' ')[0];
	let pred_url = `https://cf-predictor.herokuapp.com/GetPartialRatingChangesServlet?contestId=${contest[0]}&handles=${username}`;
	let friends_url = `https://codeforces.com/contest/${contest[0]}/standings/friends/true`;

	let subs_btn = document.createElement("button");	
	subs_btn.innerHTML = "Get Submissions";
	document.querySelector("main").appendChild(subs_btn);
	subs_btn.addEventListener('click', function() {
		chrome.runtime.sendMessage({cf_url: str});
	});	

	let pred_btn = document.createElement("button");	
	pred_btn.innerHTML = "Get Delta";
	document.querySelector("main").appendChild(pred_btn);
	pred_btn.addEventListener('click', function() {
		chrome.runtime.sendMessage({pred_url: pred_url});
	});

	let stand_btn = document.createElement("button");	
	stand_btn.innerHTML = "Get Standings";
	document.querySelector("main").appendChild(stand_btn);
	stand_btn.addEventListener('click', function() {
		chrome.runtime.sendMessage({friends_url: friends_url});
	});

	addContainers();
	//chrome.runtime.sendMessage({cf_url: str, pred_url: pred_url});
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if(request.text){
				subs(request.text);
			}
			else if(request.delta) {
				showDelta(request.delta);
			}
			else {
				show_standings(request.ftext);
			}
		}
	)
}

function show_standings(ftext) {
	let page_html = document.createElement("html");
	page_html.innerHTML = ftext;
	let table = page_html.querySelector(".standings");
	let tablediv = document.querySelector("#standings");
	tablediv.innerHTML = '';
	tablediv.appendChild(table);
}

function subs(text) {
	let page_html = document.createElement("html");
	page_html.innerHTML = text;
	var table = page_html.querySelector("table.problems");
	let sub_list = [];
	let tr_list = table.querySelectorAll("tr");
	
	for(let i=1; i<tr_list.length; i++){
		let tds = tr_list[i].querySelectorAll("td");
		let texti = tds[3].textContent;
		sub_list.push(texti);
	}
	let subs_td_list = document.querySelectorAll('.submissions');
	console.log(subs_td_list.length);
	for(let i=0; i<sub_list.length; i++){
		subs_td_list[i].innerHTML = sub_list[i];
	}
}
function showDelta(delta) {
	let x = document.querySelector('#delta');
	if(delta == "server down" || delta=='?'){
		x.innerHTML = delta;
		x.style.color = 'grey';
	}
	else if(delta<=0){
		x.innerHTML = delta;
		x.style.color = 'grey';	
	}
	else {
		x.innerHTML = "+"+delta;
		x.style.color = 'green';
	}
}
