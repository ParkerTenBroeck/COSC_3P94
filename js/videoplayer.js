



class VideoPlayer{

    timeUpdates = [];
    playUpdates = [];
    pauseUpdates = [];

    init() {
        const myself = this;

        this.playersection = document.querySelector(".player-section");

        this.videoPlayer = this.playersection.querySelector("[id='video-player']");
        
        this.play = this.playersection.querySelector("[id='play']");
        this.play.addEventListener("click", (e) => {
            myself.setPlay();
        });
        this.pause = this.playersection.querySelector("[id='pause']");
        this.pause.addEventListener("click", (e) => {
            myself.setPaused();
        });
        this.pause.style.display = 'none';

        this.skipBack = this.playersection.querySelector("[id='skip-back']");
        this.skipBack.addEventListener("click", (e) => {
            myself.setTime(0);
        });

        this.fastFoward = this.playersection.querySelector("[id='fast-forward']");
        this.fastFoward.addEventListener("click", (e) => {
            // for(const item of myself.fastFowardUpdates){
            //     item();
            // }
            myself.addTime(10);
        });

        this.fastBackward = this.playersection.querySelector("[id='fast-backward']");
        this.fastBackward.addEventListener("click", (e) => {
            // for(const item of myself.fastBackwardUpdates){
            //     item();
            // }
            myself.addTime(-10);
        });

        this.skipFoward = this.playersection.querySelector("[id='skip-forward']");
        this.skipFoward.addEventListener("click", (e) => {
            myself.setTime(myself.videoPlayer.duration);
        });

        this.registerPauseUpdate(() => {
            myself.pause.style.display = 'none';
            myself.play.style.display = '';
        });

        this.registerPlayUpdate(() => {
            myself.pause.style.display = '';
            myself.play.style.display = 'none';
        });

        this.videoPlayer.addEventListener("ended", (e) => {
            myself.setPaused();
            myself.setTime(0);
        });

        this.registerPlayUpdate(() => {
            myself.videoPlayer.play();
        });

        this.registerPauseUpdate(() => {
            myself.videoPlayer.pause();
        });

        const zeroPad = (num, places) => String(num).padStart(places, '0')
        this.registerTimeUpdate((t) => {
            
            let ms = zeroPad(Math.floor((t*1000) % 1000), 3);
            let s = zeroPad(Math.floor(t % 60), 2);
            let m = zeroPad(Math.floor((t / 60) % 60), 2);
            let h = zeroPad(Math.floor((t / (60 * 60)) % 100), 2);
            document.getElementById("time").innerHTML = h+"."+m+"."+s+":"+ms;
        })


        this.interval = setInterval(function() {
            if(!myself.videoPlayer.paused)
            for(const item of myself.timeUpdates)
                item(myself.videoPlayer.currentTime);
        }, 16);
    }

    setPlay(){
        this.paused = false;

        for(const item of this.playUpdates){
            item();
        }
    }

    setPaused(){
        this.paused = true;
        for(const item of this.pauseUpdates){
            item();
        }
    }

    addTime(time){
        this.videoPlayer.currentTime += time;
        
        for(const item of this.timeUpdates)
            item(this.videoPlayer.currentTime);
    }

    setTime(time){
        this.videoPlayer.currentTime = time;
        
        for(const item of this.timeUpdates)
            item(this.videoPlayer.currentTime);
    }

    registerTimeUpdate(update){
        this.timeUpdates.push(update);
    }

    registerPlayUpdate(update){
        this.playUpdates.push(update);
    }

    registerPauseUpdate(update){
        this.pauseUpdates.push(update);
    }
}

export const videoplayer = new VideoPlayer();


export function init(){
    videoplayer.init();
}