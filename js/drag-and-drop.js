export function init(){

    addEventListener("dragstart", (event) => {
        if (event.target.classList.contains('file-preview')){
            event.target.classList.add('dragging');
        }
        console.log(event);
    });

    addEventListener("dragend", (event) => {
        if (event.target.classList.contains('file-preview')){
            event.target.classList.remove('dragging');
        }
        console.log(event);
    });
}