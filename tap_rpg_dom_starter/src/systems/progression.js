
import { formulas } from '../rules/formulas.js';

export function addExp(state, amount){
  state.player.exp += amount;
  const need = formulas.expToNext(state.player.level);
  if(state.player.exp >= need){
    state.player.exp -= need;
    state.player.level += 1;
    // ステ振り：簡易に基礎値を伸ばす
    state.player.base.hp += 6;
    state.player.base.atk += 2;
    state.player.base.def += 1;
    return true; // leveled
  }
  return false;
}
