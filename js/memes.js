var after = "";
var on = false;
const proxy = "https://api.allorigins.win/raw?url=";

function fetchMemes() {
  let parentdiv;
  let memesHolder = document.getElementById("memesHolder")

  if (document.getElementById("memes")) {
    parentdiv = document.getElementById("memes")
  } else {
    parentdiv = document.createElement("div");
    parentdiv.id = "memes";
    memesHolder.appendChild(parentdiv)
  }

  fetch(`${proxy}https://www.reddit.com/r/memes.json?after=${after}`)
    .then((response) => response.json())
    
    .then((body) => {
      after = body.data.after;
      for (let index = 0; index < body.data.children.length; index++) {
        if (body.data.children[index].data.post_hint === "image") {
          let div = document.createElement("div");
          let a = document.createElement("a")
          let h4 = document.createElement("h4");
          let image = document.createElement("img");
          a.href=body.data.children[index].data.url_overridden_by_dest;
          image.src = body.data.children[index].data.url_overridden_by_dest;
          h4.textContent = body.data.children[index].data.title+" | "+body.data.children[index].data.ups+" ⬆️"
          div.appendChild(a);

          a.appendChild(h4);
          a.appendChild(image);
          parentdiv.appendChild(div);
          on = false;

        }
      }
      document.body.appendChild(parentdiv);
      
    })
    .catch((e) => {
      console.log(e);
    });

}

window.addEventListener('scroll',()=>{
    console.log(on);
    if(window.scrollY + window.innerHeight >= 
        document.documentElement.scrollHeight + 10 && on === false){
        on = true;
        fetchMemes();
    }
})
