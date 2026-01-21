
export const formulas = {
  damage({ atk, def }){
    const raw = atk * 1.2 - def * 0.7; return Math.max(1, Math.round(raw));
  },
  expToNext(level){ return 10 + level * level * 2; },
};
