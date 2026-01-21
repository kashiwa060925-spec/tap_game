
import { storage } from './storage.js';
import { baseStats, computeDerived } from '../rules/stats.js';

export function newGameState(){
  const player = {
    level: 1,
    exp: 0,
    base: { ...baseStats },
    derived: computeDerived(baseStats),
    gold: 0,
  };
  return {
    version: 1,
    player,
    currentEnemy: null,
    flags: {},
  };
}

export function clone(obj){ return structuredClone ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)); }

export const stateAPI = (bus)=>{
  let state = newGameState();

  function load(){ const s = storage.load(); if(s){ state = s; }
    bus.emit('state:loaded', clone(state)); return clone(state);
  }
  function save(){ storage.save(state); bus.emit('state:saved', clone(state)); }
  function reset(){ state = newGameState(); bus.emit('state:changed', clone(state)); save(); }
  function get(){ return clone(state); }
  function set(mutator){ const draft = clone(state); mutator(draft); state = draft; bus.emit('state:changed', clone(state)); }

  return { load, save, reset, get, set };
};
