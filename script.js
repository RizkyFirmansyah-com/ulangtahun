/* ═══════════════════════════════
   PARTICLES
═══════════════════════════════ */
const canvas = document.getElementById('particles');

if(canvas){

const ctx = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const SHAPES = ['♥', '✦', '·', '°'];

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x     = Math.random() * W;
    this.y     = init ? Math.random() * H : H + 20;
    this.size  = Math.random() * 14 + 6;
    this.speed = Math.random() * .5 + .15;
    this.opacity = Math.random() * .35 + .05;
    this.shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
    this.drift = (Math.random() - .5) * .3;
    this.hue   = Math.random() > .5 ? '#c4657a' : '#c9a84c';
    this.spin  = (Math.random() - .5) * .02;
    this.angle = Math.random() * Math.PI * 2;
  }
  update() {
    this.y     -= this.speed;
    this.x     += this.drift;
    this.angle += this.spin;
    if (this.y < -30) this.reset();
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle   = this.hue;
    ctx.font        = `${this.size}px serif`;
    ctx.textAlign   = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.shape, 0, 0);
    ctx.restore();
  }
}

for (let i = 0; i < 60; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animate);
}
animate();
}
/* ═══════════════════════════════
   SCROLL REVEAL
═══════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));


function toggleSidebar(){
  document
    .getElementById('sidebar')
    .classList.toggle('active');
}


/* ═══════════════════════════════
   COUNTDOWN
═══════════════════════════════ */
let countdownInterval = null;

function startCountdown() {

  // Tanggal tetap: 17 Juni 2026
  const target = new Date("2026-06-17T00:00:00");

  if (countdownInterval) clearInterval(countdownInterval);

  function tick() {
    const now = new Date();
    const diff = target - now;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
    document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
    document.getElementById('cd-mins').textContent = String(m).padStart(2, '0');
    document.getElementById('cd-secs').textContent = String(s).padStart(2, '0');
  }

  tick();
  countdownInterval = setInterval(tick, 1000);
}

if(document.getElementById('cd-days')){
  startCountdown();
}


/* ═══════════════════════════════
   MUSIC TOGGLE
═══════════════════════════════ */
const bgMusic = document.getElementById('bgMusic');

const musicBtn = document.getElementById('musicBtn');

let playing = localStorage.getItem('musicPlaying') === 'true';


/* ambil posisi terakhir */
window.addEventListener('load', () => {

  const savedTime =
    localStorage.getItem('musicTime');

  if(savedTime){
    bgMusic.currentTime = savedTime;
  }

  if(playing){

    bgMusic.play().catch(() => {});

    musicBtn.textContent = '⏸';

  }

});


/* update posisi lagu terus */
setInterval(() => {

  localStorage.setItem(
    'musicTime',
    bgMusic.currentTime
  );

}, 1000);


/* tombol music */
if(musicBtn){

musicBtn.addEventListener('click', () => {

  if(bgMusic.paused){

    bgMusic.play();

    localStorage.setItem(
      'musicPlaying',
      'true'
    );

    musicBtn.textContent = '⏸';

  }else{

    bgMusic.pause();

    localStorage.setItem(
      'musicPlaying',
      'false'
    );

    musicBtn.textContent = '🎵';
  }
  

});
}
/* ═══════════════════════════════
   CONFETTI ON HERO CLICK
═══════════════════════════════ */
const hero = document.querySelector('.hero');

if(hero){
  hero.addEventListener('click', burst);
}

function burst() {
  for (let i = 0; i < 12; i++) {
    const p = new Particle();
    p.x = Math.random() * W;
    p.y = Math.random() * H * .6;
    p.size = Math.random() * 20 + 10;
    p.opacity = .7;
    p.speed = Math.random() * 1.5 + .5;
    particles.push(p);
  }
  setTimeout(() => { particles.splice(60); }, 3000);
}

function toggleSidebar(){

  document
    .getElementById('sidebar')
    .classList.toggle('active');

}

document.addEventListener('click', function(e){

  const sidebar = document.getElementById('sidebar');

  const burger = document.querySelector('.burger-btn');

  if(
    sidebar &&
    burger &&
    !sidebar.contains(e.target) &&
    !burger.contains(e.target)
  ){
    sidebar.classList.remove('active');
  }

});

function openMemory(img, title, desc){

  const modal =
  document.getElementById('memoryModal');

  if(!modal) return;

  document.getElementById('memoryModal')
  .classList.add('active');

  document.getElementById('memoryImg').src = img;

  document.getElementById('memoryTitle').innerText = title;

  document.getElementById('memoryDesc').innerText = desc;
}

function closeMemory(){
  document.getElementById('memoryModal')
  .classList.remove('active');
}
