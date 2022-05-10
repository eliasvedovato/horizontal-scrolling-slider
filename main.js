let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider');
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .06

window.addEventListener('resize', init);


images.forEach((img, idx) => {
    img.style.backgroundImage = `url(./imgs/code${idx+1}.jpg)`
})

// The t represents the ease
function lerp(start, end, t){

    /** Get the start and the end position and this easing variable
     * works out the percentage between the start and the end
     * and as apply an animation the percentage gradually gets
     * smaller as a start moves closer to the ends
     */

    return start * (1-t) + end * t;
}

function setTransform(el, transform){
    el.style.transform = transform;
}

function init(){

    /** El método Element.getBoundingClientRect() devuelve el tamaño de un elemento y su posición relativa respecto a la ventana de visualización (viewport). */
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - innerHeight)}px`
}

function animate(){
    /**El método toFixed() formatea un número usando notación de punto fijo. */
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`)
    /** window.requestAnimationFrame informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación. El método acepta como argumento una función a la que llamar antes de efectuar el repintado. */
    requestAnimationFrame(animate);
}

function animateImages(){
    let ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, idx) => {
        intersectionRatioValue = ratio - (idx * 0.7);
        setTransform(image, `translateX(${intersectionRatioValue * 70}px)`)
    })
}

init();
animate();