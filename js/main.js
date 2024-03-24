import * as resizable_area from "./resizable_area.js";
import * as dragAndDrop from "./drag-and-drop.js";
import "./feather-icons.js";
import * as videoplayer from "./videoplayer.js";

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
    // dragAndDrop.init();

    document.getElementById("blackout").style.display = 'none';
}

await init();
