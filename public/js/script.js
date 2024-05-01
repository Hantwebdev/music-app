// Aplayer
const aplayer = document.querySelector("#aplayer");
if(aplayer) {
    let dataSong = aplayer.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);
    
    let dataSinger = aplayer.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayer,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar
        }],
        autoplay: true
    });

    const elementAvatar = document.querySelector(".singer-detail .inner-avatar");
    
    ap.on("play", function () {
        elementAvatar.style.animationPlayState = "running";
    })

    ap.on("pause", function () {
        elementAvatar.style.animationPlayState = "paused";
    })
}

// End Aplayer