const lipsum = document.querySelector("#lipsum");
const nameH1 = lipsum.querySelector(".hdiv");
const timePercent = lipsum.querySelector("#timePercent");
const timeDay = lipsum.querySelector("#timeDay");

const body = document.querySelector("body");
const shadowImg = document.querySelector(".backgroundShadowImg");
const backImg = document.querySelector(".backgroundImg");

/**
 * 짹짹으로 이루어진 랜덤 로렘 입숨을 만들어주는 함수입니다.
 * @halion
 */
function randomLipsum(){

    let capCount, wordCount, dice;
    for(let i = 0; i < 2; i++){
        const div = document.createElement("div");
        const caption = document.createElement("div");
        capCount = Math.floor(Math.random() * 2) + 2;
        let text = "";
        for(let j = 0; j < capCount; j++){
            wordCount = Math.floor(Math.random() * 3) + 1;
            for(let l = 0; l < wordCount; l++){
                text += "짹";
            }
            dice = Math.floor(Math.random()*6);
            if(dice < 2){
                text += "..";
            } else {
                if(j != capCount - 1){
                    text += " ";
                }
            }
        }
        caption.classList.add("caption");
        caption.innerText = text;
        div.appendChild(caption);
        nameH1.after(div);
    }
}

function dday(){

    // 카운트 퍼센테이지 기준 일자
    const startDate = new Date("2021-09-01T00:00:00");
    // 입영 날짜
    const setDate = new Date("2022-01-06T08:00:00");
    const now = new Date();

    const all = setDate.getTime() - startDate.getTime();
    const dist = setDate.getTime() - now.getTime();
    const percent = (((all-dist)/all)*100).toFixed(2);
    const day = Math.floor(dist/(1000*60*60*24));
    timePercent.innerText = percent;
    timeDay.innerText = day;

}

let prevX = 0, prevY = 0;

function backgroundHandler(event){
    const widthMid = window.innerWidth/2;
    const heightMid = window.innerHeight/2;
    const xVal = widthMid - event.offsetX;
    const yVal = heightMid - event.offsetY;
    if(xVal > 0){
        if(yVal > 0){
            if(prevX != 1 || prevY != 1){
                backImg.style.transform = `translate(0.5%,0.5%)`;
                shadowImg.style.transform = `translate(-0.5%,-0.5%)`;
                prevX = 1, prevY = 1;
            }
        } else {
            if(prevX != 1 || prevY != -1){
                backImg.style.transform = `translate(0.5%,-0.5%)`;
                shadowImg.style.transform = `translate(-0.5%,0.5%)`;
                prevX = 1, prevY = -1;
            }
        }
    } else{
        if(yVal > 0){
            if(prevX != -1 || prevY != 1){
                backImg.style.transform = `translate(-0.5%,0.5%)`;
                shadowImg.style.transform = `translate(0.5%,-0.5%)`;
                prevX = -1, prevY = 1;
            }
        } else {
            if(prevX != -1 || prevY != -1){
                backImg.style.transform = `translate(-0.5%,-0.5%)`;
                shadowImg.style.transform = `translate(0.5%,0.5%)`;
                prevX = -1, prevY = -1;
            }
        }
    }
}

if(window.innerWidth > 600){
    body.addEventListener("mousemove", backgroundHandler);
} else {
    backImg.style.transform = `translate(-0.5%,0.5%)`;
    shadowImg.style.transform = `translate(0.5%,-0.5%)`;
}


randomLipsum();
dday();
console.log("발견된 문제가 없습니다.");