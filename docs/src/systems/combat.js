
import { formulas } from '../rules/formulas.js';
import { BALANCE } from '../rules/constants.js';

export function ensureEnemy(state, data){
  if(state.currentEnemy) return;
  const e = data.getNextEnemy();
  state.currentEnemy = { ...e, hp: e.hp };
}

export function attackEnemy(state){
  const p = state.player; const e = state.currentEnemy; if(!e) return { defeated:false, dmg:0, crit:false };
  const crit = Math.random() < Math.max(BALANCE.baseCrit, p.derived.critRate || 0);
  const base = formulas.damage({ atk: p.base.atk, def: e.def });
  const dmg = Math.round(base * (crit ? BALANCE.critMultiplier : 1));
  e.hp = Math.max(0, e.hp - dmg);
  const defeated = e.hp === 0;
  return { defeated, dmg, crit };
}
