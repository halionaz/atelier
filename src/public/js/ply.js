// Original Designed by:  Mauricio Bucardo

"use strict";

const bgBody = ["#e5e7e9", "#83C995", "#3292B7", "#E4A9C7", "#F0B10B", "#F91001", "#977861", "#9292A3"];
const body = document.body;
const player = document.querySelector(".player");
const playerHeader = player.querySelector(".player__header");
const playerControls = player.querySelector(".player__controls");
const playerPlayList = player.querySelectorAll(".player__song");
const playerSongs = player.querySelectorAll(".audio");
const playerInsts = player.querySelectorAll(".inst");
const playButton = player.querySelector(".play");
const nextButton = player.querySelector(".next");
const backButton = player.querySelector(".back");
const playlistButton = player.querySelector(".playlist");
const slider = player.querySelector(".slider");
const sliderContext = player.querySelector(".slider__context");
const sliderName = sliderContext.querySelector(".slider__name");
const sliderTitle = sliderContext.querySelector(".slider__title");
const sliderContent = slider.querySelector(".slider__content");
const sliderContentLength = playerPlayList.length - 1;
const sliderWidth = 100;
let left = 0;
let count = Math.floor(Math.random()*sliderContentLength); // 현재 선택된 노래 index
let song = playerSongs[count];
let inst = playerInsts[count];
let isPlay = false; // 재생 여부 체크
let isInst = false; // instrument 여부 체크
const pauseIcon = playButton.querySelector("img[alt = 'pause-icon']");
const playIcon = playButton.querySelector("img[alt = 'play-icon']");
const progres = player.querySelector(".progres");
const progresFilled = progres.querySelector(".progres__filled");
let isMove = false;

// 노래 한곡 집중 모드 ON
function openPlayer() {
    
    playerHeader.classList.add("open-header");
    playerControls.classList.add("move");
    slider.classList.add("open-slider");
    
}

// 노래 한곡 집중 모드 OFF
function closePlayer() {
    
    playerHeader.classList.remove("open-header");
    playerControls.classList.remove("move");
    slider.classList.remove("open-slider");
    
}

// 다음 곡으로 전환
function next(index) {
    
    count = index || count; // 플레이리스트 선곡을 하면 index에 값이 들어옴, 그렇지 않으면 단순 count ++
    
    if (count == sliderContentLength) {
        // 끝 곡이므로 첫곡으로 넘어감
        back(1);
        return;
    }
    
    // 앨범 커버 오른쪽으로 밀기
    left = (count + 1) * sliderWidth;
    left = Math.min(left, (sliderContentLength) * sliderWidth);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count++; // 곡 인덱스 변경
    run();
    
}

// 이전 곡으로 전환
function back(index) {
    
    count = index || count;
    
    if (count == 0) {
        next(sliderContentLength-1);
        return;
    }
    
    // 앨범 커버 왼쪽으로 밀기
    left = (count - 1) * sliderWidth;
    left = Math.max(0, left);
    sliderContent.style.transform = `translate3d(-${left}%, 0, 0)`;
    count--;
    run();
    
}

// 음악 플레이어 위에 얹혀진 노래 정보 변경
function changeSliderContext() {
    
    sliderContext.style.animationName = "opacity";
    
    sliderName.textContent = playerPlayList[count].querySelector(".player__title").textContent;
    sliderTitle.textContent = playerPlayList[count].querySelector(".player__song-name").textContent;
    
    if (sliderName.textContent.length > 16) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderName.textContent + "   " + sliderName.textContent;  
        sliderName.innerHTML = "";
        sliderName.append(textWrap);
        
    }
    
    if (sliderTitle.textContent.length >= 18) {
        const textWrap = document.createElement("span");
        textWrap.className = "text-wrap";
        textWrap.innerHTML = sliderTitle.textContent + "    " + sliderTitle.textContent;  
        sliderTitle.innerHTML = "";
        sliderTitle.append(textWrap);
    }
    
}

// 뒷 배경 색 변경
function changeBgBody() {
    body.style.backgroundColor = bgBody[count];
}

