 

document.querySelector('.burger-menu').addEventListener('click', () => {
    const navMenu = document.querySelector('nav');
    navMenu.classList.toggle('open');
});

const cans = document.querySelectorAll(".parralax");


document.addEventListener("scroll", parralaxEffect); 
parralaxEffect();


function parralaxEffect(){

    for(let can of cans){
        const coords = can.getBoundingClientRect();
        const scrollableDistance = window.innerHeight + coords.height;

        if(coords.top<scrollableDistance){    
            const amp = 600;
            const normalizedValue = ((window.innerHeight - coords.top) / scrollableDistance);
            const finalValue =  (normalizedValue * amp) - 300;
            
           can.style.marginBottom = `${Math.floor(finalValue)}px`
        }
    }

};

interactiveItems(document.querySelector(".presentation-section"), [
    {item: cans[0], amp: -10, rotate: 2},
    {item:  document.querySelector(".h-Green"), amp: 10},
]);



function interactiveItems(parent,items){
    parent.addEventListener("mousemove",(e)=>{
        
        const valueX = (e.clientX/parent.clientWidth) - 0.5;
        const valueY = (e.clientY/parent.clientHeight) - 0.5;
        
        items.forEach(element => {
            let finalValue = `translate(${valueX*element.amp}px,${valueY*element.amp}px)`;
            
            if(element?.rotate&&window.innerWidth>700){
                const normValue = -Math.sqrt(valueX*valueX + valueY *valueY);
            }
            
            element.item.style.transform = finalValue;
        });
    })
};