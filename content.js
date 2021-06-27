chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log('get request from popup',request);
    if (request.todo=='analysis') {
        console.log('patterns:',request.patterns);
        imgs = document.getElementsByTagName('img');
        urls = [];
        for (let i = 0; i<imgs.length; i++) {
            if (request.patterns[0] != "") {
                for (let j = 0; j<request.patterns.length;j++) {
                    let pattern = request.patterns[j];
                    let patternLen = pattern.length;
                    if (imgs[i].src.slice(-1*patternLen)==pattern) {
                        urls.push(imgs[i].src);
                        continue;
                    }
                }
            } else {
                if (imgs[i].src != "") {
                    urls.push(imgs[i].src);
                }
            }
        }
        console.log('matched urls:',urls);
        sendResponse({'urls':urls});
    }
});
