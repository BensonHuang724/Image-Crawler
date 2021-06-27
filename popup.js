const analysisBtn = document.getElementById("analysis")
const filenameIpt = document.getElementById("filename_extension")
analysisBtn.addEventListener('click', ()=> {
    chrome.tabs.query({active:true,currentWindow:true}, (tabs) => {
        console.log('query tab',tabs,tabs[0]);
        chrome.tabs.sendMessage(tabs[0].id,{todo:"analysis",data:filenameIpt.value},(response) => {
                console.log('response',response.urls);
                urls = response.urls;
                let urlBlock = document.getElementById('urls-block');

                //clear all links
                while (urlBlock.firstChild) {
                    urlBlock.removeChild(urlBlock.firstChild);
                }
                console.log('clear all links')

                // insert links inside this website
                for (var i = 0 ; i < urls.length ; i++) {
                    let url = urls[i];
                    console.log('url',url);

                    let checkbox = document.createElement('input');
                    checkbox.type  = 'checkbox';
                    checkbox.classList.add("form-check-input")
                    checkbox.value =  i.toString();
                    checkbox.id =  i.toString();

                    let anchor = document.createElement("a") ;
                    anchor.appendChild(document.createTextNode(url));
                    anchor.href = url;
                    let label = document.createElement("label") ;
                    label.for = i.toString();
                    label.classList.add("form-check-label")
                    label.append(anchor);

                    let block = document.createElement("div");
                    block.classList.add("form-check")
                    block.appendChild(checkbox); 
                    block.appendChild(label); 
                    urlBlock.appendChild(block);

                };
                console.log('insert links inside this website')

        });
    })
})