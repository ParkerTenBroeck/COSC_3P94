import * as resizable_area from "./resizable_area.js";
import * as dragAndDrop from "./drag-and-drop.js";
import "./feather-icons.js";
import * as videoplayer from "./videoplayer.js";
import * as gearMenu from "./gear-menu.js";
import * as dropDown from "./drop-down-meun.js";
import { fadableMenu } from "./fadable-menu.js";

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


    document.getElementById("file-close").addEventListener("click", (e) => {
        closeProject();
    });

    document.getElementById("open-image-file").addEventListener("click", (e) => {
        importData(null);
    });

    function createProjectEvent(e){
        if(document.getElementById("create-project-menu").classList.contains("hide")) return;
        var name = document.getElementById("project-name-input").value ;
        if(!(name.length === 0)){
            if(document.getElementById("create-project-title").innerText == "Create Project"){
                document.getElementById("create-project-menu").classList.add("hide");
                createProject(name, "https://static.thenounproject.com/png/2616533-200.png");
            }else{
                const old_name = document.getElementById("project-name").innerText;
                document.getElementById("project-name").innerText = name;
                document.getElementById("create-project-menu").classList.add("hide");

            }
        }else{
            fadableMenu("Name can't be empty!", e.x, e.y);
        }
    }

    document.getElementById("file-preferences").addEventListener("click", (e) => {
        showProjectEdit();
    })

    document.getElementById("create-menu-ok").addEventListener("click", (e) => {
        if(e.x == 0)return;
        createProjectEvent(e);
    });

    document.getElementById("create-menu-cancel").addEventListener("click", (e) => {
        document.getElementById("create-project-menu").classList.add("hide");
    });

    document.addEventListener('keyup', event => {
        if (event.code === 'Escape') {    
            document.getElementById("create-project-menu").classList.add("hide");
        }
        if (event.code === 'Enter') {    
            const element = document.getElementById("project-name-input");
            const bound = element.getBoundingClientRect();
            createProjectEvent({x: bound.x,y: bound.y})
        }
      });
  
      document.addEventListener("mouseup", event => {
        if (!document.getElementById("create-project-menu").firstElementChild.contains(event.target)){
            document.getElementById("create-project-menu").classList.add("hide");
        }
      });
 
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


    createProject("Funny Bunny", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fa0f6539-628c-40da-b459-c68b60138823/db64xmo-ad559f95-ca26-420e-9a1e-7532e6e8a138.jpg/v1/fill/w_1280,h_723,q_75,strp/bugs_bunny_wallpaper_by_hopefulllover_db64xmo-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIzIiwicGF0aCI6IlwvZlwvZmEwZjY1MzktNjI4Yy00MGRhLWI0NTktYzY4YjYwMTM4ODIzXC9kYjY0eG1vLWFkNTU5Zjk1LWNhMjYtNDIwZS05YTFlLTc1MzJlNmU4YTEzOC5qcGciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.jzM9sT5uqKbs5JxJQohVMP_OJsDPjzTWSG-M75EoMTk");
    document.getElementById("project-create-button").addEventListener("click", (e) => {
        showProjectCreate();
    })
}

export function showProjectCreate(){
    let thing = document.getElementById("create-project-menu");
    thing.classList.remove("hide");
    document.getElementById("create-menu-ok").innerText = "Create";
    document.getElementById("create-project-title").innerText = "Create Project";
}

export function showProjectEdit(){
    let thing = document.getElementById("create-project-menu");
    thing.classList.remove("hide");
    document.getElementById("create-menu-ok").innerText = "Save";
    document.getElementById("create-project-title").innerText = "Edit Project";
    const old_name = document.getElementById("project-name").innerText;
    document.getElementById("project-name-input").value = old_name;
}

export function importData(handler) {
    let input = document.createElement('input');
    input.type = 'file';
    input.onchange = _ => {
      // you can use this method to get file and perform respective operations
              for(const file of input.files){
                if(handler != null)
                    handler(file);
              }
          };
    input.click();
    
  }



export function closeProject(){
    document.getElementById("project-page").style.display = "none";
    document.getElementById("project-creation").style.display = "";

    videoplayer.videoplayer.setPaused();
}


export function openProject(name) {
    document.getElementById("project-name").innerText = name;
    document.getElementById("project-page").style.display = "";
    document.getElementById("project-creation").style.display = "none";
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
  
    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
  }

export function createProject(name, pictureSrc){
    var thing = `
    <div class="file-preview">
        <img src="${pictureSrc}"  class="icon"></img>
        <span class="text" style="user-select: none;">${name}</span>    
    </div>`;
    thing = createElementFromHTML(thing);
    thing.addEventListener("click", (e) => {
        openProject(name);
    });
    var list = document.getElementById("project-list") 
    list.querySelector("#project-create-button").insertAdjacentElement("beforebegin", thing);
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
