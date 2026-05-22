/*
  Simple Pokedex Kanto viewer.
  Two buttons: Inicio and Pokémons.
  The Pokémons view shows 1–151 in national order with image, name and number.
*/

const qs = s => document.querySelector(s);
const qsa = s => Array.from(document.querySelectorAll(s));


const homePokedex = qs('#home-pokedex');
const homeSoon = qs('#home-soon');
const panelHome = qs('#home');
const panelPokedex = qs('#pokedex');
const grid = qs('#pokedex-grid');
const btnBack = qs('#btn-back');

// Open pokedex from home, mark back button active
if(homePokedex) homePokedex.addEventListener('click', ()=> { showPanel('pokedex', btnBack); loadPokedex(); });

// Back button returns to home
if(btnBack) btnBack.addEventListener('click', ()=> { showPanel('home', null); });

// feedback for "Próximamente"
if(homeSoon) homeSoon.addEventListener('click', ()=> {
  homeSoon.animate([{ transform:'scale(1)' }, { transform:'scale(0.98)' }, { transform:'scale(1)'}], { duration:180 });
  const orig = homeSoon.textContent;
  homeSoon.textContent = 'Próximamente…';
  setTimeout(()=> homeSoon.textContent = orig, 900);
});

function showPanel(name, btn){
  qsa('.tab').forEach(t=>t.classList.remove('active'));
  if(btn && btn.classList) btn.classList.add('active');
  panelHome.classList.toggle('visible', name==='home');
  panelPokedex.classList.toggle('visible', name==='pokedex');
}

