
export class SceneManager {
  constructor(root){ this.root = root; this.current = null; this._last = performance.now(); }
  goto(scene){
    this.current?.exit?.();
    this.current = scene;
    this.root.replaceChildren();
    this.current?.enter?.(this.root);
  }
  start(){
    const loop = (t)=>{
      const dt = Math.min(33, t - this._last); this._last = t;
      this.current?.update?.(dt);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}
