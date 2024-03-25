export function init() {

    document.getElementById("transition-menu-ok").addEventListener("click", event => {
      hide();
    });

    document.getElementById("transition-menu-cancel").addEventListener("click", event => {
      hide();
    });

    document.addEventListener('keyup', event => {
      if (event.code === 'Escape') {
        hide();
      }
      if (event.code === 'Enter') {
        hide();
      }
    });

    for (const gearButton of document.querySelectorAll('.timeline-gear-button')){

        gearButton.addEventListener("click", (event) =>{
          show();
        }, false);
    }
}

export function show(){
  const menu = document.getElementById("transition-menu");
  menu.classList.add("show");
  menu.classList.remove("hide");
}

export function hide(){
  const menu = document.getElementById("transition-menu");
  menu.classList.remove("show");
  menu.classList.add("hide");
}