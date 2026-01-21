
export function createHUD(){
  const root = document.createElement('div');
  root.className = 'hud';
  root.innerHTML = `
    <div class="stat" id="stat-level"></div>
    <div class="stat" id="stat-exp"></div>
    <div class="stat" id="stat-hp"></div>
    <div class="stat" id="stat-gold"></div>
  `;
  return root;
}

export function renderHUD(root, state){
  root.querySelector('#stat-level').textContent = `Lv ${state.player.level}`;
  const need = 10 + state.player.level * state.player.level * 2;
  root.querySelector('#stat-exp').textContent = `EXP ${state.player.exp}/${need}`;
  root.querySelector('#stat-hp').textContent = `HP ${state.player.derived.maxHp}`;
  root.querySelector('#stat-gold').textContent = `G ${state.player.gold}`;
}
