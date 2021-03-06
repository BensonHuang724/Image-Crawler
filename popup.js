const searchBtn = document.getElementById("search");
const selectBtn = document.getElementById('select-all') 
const filenameIpt = document.getElementById("filename_extension");
const downloadBtn = document.getElementById("download");
searchBtn.addEventListener('click', ()=> {
    chrome.tabs.query({active:true,currentWindow:true}, (tabs) => {
        console.log('query tab',tabs,tabs[0]);
        chrome.tabs.sendMessage(tabs[0].id,{todo:"analysis",patterns:filenameIpt.value.split(/[ ,]+/)},(response) => {
                console.log('response',response.urls);
                urls = response.urls;
                let urlBlock = document.getElementById('urls-block');

                //clear all links
                while (urlBlock.firstChild) {
                    urlBlock.removeChild(urlBlock.firstChild);
                }
                console.log('clear all links')
                
                let result = document.createElement('p');
                result.textContent=`Result: ${urls.length} images`;
                urlBlock.appendChild(result);
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
                    let lastSlash = url.lastIndexOf('/');
                    let fileName = "bang";
                    if (lastSlash != -1) {
                        fileName = url.slice(lastSlash+1);
                    } else {
                        fileName = url;
                    }  
                    anchor.appendChild(document.createTextNode(fileName));
                    anchor.href = url;
                    let label = document.createElement("label") ;
                    label.setAttribute("for",i.toString());
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
downloadBtn.addEventListener('click', ()=> {
    let downloadList = [];
    let checkboxes = document.getElementsByClassName("form-check-input");
    let labels     = document.getElementsByClassName("form-check-label");
    for (let i=0;i<checkboxes.length;i++) {
        if (checkboxes[i].checked) {
            downloadList.push(labels[i].getElementsByTagName("a")[0].href);
        }
    }
    console.log("url list for download",downloadList);
    for (let i =0;i<downloadList.length;i++) {
        let downloadOptions = {
            "url": downloadList[i],
            "saveAs": false,
        };
        chrome.downloads.download(downloadOptions,(bang)=>{
            console.log('downloads callback:',bang);
        });
    }
})

selectBtn.addEventListener('click', ()=> { 
    let checkboxes = document.getElementsByClassName("form-check-input");
    console.log(selectBtn.textContent);
    if (selectBtn.textContent == "Select All") {
        selectBtn.textContent = "Unselect All";
        for (let i=0;i<checkboxes.length;i++) {
            checkboxes[i].checked = true;
        };
    } else {
        selectBtn.textContent = "Select All";
        for (let i=0;i<checkboxes.length;i++) {
            checkboxes[i].checked = false;
        };
    };
})