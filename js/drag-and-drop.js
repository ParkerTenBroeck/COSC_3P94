var current_dropzone = null;
var dropzone_hover = false;

export function init(){
    class Draggable{
        draggableArea;
        mouseIsDown = false;
        mouseIsHover = false;

        constructor(draggableArea) {
            const myself = this;
            this.draggableArea = draggableArea;


            this.draggableArea.addEventListener('mouseenter', function (e) {
                // console.log("entered");
                myself.isHover = true;
            });
            this.draggableArea.addEventListener('mouseout', function (e) {
                // console.log("exited");
                myself.isHover = false;
            });

            document.addEventListener('mousedown', function (e) {
                e.preventDefault()
                if (myself.isHover) {
                    myself.isDown = true;
                }
            }, true);

            document.addEventListener('mouseup', function (e) {
                if (myself.isDown && dropzone_hover) {
                    // console.log("dropping ", myself, "on ", current_dropzone);
                    current_dropzone.drop(myself, e);
                }
                myself.isDown = false;
            }, true);
        }

    }

    class Dropzone{
        dropArea;
        mouseIsHover = false;
        constructor(dropArea) {
            const myself = this;
            this.dropArea = dropArea;
            this.dropArea.addEventListener('mouseenter', function (e) {
                // console.log("entered");
                myself.isHover = true;
                current_dropzone = myself;
                dropzone_hover = true;
            });
            this.dropArea.addEventListener('mouseout', function (e) {
                // console.log("exited");
                myself.isHover = false;
                current_dropzone = null;
                dropzone_hover = false
            });
            
        }
        drop(draggableArea, mouseEvent) {
            console.log("item: ", draggableArea);
            console.log(" dropped on ", this);
            console.log(" event: ", mouseEvent)
        }
    }

    for (const draggableArea of document.querySelectorAll('.file-preview')){
        new Draggable(draggableArea);
    }

    for (const dropArea of document.querySelectorAll('.timeline_container')){
        new Dropzone(dropArea);
    }
}