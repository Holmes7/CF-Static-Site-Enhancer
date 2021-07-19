async function get_cf_html(url) {
	let res = await fetch(url);
	let data = res.text();
	return data;
}
async function get_delta(url) {
	try {
		let data = await fetch(url);
		let json = await data.json();
		if(json['result'].length == 0){
			return '?';
		}
		let obj = json['result'][0];
		let delta = obj['newRating']-obj['oldRating'];
		return delta;
	}
	catch(err) {
		return 'server down';
	}
}
chrome.runtime.onMessage.addListener(
	async function(request, sender, sendResponse){
		//console.log(sender);
		if(request.cf_url){
			let text = await get_cf_html(request.cf_url);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {text: text});
			})
		}
		else if(request.pred_url) {
			//console.log('delta');
			let delta = await get_delta(request.pred_url);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {delta: delta});
			})	
		}
		else {
			let ftext = await get_cf_html(request.friends_url);
			//console.log(ftext);
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {ftext: ftext});
			})	
		}
	})

