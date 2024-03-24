



class VideoPlayer{

    time = 0;
    paused = true;
    timeUpdates = [];
    playUpdates = [];
    pauseUpdates = [];
    skipBackUpdates = [];
    fastFowardUpdates = [];
    skipForwardUpdates = [];

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

        this.skipBack = this.playersection.querySelector("[id='skip-back']");
        this.skipBack.addEventListener("click", (e) => {
            for(const item of myself.skipBackUpdates){
                item();
            }
        });

        this.fastFoward = this.playersection.querySelector("[id='fast-forward']");
        this.fastFoward.addEventListener("click", (e) => {
            for(const item of myself.fastFowardUpdates){
                item();
            }
        });

        this.skipFoward = this.playersection.querySelector("[id='skip-forward']");
        this.skipFoward.addEventListener("click", (e) => {
            for(const item of myself.skipForwardUpdates){
                item();
            }
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
            
            let ms = zeroPad(Math.floor(t % 1000), 3);
            let s = zeroPad(Math.floor((t / 1000) % 60), 2);
            let m = zeroPad(Math.floor((t / (1000 * 60)) % 60), 2);
            let h = zeroPad(Math.floor((t / (1000 * 60 * 60)) % 100), 2);
            document.getElementById("time").innerHTML = h+"."+m+"."+s+":"+ms;
        })


        {

            var start = Date.now();
            this.interval = setInterval(function() {
                const now = Date.now();
                if(!myself.paused){
                    myself.addTime(now-start);
                }
                start = now;

            }, 16);
        }
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
        this.time += time;

        for(const item of this.timeUpdates){
            item(this.time);
        }
    }

    setTime(time){
        this.time = time;

        for(const item of this.timeUpdates){
            item(this.time);
        }
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

const videoplayer = new VideoPlayer();


export function init(){
    videoplayer.init();
}