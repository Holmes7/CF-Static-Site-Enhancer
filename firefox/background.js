browser.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		var str = request.link;
		fetch(str).then(response=>response.text()).then(function(data){
			var page_html = document.createElement("html");
			page_html.innerHTML = data;
			var table = page_html.querySelector("table.problems");
			var sub_list = [];
			var tr_list = table.querySelectorAll("tr");
			
			for(var i=1; i<tr_list.length; i++){
				var tds = tr_list[i].querySelectorAll("td");
				var texti = tds[3].textContent;
				sub_list.push(texti);
			}
			
			browser.tabs.query({active: true, currentWindow: true}, function(tabs){
				chrome.tabs.sendMessage(tabs[0].id, {submissions: sub_list});
			})
		})
	})
