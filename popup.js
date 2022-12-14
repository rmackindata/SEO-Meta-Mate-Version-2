function getMetas() {
	var message = document.querySelector('#metaTable');
	chrome.tabs.executeScript(null, {
		file: "getPageMetas.js"
	}, function() {
		// If you try it into an extensions page or the webstore/NTP you'll get an error
		if (chrome.runtime.lastError) {
			message.innerText = 'There was an error : \n' + chrome.runtime.lastError.message;
		}
	});
}

chrome.runtime.onMessage.addListener(function(request, sender) {
//	document.getElementById("metaTitleID").innerHTML = request.metaTitle;
//	console.log(metaTitle)
	var metaTable = document.getElementById('metaTable');
	if (request.method == "getMetas") {
		for (var i=0; i<request.metas.length; i++) {
			metaTable.innerHTML += "<tr><td>"+request.metas[i][0]+"</td><td>"+request.metas[i][1]+"</td><td>"+request.metas[i][2]+"</td><td>"+request.metas[i][3]+"</td><td>"+request.metas[i][4]+"</td></tr>";
		}
	}
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      var data7 = request.data7;
			console.log(data7)
			document.getElementById("totalWordCountPrintOut").innerHTML = request.data7;
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      var data8 = request.data8;
			console.log(data8)
			document.getElementById("WordCountTable").innerHTML = request.data8;
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      var data9 = request.data9;
			console.log(data9)
			document.getElementById("url").innerHTML = request.data9;
});


window.onload = getMetas;
