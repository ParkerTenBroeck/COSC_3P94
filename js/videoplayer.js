



class VideoPlayer{

    time = 0;
    timeUpdates = [];
    playUpdates = [];
    pauseUpdates = [];
    skipBackUpdates = [];
    fastFowardUpdates = [];
    skipForwardUpdates = [];

    init() {
        this.playersection = document.querySelector(".player-section");
        
        this.play = this.playersection.querySelector("[id='play']");
        this.play.addEventListener("click", (e) => {
            for(const item of this.playUpdates){
                item();
            }
        });
        this.pause = this.playersection.querySelector("[id='pause']");
        this.pause.addEventListener("click", (e) => {
            for(const item of this.pauseUpdates){
                item();
            }
        });

        this.skipBack = this.playersection.querySelector("[id='skip-back']");
        this.skipBack.addEventListener("click", (e) => {
            for(const item of this.skipBackUpdates){
                item();
            }
        });

        this.fastFoward = this.playersection.querySelector("[id='fast-forward']");
        this.fastFoward.addEventListener("click", (e) => {
            for(const item of this.fastFowardUpdates){
                item();
            }
        });

        this.skipFoward = this.playersection.querySelector("[id='skip-forward']");
        this.skipFoward.addEventListener("click", (e) => {
            for(const item of this.skipForwardUpdates){
                item();
            }
        });

        this.registerPlayUpdate(() => {
            document.getElementById("video-player").play();
        });

        this.registerPauseUpdate(() => {
            document.getElementById("video-player").pause();
        });
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