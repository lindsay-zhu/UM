import { Play, Users, Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SceneLayout from '../components/SceneLayout';
import GameButton from '../components/GameButton';
import Diamond from '../components/Diamond';
import { story } from '../data/storyData';

export default function MenuScene({ dispatch }) {
  return <SceneLayout className="menu-scene title-screen"><div className="title-logo" aria-label="Group 1 mark"><span>4</span><i/><b>·</b></div><div className="title-group">GROUP 1</div><div className="title-screen-center"><motion.h1 className="game-title" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.45,ease:'easeOut'}}><span>WELCOME TO THE</span><strong>COMPANY <Diamond className="title-diamond"/></strong></motion.h1><motion.div className="chapter-tag" initial={{opacity:0,x:-18}} animate={{opacity:1,x:0}} transition={{duration:.3,delay:.25,ease:'easeOut'}}>CASE FILE 01&nbsp; | &nbsp;THE PERFORMANCE APPRAISAL</motion.div><nav className="menu-actions" aria-label="Main menu"><GameButton variant="green" className="play-button" onClick={()=>dispatch({type:'RESTART'})}><Play fill="currentColor"/>PLAY<ArrowUpRight className="trailing"/></GameButton><GameButton variant="white" onClick={()=>dispatch({type:'VISIT',scene:2})}><Users/>MEET THE CHARACTERS<ArrowUpRight className="trailing"/></GameButton><GameButton variant="white" onClick={()=>dispatch({type:'VISIT',scene:10})}><Sparkles/>DEVELOPMENT TEAM<ArrowUpRight className="trailing"/></GameButton></nav><div className="menu-footer"><p>{story.welcome}</p><small>{story.tagline}</small></div></div></SceneLayout>;
}


