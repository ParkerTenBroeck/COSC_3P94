
{
    class ResizableArea{
        splitArea;
        leftContent;
        rightContent;
        separatorBar;
        mouseIsDown = false;
        mouseIsHover = false;
        horizontal;

        constructor(splitArea, horizontal) {
            const myself = this;
            this.splitArea = splitArea;
            if (horizontal){
                this.leftContent = splitArea.querySelector('.horizontal-div-split-top');
                this.separatorBar = splitArea.querySelector('.spliter-div-row');
                this.rightContent = splitArea.querySelector('.horizontal-div-split-bottom');
            }else{
                this.leftContent = splitArea.querySelector('.vertical-div-split-left');
                this.separatorBar = splitArea.querySelector('.spliter-div-col');
                this.rightContent = splitArea.querySelector('.vertical-div-split-right');
            }
            this.horizontal = horizontal;

            this.separatorBar.addEventListener('mouseenter', function (e) {
                myself.isHover = true;
            });
            this.separatorBar.addEventListener('mouseout', function (e) {
                myself.isHover = false;
            });

            document.addEventListener('mousedown', function (e) {
                if (myself.isHover) {
                    myself.isDown = true;
                }
            }, true);
            document.addEventListener('mouseup', function (e) {
                myself.isDown = false;
            }, true);
            document.addEventListener('mousemove', function (e) {
                if (myself.isDown) {
                    myself.update(e);
                }
            });
        }

        update(e){
            if(this.horizontal){
                this.leftContent.style.height = e.clientY  + 'px';
            }else{
                this.leftContent.style.width = e.clientX  + 'px';
            }
        }
    }

    for (const splitArea of document.querySelectorAll('.horizontal-div-split')){
        new ResizableArea(splitArea, true);
    }

    for (const splitArea of document.querySelectorAll('.vertical-div-split')){
        new ResizableArea(splitArea, false);
    }
}