/* Data: lista completa 1..151 con nombre y ruta de imagen proporcionada en assets */
const kanto = [
  {num:1, name:'Bulbasaur', img:'/gen1/1bulbasaur.gif'},
  {num:2, name:'Ivysaur', img:'/gen1/2ivysaur.gif'},
  {num:3, name:'Venusaur', img:'/gen1/3venusaur.gif'},
  {num:4, name:'Charmander', img:'/gen1/4charmander.gif'},
  {num:5, name:'Charmeleon', img:'/gen1/5charmeleon.gif'},
  {num:6, name:'Charizard', img:'/gen1/6charizard.gif'},
  {num:7, name:'Squirtle', img:'/gen1/7squirtle.gif'},
  {num:8, name:'Wartortle', img:'/gen1/8wartortle.gif'},
  {num:9, name:'Blastoise', img:'/gen1/9blastoise.gif'},
  {num:10, name:'Caterpie', img:'/gen1/10caterpie.gif'},
  {num:11, name:'Metapod', img:'/gen1/11metapod.gif'},
  {num:12, name:'Butterfree', img:'/gen1/12butterfree.gif'},
  {num:13, name:'Weedle', img:'/gen1/13weedle.gif'},
  {num:14, name:'Kakuna', img:'/gen1/14kakuna.gif'},
  {num:15, name:'Beedrill', img:'/gen1/15beedrill.gif'},
  {num:16, name:'Pidgey', img:'/gen1/16pidgey.gif'},
  {num:17, name:'Pidgeotto', img:'/gen1/17pidgeotto.gif'},
  {num:18, name:'Pidgeot', img:'/gen1/18pidgeot.gif'},
  {num:19, name:'Rattata', img:'/gen1/19rattata.gif'},
  {num:20, name:'Raticate', img:'/gen1/20raticate.gif'},
  {num:21, name:'Spearow', img:'/gen1/21spearow.gif'},
  {num:22, name:'Fearow', img:'/gen1/22fearow.gif'},
  {num:23, name:'Ekans', img:'/gen1/23ekans.gif'},
  {num:24, name:'Arbok', img:'/gen1/24arbok.gif'},
  {num:25, name:'Pikachu', img:'/gen1/25pikachu.gif'},
  {num:26, name:'Raichu', img:'/gen1/26raichu.gif'},
  {num:27, name:'Sandshrew', img:'/gen1/27sandshrew.gif'},
  {num:28, name:'Sandslash', img:'/gen1/28sandslash.gif'},
  {num:29, name:'Nidoran♀', img:'/gen1/29nidoran(femina).gif'},
  {num:30, name:'Nidorina', img:'/gen1/30nidorina.gif'},
  {num:31, name:'Nidoqueen', img:'/gen1/31nidoqueen.gif'},
  {num:32, name:'Nidoran♂', img:'/gen1/32nidoran(macho).gif'},
  {num:33, name:'Nidorino', img:'/gen1/33nidorino.gif'},
  {num:34, name:'Nidoking', img:'/gen1/34nidoking.gif'},
  {num:35, name:'Clefairy', img:'/gen1/35clefairy.gif'},
  {num:36, name:'Clefable', img:'/gen1/36clefable.gif'},
  {num:37, name:'Vulpix', img:'/gen1/37vulpix.gif'},
  {num:38, name:'Ninetales', img:'/gen1/38ninetales.gif'},
  {num:39, name:'Jigglypuff', img:'/gen1/39jigglypuff.gif'},
  {num:40, name:'Wigglytuff', img:'/gen1/40wigglytuff.gif'},
  {num:41, name:'Zubat', img:'/gen1/41zubat.gif'},
  {num:42, name:'Golbat', img:'/gen1/42golbat.gif'},
  {num:43, name:'Oddish', img:'/gen1/43oddish.gif'},
  {num:44, name:'Gloom', img:'/gen1/44gloom.gif'},
  {num:45, name:'Vileplume', img:'/gen1/45vileplume.gif'},
  {num:46, name:'Paras', img:'/gen1/46paras.gif'},
  {num:47, name:'Parasect', img:'/gen1/47parasect.gif'},
  {num:48, name:'Venonat', img:'/gen1/48venonat.gif'},
  {num:49, name:'Venomoth', img:'/gen1/49venomoth.gif'},
  {num:50, name:'Diglett', img:'/gen1/50digglet.gif'},
  {num:51, name:'Dugtrio', img:'/gen1/51dugtrio.gif'},
  {num:52, name:'Meowth', img:'/gen1/52meowth.gif'},
  {num:53, name:'Persian', img:'/gen1/53persian.gif'},
  {num:54, name:'Psyduck', img:'/gen1/54psyduck.gif'},
  {num:55, name:'Golduck', img:'/gen1/55golduck.gif'},
  {num:56, name:'Mankey', img:'/gen1/56mankey.gif'},
  {num:57, name:'Primeape', img:'/gen1/57primeape.gif'},
  {num:58, name:'Growlithe', img:'/gen1/58growlithe.gif'},
  {num:59, name:'Arcanine', img:'/gen1/59arcanine.gif'},
  {num:60, name:'Poliwag', img:'/gen1/60poliwag.gif'},
  {num:61, name:'Poliwhirl', img:'/gen1/61poliwhirl.gif'},
  {num:62, name:'Poliwrath', img:'/gen1/62poliwrath.gif'},
  {num:63, name:'Abra', img:'/gen1/63abra.gif'},
  {num:64, name:'Kadabra', img:'/gen1/64kadabra.gif'},
  {num:65, name:'Alakazam', img:'/gen1/65alakazam.gif'},
  {num:66, name:'Machop', img:'/gen1/66machop.gif'},
  {num:67, name:'Machoke', img:'/gen1/67machoke.gif'},
  {num:68, name:'Machamp', img:'/gen1/68machamp.gif'},
  {num:69, name:'Bellsprout', img:'/gen1/69bellsprout.gif'},
  {num:70, name:'Weepinbell', img:'/gen1/70weepinbell.gif'},
  {num:71, name:'Victreebel', img:'/gen1/71victreebel.gif'},
  {num:72, name:'Tentacool', img:'/gen1/72tentacool.gif'},
  {num:73, name:'Tentacruel', img:'/gen1/73tentacruel.gif'},
  {num:74, name:'Geodude', img:'/gen1/74geodude.gif'},
  {num:75, name:'Graveler', img:'/gen1/75graveler.gif'},
  {num:76, name:'Golem', img:'/gen1/76golem.gif'},
  {num:77, name:'Ponyta', img:'/gen1/77ponyta.gif'},
  {num:78, name:'Rapidash', img:'/gen1/78rapidash.gif'},
  {num:79, name:'Slowpoke', img:'/gen1/79slowpoke.gif'},
  {num:80, name:'Slowbro', img:'/gen1/80slowbro.gif'},
  {num:81, name:'Magnemite', img:'/gen1/81magnemite.gif'},
  {num:82, name:'Magneton', img:'/gen1/82magneton.gif'},
  {num:83, name:"Farfetch'd", img:"/gen1/83farfech'd.gif"},
  {num:84, name:'Doduo', img:'/gen1/84doduo.gif'},
  {num:85, name:'Dodrio', img:'/gen1/85dodrio.gif'},
  {num:86, name:'Seel', img:'/gen1/86seel.gif'},
  {num:87, name:'Dewgong', img:'/gen1/87dewgong.gif'},
  {num:88, name:'Grimer', img:'/gen1/88grimer.gif'},
  {num:89, name:'Muk', img:'/gen1/89muk.gif'},
  {num:90, name:'Shellder', img:'/gen1/90shelder.gif'},
  {num:91, name:'Cloyster', img:'/gen1/91cloyster.gif'},
  {num:92, name:'Gastly', img:'/gen1/92gastly.gif'},
  {num:93, name:'Haunter', img:'/gen1/93haunter.gif'},
  {num:94, name:'Gengar', img:'/gen1/94gengar.gif'},
  {num:95, name:'Onix', img:'/gen1/95onix.gif'},
  {num:96, name:'Drowzee', img:'/gen1/96drowzee.gif'},
  {num:97, name:'Hypno', img:'/gen1/97hypno.gif'},
  {num:98, name:'Krabby', img:'/gen1/98krabby.gif'},
  {num:99, name:'Kingler', img:'/gen1/99kingler.gif'},
  {num:100, name:'Voltorb', img:'/gen1/100voltorb.gif'},
  {num:101, name:'Electrode', img:'/gen1/101electrode.gif'},
  {num:102, name:'Exeggcute', img:'/gen1/102exeggcute.gif'},
  {num:103, name:'Exeggutor', img:'/gen1/103exeggutor.gif'},
  {num:104, name:'Cubone', img:'/gen1/104cubone.gif'},
  {num:105, name:'Marowak', img:'/gen1/105marowakgif'},
  {num:106, name:'Hitmonlee', img:'/gen1/106hitmonlee.gif'},
  {num:107, name:'Hitmonchan', img:'/gen1/107hitmonchan.gif'},
  {num:108, name:'Lickitung', img:'/gen1/108lickitung.gif'},
  {num:109, name:'Koffing', img:'/gen1/109koffing.gif'},
  {num:110, name:'Weezing', img:'/gen1/110weezing.gif'},
  {num:111, name:'Rhyhorn', img:'/gen1/111rhyhorn.gif'},
  {num:112, name:'Rhydon', img:'/gen1/112rhydon.gif'},
  {num:113, name:'Chansey', img:'/gen1/113chansey.gif'},
  {num:114, name:'Tangela', img:'/gen1/114tangela.gif'},
  {num:115, name:'Kangaskhan', img:'/gen1/115kangaskhan.gif'},
  {num:116, name:'Horsea', img:'/gen1/116horsea.gif'},
  {num:117, name:'Seadra', img:'/gen1/117seadra.gif'},
  {num:118, name:'Goldeen', img:'/gen1/118goldeen.gif'},
  {num:119, name:'Seaking', img:'/gen1/119seaking.gif'},
  {num:120, name:'Staryu', img:'/gen1/120staryu.gif'},
  {num:121, name:'Starmie', img:'/gen1/121starmie.gif'},
  {num:122, name:'Mr. Mime', img:'/gen1/122mrmime.gif'},
  {num:123, name:'Scyther', img:'/gen1/123scyther.gif'},
  {num:124, name:'Jynx', img:'/gen1/124jinx.gif'},
  {num:125, name:'Electabuzz', img:'/gen1/125electabuzz.gif'},
  {num:126, name:'Magmar', img:'/gen1/126magmar.gif'},
  {num:127, name:'Pinsir', img:'/gen1/127pinsir.gif'},
  {num:128, name:'Tauros', img:'/gen1/128tauros.gif'},
  {num:129, name:'Magikarp', img:'/gen1/129magikarp.gif'},
  {num:130, name:'Gyarados', img:'/gen1/130gyarados.gif'},
  {num:131, name:'Lapras', img:'/gen1/131lapras.gif'},
  {num:132, name:'Ditto', img:'/gen1/132ditto.gif'},
  {num:133, name:'Eevee', img:'/gen1/133eevee.gif'},
  {num:134, name:'Vaporeon', img:'/gen1/134vaporeon.gif'},
  {num:135, name:'Jolteon', img:'/gen1/135jolteon.gif'},
  {num:136, name:'Flareon', img:'/gen1/136flareon.gif'},
  {num:137, name:'Porygon', img:'/gen1/137porygon.gif'},
  {num:138, name:'Omanyte', img:'/gen1/138omanyte.gif'},
  {num:139, name:'Omastar', img:'/gen1/139omastar.gif'},
  {num:140, name:'Kabuto', img:'/gen1/140kabuto.gif'},
  {num:141, name:'Kabutops', img:'/gen1/141kabutops.gif'},
  {num:142, name:'Aerodactyl', img:'/gen1/142aerodactyl.gif'},
  {num:143, name:'Snorlax', img:'/gen1/143snorlax.gif'},
  {num:144, name:'Articuno', img:'/gen1/144articuno.gif'},
  {num:145, name:'Zapdos', img:'/gen1/145zapdos.gif'},
  {num:146, name:'Moltres', img:'/gen1/146moltres.gif'},
  {num:147, name:'Dratini', img:'/gen1/147dratini.gif'},
  {num:148, name:'Dragonair', img:'/gen1/148dragonair.gif'},
  {num:149, name:'Dragonite', img:'/gen1/149dragonite.gif'},
  {num:150, name:'Mewtwo', img:'/gen1/150mewtwo.gif'},
  {num:151, name:'Mew', img:'/gen1/151mew.gif'}
];

/* Utility: format number with 3 digits */
const fmt = n => '#'+String(n).padStart(3,'0');

let pokedexRendered = false;
function loadPokedex(){
  if(pokedexRendered) return;
  pokedexRendered = true;

  // build elements
  const frag = document.createDocumentFragment();
  kanto.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.alt = `${p.name} ${fmt(p.num)}`;
    img.loading = 'lazy';
    img.src = p.img;
    img.onerror = ()=>{ img.src = '/gen1/132ditto.gif'; img.alt = 'imagen no disponible'; }
    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = p.name;
    const number = document.createElement('div');
    number.className = 'number';
    number.textContent = `${p.name.toLowerCase()==='mew' ? fmt(p.num) : fmt(p.num)}`;
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(number);
    frag.appendChild(card);
  });
  grid.appendChild(frag);
}