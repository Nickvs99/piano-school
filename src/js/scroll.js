/**
 * Scrolls towards the associated region. 
 */
export function scrollIntoView(id) {

    let target = document.getElementById(id);
    let targetPosition = target.getBoundingClientRect().top;

    let offsetPosition = targetPosition + window.pageYOffset;

    window.scrollTo({top: offsetPosition, behavior: "smooth"});
}
