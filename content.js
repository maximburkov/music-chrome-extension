(function () {
    console.log('In Yandex music');   


    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension");

          $('.player-controls__track-controls').append('<button data-id="'+request.id+'" data-url="'+request.url+'">Load</button>');

          sendResponse({message: "please load"});
        });
})();

