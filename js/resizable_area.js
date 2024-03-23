
export default function init_resizable_area(){
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
            this.update({
                clientY: splitArea.getBoundingClientRect().top + splitArea.getBoundingClientRect().height / 2,
                clientX: splitArea.getBoundingClientRect().left + splitArea.getBoundingClientRect().width / 2,
            })
        }

        update(e){
            if(this.horizontal){
                this.splitArea.style.height = '100%';
            }else{
                this.splitArea.style.width = '100%';
            }

            const bounding = this.splitArea.getBoundingClientRect();
            const bounding2 = this.separatorBar.getBoundingClientRect();

            console.log(bounding);
            console.log(bounding2);
            console.log(e.clientY + " " + e.clientx);
            if(this.horizontal){
                const height =  e.clientY-bounding.top;
                this.leftContent.style.height = height  + 'px';

                this.rightContent.style.height = bounding.height-height-bounding2.height + 'px';
            }else{
                this.leftContent.style.width = e.clientX-bounding.left  + 'px';  
                this.rightContent.style.width = bounding.width-(e.clientX-bounding.left)-bounding2.width + 'px';
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