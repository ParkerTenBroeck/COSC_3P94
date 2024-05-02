import * as resizable_area from "./resizable_area.js";
import * as dragAndDrop from "./drag-and-drop.js";
import "./feather-icons.js";
import * as videoplayer from "./videoplayer.js";
import * as gearMenu from "./gear-menu.js";
import * as dropDown from "./drop-down-meun.js";

export { resizable_area, dragAndDrop, videoplayer, gearMenu, dropDown };

async function init(){
    // load all html 'parts'
    async function load_loadable(loadable){
        const link = loadable.getAttribute("src");
        const response = await fetch(link);
        loadable.innerHTML = await response.text();
        await load_all_loadable(loadable);
    }

    async function load_all_loadable(root){
        var toAwait = [];
        for(const loadable of root.querySelectorAll('.loadable')){
            toAwait.push(load_loadable(loadable));
            // await load_loadable(loadable);
        }

        for(const loadableRequest of toAwait){
            await loadableRequest;
        }
    }

    await load_all_loadable(document);


    feather.replace();

    resizable_area.init();
    videoplayer.init();
    dragAndDrop.init();

    gearMenu.init();

    document.getElementById("blackout").style.display = 'none';

    dropDown.init();


    function importData(handler) {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
          // you can use this method to get file and perform respective operations
                  for(const file of input.files){
                    handler(file);
                  }
              };
        input.click();
        
      }
    document.getElementById("file-import").addEventListener("click", (e) => {
        importData((file) => {
            addImportedMedia(file.name, "film");
            dropDown.closeMenus();

        });
    });

    for(let i = 0; i < 5; i ++)
        addImportedMedia("video" + (i+1) + ".mp4", "film");

    for(let i = 0; i < 5; i ++)
        addImportedMedia("song" + (i+1) + ".mp4", "music");
}

export function addImportedMedia(name, kind){
    document.getElementById("imported-files").innerHTML +=
        `
        <div draggable="true" class="file-preview tooltip" data-length-secs=20>
            <span class="tooltiptext">${name}</span>    
            <i data-feather="${kind}" class="icon"></i>
            <p class="text">${name}</p>
        </div>
    `;
    feather.replace();
}

await init();
