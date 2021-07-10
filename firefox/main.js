let url = window.location.toString();
if(url.length<=39){
	x(url);
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
		browser.runtime.sendMessage({cf_url: str});
	});	

	let pred_btn = document.createElement("button");	
	pred_btn.innerHTML = "Get Delta";
	document.querySelector("main").appendChild(pred_btn);
	pred_btn.addEventListener('click', function() {
		browser.runtime.sendMessage({pred_url: pred_url});
	});

	let stand_btn = document.createElement("button");	
	stand_btn.innerHTML = "Get Standings";
	document.querySelector("main").appendChild(stand_btn);
	stand_btn.addEventListener('click', function() {
		browser.runtime.sendMessage({friends_url: friends_url});
	});

	//chrome.runtime.sendMessage({cf_url: str, pred_url: pred_url});
	browser.runtime.onMessage.addListener(
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
	document.querySelector("main").appendChild(table);
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
	tr_list = document.querySelector("main").querySelector("tbody").querySelectorAll("tr");
	for(let i=0; i<sub_list.length; i++){
		let x = document.createElement("td");
		x.innerHTML = sub_list[i];
		tr_list[i].appendChild(x);
	}
}
function showDelta(delta) {
	let trh = document.querySelector("main").querySelector("thead").querySelector("tr");
	let x = document.createElement("th");
	if(delta>0){
		x.innerHTML = "+"+delta;
		x.style.color = 'green';
	}
	else {
		x.innerHTML = delta;
		x.style.color = 'grey';
	}
	trh.appendChild(x);
}