var url = window.location.toString();
if(url.length<=39){
	console.log("working");
	x();
}
function x()
{
	var contest = url.slice(34,38);
	var str = "https://codeforces.com/contest/"+contest;
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