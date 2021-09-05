const lipsum = document.querySelector("#lipsum");
const nameH1 = lipsum.querySelector("h1");

function randomLipsum(){
    const count = Math.floor(Math.random() * 2) + 2;
    let capCount, wordCount, dice;
    for(let i = 0; i < count; i++){
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

randomLipsum();
console.log("발견된 문제가 없습니다.");