

export function init(){
    for(const dropDown of document.querySelectorAll(".dropdown")){
        try{
            dropDown.querySelector(".dropbtn").addEventListener("click", (e) => {
                dropDown.classList.toggle("active");
            });
        }catch(e){

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