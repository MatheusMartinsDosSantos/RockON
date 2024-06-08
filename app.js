const music = new Audio('audio/1.mp3');

const songs = [
    {
        id: '1',
        songName: `Welcome to The Jungle<br>
        <div class="subtitle">Guns N' Roses</div>`,
        poster: "imagens/1.png"
    },
    {
        id: '2',
        songName: `N.I.B<br>
        <div class="subtitle">Black Sabbath</div>`,
        poster: "imagens/2.png"
    },
    {
        id: '3',
        songName: `Highway To Hell<br>
        <div class="subtitle">AC/DC</div>`,
        poster: "imagens/3.png"
    },
    {
        id: '4',
        songName: `Stairway To Heaven<br>
        <div class="subtitle">Led Zeppelin</div>`,
        poster: "imagens/4.png"
    },
    {
        id: '5',
        songName: `Man In The Box<br>
        <div class="subtitle">Alice in Chains</div>`,
        poster: "imagens/5.png"
    },
    {
        id: '6',
        songName: `The Trooper<br>
        <div class="subtitle">Iron Maiden</div>`,
        poster: "imagens/6.png"
    },
    {
        id: '7',
        songName: `Paranoid<br>
        <div class="subtitle">Black Sabbath</div>`,
        poster: "imagens/7.png"
    },
    {
        id: '8',
        songName: `Straight Through the Heart<br>
        <div class="subtitle">Dio</div>`,
        poster: "imagens/8.png"
    },
    {
        id: '9',
        songName: `Heaven and Hell<br>
        <div class="subtitle">Black Sabbath</div>`,
        poster: "imagens/9.png"
    },
    {
        id: '10',
        songName: `Black Dog<br>
        <div class="subtitle">Led Zeppelin</div>`,
        poster: "imagens/10.png"
    },
    {
        id: '11',
        songName: `Back In Black<br>
        <div class="subtitle">AC/DC</div>`,
        poster: "imagens/11.png"
    },
    {
        id: '12',
        songName: `Iron Man<br>
        <div class="subtitle">Black Sabbath</div>`,
        poster: "imagens/12.png"
    },
    {
        id: '13',
        songName: `Rock And Roll All Nite<br>
        <div class="subtitle">Kiss</div>`,
        poster: "imagens/13.png"
    },
    {
        id: '14',
        songName: `Wasting Love<br>
        <div class="subtitle">Iron Maiden</div>`,
        poster: "imagens/14.png"
    },
    {
        id: '15',
        songName: `Paradise City<br>
        <div class="subtitle">Guns N' Roses</div>`,
        poster: "imagens/15.png"
    },
    {
        id: '16',
        songName: `New Mistake<br>
        <div class="subtitle">Jellyfish</div>`,
        poster: "imagens/16.png"
    },
];

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0)  {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
} )

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
        })
    }

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src = `imagens/${index}.png`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].computedStyleMap.background = "rgb(105, 105, 170, .1)";
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value ==0) {
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.add('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.remove('bi-volume-up-fill')
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill')
        vol_icon.classList.remove('bi-volume-mute-fill')
        vol_icon.classList.add('bi-volume-up-fill')
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
        poster_master_play.src = `imagens/${index}.png`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays()

        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].computedStyleMap.background = "rgb(105, 105, 170, .1)";
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index -1;
    }
    music.src = `audio/${index}.mp3`;
        poster_master_play.src = `imagens/${index}.png`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays()

        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].computedStyleMap.background = "rgb(105, 105, 170, .1)";
})

let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})