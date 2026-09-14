import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import Diamond from './Diamond';
import GameButton from './GameButton';
import { SLIDO_JOIN_URL, SLIDO_PRESENT_URL } from '../config/slido';

export default function SlidoVoteModal({ open, onClose }) {
  const [view, setView] = useState('qr');
  const [qrFailed, setQrFailed] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(SLIDO_JOIN_URL)}`;

  useEffect(() => {
    if (open) {
      setView('qr');
      setQrFailed(false);
      setIframeFailed(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      onClose();
    };
    window.addEventListener('keydown', closeOnEscape, true);
    return () => window.removeEventListener('keydown', closeOnEscape, true);
  }, [open, onClose]);

  if (!open) return null;

  const openSlido = () => window.open(SLIDO_JOIN_URL, '_blank', 'noopener,noreferrer');
  const openResults = () => window.open(SLIDO_PRESENT_URL, '_blank', 'noopener,noreferrer');

  return (
    <div
      className="slido-overlay slido-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="slido-modal" role="dialog" aria-modal="true" aria-labelledby="slido-modal-title">
        <header className="slido-modal-header">
          <div className="slido-modal-heading">
            <Diamond />
            <div>
              <h2 id="slido-modal-title">LIVE CLASS VOTE</h2>
              <p>Executive Committee</p>
            </div>
          </div>
          <div className="slido-modal-actions">
            <GameButton className="slido-new-tab" onClick={openSlido}>
              <ExternalLink /> OPEN SLIDO IN NEW TAB
            </GameButton>
            <button type="button" className="slido-close" aria-label="Close live class vote" onClick={onClose}>
              <X />
            </button>
          </div>
        </header>
        <div className="slido-modal-body">
          {view === 'qr' ? (
            <div className="slido-join-stage slido-scan-stage">
              <div className="slido-join-copy">
                <p className="slido-kicker">EXECUTIVE COMMITTEE VOTE</p>
                <h3>SCAN TO VOTE</h3>
                <p>Scan with your phone to vote</p>
              </div>
              {qrFailed ? (
                <div className="slido-qr-error slido-qr-fallback">
                  <strong>Slido voting link:</strong>
                  <a href={SLIDO_JOIN_URL} target="_blank" rel="noreferrer">{SLIDO_JOIN_URL}</a>
                </div>
              ) : (
                <div className="slido-qr-frame">
                  <img
                    src={qrUrl}
                    alt="Scan to vote on Slido"
                    width="280"
                    height="280"
                    onError={() => setQrFailed(true)}
                  />
                </div>
              )}
              <div className="slido-stage-actions">
                <GameButton className="slido-results-button" onClick={() => { setIframeFailed(false); setView('results'); }}>
                  SHOW LIVE RESULTS
                </GameButton>
                <GameButton className="slido-secondary-action" onClick={openSlido}>
                  <ExternalLink /> OPEN SLIDO IN NEW TAB
                </GameButton>
                <GameButton className="slido-secondary-action" onClick={onClose}>CLOSE</GameButton>
              </div>
            </div>
          ) : iframeFailed ? (
            <div className="slido-fallback">
              <h3>Live results could not be displayed inside the game.</h3>
              <div className="slido-stage-actions">
                <GameButton onClick={openResults}>
                  <ExternalLink /> OPEN RESULTS IN NEW TAB
                </GameButton>
                <GameButton className="slido-secondary-action" onClick={() => { setIframeFailed(false); setView('qr'); }}>BACK TO QR</GameButton>
                <GameButton className="slido-secondary-action" onClick={onClose}>CLOSE</GameButton>
              </div>
            </div>
          ) : (
            <div className="slido-results-stage">
              <div className="slido-results-frame">
                <iframe
                  src={SLIDO_PRESENT_URL}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="clipboard-write; fullscreen"
                  title="Slido Live Results"
                  style={{ width: '100%', height: '100%', minHeight: '560px', border: 0 }}
                  onError={() => setIframeFailed(true)}
                />
              </div>
              <div className="slido-stage-actions slido-results-actions">
                <GameButton className="slido-secondary-action" onClick={() => { setIframeFailed(false); setView('qr'); }}>BACK TO QR</GameButton>
                <GameButton className="slido-results-button" onClick={openResults}><ExternalLink /> OPEN RESULTS IN NEW TAB</GameButton>
                <GameButton className="slido-secondary-action" onClick={onClose}>CLOSE</GameButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
