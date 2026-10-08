/* Project pages: hide the Squarespace header (except the MENU button) and the footer, and on phones run the page edge to edge.
   Core pages keep the full header and footer. Add a slug to CORE to exempt another page.
   Loaded by custom-js/project-pages.loader.html from GitHub (Squarespace Code Injection, Header). */
(function(){
  if(window.__nlProj)return;window.__nlProj=1;
  var CORE=['','commercials','content','experiential','creative-dna','about-me','capabilities'];
  var slug=location.pathname.replace(/^\/+|\/+$/g,'').toLowerCase();
  if(CORE.indexOf(slug)!==-1)return;
  var de=document.documentElement;
  de.classList.add('nl-project');
  var CSS=["html.nl-project footer,",
    "html.nl-project #footer-sections{display:none!important}",
    "html.nl-project #header{z-index:2147482000!important;position:absolute!important;top:0!important;left:0!important;right:0!important;height:0!important;min-height:0!important;background:transparent!important;border:0!important;box-shadow:none!important;overflow:visible!important}",
    "html.nl-project #header .header-announcement-bar-wrapper,",
    "html.nl-project #header .header-display-desktop,",
    "html.nl-project #header .header-display-mobile,",
    "html.nl-project #header .header-menu,",
    "html.nl-project #header .header-background-solid,",
    "html.nl-project #header .header-background-gradient{display:none!important}",
    "html.nl-project #header .header-inner{height:0!important;min-height:0!important;padding:0!important;background:transparent!important}",
    "html.nl-project .nlb{position:fixed!important;top:1.5rem!important;right:4vw!important;left:auto!important;transform:none!important;z-index:2147482000!important;padding:.8rem 1.3rem!important;background:transparent!important;color:#fff!important;border-radius:0!important;box-shadow:none!important;mix-blend-mode:normal!important}",
    "html.nl-project .nlb span,",
    "html.nl-project .nlb .ic{color:#fff!important}",
    "html.nl-project .nlb:hover,",
    "html.nl-project .nlb:hover span,",
    "html.nl-project .nlb:hover .ic{color:#D7F34A!important}",
    "@media (max-width:767px){",
    "html.nl-project,",
    "html.nl-project body{background:#000!important;margin:0!important;overflow-x:hidden!important}",
    "html.nl-project body{position:relative!important;padding:56px 0 0!important}",
    "html.nl-project .nl-up,",
    "html.nl-project #siteWrapper,",
    "html.nl-project #page,",
    "html.nl-project main,",
    "html.nl-project article.sections,",
    "html.nl-project .page-section,",
    "html.nl-project .content-wrapper,",
    "html.nl-project .content,",
    "html.nl-project .fluid-engine,",
    "html.nl-project .sqs-layout,",
    "html.nl-project .sqs-block,",
    "html.nl-project .sqs-block-content{display:block!important;float:none!important;width:100%!important;max-width:none!important;min-width:0!important;min-height:0!important;height:auto!important;margin:0!important;padding:0!important;border:0!important;box-shadow:none!important;background:transparent!important}",
    "html.nl-project .section-background,",
    "html.nl-project .section-border{display:none!important}",
    "html.nl-project .nlb{position:absolute!important;top:0!important;left:50%!important;right:auto!important;transform:translateX(-50%)!important;height:56px!important;box-sizing:border-box!important;padding:0 1.3rem!important}",
    "}"].join("\n");
  var st=document.createElement('style');st.id='nl-project-css';st.textContent=CSS;(document.head||de).appendChild(st);
  /* Phones: tag every wrapper above the page block so the CSS can clear its padding and background, whatever the theme calls it.
     Also keeps the MENU button on the page body so header styles can never hide it. */
  var raf=0,obs;
  function mark(){
    raf=0;
    if(!document.body)return;
    var hosts=[].slice.call(document.querySelectorAll('.sqs-block-code,[data-block-type="23"]'));
    var all=document.body.getElementsByTagName('*');
    for(var i=0;i<all.length;i++){if(all[i].shadowRoot)hosts.push(all[i]);}
    hosts.forEach(function(h){
      for(var e=h;e&&e!==document.body&&e!==de;e=e.parentElement)e.classList.add('nl-up');
    });
    var b=document.querySelector('.nlb');
    if(b&&b.parentNode!==document.body){b.classList.add('nlf');document.body.appendChild(b);}
  }
  function queue(){if(!raf)raf=requestAnimationFrame(mark)}
  function start(){
    mark();
    obs=new MutationObserver(queue);obs.observe(document.body,{childList:true,subtree:true});
    window.addEventListener('load',mark);
    setTimeout(function(){obs.disconnect()},30000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
