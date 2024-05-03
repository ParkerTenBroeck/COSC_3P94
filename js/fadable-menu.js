
import "./feather-icons.js";

export function fadableMenu(content, x, y){
    let item = document.createElement("div");
    item.classList.add("hide")
    item.classList.add("floating-menu")

    item.style.left = x + 'px';
    item.style.top = y + 'px';
    item.innerHTML = content;
    document.body.appendChild(item);
    
    const animation = item.getAnimations()[0];
    animation.onfinish = () => {
        item.remove();
    }
}