// 실제로 재생되는 음원 변경
function selectSong() {
    
    song = playerSongs[count];
    inst = playerInsts[count];
    
    for (const item of playerSongs) {
        
        //현재 재생곡이 아닌 곡들 모두 pause, 재생 내역 초기화
        if (item != song) {
            item.pause();
            item.currentTime = 0;
        }
        
    }
    for(const item of playerInsts){
        if(item != inst){
            item.pause();
            item.currentTime = 0;
        }
    }
    
    if (isPlay) {
        inst.play();
        song.play();
        inst.currentTime = song.currentTime;
        song.muted = false;
        inst.muted = true;
    }
    
    
}

// 변경점 생겼을 때 노래 재생
function run() {
    
    changeSliderContext();
    changeBgBody();
    selectSong();
    
}

// play, pause 버튼 눌렀을 때 쿼리 수행
function playSong() {
    if (song.paused) {
        song.play();
        inst.play();
        inst.currentTime = song.currentTime;
        inst.muted = !isInst;
        song.muted = isInst;
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
        
    }else{
        song.pause();
        inst.pause();
        isPlay = false;
        playIcon.style.display = "";
        pauseIcon.style.display = "";
    }
    
    
}

// 곡이 재생되는 동안 계속해서 progress바를 업데이트 함
function progresUpdate() {
    
    const progresFilledWidth = (this.currentTime / this.duration) * 100 + "%";
    progresFilled.style.width = progresFilledWidth;

    if (isPlay && this.duration == this.currentTime) {
        next();
    }
    if (count == sliderContentLength && song.currentTime == song.duration) {
        playIcon.style.display = "block";
        pauseIcon.style.display = "";
        isPlay = false;
    }
}

// 재생 바 위에서의 조정
function scurb(e) {
    // If we use e.offsetX, we have trouble setting the song time, when the mousemove is running
    const currentTime = ( (e.clientX - progres.getBoundingClientRect().left) / progres.offsetWidth ) * song.duration;
    song.currentTime = currentTime;

}

// inst - 노래 간 전환
function turn_inst(){
    inst.muted = isInst;
    song.muted = !isInst;
    isInst = !isInst;
    if(isInst){
        song.currentTime = inst.currentTime;
    }
}

// 곡이 로드되면, 곡의 길이를 받아 표시함
function durationSongs() {

    let min = parseInt(this.duration / 60);
    if (min < 10) min = "0" + min;

    let sec = parseInt(this.duration % 60);
    if (sec < 10) sec = "0" + sec;
    
    const playerSongTime = `${min}:${sec}`;
    this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime);

}

// 처음에 무작위로 count가 설정되므로 슬라이더 콘텐츠와 배경색, 그리고 앨범 커버를 변경해줌
changeSliderContext();
changeBgBody();
if(count){
    next(count);
}

// 이벤트 등록
sliderContext.addEventListener("click", openPlayer);
sliderContext.addEventListener("animationend", () => sliderContext.style.animationName ='');
playlistButton.addEventListener("click", closePlayer);

nextButton.addEventListener("click", () => {
    next(0)
});

backButton.addEventListener("click", () => {
    back(0)
});

playButton.addEventListener("click", () => {
    isPlay = true;
    playSong();
});

playerSongs.forEach(song => {
    song.addEventListener("loadeddata" , durationSongs);
    song.addEventListener("timeupdate" , progresUpdate);
    
});

// 프로그래스 바에서 클릭했을 때
progres.addEventListener("pointerdown", (e) => {
    scurb(e);
    isMove = true;
});

// 프로그래스 바에서 움직일 때 (클릭한 이후엔 플레이어가 자유롭게 마우스를 움직일 수 있으므로 document에 달아놓음)
document.addEventListener("pointermove", (e) => {
    if (isMove) {
        scurb(e); 
        song.muted = true;
        inst.muted = true;
    }
});

// 프로그래스 바에서 클릭을 놓았을 때 (클릭한 이후엔 플레이어가 자유롭게 마우스를 움직일 수 있으므로 document에 달아놓음)
document.addEventListener("pointerup", () => {
    isMove = false;
    inst.currentTime = song.currentTime;
    song.muted = isInst;
    inst.muted = !isInst;
});

//플레이리스트 선곡
playerPlayList.forEach((item, index) => {

    item.addEventListener("click", function() {

        if (index > count) {
            next(index - 1);
            return;
        }

        if(index == count){
            turn_inst();
            return;
        }
        
        if (index < count) {
            back(index + 1);
            return;
        }

    });
    
});

console.log("발견된 문제가 없습니다.")