
export const baseStats = { hp: 40, atk: 8, def: 4, agi: 5, luck: 2 };
export function computeDerived(base){
  return {
    maxHp: Math.round(base.hp),
    critRate: Math.min(0.5, 0.05 + base.luck * 0.01),
    dodge: Math.min(0.35, base.agi * 0.02),
  };
}
