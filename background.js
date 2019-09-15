const networkFilters = {
    urls: [
        "https://*.storage.yandex.net/*"
    ]
};

//replace by guid
var id = 0;
//not very good guid implementation
// function uuid(){
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c,r){
//         return 'x'==с?(r=Math.random()*16|0):(r&0x3|0x8).toString(16)
//     });
// }

//cash for audio files
var cash = [];

chrome.webRequest.onCompleted.addListener((details) => {
    console.log('got request');
    if(details.type == 'media'){

        // var song = {
        //     id: ++id,
        //     url: details.url
        // };

        //console.log(song);     
        //cash.push(song);
        cash[++id] = details.url;

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {url: details.url, id: id}, function(response) {
              //console.log(response.message);
            });
          });

        // chrome.downloads.download(
        //     {url: details.url,
        //      saveAs: true
        //     },
        //     function(res){
        //         console.log('loaded.')
        //         console.log(res);                
        //     });
    }

}, networkFilters);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.status == "load"){
        console.log('Start loading: ' + request.id);

        chrome.downloads.download(
            {url: cash[request.id],
             saveAs: true,
             filename: request.artist + ' - ' + request.name
            },
            function(res){
                console.log('loaded.')
                console.log(res);                
            });
      }
        sendResponse({farewell: "message got"});
    });
