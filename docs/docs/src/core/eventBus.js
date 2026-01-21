
export class EventBus {
  constructor(){ this.map = new Map(); }
  on(type, fn){
    const arr = this.map.get(type); if(arr) arr.push(fn); else this.map.set(type, [fn]);
    return () => this.off(type, fn);
  }
  off(type, fn){
    const arr = this.map.get(type) || []; const i = arr.indexOf(fn); if(i>=0) arr.splice(i,1);
  }
  emit(type, payload){ (this.map.get(type) || []).forEach(fn => fn(payload)); }
}
