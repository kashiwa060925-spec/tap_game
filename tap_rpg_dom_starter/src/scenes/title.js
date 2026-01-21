
export class TitleScene {
  constructor({ bus, scenes, state }){ this.bus = bus; this.scenes = scenes; this.state = state; }
  enter(root){
    const wrap = document.createElement('div');
    wrap.className = 'panel stack';
    wrap.innerHTML = `
      <div class="title">Tap RPG</div>
      <button class="btn" id="start">はじめる</button>
      <button class="btn secondary" id="continue">つづきから</button>
      <div class="footer small">クリック/タップで遊べます</div>
    `;
    root.appendChild(wrap);
    wrap.querySelector('#start').addEventListener('click', ()=>{ this.state.reset(); this.scenes.goto(this.next()); });
    wrap.querySelector('#continue').addEventListener('click', ()=>{ this.state.load(); this.scenes.goto(this.next()); });
  }
  async next(){
    const { GameScene } = await import('./game.js');
    return new GameScene({ bus: this.bus, scenes: this.scenes, state: this.state });
  }
}
