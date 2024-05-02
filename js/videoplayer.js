



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
            myself.addTime(10);
        });

        this.fastBackward = this.playersection.querySelector("[id='fast-backward']");
        this.fastBackward.addEventListener("click", (e) => {
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


        const scrubContainer = document.getElementById("scrub-container");
        const scrubKnob = document.getElementById("timeline-scrub");
        const timelineScrollArea = document.getElementById("timeline-scroll-area");

        

        const setScrub = (t) => {
            scrubKnob.style.left = ((t)*10-timelineScrollArea.scrollLeft) + "px";
        };

        timelineScrollArea.addEventListener("scroll", (e) => {
            setScrub(myself.videoPlayer.currentTime)  
        });

        const zeroPad = (num, places) => String(num).padStart(places, '0')
        this.registerTimeUpdate((t) => {
            
            let ms = zeroPad(Math.floor((t*1000) % 1000), 3);
            let s = zeroPad(Math.floor(t % 60), 2);
            let m = zeroPad(Math.floor((t / 60) % 60), 2);
            let h = zeroPad(Math.floor((t / (60 * 60)) % 100), 2);
            document.getElementById("time").innerHTML = h+"."+m+"."+s+":"+ms;

            setScrub(t);
        });

        let listener = (e) => {
            const value = (e.x - scrubContainer.offsetLeft - scrubKnob.offsetWidth / 2 + timelineScrollArea.scrollLeft);
            this.setTime(value / 10);
        };

        let listenerUp = (e) => {
            document.removeEventListener("mousemove", listener);
            document.removeEventListener("mouseup", listenerUp);
        };

        document.getElementById("timeline-scrub").addEventListener("mousedown", (e) => {
            document.addEventListener("mousemove", listener);
            document.addEventListener("mouseup", listenerUp);
        });


        this.interval = setInterval(function() {
            if(!myself.videoPlayer.paused)
            for(const item of myself.timeUpdates)
                item(myself.videoPlayer.currentTime);

            // if()
            if(myself.videoPlayer.readyState != 4){
                document.getElementById("spinner").style.display="unset"
                myself.videoPlayer.classList.add('loading');
            }else{
                document.getElementById("spinner").style.display="none"
                // myself.videoPlayer.classList.remove('loading');
            }
        }, 16);

        this.videoPlayer.onloadedmetadata = () => {
            this.videoPlayer.currentTime = 1;
        };
        this.videoPlayer.currentTime = 1;

        document.addEventListener('keyup', event => {
            if (event.code === 'Space') {
                if(myself.videoPlayer.paused)
                    myself.setPlay();
                else
                    myself.setPaused();
            }
            if (event.code == "ArrowRight"){
                if (event.shiftKey){
                    myself.setTime(myself.videoPlayer.duration);
                }else{
                    myself.addTime(10);
                }
            }

            if (event.code == "ArrowLeft"){
                if (event.shiftKey){
                    myself.setTime(0);
                }else{
                    myself.addTime(-10);
                }
            }
        });

        this.setTime(0);
    }

    setPlay(){
        for(const item of this.playUpdates){
            item();
        }
    }

    setPaused(){
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