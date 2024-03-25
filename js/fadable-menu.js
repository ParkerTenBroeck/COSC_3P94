
import "./feather-icons.js";

export function fadableMenu(content, x, y){
    const item = document.getElementById("fadeable-menu");
    item.style.left = x + 'px';
    item.style.top = y + 'px';
    item.innerHTML = content;
    const animation = item.getAnimations()[0];
    animation.cancel();
    animation.play();
}