$(function () {
    setupVideo();

    $('#download-server a, #download-app a').click(function () {
        switch ($(this).attr('id')) {
            case 'win':
                gtag('event', 'download_server', {
                    'event_category': 'download',
                    'event_label': 'win',
                });

                gtag('event', 'bonjour_distribution');
                break;

            case 'macos':
                gtag('event', 'download_server', {
                    'event_category': 'download',
                    'event_label': 'macos',
                });
                break;

            case 'linux':
                gtag('event', 'download_server', {
                    'event_category': 'download',
                    'event_label': 'linux',
                });
                break;

            case 'ios':
                gtag('event', 'download_app', {
                    'event_category': 'download',
                    'event_label': 'ios',
                });
                break;
            case 'android':
                gtag('event', 'download_app', {
                    'event_category': 'download',
                    'event_label': 'android',
                });
                break;
        }
    });

    $('#github_app, #github_server').click(function (e) {
        gtag('event', 'view_source', {
            'event_category': 'view',
            'event_label': $(this).attr('id').replace('github_', ''),
        });
    });

    $('a[href^="#"]').click(function (event) {
        event.preventDefault();
        $(window).scrollTop($($(this).attr('href')).offset().top - 76);
    });

    if (window.location.hash.length !== 0) {
        setTimeout(function () {
            $(window).scrollTop($(location.hash).offset().top - 76);
        }, 0)
    }
})


function setupVideo() {
    var macbook = document.getElementById('macbook');
    var iphone = document.getElementById('iphone');
    var video = document.getElementById('video');

    if (!macbook) { return }

    fitToContainer(macbook);
    fitToContainer(iphone);

    var macbookCtx = macbook.getContext('2d');
    var iphoneCtx = iphone.getContext('2d');

    video.addEventListener('play', function () {
        var $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                macbookCtx.drawImage($this, 0, 0, 739.2, 462, 0, 0, macbook.width, macbook.height);
                iphoneCtx.drawImage($this, 740, 0, 262, 462, 0, 0, iphone.width, iphone.height);
                setTimeout(loop, 1000 / 20); // drawing at 20fps
            }
        })();
    }, 0);

    video.play();
}

function fitToContainer(canvas) {
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}