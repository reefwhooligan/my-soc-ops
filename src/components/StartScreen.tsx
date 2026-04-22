import { useState } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

interface QuizOption {
  id: string;
  emoji: string;
  label: string;
  desc: string;
  result: string;
  flavor: string;
  color: string;
}

const QUIZ_OPTIONS: QuizOption[] = [
  {
    id: 'a',
    emoji: '🎯',
    label: 'The Connector',
    desc: "I know everyone's name before the event ends",
    result: 'BINGO MAGNET',
    flavor: "You radiate energy. This board doesn't stand a chance.",
    color: '#00ffe7',
  },
  {
    id: 'b',
    emoji: '🦋',
    label: 'The Butterfly',
    desc: 'I drift from conversation to conversation',
    result: 'CARD FILLER',
    flavor: "Every square is a story. You've got stories for days.",
    color: '#ff00ea',
  },
  {
    id: 'c',
    emoji: '🔍',
    label: 'The Observer',
    desc: 'I scope the room before making my move',
    result: 'STRATEGIC PLAYER',
    flavor: 'Calculated. Precise. BINGO is inevitable.',
    color: '#00b3ff',
  },
  {
    id: 'd',
    emoji: '🍕',
    label: 'The Snack Scout',
    desc: 'Lead me to the snacks first, people second',
    result: 'WILDCARD',
    flavor: 'Unpredictable. Chaotic. Absolutely iconic.',
    color: '#fffb00',
  },
];

export function StartScreen({ onStart }: StartScreenProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<'quiz' | 'result'>('quiz');
  const [playHovered, setPlayHovered] = useState(false);

  function handleSelect(id: string) {
    if (selected) return;
    setSelected(id);
    setTimeout(() => setPhase('result'), 750);
  }

  const option = QUIZ_OPTIONS.find((o) => o.id === selected);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-full p-6"
      style={{ background: 'none' }}
    >
      {/* Header */}
      <div
        className="text-center mb-6"
        style={{ animation: 'fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <h1
          className="text-4xl font-bold neon-glow quiz-title-flicker mb-1"
          style={{ fontFamily: 'var(--font-cyber)', color: 'var(--color-accent)' }}
        >
          BINGO MIXER
        </h1>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--color-marked)', letterSpacing: '0.3em' }}
        >
          Icebreaker Edition
        </p>
      </div>

      {phase === 'quiz' ? (
        <div
          className="w-full max-w-sm"
          style={{ animation: 'fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both' }}
        >
          {/* Question card */}
          <div
            className="rounded-xl p-5 mb-4 relative overflow-hidden"
            style={{
              background: 'rgba(25, 26, 46, 0.85)',
              border: '1.5px solid var(--color-accent)',
              boxShadow: '0 0 20px 2px rgba(0,255,231,0.25)',
            }}
          >
            {/* Scanline decoration */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background:
                  'linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)',
                opacity: 0.4,
                animation: 'scanPulse 3s linear infinite',
                pointerEvents: 'none',
              }}
            />
            <p
              className="text-xs uppercase mb-2"
              style={{
                color: 'rgba(0,179,255,0.7)',
                fontFamily: 'var(--font-cyber)',
                letterSpacing: '0.25em',
              }}
            >
              // identify yourself
            </p>
            <h2
              className="text-lg font-bold mb-1"
              style={{ color: 'var(--color-bingo)', fontFamily: 'var(--font-cyber)' }}
            >
              What kind of mixer are you?
            </h2>
            <p className="text-xs" style={{ color: 'rgba(0,255,231,0.45)' }}>
              Pick your type — no judgment here
            </p>
          </div>

          {/* Options */}
          <div className="space-y-2">
            {QUIZ_OPTIONS.map((opt, index) => {
              const isSelected = selected === opt.id;
              const isDimmed = selected !== null && !isSelected;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  disabled={!!selected}
                  className="quiz-option w-full text-left rounded-lg p-3 flex items-center gap-3"
                  style={{
                    animationDelay: `${0.15 + index * 0.12}s`,
                    background: isSelected
                      ? `linear-gradient(90deg, ${opt.color}26 0%, ${opt.color}0d 100%)`
                      : 'rgba(25, 26, 46, 0.75)',
                    border: `1.5px solid ${isSelected ? opt.color : 'rgba(0,179,255,0.25)'}`,
                    boxShadow: isSelected
                      ? `0 0 14px 3px ${opt.color}55, inset 0 0 18px ${opt.color}18`
                      : 'none',
                    opacity: isDimmed ? 0.28 : 1,
                    transform: isSelected ? 'scale(1.025)' : 'scale(1)',
                    transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                    cursor: selected ? 'default' : 'pointer',
                  }}
                >
                  <span className="text-2xl select-none">{opt.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-bold text-sm"
                      style={{
                        color: isSelected ? opt.color : 'var(--color-accent)',
                        fontFamily: 'var(--font-cyber)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {opt.label}
                    </div>
                    <div
                      className="text-xs truncate"
                      style={{ color: 'rgba(0,255,231,0.5)' }}
                    >
                      {opt.desc}
                    </div>
                  </div>
                  {isSelected && (
                    <span
                      className="text-base ml-auto flex-shrink-0"
                      style={{ color: opt.color }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        option && (
          <div
            className="w-full max-w-sm text-center"
            style={{ animation: 'resultReveal 0.6s cubic-bezier(0.22,1,0.36,1) both' }}
          >
            {/* Result card */}
            <div
              className="rounded-xl p-6 mb-5 relative overflow-hidden"
              style={{
                background: 'rgba(25, 26, 46, 0.9)',
                border: `1.5px solid ${option.color}`,
                boxShadow: `0 0 32px 6px ${option.color}44`,
              }}
            >
              {/* Glow behind emoji */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${option.color}28 0%, transparent 70%)`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                }}
              />
              <div className="text-5xl mb-3 relative">{option.emoji}</div>
              <p
                className="text-xs uppercase mb-1"
                style={{
                  color: 'rgba(0,179,255,0.6)',
                  fontFamily: 'var(--font-cyber)',
                  letterSpacing: '0.25em',
                }}
              >
                // type identified
              </p>
              <h2
                className="text-2xl font-bold mb-2 neon-glow"
                style={{ color: option.color, fontFamily: 'var(--font-cyber)' }}
              >
                {option.result}
              </h2>
              <p className="text-sm" style={{ color: 'var(--color-accent-light)' }}>
                {option.flavor}
              </p>
            </div>

            <p
              className="text-xs mb-5"
              style={{ color: 'rgba(0,255,231,0.5)', letterSpacing: '0.05em' }}
            >
              Your bingo card is ready. Go find your people.
            </p>

            <button
              onClick={onStart}
              onMouseEnter={() => setPlayHovered(true)}
              onMouseLeave={() => setPlayHovered(false)}
              className="w-full py-4 px-8 rounded-lg text-lg font-bold neon-glow"
              style={{
                background: `linear-gradient(90deg, ${option.color} 0%, #ff00ea 100%)`,
                color: '#0f1021',
                boxShadow: `0 0 16px 3px ${option.color}, 0 0 36px 6px #ff00ea55`,
                border: `2px solid ${option.color}`,
                fontFamily: 'var(--font-cyber)',
                letterSpacing: '0.12em',
                transition: 'transform 0.15s ease',
                transform: playHovered ? 'scale(1.03)' : 'scale(1)',
              }}
            >
              LET'S PLAY →
            </button>
          </div>
        )
      )}
    </div>
  );
}
