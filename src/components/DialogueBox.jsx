import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { characters } from '../data/storyData';
export default function DialogueBox({ speaker, text, significant = false, onAdvance }) {
  const c = characters.find(c => c.id === speaker); const [count,setCount]=useState(0); const [ready,setReady]=useState(false); const done=count>=text.length;
  useEffect(()=>{setCount(0);setReady(false);let cancelled=false;const tick=()=>{setCount(v=>{if(v>=text.length)return v;const next=v+1;const pause=significant&&text.slice(0,v)==='Everyone thinks you’re a '?340:(significant?72:28);setTimeout(()=>{if(!cancelled)tick();},pause);return next;});};tick();return()=>{cancelled=true;};},[text,significant]);
  useEffect(()=>{if(!done)return;const pause=setTimeout(()=>setReady(true),significant?600:0);return()=>clearTimeout(pause);},[done,significant]);
  const handleClick=()=>done?ready&&onAdvance?.():setCount(text.length);
  return <motion.div key={text} onClick={handleClick} initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{duration:.3,ease:'easeOut'}} className={`dialogue panel ${significant?'significant':''}`}><span className={`speaker ${speaker}`}>{c.name}</span><p>“{text.slice(0,count)}{!done&&<span className="type-cursor">▌</span>}”</p>{ready&&<span className="dialogue-corner" aria-hidden="true">▼</span>}</motion.div>;
}

