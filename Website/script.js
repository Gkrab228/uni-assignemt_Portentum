 

document.querySelector('.burger-menu').addEventListener('click', () => {
    const navMenu = document.querySelector('nav');
    navMenu.classList.toggle('open');
});

const cans = document.querySelectorAll(".parralax");

parralaxEffect()
document.addEventListener("scroll", parralaxEffect); 

function parralaxEffect(){

    for(let can of cans){
        const coords = can.getBoundingClientRect();
        let scrollableDistance = window.innerHeight + coords.height;

        if(coords.top<scrollableDistance){    
            const amp = 300;
            const normalizedValue = ((window.innerHeight - coords.top) / scrollableDistance);
            const finalValue =  (normalizedValue * amp) - 100;
            
            can.style.marginBottom = finalValue + "px";
        }
    }

};