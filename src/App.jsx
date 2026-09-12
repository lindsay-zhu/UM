import { useEffect, useReducer, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Home, Maximize, Minimize, ChevronLeft, ChevronRight } from 'lucide-react';
import { assets, sceneNames, team } from './data/storyData';
import { gameReducer, initialState, maxStep } from './data/gameState';
import Diamond from './components/Diamond';
import GameButton from './components/GameButton';
import MenuScene from './scenes/MenuScene';
import SceneRouter from './scenes/SceneRouter';

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [scale,setScale] = useState(1);
  const [full,setFull] = useState(false);
  const [idle,setIdle] = useState(false);
  const [toast,setToast] = useState('');
  const [ready,setReady] = useState(false); const [loadProgress,setLoadProgress] = useState(0);
  const [assetError,setAssetError] = useState(false);
  const toastTimer = useRef();
  const requestedFullscreenExit = useRef(false);
  const notify = text => {setToast(text);clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),2400);};
  const fullscreen = async () => {try {if(document.fullscreenElement) {requestedFullscreenExit.current=true;await document.exitFullscreen();} else await document.documentElement.requestFullscreen();}catch {requestedFullscreenExit.current=false;notify('Use F11 to enter browser fullscreen.');}};
  useEffect(()=>{let active=true; const sources=[...Object.values(assets),...team.map(member=>member.portrait).filter(Boolean)]; const failSafe=setTimeout(()=>{if(active){console.warn('Asset preload timeout; continuing to main menu.');setAssetError(false);setReady(true);}},5000); const preload=sources.map(src=>new Promise(resolve=>{const im=new Image();im.onload=()=>resolve(true);im.onerror=()=>resolve(false);im.src=src;})); Promise.allSettled(preload).then(results=>{if(!active)return;clearTimeout(failSafe);const failed=results.filter(result=>result.status==='fulfilled'&&result.value===false).length;if(failed)console.warn(`Could not preload ${failed} image asset(s); continuing with the game shell.`);setAssetError(false);let start=performance.now();const tick=now=>{const p=Math.min(100,((now-start)/3600)*100);setLoadProgress(p);if(p<100)requestAnimationFrame(tick);else setReady(true);};requestAnimationFrame(tick);}).catch(error=>{if(!active)return;clearTimeout(failSafe);console.error('Asset preload failed; continuing to main menu.',error);setAssetError(false);setReady(true);});return()=>{active=false;clearTimeout(failSafe);};},[]);
  useEffect(()=>{const resize=()=>setScale(Math.min(window.innerWidth/1920,window.innerHeight/1080));resize();window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize);},[]);
  useEffect(()=>{const changed=()=>{const isFull=!!document.fullscreenElement;setFull(isFull);if(!isFull){if(!requestedFullscreenExit.current)dispatch({type:'HOME'});requestedFullscreenExit.current=false;}};document.addEventListener('fullscreenchange',changed);return()=>document.removeEventListener('fullscreenchange',changed);},[]);
  useEffect(()=>{let timer;const active=()=>{setIdle(false);clearTimeout(timer);timer=setTimeout(()=>setIdle(true),3500);};active();window.addEventListener('pointermove',active);window.addEventListener('pointerdown',active);return()=>{clearTimeout(timer);window.removeEventListener('pointermove',active);window.removeEventListener('pointerdown',active);};},[]);
  useEffect(()=>{const key=e=>{if(e.repeat || e.altKey || e.ctrlKey || e.metaKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==='Escape'){dispatch({type:'HOME'});return;}if(e.key.toLowerCase()==='f'){e.preventDefault();fullscreen();return;}if(e.key==='Enter'){e.preventDefault();window.dispatchEvent(new Event('finish-dialogue'));return;}if(e.key==='ArrowLeft'){e.preventDefault();dispatch({type:'PREV'});}if(e.key==='ArrowRight'||e.code==='Space'){e.preventDefault();if(ready)dispatch({type:'NEXT'});}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[ready]);
  useEffect(()=>()=>clearTimeout(toastTimer.current),[]);
  const nextLabel=state.profile ? 'BACK TO CHARACTERS' : state.sideVisit && state.scene===2 ? 'HOME' : state.step<maxStep(state.scene) ? 'CONTINUE' : state.scene===1 ? 'CONTINUE' : 'NEXT';
  return <MotionConfig reducedMotion="user"><main className={`viewport ${idle&&full?'cursor-hidden':''}`}><div className={`game-canvas ${!ready ? "loading-canvas" : ""}`} style={{transform:`translate(-50%, -50%) scale(${scale})`}}><div className="ambient-glow"/><div className="loading-polygons" aria-hidden="true"><i/><i/><i/><i/><i/><i/></div>{ready&&state.scene!==0&&<header className="game-hud"><button className="brand" aria-label={state.scene===8?'Green diamond':'Home'} onClick={()=>state.scene===8?dispatch({type:'DIAMOND'}):dispatch({type:'HOME'})}><Diamond/><span>THE COMPANY<span className="brand-sub">A CORPORATE ETHICS SIMULATION</span></span></button><div className="hud-right"><span className="hud-chapter">{state.scene===0?'WELCOME, COMMITTEE MEMBER':`${String(state.scene).padStart(2,'0')} / 12 · ${sceneNames[state.scene].toUpperCase()}`}</span><button className="icon-button" aria-label="Home" title="Home (Esc)" onClick={()=>dispatch({type:'HOME'})}><Home/></button><button className="icon-button" aria-label={full?'Exit presentation mode':'Presentation mode'} title="Presentation mode (F)" onClick={fullscreen}>{full?<Minimize/>:<Maximize/>}</button></div></header>}{!ready?<div className="loading opening-load"><Diamond/><h1>WELCOME TO THE COMPANY</h1><div className="loading-bar"><span style={{width:`${loadProgress}%`}}/></div><p>THE CASE OF THE PERFORMANCE APPRAISAL</p></div>:assetError?<div className="loading"><h1>Unable to load character assets</h1><p>Please reopen the complete game file.</p><GameButton onClick={()=>window.location.reload()}>RETRY</GameButton></div>:<AnimatePresence mode="wait">{state.scene===0?<MenuScene key="menu" dispatch={dispatch}/>:<SceneRouter key={state.scene} state={state} dispatch={dispatch} notify={notify}/>}</AnimatePresence>}{ready&&state.scene!==0&&<footer className="game-controls"><div className="keyboard-hints"><span><kbd>F</kbd> Presentation mode</span><span><kbd>Esc</kbd> Home</span>{state.scene>0&&<span><kbd>←</kbd><kbd>→</kbd> Navigate <span className="hint-dot">·</span> <kbd>Space</kbd> Continue</span>}</div>{state.scene>0&&state.scene<12&&<nav className="scene-nav" aria-label="Scene navigation"><GameButton variant="ghost" aria-label="Previous" onClick={()=>dispatch({type:'PREV'})}><ChevronLeft/>BACK</GameButton><span className="step-dots" aria-label={`Step ${state.step+1} of ${maxStep(state.scene)+1}`}>{Array.from({length:maxStep(state.scene)+1},(_,i)=><i key={i} className={i<=state.step?'lit':''}/>)}</span><GameButton onClick={()=>state.scene===3?window.dispatchEvent(new Event('enter-headquarters')):dispatch({type:'NEXT'})}>{nextLabel}<ChevronRight/></GameButton></nav>}</footer>}{toast&&<div className="toast" role="status">{toast}</div>}<div className="sr-only" aria-live="polite">{sceneNames[state.scene]}</div></div></main></MotionConfig>;
}













