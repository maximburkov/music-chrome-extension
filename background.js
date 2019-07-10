console.log('background script');
const networkFilters = {
    urls: [
        //"https://*.storage.yandex.net/*"
        "<all_urls>"
    ]
};

chrome.webRequest.onCompleted.addListener((details) => {
    console.log('got request');
    if(details.type == 'media'){
        console.log('it is media');        
        console.log(details);

        chrome.downloads.download(
            {url: details.url,
             saveAs: true
            },
            function(res){
                console.log('loaded.')
                console.log(res);                
            });
    }

}, networkFilters);
