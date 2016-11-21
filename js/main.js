$(function () {
    var macbook = document.getElementById('macbook');
    var iphone = document.getElementById('iphone');
    var video = document.getElementById('video');

    fitToContainer(macbook);
    fitToContainer(iphone);
    
    var macbookCtx = macbook.getContext('2d');
    var iphoneCtx = iphone.getContext('2d');

    video.addEventListener('play', function() {
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
})


function fitToContainer(canvas){
    // Make it visually fill the positioned parent
    canvas.style.width ='100%';
    canvas.style.height='100%';
    // ...then set the internal size to match
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}