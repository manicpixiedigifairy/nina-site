/* Sitewide navigation: hamburger MENU button + full-screen numbered overlay (matches the About page).
   Loaded by custom-js/sitewide-menu.loader.html from GitHub. Edit LINKS to change the menu. */
(function(){
  if(window.__nlMenu)return;window.__nlMenu=1;
  var LINKS=[["Home","https://www.byninaaustin.com/"],["Commercials","https://www.byninaaustin.com/commercials"],["Content","https://www.byninaaustin.com/content"],["Experiential","https://www.byninaaustin.com/experiential"],["Creative DNA","https://www.byninaaustin.com/creative-dna"],["About Me","https://www.byninaaustin.com/about-me"],["Contact","mailto:ninaaustincreative@gmail.com"]];
  var CSS='@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400;500&family=Marcellus&display=swap");'
  +'.header-nav,.header-burger,.header-menu{display:none!important}'
  +'.nlb{all:unset;cursor:pointer;display:flex;align-items:center;gap:.9rem;font-family:Jost,sans-serif;font-size:.8125rem;letter-spacing:.14em;text-transform:uppercase;color:#fff;position:absolute;right:4vw;top:50%;transform:translateY(-50%);z-index:5}'
  +'.nlb.nlf{position:fixed;top:2rem;transform:none;mix-blend-mode:normal}'
  +'.nlb .ic{width:1.9rem;height:.7rem;position:relative;display:block}'
  +'.nlb .ic:before,.nlb .ic:after{content:"";position:absolute;left:0;right:0;height:1.5px;background:currentColor}'
  +'.nlb .ic:before{top:0}.nlb .ic:after{bottom:0}'
  +'.nlb:hover{color:#D7F34A!important}'
  +'.nlb:focus-visible,.nlm a:focus-visible,.nlm .nlx:focus-visible{outline:2px solid #D7F34A;outline-offset:4px}'
  +'.nlm{position:fixed;inset:0;z-index:2147483000;background:#000;display:flex;flex-direction:column;justify-content:center;padding:0 5.5rem;opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;overflow-y:auto}'
  +'.nlm.o{opacity:1;visibility:visible}'
  +'.nlm .nlx{all:unset;cursor:pointer;position:absolute;top:2.25rem;right:5.5rem;font-family:Jost,sans-serif;font-size:.8125rem;letter-spacing:.14em;text-transform:uppercase;color:#fff}'
  +'.nlm .nlx:hover{color:#D7F34A}'
  +'.nlm ul{list-style:none;margin:0;padding:0}'
  +'.nlm li{border-bottom:1px solid rgba(255,255,255,.14);margin:0;padding:0}'
  +'.nlm li a{display:flex;align-items:baseline;gap:1.5rem;padding:1.1rem 0;font-family:Marcellus,serif;font-size:3.4rem;line-height:1.1;color:#fff;text-decoration:none;transition:color .25s,padding-left .25s}'
  +'.nlm li a small{font-family:Jost,sans-serif;font-size:.75rem;letter-spacing:.14em;color:rgba(255,255,255,.5)}'
  +'.nlm li a:hover{color:#D7F34A;padding-left:.75rem}'
  +'@media(max-width:1000px){.nlb{right:20px}.nlm{padding:0 28px}.nlm .nlx{top:28px;right:28px}.nlm li a{font-size:2.1rem;padding:.9rem 0}}';
  function init(){
    if(document.getElementById('nl-menu-css'))return;
    var st=document.createElement('style');st.id='nl-menu-css';st.textContent=CSS;document.head.appendChild(st);
    var proj=document.documentElement.classList.contains('nl-project');
    var host=proj?null:(document.querySelector('.header-inner')||document.querySelector('.header')||document.querySelector('header'));
    var b=document.createElement('button');b.type='button';b.className='nlb';b.id='nlb';
    b.setAttribute('aria-expanded','false');b.setAttribute('aria-controls','nlm');
    b.innerHTML='<span>Menu</span><span class="ic" aria-hidden="true"></span>';
    if(host){if(getComputedStyle(host).position==='static')host.style.position='relative';host.appendChild(b);
      var ref=host.querySelector('.header-title a, .header-title-text a, a');
      if(ref)b.style.setProperty('color',getComputedStyle(ref).color,'important');}
    else{b.classList.add('nlf');document.body.appendChild(b);}
    var m=document.createElement('div');m.className='nlm';m.id='nlm';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-label','Navigation');
    var h='<button type="button" class="nlx" id="nlx">Close</button><ul>';
    LINKS.forEach(function(l,i){h+='<li><a href="'+l[1]+'"><small>0'+(i+1)+'</small>'+l[0]+'</a></li>'});
    m.innerHTML=h+'</ul>';document.body.appendChild(m);
    var x=m.querySelector('#nlx');
    function t(o){m.classList.toggle('o',o);b.setAttribute('aria-expanded',o);document.documentElement.style.overflow=o?'hidden':'';if(o)x.focus();else b.focus()}
    b.addEventListener('click',function(){t(true)});
    x.addEventListener('click',function(){t(false)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&m.classList.contains('o'))t(false)});
    m.addEventListener('click',function(e){if(e.target.tagName==='A')t(false)});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
