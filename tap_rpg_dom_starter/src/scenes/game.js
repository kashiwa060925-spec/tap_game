
import { createHUD, renderHUD } from '../ui/hud.js';
import { ensureEnemy, attackEnemy } from '../systems/combat.js';
import { BALANCE } from '../rules/constants.js';
import { addExp } from '../systems/progression.js';

export class GameScene {
  constructor({ bus, scenes, state, data }){ this.bus = bus; this.scenes = scenes; this.state = state; this.data = data; this.ui = {}; }
  enter(root){
    this.root = root;
    const panel = document.createElement('div');
    panel.className = 'panel stack';

    this.hud = createHUD();

    const enemyBox = document.createElement('div');
    enemyBox.className = 'enemy';
    enemyBox.innerHTML = `
      <div class="row" style="justify-content:space-between;">
        <div id="enemy-name">-</div>
        <div id="enemy-hp" class="small">HP</div>
      </div>
      <div class="bar"><span id="enemy-bar" style="width:100%"></span></div>
    `;

    const controls = document.createElement('div');
    controls.className = 'row';
    controls.innerHTML = `
      <button class="btn" id="attack">こうげき</button>
      <button class="btn secondary" id="save">セーブ</button>
      <button class="btn danger" id="reset">はじめから</button>
    `;

    panel.appendChild(this.hud);
    panel.appendChild(enemyBox);
    panel.appendChild(controls);

    this.root.appendChild(panel);

    this.state.set(s=>{ ensureEnemy(s, this.data); s.player.derived = { ...s.player.derived }; });
    this.render();

    controls.querySelector('#attack').addEventListener('click', ()=> this.onAttack());
    controls.querySelector('#save').addEventListener('click', ()=> this.state.save());
    controls.querySelector('#reset').addEventListener('click', ()=> this.state.reset());

    this.unsub = this.bus.on('state:changed', ()=> this.render());
  }
  update(){ /* DOM中心のため、毎フレームは何もしない */ }
  exit(){ this.unsub?.(); }

  onAttack(){
    this.state.set(s=>{
      const res = attackEnemy(s);
      if(res.dmg>0){
        // toastは簡易にconsoleで代替
        console.log(`与ダメ ${res.dmg}${res.crit?' (会心!)':''}`);
      }
      if(res.defeated){
        // 報酬
        s.player.gold += BALANCE.goldPerWin;
        const leveled = addExp(s, BALANCE.expPerWin);
        // 次の敵
        this.data.advanceEncounter();
        const next = this.data.getNextEnemy();
        s.currentEnemy = { ...next, hp: next.hp };
        // レベルアップ時の派生再計算
        if(leveled){
          s.player.derived = {
            maxHp: Math.round(s.player.base.hp),
            critRate: Math.min(0.5, 0.05 + s.player.base.luck * 0.01),
            dodge: Math.min(0.35, s.player.base.agi * 0.02),
          };
        }
      }
    });
  }

  render(){
    const s = this.state.get();
    renderHUD(this.hud, s);
    const e = s.currentEnemy;
    const nameEl = this.root.querySelector('#enemy-name');
    const hpEl = this.root.querySelector('#enemy-hp');
    const bar = this.root.querySelector('#enemy-bar');
    if(e){
      nameEl.textContent = e.name;
      hpEl.textContent = `HP ${e.hp}/${e.maxHp || e.hpMax || e.hp}`;
      const max = e.maxHp || e.hpMax || e.hp; const ratio = Math.max(0, Math.min(1, e.hp / max));
      bar.style.width = `${ratio*100}%`;
    }
  }
}
