 

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
    {item: cans[0], amp: -5, rotate: 2,scale: -0.01},
    {item:  document.querySelector(".h-Green"), amp: 10},
]);


function interactiveItems(parent,items){
    if(!parent||document.documentElement.clientWidth<700) return;
    console.log()
    parent.addEventListener("mousemove",(e)=>{
        
        items.forEach(element => {
            if(document.documentElement.clientWidth<700){
                element.item.style.transform = "";
                return false;
                
            }
            let coords  = element.item.getBoundingClientRect();
            const center = getCentersOfElement(coords);

            const valueX =  e.pageX/center.x;
            const valueY = e.pageY/center.y;
            
            let finalValue = `translate(${valueX*element.amp}px,${valueY*element.amp}px)`;

            if(element.rotate){
                const distance = getDistance(coords,e,center);
                finalValue += `rotate(${distance*element.rotate}deg)`;
            }
            if(element.scale){
                const mult = getDistance(coords,e,center)*element.scale +  1;
                finalValue += `scale(${mult})`;
            }
            element.item.style.transform = finalValue;
        });


    })
    function getDistance(coords,event,center){
        
        const vectorX = center.x - event.clientX;
        const vectorY = center.y - event.clientY;
        
        const distance = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
        const distanceCenter = Math.sqrt(center.y*center.y + center.x*center.x)
        return distance/distanceCenter;
    }

    function getCentersOfElement(coords){
        let center = {
            x: coords.right - (coords.width/2) + window.scrollX,
            y: coords.bottom-(coords.height/2) + window.scrollY};
        return center;
    }
};