chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log('get request',request);
    if (request.todo=='analysis') {
        console.log(request.data);
        imgs = document.getElementsByTagName('img');
        urls = [];
        for (let i = 0; i<imgs.length; i++) {
            urls.push(imgs[i].src);
        }
        console.log(urls);
        sendResponse({'urls':urls});
    }
});
