(function () {
    console.log('In Yandex music');   

    function LoadAudio(){
      console.log('check');
    }

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
          console.log(sender.tab ?
                      "from a content script:" + sender.tab.url :
                      "from the extension");

          $('.player-controls__track-controls').append('<button class="load-button" data-id="'+request.id+'" data-url="'+request.url+'">Load</button>');
          $('[data-id="'+request.id+'"].load-button').click(function(){
              console.log('click!');
              console.log($(this));

              var name = $(this).parents('.player-controls__wrapper').find('.track__title').html();
              var artist = $(this).parents('.player-controls__wrapper').find('.d-artists a').html();

              //send message to the background
              chrome.runtime.sendMessage({
                status: "load", 
                id: request.id,
                name: name,
                artist: artist
              }, function(response) {
                //console.log(response.);
              });
          });


          sendResponse({message: "please load"});
        });
})();



