export function init() {
    for (const gearButton of document.querySelectorAll('.timeline-gear-button')){
        const parent = gearButton.parentNode;

        const newNode = document.createElement("div");
        newNode.classList.add("gear-dropdown-content");

        gearButton.addEventListener("mouseover", (event) =>{
          var rect = gearButton.getBoundingClientRect();

          newNode.style.left = rect.left + 'px';
          newNode.style.top = rect.bottom + 'px';

          var w = window.innerWidth;
          
          newNode.style.transform = "translate(-"+ (rect.left/w)*100 +"%, -5%)";
          
          if (rect.left > w/2) { 
            newNode.style.transform = "translate(-90%)"
          }
          
        }, false);

        newNode.innerHTML = `
        <a href="#">Undo</a>
        <a href="#">Redo</a>
        `;

        parent.appendChild(newNode);
    }
}