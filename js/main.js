$(function () {
    var videos = {
        a: Popcorn("#a"),
        b: Popcorn("#b"),
    },
        scrub = $("#scrub"),
        loadCount = 0,
         events = "pause stop".split(/\s+/g);

    // iterate both media sources
    Popcorn.forEach(videos, function (media, type) {

        // when each is ready... 
        media.on("canplayall", function () {

            // trigger a custom "sync" event
            this.emit("sync");


            // Listen for the custom sync event...    
        }).on("sync", function () {

            // Once both items are loaded, sync events
            if (++loadCount == 2) {
                replay();
            }

            // If one of the video is paused/stopped
            events.forEach(function (event) {
                videos.a.on(event, function () {
                    replay();
                })

                videos.b.on(event, function () {
                    replay();
                })
            });
        });

        function replay() {
            videos.a.currentTime = 0;
            videos.b.currentTime = 0;
            videos.a.play();
            videos.b.play();
        }


    });
})