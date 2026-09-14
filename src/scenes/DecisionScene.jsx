import { useState } from 'react';
import { BriefcaseBusiness, CalendarDays, Check, House, LockKeyhole, MessageCircle, Radio } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import SceneLayout from '../components/SceneLayout';
import GameButton from '../components/GameButton';
import Diamond from '../components/Diamond';
import CharacterPortrait from '../components/CharacterPortrait';
import { assets, characters, story } from '../data/storyData';
import SlidoVoteModal from '../components/SlidoVoteModal';

export default function DecisionScene({ state, dispatch, notify, data, final = false }) {
  const selected = state.choices[state.scene];
  const easterEggUnlocked = state.diamonds >= 5;
  const selectedOutcome = final && selected !== undefined && selected < story.finalOutcomes.length
    ? story.finalOutcomes[selected]
    : null;
  const [hudCharacter, setHudCharacter] = useState('frank');
  const [slidoOpen, setSlidoOpen] = useState(false);
  const activeHudCharacter = characters.find((character) => character.id === hudCharacter);
  const choose = (i) => {
    if (final && selected === i) {
      dispatch({ type: 'CLEAR_CHOICE' });
      notify('Choice cleared');
      return;
    }
    dispatch({ type: 'CHOOSE', option: i });
    notify('Choice recorded');
  };
  const liveVoteButton = (
    <motion.div
      className="live-vote-wrap"
      initial={final ? { opacity: 0, y: 8 } : false}
      animate={final ? { opacity: 1, y: 0 } : undefined}
      transition={final ? { delay: 1.72, duration: .3, ease: 'easeOut' } : undefined}
    >
      <GameButton className="live-vote-button" onClick={() => setSlidoOpen(true)}>
        <Radio /> LIVE CLASS VOTE
      </GameButton>
    </motion.div>
  );

  return (
    <SceneLayout
      eyebrow={final ? 'YOUR NEXT MOVE' : 'EXECUTIVE COMMITTEE VOTE'}
      title={data.title}
      className={`decision-scene ${final ? 'final-decision-scene' : ''}`}
    >
      <motion.div
        className="decision-question"
        initial={final ? { opacity: 0, y: 12 } : false}
        animate={final ? { opacity: 1, y: 0 } : undefined}
        transition={final ? { delay: .52, duration: .34, ease: 'easeOut' } : undefined}
      >
        <span className="question-symbol"><MessageCircle size={36} /></span>
        <h2>{data.question}</h2>
      </motion.div>

      <motion.div
        className={`decision-options ${final ? 'final-options' : ''} ${selected !== undefined ? 'has-selection' : ''}`}
        initial={final ? { opacity: 0, y: 10 } : false}
        animate={final ? { opacity: 1, y: 0 } : undefined}
        transition={final ? { delay: 1.35, duration: .34, ease: 'easeOut' } : undefined}
      >
        {data.options.map((option, i) => (
          <GameButton
            key={option}
            variant="green"
            selected={selected === i}
            aria-pressed={selected === i}
            onClick={() => choose(i)}
          >
            <span className="option-letter">{String.fromCharCode(65 + i)}.</span>
            <span>{option}</span>
            {selected === i && <Check className="choice-check" aria-label="Selected" />}
          </GameButton>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedOutcome && (
          <motion.section
            className="final-outcome panel"
            initial={{ opacity: 0, y: 14, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: .98 }}
            transition={{ duration: .35, ease: 'easeOut' }}
            aria-live="polite"
          >
            <div className="final-outcome-heading">
              <span className="final-outcome-kicker">IMMEDIATE RESPONSE</span>
              <h2>{selectedOutcome.title}</h2>
            </div>
            <div className="final-outcome-action">
              <strong>Immediate action</strong>
              <p>{selectedOutcome.action}</p>
            </div>
            {selectedOutcome.directions && (
              <div className="final-outcome-list">
                <strong>Possible directions</strong>
                <ul>{selectedOutcome.directions.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            )}
            <div className="final-outcome-columns">
              <div className="final-outcome-list protects">
                <strong>Protects</strong>
                <ul>{selectedOutcome.protects.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="final-outcome-list risks">
                <strong>Risks / trade-offs</strong>
                <ul>{selectedOutcome.risks.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <div className="final-outcome-reflection">
              <MessageCircle size={23} />
              <div><strong>Reflection</strong><p>“{selectedOutcome.reflection}”</p></div>
            </div>
            <GameButton className="debrief-button" variant="white" onClick={() => dispatch({ type: 'NEXT' })}>
              CONTINUE TO DEBRIEF
            </GameButton>
          </motion.section>
        )}
      </AnimatePresence>

      {!final && liveVoteButton}

      <AnimatePresence>
        {final && (
          <motion.div
            className={`easter-egg ${easterEggUnlocked ? 'unlocked' : 'locked'}`}
            initial={{ opacity: 0, y: 14, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.68, duration: .35, ease: 'easeOut' }}
          >
            <GameButton
              variant="green"
              selected={selected === 3}
              aria-pressed={selected === 3}
              aria-disabled={!easterEggUnlocked}
              onClick={() => easterEggUnlocked ? choose(3) : notify(story.easterEgg.locked)}
            >
              <Diamond />
              <span>{story.easterEgg.text}</span>
              {selected === 3 && <Check className="choice-check" aria-label="Selected" />}
            </GameButton>
            <motion.div
              className="easter-requirement"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.88, duration: .28, ease: 'easeOut' }}
            >
              <LockKeyhole /><span>{story.easterEgg.requirement}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {final && liveVoteButton}

      {final && (
        <motion.div
          className="final-status-wrap interactive-character-hud"
          initial={{ opacity: 0, x: -14, y: 16, scale: .96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ delay: 0.28, duration: 0.38, ease: 'easeOut' }}
        >
          <div className="hud-character-stage">
            <AnimatePresence>
              {hudCharacter === 'frank' && (
                <motion.div className="thought-bubble-group" exit={{ opacity: 0, scale: .94, y: 6 }} transition={{ duration: .24, ease: 'easeOut' }}>
                  <motion.img
                    className="thought-bubble thought-company"
                    src={assets.thoughtCompany}
                    alt="Company thought"
                    initial={{ opacity: 0, scale: .9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                    transition={{ opacity: { delay: 1.02, duration: .28 }, scale: { delay: 1.02, duration: .28 }, y: { delay: 1.02, duration: 2.8, repeat: Infinity, ease: 'easeInOut' } }}
                  />
                  <motion.img
                    className="thought-bubble thought-knife"
                    src={assets.thoughtKnife}
                    alt="Knife thought"
                    initial={{ opacity: 0, scale: .9, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
                    transition={{ opacity: { delay: 1.22, duration: .28 }, scale: { delay: 1.22, duration: .28 }, y: { delay: 1.22, duration: 2.8, repeat: Infinity, ease: 'easeInOut' } }}
                  />
                </motion.div>
              )}
              {hudCharacter !== 'frank' && (
                <motion.div
                  key={`mood-thought-${hudCharacter}`}
                  className={`hud-mood-thought hud-mood-thought-${hudCharacter}`}
                  initial={{ opacity: 0, scale: .88, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                  exit={{ opacity: 0, scale: .94, y: 6 }}
                  transition={{ opacity: { duration: .28 }, scale: { duration: .28, ease: 'easeOut' }, y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
                  aria-label={hudCharacter === 'ceo' ? 'Happy mood' : 'Working mood'}
                >
                  <div className="hud-mood-thought-cloud"><span>{hudCharacter === 'ceo' ? '😊' : 'WORKING'}</span></div>
                  <div className="hud-mood-thought-trail" aria-hidden="true"><i /><i /><i /></div>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.div
              key={`badge-${hudCharacter}`}
              className={`hud-mood-badge hud-mood-${hudCharacter}`}
              initial={{ opacity: .55, filter: 'grayscale(1)', scale: .97 }}
              animate={{ opacity: 1, filter: 'grayscale(0)', scale: 1 }}
              transition={{ delay: hudCharacter === 'frank' ? .72 : 0, duration: .42, ease: 'easeOut' }}
            >
              <span>{hudCharacter === 'frank' ? 'CONFLICTED' : activeHudCharacter.name}</span>
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.div
                key={hudCharacter}
                className="hud-main-portrait"
                initial={{ opacity: 0, x: -10, scale: .97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 8, scale: .98 }}
                transition={{ duration: .28, ease: 'easeOut' }}
              >
                <CharacterPortrait id={hudCharacter} float={false} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="hud-dock">
            <div className="hud-balance"><span>§</span>82,450</div>
            <div className="hud-tools" aria-hidden="true"><House /><CalendarDays /><BriefcaseBusiness /></div>
            <div className="hud-character-slots" role="group" aria-label="Select character">
              {characters.map((character) => (
                <motion.button
                  type="button"
                  key={character.id}
                  className={`hud-character-slot ${hudCharacter === character.id ? 'selected' : ''}`}
                  aria-label={`Select ${character.name}`}
                  aria-pressed={hudCharacter === character.id}
                  onClick={() => setHudCharacter(character.id)}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: .97 }}
                  transition={{ duration: .16 }}
                >
                  <CharacterPortrait id={character.id} float={false} />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      <div className="decision-note">
        {selected !== undefined
          ? <><Check size={21} /> Choice recorded <span>·</span> Continue when the discussion is ready.</>
          : <><Diamond /> Select a response. Discuss your reasoning.</>}
      </div>
      <SlidoVoteModal open={slidoOpen} onClose={() => setSlidoOpen(false)} />
    </SceneLayout>
  );
}
