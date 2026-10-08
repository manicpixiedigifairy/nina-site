/* Project pages: hide the Squarespace header (except the MENU button) and the footer, and on phones run the page edge to edge.
   Core pages keep the full header and footer, except About Me and Creative DNA, which lose the footer only (FOOTER_ONLY).
   Add a slug to CORE to exempt another page.
   Loaded by custom-js/project-pages.loader.html from GitHub (Squarespace Code Injection, Header). */
(function(){
  if(window.__nlProj)return;window.__nlProj=1;
  /* Diagnostic: add ?nldebug to any page address to show what loaded and what sits below the page block. */
  if(/[?&]nldebug/.test(location.search)){
    var runDbg=function(){setTimeout(function(){
      var d=document,de=d.documentElement,y=window.pageYOffset||0,all=[].slice.call(d.body.getElementsByTagName('*')),hosts=[].slice.call(d.querySelectorAll('.sqs-block-code,[data-block-type="23"]'));
      all.forEach(function(e){if(e.shadowRoot)hosts.push(e)});
      var hb=0,out=[];
      function nm(e){return e.tagName.toLowerCase()+(e.id?'#'+e.id:'')+(e.className&&e.className.split?'.'+e.className.split(/\s+/).filter(Boolean).slice(0,3).join('.'):'')}
      hosts.forEach(function(h){var r=h.getBoundingClientRect();if(r.height>0)hb=Math.max(hb,Math.round(r.bottom+y));out.push('HOST '+nm(h)+' left '+Math.round(r.left)+' w '+Math.round(r.width)+' top '+Math.round(r.top+y)+' bottom '+Math.round(r.bottom+y))});
      var rows=[];
      all.forEach(function(e){
        if(e.closest('#nl-dbg')||hosts.some(function(h){return h.contains(e)}))return;
        var cs=getComputedStyle(e);if(cs.display==='none'||cs.position==='fixed')return;
        var r=e.getBoundingClientRect();if(r.height<=0)return;
        var bt=Math.round(r.bottom+y);
        if(hb&&bt>hb+1)rows.push({t:nm(e),b:bt,h:Math.round(r.height),w:Math.round(r.width),x:Math.round(r.left),pb:cs.paddingBottom,mb:cs.marginBottom,mh:cs.minHeight,bg:cs.backgroundColor,anc:hosts.some(function(h){return e.contains(h)})});
      });
      rows.sort(function(a,b){return b.b-a.b||a.h-b.h});
      var t=['nl-debug v11','html class: '+de.className,'viewport '+innerWidth+'x'+innerHeight+'  doc height '+de.scrollHeight+'  page block bottom '+hb+'  gap '+(de.scrollHeight-hb),'hosts found: '+hosts.length].concat(out);
      t.push('below the page block ('+rows.length+'):');
      rows.slice(0,12).forEach(function(r){t.push((r.anc?'[wraps page] ':'')+r.t+' x'+r.x+' w'+r.w+' h'+r.h+' bottom '+r.b+' padB '+r.pb+' marB '+r.mb+' minH '+r.mh+' bg '+r.bg)});
      var o=d.createElement('div');o.id='nl-dbg';o.textContent=t.join('\n');
      o.style.cssText='position:fixed;left:0;right:0;bottom:0;max-height:55vh;overflow:auto;background:#fff;color:#000;font:11px/1.35 monospace;padding:8px;white-space:pre-wrap;z-index:2147483647;border-top:3px solid #f00';
      d.body.appendChild(o);
    },2500)};
    if(document.readyState==='complete')runDbg();else window.addEventListener('load',runDbg);
  }
  var CORE=['','commercials','content','experiential','creative-dna','about-me','capabilities'];
  var slug=location.pathname.replace(/^\/+|\/+$/g,'').toLowerCase();
  var FOOTER_ONLY=['about-me','creative-dna'];
  var isCore=CORE.indexOf(slug)!==-1;
  if(isCore&&FOOTER_ONLY.indexOf(slug)===-1)return;
  var de=document.documentElement;
  de.classList.add('nl-nofooter');
  if(!isCore)de.classList.add('nl-project');
  var CSS=["html.nl-nofooter footer,",
    "html.nl-nofooter #footer-sections{display:none!important}",
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
    "html.nl-project .nlb:hover .ic{color:#F5D98A!important}",
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
    "html.nl-project .section-border,",
    "html.nl-project [data-nl-hide]{display:none!important}",
    "html.nl-project .nlb{position:fixed!important;top:0!important;left:0!important;right:0!important;bottom:auto!important;width:auto!important;transform:none!important;height:56px!important;box-sizing:border-box!important;padding:0 1.3rem!important;justify-content:center!important;background:#000!important;z-index:2147482000!important}",
    "}"].join("\n");
  var st=document.createElement('style');st.id='nl-project-css';st.textContent=CSS;(document.head||de).appendChild(st);
  if(isCore)return;
  /* Phones: tag every wrapper above the page block, then force padding, margins and background off inline (inline beats any theme rule),
     collapse empty sibling blocks and sections, and keep the MENU button on the page body so header styles can never hide it. */
  var raf=0,obs,mq=window.matchMedia('(max-width:767px)');
  var FIT=[['display','block'],['float','none'],['width','100%'],['max-width','none'],['min-width','0'],['min-height','0'],['height','auto'],['margin','0'],['padding','0'],['border','0'],['box-shadow','none'],['background','transparent']];
  function fit(els){
    for(var i=0;i<els.length;i++){
      var el=els[i];
      if(mq.matches){
        if(!el.hasAttribute('data-nl-fit')){el.setAttribute('data-nl-fit',el.getAttribute('style')||'');}
        for(var j=0;j<FIT.length;j++)el.style.setProperty(FIT[j][0],FIT[j][1],'important');
      }else if(el.hasAttribute('data-nl-fit')){
        var o=el.getAttribute('data-nl-fit');
        if(o)el.setAttribute('style',o);else el.removeAttribute('style');
        el.removeAttribute('data-nl-fit');
      }
    }
  }
  function hostsList(){
    var hosts=[].slice.call(document.querySelectorAll('.sqs-block-code,[data-block-type="23"]'));
    var all=document.body.getElementsByTagName('*');
    for(var i=0;i<all.length;i++){if(all[i].shadowRoot)hosts.push(all[i]);}
    return hosts;
  }
  /* Everywhere: measure where the page block ends and remove whatever still sits below it (wrapper padding, spacers, later blocks). */
  function trim(){
    if(!document.body)return;
    var hosts=hostsList(),hb=0,y=window.pageYOffset||0;
    hosts.forEach(function(h){var r=h.getBoundingClientRect();if(r.height>0)hb=Math.max(hb,r.bottom+y);});
    if(!hb)return;
    for(var pass=0;pass<3&&de.scrollHeight>hb+1;pass++){
      hosts.forEach(function(h){
        for(var e=h.parentElement;e;e=e.parentElement){
          var st=e.style;
          st.setProperty('padding-bottom','0','important');st.setProperty('margin-bottom','0','important');
          st.setProperty('min-height','0','important');st.setProperty('border-bottom-width','0','important');
          if(e!==de)st.setProperty('height','auto','important');
          if(e===de)break;
          for(var sib=e.nextElementSibling;sib;sib=sib.nextElementSibling){
            if(/^(SCRIPT|STYLE|LINK|NOSCRIPT)$/.test(sib.tagName)||sib.classList.contains('nlb')||sib.classList.contains('nlm'))continue;
            var cs=getComputedStyle(sib);
            if(cs.display==='none'||cs.position==='fixed'||cs.position==='absolute')continue;
            if(hosts.some(function(x){return sib.contains(x)}))continue;
            sib.style.setProperty('display','none','important');
          }
        }
      });
    }
  }
  /* Everywhere: remove whatever sits above the page block (theme top padding, header spacer, empty sections) so no black band shows at the top. */
  function trimTop(){
    if(!document.body)return;
    var hosts=hostsList(),want=mq.matches?56:0;
    function topOf(){var t=1e9,y=window.pageYOffset||0;hosts.forEach(function(h){var r=h.getBoundingClientRect();if(r.height>0)t=Math.min(t,r.top+y)});return t}
    for(var pass=0;pass<3&&topOf()<1e9&&topOf()>want+1;pass++){
      hosts.forEach(function(h){
        for(var e=h.parentElement;e&&e!==de;e=e.parentElement){
          var st=e.style;
          if(!(e===document.body&&mq.matches))st.setProperty('padding-top','0','important');
          if(e!==document.body)st.setProperty('margin-top','0','important');
          st.setProperty('border-top-width','0','important');
          for(var sib=e.previousElementSibling;sib;sib=sib.previousElementSibling){
            if(/^(SCRIPT|STYLE|LINK|NOSCRIPT)$/.test(sib.tagName)||sib.classList.contains('nlb')||sib.classList.contains('nlm'))continue;
            var cs=getComputedStyle(sib);
            if(cs.display==='none'||cs.position==='fixed'||cs.position==='absolute')continue;
            if(sib.id==='header'||sib.querySelector('.nlb,.nlm'))continue;
            if(hosts.some(function(x){return sib.contains(x)}))continue;
            sib.style.setProperty('display','none','important');
          }
        }
      });
    }
  }
  function mark(){
    raf=0;
    if(!document.body)return;
    var hosts=hostsList();
    hosts.forEach(function(h){
      for(var e=h;e&&e!==document.body&&e!==de;e=e.parentElement){
        e.classList.add('nl-up');
        var par=e.parentElement;
        if(par&&par!==document.body&&par!==de){
          for(var k=0;k<par.children.length;k++){
            var sib=par.children[k];
            if(sib===e||sib.classList.contains('nl-up'))continue;
            if(!(sib.tagName==='SECTION'||/(^|\s)(sqs-block|fe-block|sqs-row|spacer-block)/.test(sib.className||'')))continue;
            if(hosts.some(function(x){return sib.contains(x)})||sib.querySelector('.nlb,.nlm'))continue;
            sib.setAttribute('data-nl-hide','');
          }
        }
      }
      if(window.ResizeObserver&&!h.__nlro){h.__nlro=1;new ResizeObserver(queue).observe(h);}
    });
    fit(document.querySelectorAll('.nl-up'));
    var b=document.querySelector('.nlb');
    if(b&&b.parentNode!==document.body){b.classList.add('nlf');document.body.appendChild(b);}
    trimTop();
    trim();
  }
  function queue(){if(!raf)raf=requestAnimationFrame(mark)}
  function start(){
    mark();
    obs=new MutationObserver(queue);obs.observe(document.body,{childList:true,subtree:true});
    window.addEventListener('load',mark);
    [400,1500,4000].forEach(function(t){setTimeout(queue,t)});
    window.addEventListener('resize',queue);window.addEventListener('orientationchange',queue);
    setTimeout(function(){obs.disconnect()},30000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
