
function detectMob() {
    return ( ( window.innerWidth <= 800 ) );
}

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
    {item: cans[0], amp: -3, rotate: 2,scale: -0.01},
    {item:  document.querySelector(".h-Green"), amp: 10},
]);

interactiveItems(document.querySelector(".banner-section"), [
    {item: cans[1], amp: -5, rotate: 3,scale: -0.01},
    {item: document.querySelector(".h-Taste"), amp: 10},
]);



function interactiveItems(parent,items){
    if(!parent||detectMob()) return;

    document.addEventListener("mousemove",(e)=>{
        items.forEach(element => {

            let coords  = element.item.getBoundingClientRect();
            const center = getCentersOfElement(coords);

            const valueX =  e.pageX/center.x;
            const valueY = e.pageY/center.y;
 
            let finalValue = `translate(${valueX*element.amp}px,${valueY*element.amp}px)`;
            
            if(element.rotate){
                const distance = getDistance(e,center);
                finalValue += `rotate(${distance*element.rotate}deg)`;
            }
            if(element.scale){
                const mult = getDistance(e,center)*element.scale +  1;
                finalValue += `scale(${mult})`;
            }
            element.item.style.transform = finalValue;
        });
    })

    function getDistance(event,center){
        const vectorX = center.x - event.clientX;
        const vectorY = center.y - event.clientY;

        const distance = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
        const distanceCenter = Math.sqrt(center.y*center.y + center.x*center.x)

        return distance/distanceCenter;
    }


};

function getCentersOfElement(coords){
    let center = {
        x: window.scrollX + coords.right - (coords.width/2),
        y: window.scrollY + coords.top + (coords.height/2)};
    return center;
}




const backgroundBin = document.querySelector(".background-bin");

interactiveItems(document.querySelector(".contact-us-section"),
    [{item: backgroundBin, amp: -5}
]);

if(backgroundBin)  document.onload = backgroundGenerate();

function backgroundGenerate(){
    const sizeEl = document.createElement("div");
    sizeEl.innerHTML = "1";
    sizeEl.style.width = "min-content";
    backgroundBin.append(sizeEl);
    const charHeight = parseInt(getComputedStyle(sizeEl).height);
    const charWidth = sizeEl.clientWidth;
    sizeEl.remove();

    const charVert = backgroundBin.parentNode.clientHeight / charHeight;
    const charHoriz = backgroundBin.parentNode.clientWidth / 19;
    let resultDivs =  getListDivs(charVert,charHoriz);

    backgroundBin.append(...resultDivs)

    if(!detectMob()){
        document.addEventListener("mousemove", setCursorStyle);

        function setCursorStyle(event){
            if(event.target.tagName!="SPAN") return;
            event.target.style.color = "var(--Primary-Lime)";
            setTimeout(() => {
                event.target.style.color = "";
            }, 100);
        }
    }
    
}

function getListDivs(charVert,charHoriz){
    let result = [];
    for(let i=0;i<charVert;i++){
        let div = document.createElement("div");
        for(let j=0;j<charHoriz;j++){
        const span = document.createElement("span");
        span.innerHTML = Math.round(Math.random());
        div.append(span);
        }
        result.push(div);
    }
    setTimeout(function randInterval(){
        randomSpanInsertion(result);
        const randDelay = Math.floor(Math.random()*100);
        setTimeout(randInterval,randDelay);
    },500);
    return result;
}

function randomSpanInsertion(result){
    const randomDiv = Math.floor(result.length*Math.random());
    const span = document.createElement("span");
    
    span.innerHTML = Math.round(Math.random());
    result[randomDiv].style.color = "rgb(45, 45, 45)";
    result[randomDiv].prepend(span);
    setTimeout(() => {
        result[randomDiv].style.color = "";
    }, 100);
    
}



document.querySelector('.burger-menu').addEventListener('click', () => {
    const navMenu = document.querySelector('nav');
    navMenu.classList.toggle('open');
});