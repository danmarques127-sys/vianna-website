/* Rotating industries carousel on desktop; original mobile swipe stays intact. */
document.addEventListener("DOMContentLoaded",()=>{
 const track=document.getElementById("industries-mobile-carousel");
 if(!track)return;
 const cards=Array.from(track.querySelectorAll(".industry-card"));
 if(cards.length<3)return;
 const media=window.matchMedia("(min-width: 900px)");
 const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
 let active=0,timer=null,controls=null,dots=[];
 const stop=()=>{if(timer!==null){clearInterval(timer);timer=null}};
 const offset=(i)=>{let d=(i-active+cards.length)%cards.length;if(d>cards.length/2)d-=cards.length;return Math.abs(d)>2?"hidden":String(d)};
 const render=()=>{
  const on=media.matches;
  track.classList.toggle("vianna-wheel",on);
  cards.forEach((card,i)=>{
   if(on){card.dataset.wheelOffset=offset(i);card.setAttribute("aria-hidden",i===active?"false":"true")}
   else{delete card.dataset.wheelOffset;card.removeAttribute("aria-hidden")}
  });
  if(controls){controls.hidden=!on;dots.forEach((dot,i)=>dot.setAttribute("aria-current",i===active?"true":"false"))}
  if(!on||reduced.matches)stop();
 };
 const go=i=>{active=(i+cards.length)%cards.length;render()};
 function makeControls(){
  controls=document.createElement("div");
  controls.className="vianna-wheel-controls";
  controls.setAttribute("aria-label","Navigate industries");
  const prev=document.createElement("button");prev.className="vianna-wheel-arrow";prev.type="button";prev.textContent="‹";prev.setAttribute("aria-label","Previous industry");
  const next=document.createElement("button");next.className="vianna-wheel-arrow";next.type="button";next.textContent="›";next.setAttribute("aria-label","Next industry");
  const wrap=document.createElement("div");wrap.className="vianna-wheel-dots";
  dots=cards.map((card,i)=>{const b=document.createElement("button");b.className="vianna-wheel-dot";b.type="button";b.setAttribute("aria-label","Show "+(card.querySelector("h3")?.textContent?.trim()||"industry "+(i+1)));b.addEventListener("click",()=>{go(i);restart()});wrap.appendChild(b);return b});
  prev.addEventListener("click",()=>{go(active-1);restart()});next.addEventListener("click",()=>{go(active+1);restart()});
  controls.append(prev,wrap,next);track.after(controls);
 }
 const start=()=>{if(!timer&&media.matches&&!reduced.matches)timer=setInterval(()=>go(active+1),5500)};
 const restart=()=>{stop();start()};
 makeControls();
 cards.forEach((card,i)=>card.addEventListener("click",()=>{if(media.matches&&i!==active){go(i);restart()}}));
 track.addEventListener("mouseenter",stop);track.addEventListener("mouseleave",start);
 track.addEventListener("focusin",stop);track.addEventListener("focusout",e=>{if(!track.contains(e.relatedTarget))start()});
 track.addEventListener("keydown",e=>{if(!media.matches)return;if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();go(active+(e.key==="ArrowRight"?1:-1));restart()}});
 document.addEventListener("visibilitychange",()=>document.hidden?stop():start());
 if(media.addEventListener)media.addEventListener("change",()=>{render();start()});else media.addListener(()=>{render();start()});
 render();start();
});