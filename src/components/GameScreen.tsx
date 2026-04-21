import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full" style={{background: 'linear-gradient(135deg, #0f1021 60%, #191a2e 100%)'}}>
      {/* Header */}
      <header className="flex items-center justify-between p-3 glass">
        <button
          onClick={onReset}
          className="text-sm px-3 py-1.5 rounded neon-glow"
          style={{color: 'var(--color-accent-light)', border: '1.5px solid var(--color-accent-light)', background: 'rgba(0,0,0,0.2)'}}>
          ← Back
        </button>
        <h1 className="font-bold neon-glow" style={{fontFamily: 'var(--font-cyber)', color: 'var(--color-accent)'}}>Bingo Mixer</h1>
        <div className="w-16"></div>
      </header>

      {/* Instructions */}
      <p className="text-center text-sm py-2 px-4 neon-glow" style={{color: 'var(--color-accent-light)'}}>
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo indicator */}
      {hasBingo && (
        <div className="text-center py-2 font-semibold text-sm neon-glow" style={{color: 'var(--color-bingo)', background: 'rgba(255,255,0,0.08)'}}>
          🎉 BINGO! You got a line!
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
