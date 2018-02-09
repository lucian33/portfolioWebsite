let scrolledPixel = 0;
let sectHeight = [];

window.onload = function () {

  let height = document.querySelector('body').scrollHeight;
  // listen to the scroll event
  let navBar = document.getElementById('nav');
  // store width for each section
  // let info = document.getElementById('info');
  // let proj = document.getElementById('proj');
  // let fav = document.getElementById('fav');
  // let contact = document.getElementById('contact');
  // let infoSession = document.querySelector('.infoSession');
  // GUESS I CAN DO A QUERY SELECT ALL INSTEAD
  let sections = document.querySelectorAll("#section div");

  // fired when scroll
  let scroll = function () {
    // get the pixel scorlled from top
    // to trigger the resize of navBar
    // scrolledPixel = document.getElementsByTagName('body')[0].scrollTop;
    // issue with chrome version on this
    scrolledPixel = Math.max(document.documentElement.scrollTop, document.getElementsByTagName('body')[0].scrollTop);
    console.log(document.body.scrollTop);
    // change nav size when scorolled
    if(scrolledPixel > 50 && navBar.classList.contains("navBar")){
      // console.log("OK");
      document.getElementById('nav').classList.add('scorolled');
    }
    else if(scrolledPixel < 50 && navBar.classList.contains("scorolled")){
      document.getElementById('nav').classList.remove('scorolled');
    }
    // console.log(scrolledPixel);
    // console.log("!");
    sectionDetection(scrolledPixel);
  };

  // cross-broswer compatible requestAnimationFrame
  var raf = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame;

  var lastScrollTop = Math.max(document.documentElement.scrollTop, document.getElementsByTagName('body')[0].scrollTop);

  if (raf) {
      loop();
  }
  else {
    console.log("RAF not supported");
    // request animation frame not supported
    window.onscroll = function (e){
      // get the pixel scorlled from top
      // to trigger the resize of navBar
      // scrolledPixel = document.getElementsByTagName('body')[0].scrollTop;
      // issue with chrome version on this
      scrolledPixel = Math.max(document.documentElement.scrollTop, document.getElementsByTagName('body')[0].scrollTop);
      // console.log(document.body.scrollTop);
      // change nav size when scorolled
      if(scrolledPixel > 50 && navBar.classList.contains("navBar")){
        // console.log("OK");
        document.getElementById('nav').classList.add('scorolled');
      }
      else if(scrolledPixel < 50 && navBar.classList.contains("scorolled")){
        document.getElementById('nav').classList.remove('scorolled');
      }
      // console.log(scrolledPixel);
      sectionDetection(scrolledPixel);
    }
  }

  function loop() {
      var scrollTop = Math.max(document.documentElement.scrollTop, document.getElementsByTagName('body')[0].scrollTop);
      // if not scrolled, skip the scoll function
      if (lastScrollTop === scrollTop) {
          raf(loop);
          return;
      }
      // else, fire the scorll function
      else {
          lastScrollTop = scrollTop;
          // fire scroll function if scrolls vertically
          scroll();
          raf(loop);
      }
  }


  sections.forEach((section, index)=>{
    let id = section.id;
    // the target area's id is formated related to the section in nav bar
    let targetID = section.id + "Area";
    let targetElement = document.getElementById(targetID);
    // smooth scroll
    section.addEventListener('click', ()=>{
      scrollToTarget(targetElement)
    });
    sectHeight.push(targetElement.offsetHeight);
  });


  console.log(sectHeight);

  // detect position
  function sectionDetection(pixel){

    if(pixel < sectHeight[0]){
      sections[0].classList.add("currentSection");
      sections[1].classList.remove("currentSection");
      sections[2].classList.remove("currentSection");
      sections[3].classList.remove("currentSection");
      // console.log("info");
    }
    else if (pixel < (sectHeight[0] + sectHeight[1])){
      sections[0].classList.remove("currentSection");
      sections[1].classList.add("currentSection");
      sections[2].classList.remove("currentSection");
      sections[3].classList.remove("currentSection");

      // add this at here so the animation plays when the
      // user scroll into this view
      document.querySelectorAll(".skillbar").forEach((bar, i)=>{
        // console.log(i);
        let skillBar = bar.children[1];
        // get it's percentage
        skillBar.style.width = bar.getAttribute("data-percent");
        // delay the animation by 0.2 s
        skillBar.style.transition = "width " + (1 + i * 0.2) + "s";

      });
      // console.log("proj");
    }
    // if scrolled more than 90% of the sect2
    else if (pixel < (sectHeight[0] + sectHeight[1] + sectHeight[2]) * 0.9) {
      sections[0].classList.remove("currentSection");
      sections[1].classList.remove("currentSection");
      sections[2].classList.add("currentSection");
      sections[3].classList.remove("currentSection");
      // console.log("fav");

    }
    else {
      // console.log("contact");
      sections[0].classList.remove("currentSection");
      sections[1].classList.remove("currentSection");
      sections[2].classList.remove("currentSection");
      sections[3].classList.add("currentSection");
    }

  }

  // click the back of card to open the modal
  // let modal = document.getElementById('proj1Modal');
  // select all project cards
  let projects = document.querySelectorAll('.projectCards>.iosCard');

  projects.forEach((proj) => {
    // for now I'll just open the same modal
    // in the future use ID to get corresponding modal
    // proj.querySelector('.back').addEventListener('click', () => {
    //   // show the modal
    //   modal.style.display = 'block';
    // });

    // expand the card
    proj.addEventListener('click', () => {
      event.stopPropagation();
      proj.classList.add('fullScreen');
      // prevent body from moving by disable overflow
      if (window.innerWidth <= 375){
        document.body.style.overflow = "hidden";
      }
    });

    // add touch event to compatible with touch device
    proj.addEventListener('touchstart', ()=>{
      event.stopPropagation();
      proj.style.transform = "scale(0.975)";
    });

    proj.addEventListener('touchend', ()=>{
      event.stopPropagation();
      proj.style.transform = "scale(1)";
    });

    // close the card
    proj.querySelector('.close').addEventListener('click', ()=>{
      // stop the event from bubble phase
      // so the card won't open again
      // by trigger the proj.click
      event.stopPropagation();
      proj.classList.remove('fullScreen');
      if (window.innerWidth <= 375){
        document.body.style.overflow = "auto";
      }
    });
  })

  // ability to close the cards when click outside
  document.querySelector("#projArea").addEventListener('click', (e)=>{
    event.stopPropagation();
    // remove all .fullScreen class
    document.querySelector("#projArea").querySelectorAll(".iosCard").forEach((card)=>{
      card.classList.remove("fullScreen");
    });
  });

  // random Color for skills bar
  document.querySelectorAll(".skillbar").forEach((bar)=>{

    let tile = bar.children[0];
    // give title a random color
    let color = colorGenerator();

    tile.style.background = color;

    let skillBar = bar.children[1];

    skillBar.style.background = color;

  });


}

// random colors generator for skills bar
function colorGenerator(){
  let hsl = 'hsl(' + (Math.floor(rangedRandom(0, 282))) + ',' + (rangedRandom(50, 100)) + '%,' + (rangedRandom(40, 80)) + '%)';
  // console.log("The color you get is: " + hsl);
  return hsl;
}

function rangedRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// pass the element into it
// scorll to corresponding area
function scrollToTarget(ele){
  ele.scrollIntoView({ behavior: 'smooth', block: "start"});
}

function closeModal(ev){
  // close the modal
  this.parentElement.parentElement.parentElement.style.display = 'none';
}
