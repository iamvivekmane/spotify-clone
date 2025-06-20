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
      songs.push(element.href);
    }
  }
  return songs;
} 
async function main() {
  //Returns the list of all the songs
  let songs = await getSongs();

  //Play songs
  var audio = new Audio(songs[0]);
  audio.play();
}

main();
