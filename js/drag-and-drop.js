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
            if (dragSource.classList.contains("file-preview")){
                menu.fadableMenu(
                    '<div style="display:flex;flex-direction:column;align-items:center;width:14em;text-align:center">\
                    <i data-feather="alert-circle" style="margin-bottom:10px"></i>\
                    This action will add/insert new clips onto the timeline\
                </div>', 
                event.clientX, event.clientY);
            }else if (dragSource.classList.contains("timeline-drag-target")){
                menu.fadableMenu(
                '<div style="display:flex;flex-direction:column;align-items:center;width:14em;text-align:center">\
                    <i data-feather="alert-circle" style="margin-bottom:10px"></i>\
                    This action will move clips around the timeline\
                </div>', 
                event.clientX, event.clientY);
            }else{
                menu.fadableMenu('<i data-feather="alert-circle"></i>', event.clientX, event.clientY);
            }
            feather.replace();

            item.classList.remove("drag-hover");
        });
    }
}