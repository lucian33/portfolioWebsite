'use strict';var scrolledPixel=0,sectHeight=[];window.onload=function(){function a(){var l=Math.max(document.documentElement.scrollTop,document.getElementsByTagName('body')[0].scrollTop);return d===l?void c(a):void(d=l,j(),c(a))}function b(l){l<sectHeight[0]?(h[0].classList.add('currentSection'),h[1].classList.remove('currentSection'),h[2].classList.remove('currentSection'),h[3].classList.remove('currentSection')):l<sectHeight[0]+sectHeight[1]?(h[0].classList.remove('currentSection'),h[1].classList.add('currentSection'),h[2].classList.remove('currentSection'),h[3].classList.remove('currentSection'),document.querySelectorAll('.skillbar').forEach(function(m,n){var o=m.children[1];o.style.width=m.getAttribute('data-percent'),o.style.transition='width '+(1+0.2*n)+'s'})):l<0.9*(sectHeight[0]+sectHeight[1]+sectHeight[2])?(h[0].classList.remove('currentSection'),h[1].classList.remove('currentSection'),h[2].classList.add('currentSection'),h[3].classList.remove('currentSection')):(h[0].classList.remove('currentSection'),h[1].classList.remove('currentSection'),h[2].classList.remove('currentSection'),h[3].classList.add('currentSection'))}var f=document.querySelector('body').scrollHeight,g=document.getElementById('nav'),h=document.querySelectorAll('#section div'),j=function(){scrolledPixel=Math.max(document.documentElement.scrollTop,document.getElementsByTagName('body')[0].scrollTop),console.log(document.body.scrollTop),50<scrolledPixel&&g.classList.contains('navBar')?document.getElementById('nav').classList.add('scorolled'):50>scrolledPixel&&g.classList.contains('scorolled')&&document.getElementById('nav').classList.remove('scorolled'),b(scrolledPixel)},c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame,d=Math.max(document.documentElement.scrollTop,document.getElementsByTagName('body')[0].scrollTop);c?a():(console.log('RAF not supported'),window.onscroll=function(){scrolledPixel=Math.max(document.documentElement.scrollTop,document.getElementsByTagName('body')[0].scrollTop),50<scrolledPixel&&g.classList.contains('navBar')?document.getElementById('nav').classList.add('scorolled'):50>scrolledPixel&&g.classList.contains('scorolled')&&document.getElementById('nav').classList.remove('scorolled'),b(scrolledPixel)}),h.forEach(function(l){var n=l.id,o=l.id+'Area',p=document.getElementById(o);l.addEventListener('click',function(){scrollToTarget(p)}),sectHeight.push(p.offsetHeight)}),console.log(sectHeight);var k=document.querySelectorAll('.projectCards>.iosCard');k.forEach(function(l){l.addEventListener('click',function(){event.stopPropagation(),l.classList.add('fullScreen'),375>=window.innerWidth&&(document.body.style.overflow='hidden')}),l.addEventListener('touchstart',function(){event.stopPropagation(),l.style.transform='scale(0.975)'}),l.addEventListener('touchend',function(){event.stopPropagation(),l.style.transform='scale(1)'}),l.querySelector('.close').addEventListener('click',function(){event.stopPropagation(),l.classList.remove('fullScreen'),375>=window.innerWidth&&(document.body.style.overflow='auto')})}),document.querySelector('#projArea').addEventListener('click',function(){event.stopPropagation(),document.querySelector('#projArea').querySelectorAll('.iosCard').forEach(function(m){m.classList.remove('fullScreen')})}),document.querySelectorAll('.skillbar').forEach(function(l){var m=l.children[0],n=colorGenerator();m.style.background=n;var o=l.children[1];o.style.background=n})};function colorGenerator(){var a='hsl('+Math.floor(rangedRandom(0,282))+','+rangedRandom(50,100)+'%,'+rangedRandom(40,80)+'%)';return a}function rangedRandom(a,b){return Math.random()*(b-a)+a}function scrollToTarget(a){a.scrollIntoView({behavior:'smooth',block:'start'})}function closeModal(){this.parentElement.parentElement.parentElement.style.display='none'}
