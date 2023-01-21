console.log("Welcome to spotify");

// Initialize the Variables
let songIndex = 0;
let audio = new Audio("songs/0.mp3");
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let playGif = document.getElementById("playGif");
let currTime = document.getElementById("currTime");
let endtime = document.getElementById("endtime");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");
let masterTitle = document.getElementById("masterTitle");
let masterImg = document.getElementById("masterImg");




let songs = [
    {songName: "Chidiya_Vilen", filePath: "songs/0.mp3", coverPath: "cover/Chidiya_Vilen.jpg", AudioLenght: "4:13"},
    {songName: "Dusk_Till_Dawn", filePath: "songs/1.mp3", coverPath: "cover//Dusk_Till_Dawn.jpg", AudioLenght: "3:55"},
    {songName: "Imagine_Dragons-Demons", filePath: "songs/2.mp3", coverPath: "cover/Imagine_Dragons-Demons.jpg", AudioLenght: "2:54"},
    {songName: "Industry Baby", filePath: "songs/3.mp3", coverPath: "cover/Industry_Baby.jpg", AudioLenght: "3:55"},
    {songName: "Let-Me-Down-Slowly", filePath: "songs/4.mp3", coverPath: "cover/Let-Me-Down-Slowly.jpg", AudioLenght: "2:49"},
    {songName: "Rataan-Vilen", filePath: "songs/5.mp3", coverPath: "cover/Rataan-Vilen.jpg", AudioLenght: "3:05"},
    {songName: "Savan - Vilen", filePath: "songs/6.mp3", coverPath: "cover/Savan-Vilen.jpg", AudioLenght: "3:53"}
];

songItem.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;
    element.getElementsByClassName("timestamp")[0].innerHTML = songs[i].AudioLenght;
})

const makeAllPlay = () => {
    songItemPlay.forEach((element)=>{
        element.classList.remove("fa-pause");
        element.classList.add("fa-play"); 
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener("click", (e) => {
        songIndex = parseInt(e.target.id)
        makeAllPlay()
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audio.src = `songs/${songIndex}.mp3`
        masterTitle.innerHTML = songs[songIndex].songName;
        masterImg.src = songs[songIndex].coverPath;
        audio.currentTime = 0;
        audio.play();
        playGif.style.opacity = 1;
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    })
})

backward.addEventListener("click", (e)=>{
    if(songIndex < 0){
        songIndex = 0;
    }
    else{
        songIndex = songIndex - 1;
    }
    audio.src = `songs/${songIndex}.mp3`
    masterTitle.innerHTML = songs[songIndex].songName;
    masterImg.src = songs[songIndex].coverPath;
    audio.currentTime = 0;
    audio.play();
    makeAllPlay();
    document.getElementById(songIndex).classList.remove("fa-play");
    document.getElementById(songIndex).classList.add("fa-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    
})


forward.addEventListener("click", (e)=>{
    if(songIndex > (songItemPlay.length - 1)){
        songIndex = 0;
    }
    else{
        songIndex = songIndex + 1;
    }
    audio.src = `songs/${songIndex}.mp3`
    masterTitle.innerHTML = songs[songIndex].songName;
    masterImg.src = songs[songIndex].coverPath;
    audio.currentTime = 0;
    audio.play();
    makeAllPlay();
    document.getElementById(songIndex).classList.remove("fa-play");
    document.getElementById(songIndex).classList.add("fa-pause");
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    
})

// Listen to Events

masterPlay.addEventListener("click", ()=>{
    
    if(audio.paused || audio.currentTime<=0){
        audio.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        document.getElementById(songIndex).classList.remove("fa-play");
        document.getElementById(songIndex).classList.add("fa-pause");
        playGif.style.opacity = 1;
        
    }
    else{
        audio.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        playGif.style.opacity = 0;
        makeAllPlay();
    }
    
    
    
})

audio.addEventListener('timeupdate', (event) => {
    let progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressBar.value = progress;



    let sec = parseInt(audio.currentTime % 60);
    let min = parseInt((audio.currentTime / 60) % 60);

    if(sec < 10){
        currTime.innerHTML = min+":0"+sec;
    }
    else{
        currTime.innerHTML = min+":"+sec;
    }

    let EndSec = parseInt(audio.duration % 60);
    let EndMin = parseInt((audio.duration / 60) % 60);

    if(EndSec < 10){
        endtime.innerHTML = EndMin+":0"+EndSec;
    }
    else{
        endtime.innerHTML = EndMin+":"+EndSec;
    }


    if(songIndex <= (songItemPlay.length - 1)){
        if(audio.currentTime === audio.duration){
            songIndex = songIndex + 1;
            audio.src = `songs/${songIndex}.mp3`
            masterTitle.innerHTML = songs[songIndex].songName;
            masterImg.src = songs[songIndex].coverPath;
            audio.currentTime = 0;
            audio.play();
            makeAllPlay();
            document.getElementById(songIndex).classList.remove("fa-play");
            document.getElementById(songIndex).classList.add("fa-pause");
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
    }
});

progressBar.addEventListener("change", ()=>{
    audio.currentTime = (progressBar.value * audio.duration) / 100;
})


console.log()


