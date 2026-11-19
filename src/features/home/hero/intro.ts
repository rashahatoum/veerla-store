/** sessionStorage key: the logo intro has already played in this tab. */
export const INTRO_STORAGE_KEY = "veerla_intro";

/** Delay before marking the intro as seen — longer than the whole intro (~4.75s). */
export const INTRO_DURATION_MS = 5000;

/** Never wait longer than this for the logo images before starting. */
const MAX_WAIT_MS = 3000;

/**
 * Runs during HTML parsing on hard loads of the home page (before paint).
 *
 * <html data-intro> states:
 * - (none)    no JS → no gating, the logo is simply shown.
 * - "pending" logo layers are paused on their first frame until both images load,
 *             so a slow network never makes the animation finish before the image appears.
 * - "play"    animations run.
 * - "seen"    already played in this tab (or finished) → static logo, no animation.
 *
 * Add `?intro` to the URL to replay it while testing.
 */
export const introScript = `(function(){try{
var d=document.documentElement,K="${INTRO_STORAGE_KEY}";
if(location.search.indexOf("intro")<0&&sessionStorage.getItem(K)){d.setAttribute("data-intro","seen");return}
sessionStorage.setItem(K,"1");d.setAttribute("data-intro","pending");
var started=false;
function play(){if(started)return;started=true;d.setAttribute("data-intro","play");setTimeout(function(){d.setAttribute("data-intro","seen")},${INTRO_DURATION_MS})}
function watch(){var imgs=document.querySelectorAll(".logo-stage img"),left=imgs.length;if(!left)return play();
imgs.forEach(function(i){if(i.complete){if(--left===0)play()}else{i.addEventListener("load",function(){if(--left===0)play()},{once:true});i.addEventListener("error",play,{once:true})}})}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",watch);else watch();
setTimeout(play,${MAX_WAIT_MS});
}catch(e){}})()`;
