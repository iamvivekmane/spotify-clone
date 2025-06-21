console.log("Hello");

async function getSongs() {
  let a = await fetch("http://172.20.10.2:3000/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
async function main() {
  //Returns the list of all the songs
  let songs = await getSongs();

  let songUl = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUl.innerHTML =
      songUl.innerHTML +
      `<li>
                <img class="invert" src="music.svg" alt="" />
                <div class="info">
                  <div>${song.replaceAll("%20", " ")}</div>
                  <div>Artist</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="" />
                </div>
              </li>`;
  }
  //Play songs
  var audio = new Audio(songs[0]);
  //   audio.play();

  audio.addEventListener("loadeddata", () => {
    //Duration variable holds the duration of the audio file in seconds
    console.log(audio.duration, audio.currentSrc, audio.currentTime);
  });
}

main();
