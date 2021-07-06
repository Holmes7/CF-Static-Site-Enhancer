var url = window.location.toString();
if(url.length<=39){
	x();
}
function x()
{
	var contest = url.match(/\d\d\d\d/);
	var str = "https://codeforces.com/contest/"+contest[0];
	chrome.runtime.sendMessage({link: str});
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse){
			var sub_list = request.submissions;
			var tr_list = document.querySelector("main").querySelector("tbody").querySelectorAll("tr");
			for(var i=0; i<sub_list.length; i++){
				var x = document.createElement("td");
				x.innerHTML = sub_list[i];
				tr_list[i].appendChild(x);
			}

		})
	
}