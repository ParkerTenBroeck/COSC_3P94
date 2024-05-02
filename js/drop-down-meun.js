

export function init(){
    for(const dropDown of document.querySelectorAll(".dropdown")){
        console.log(dropDown);
        try{
            dropDown.querySelector(".dropbtn").addEventListener("click", (e) => {
                dropDown.classList.toggle("active");
            });
        }catch(e){

        }
    }    

    for(const optional of document.querySelectorAll(".dropdown.options")){
        for(const item of optional.querySelectorAll(".dropdown-content")){

            item.addEventListener("click", (e) => {
                closeMenus();
                document.querySelectorAll(".dropbtn")[0].innerHTML = e.target.innerText + `<i class="arrow down" style="margin-left: 0.3em;margin-right: 0.2em;"></i>`;
            });
        }
    }

    document.addEventListener("mousedown", (e) => {
        for (const item of document.querySelectorAll(".dropdown.active")){
            if(!item.contains(e.target)){
                item.classList.remove("active");
            }
        }
    })
}

export function closeMenus(){
    for (const item of document.querySelectorAll(".dropdown.active")){
        item.classList.remove("active");
    }
}