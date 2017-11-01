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
    console.log(scrolledPixel);
    sectionDetection(scrolledPixel);
  }

  sections.forEach((section, index)=>{
    let id = section.id;
    // the target area's id is formated related to the section in nav bar
    let targetID = section.id + "Area";
    let targetElement = document.getElementById(targetID);
    section.addEventListener('click', ()=>{
      scrollToTarget(targetElement)
    });
    sectHeight.push(targetElement.offsetHeight);
  });

  // smooth scroll
  console.log(sectHeight);

  // detect position
  function sectionDetection(pixel){
    console.log(pixel/document.body.scrollHeight);
    let ratio = pixel/document.body.scrollHeight;
    if(pixel < sectHeight[0]){
      sections[0].classList.add("currentSection");
      sections[1].classList.remove("currentSection");
      sections[2].classList.remove("currentSection");
      sections[3].classList.remove("currentSection");
      console.log("info");
    }
    else if (pixel < (sectHeight[0] + sectHeight[1])){
      sections[0].classList.remove("currentSection");
      sections[1].classList.add("currentSection");
      sections[2].classList.remove("currentSection");
      sections[3].classList.remove("currentSection");
      // console.log("proj");
    }
    else if (pixel < (sectHeight[0] + sectHeight[1]) + sectHeight[2]) {
      sections[0].classList.remove("currentSection");
      sections[1].classList.remove("currentSection");
      sections[2].classList.add("currentSection");
      sections[3].classList.remove("currentSection");
      // console.log("fav");

    }
    else {
      console.log("contact");
      sections[0].classList.remove("currentSection");
      sections[1].classList.remove("currentSection");
      sections[2].classList.remove("currentSection");
      sections[3].classList.add("currentSection");
    }

  }

  // click the back of card to open the modal
  let modal = document.getElementById('proj1Modal');
  // select all project cards
  let projects = document.querySelectorAll('.projectCards>div');
  // attach event to the back panel
  projects.forEach((proj) => {
    // for now I'll just open the same modal
    // in the future use ID to get corresponding modal
    proj.querySelector('.back').addEventListener('click', () => {
      // show the modal
      modal.style.display = 'block';
    });
  })

  modal.querySelector('.close').onclick = closeModal;

  // closure with self invoking function
  let carousel = (function(){
    let wrapper = document.querySelector('.carouselWrapper');
    // get the control element
    let next = wrapper.querySelector('.next');
    let prev = wrapper.querySelector('.prev');
    // select slides
    let slides = wrapper.querySelectorAll('.slides div');
    // count the current index
    let index = 0;
    let slidesSum = slides.length;
    // get current slide div element
    let current = slides[0];

    wrapper.classList.add('current');

    // move the slide
    function move(towards) {
      // hide current slide
      current.classList.remove('current');
      // update current index
      index = index + towards;
      // move left
      if (towards === -1 && index < 0) {
        // loop to the max index
        index = slidesSum - 1;
      }
      // move right
      if (towards === 1 && !slides[index]) {
        // loop to start
        index = 0;
      }

      current = slides[index];

      current.classList.add('current');

    }

    next.addEventListener('click', function(ev) {
      console.log('next');
      move(1);
    });

    prev.addEventListener('click', function(ev) {
      console.log('prev');
      move(-1);
    });

    move(0);

    // automatic switch slide
    setInterval(()=>{
      move(1);
    }, 3000);

  })();

  // tooggle flip animation
  let cards = document.querySelectorAll(".flipper");

  cards.forEach((card)=>{
    // add this so flip works on touch screen
    card.addEventListener('touchstart', ()=>{
      console.log(card);
      card.classList.toggle("flipped")
    });
  });
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
