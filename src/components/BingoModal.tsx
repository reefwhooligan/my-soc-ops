interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{background: 'rgba(0,0,0,0.85)'}}>
      <div className="glass rounded-xl p-6 max-w-xs w-full text-center shadow-xl animate-[bounce_0.5s_ease-out]">
        <div className="text-5xl mb-4 neon-glow" style={{color: 'var(--color-bingo)'}}>f389</div>
        <h2 className="text-3xl font-bold neon-glow mb-2" style={{color: 'var(--color-bingo)', fontFamily: 'var(--font-cyber)'}}>BINGO!</h2>
        <p className="mb-6" style={{color: 'var(--color-accent-light)'}}>You completed a line!</p>

        <button
          onClick={onDismiss}
          className="w-full py-3 px-6 rounded-lg font-bold neon-glow transition-colors"
          style={{
            background: 'linear-gradient(90deg, #00ffe7 0%, #ff00ea 100%)',
            color: '#0f1021',
            boxShadow: '0 0 16px 2px #00ffe7, 0 0 32px 4px #ff00ea',
            border: '2px solid var(--color-accent-light)'
          }}
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
