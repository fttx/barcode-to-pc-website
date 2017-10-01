$(function () {
    setupVideo();

    if (ga) {
        $('#download-server a, #download-app a').click(function () {
            switch ($(this).attr('id')) {
                case 'win-32':
                    ga('send', 'event', 'Downloads', 'download', 'Windows x32', 'win32');
                    ga('send', 'event', 'Apple', 'Download Bonjour', 'bonjour', 'bonjour');
                    break;
                case 'win-64':
                    ga('send', 'event', 'Downloads', 'download', 'Windows x64', 'win64');
                    ga('send', 'event', 'Apple', 'Download Bonjour', 'bonjour', 'bonjour');
                    break;

                case 'macos':
                    ga('send', 'event', 'Downloads', 'download', 'macOS', 'macos');
                    break;

                case 'linux':
                    ga('send', 'event', 'Downloads', 'download', 'Linux', 'linux');
                    break;

                case 'ios':
                    ga('send', 'event', 'Downloads', 'download', 'iOS', 'ios');
                    break;
                case 'android':
                    ga('send', 'event', 'Downloads', 'download', 'Android', 'android');
                    break;
            }
        });
    }

    $('#win').click(function (e) {
        e.preventDefault();
        $('#win-32, #win-64').removeClass('hidden');
        $(this).addClass('hidden');
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