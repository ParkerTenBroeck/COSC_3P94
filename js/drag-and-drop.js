import * as menu from "./fadable-menu.js"

let dragSource = null;

export function init(){

    addEventListener("dragstart", (event) => {
        dragSource = event.target;
        if (event.target.classList.contains('file-preview')){
            event.target.classList.add('dragging');
        }
    });

    addEventListener("dragend", (event) => {
        if (event.target.classList.contains('file-preview')){
            event.target.classList.remove('dragging');
        }
    });

    for(const item of document.getElementsByClassName("timeline-drag-target")){
        item.addEventListener("dragenter", event => {
            event.preventDefault();
            item.classList.add("drag-hover");
        });
        item.addEventListener("dragover", event => {
            event.preventDefault();
            item.classList.add("drag-hover");
        });
        item.addEventListener("dragleave", event => {
            event.preventDefault();
            item.classList.remove("drag-hover");
        });
        item.addEventListener("drop", event => {
            event.preventDefault();
            console.log(event.dataTransfer);
            if (dragSource.classList.contains("file-preview")){
                menu.fadableMenu('<i data-feather="alert-circle"></i> This will add new content to timeline', event.clientX, event.clientY);
            }else if (dragSource.classList.contains("timeline-drag-target")){
                menu.fadableMenu('<div style="display:flex;flex-direction:column;justify-content:center"><i data-feather="alert-circle"></i>This will move content around in the timeline', event.clientX, event.clientY);
            }else{
                menu.fadableMenu('<i data-feather="alert-circle"></i>', event.clientX, event.clientY);
            }
            feather.replace();

            item.classList.remove("drag-hover");
        });
    }
}