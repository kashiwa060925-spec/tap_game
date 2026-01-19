'use strict';
const SAVE_KEY = 'simple_tap_v1';
const $ = (s)=>document.querySelector(s);
const scoreEl = $('#score');
const tapBtn   = $('#tapBtn');
const saveBtn  = $('#saveBtn');
const resetBtn = $('#resetBtn');
const statusEl = $('#status');

const state = { score: 0 };

function render(){ scoreEl.textContent = String(Math.floor(state.score)); }
function setStatus(t){ statusEl.textContent = t; }

function load(){
  try{
    const raw = localStorage.getItem(SAVE_KEY);
    if(!raw) return;
    const o = JSON.parse(raw);
    state.score = o.score||0;
  }catch(_){/*ignore*/}
}

function save(msg=false){
  try{
    localStorage.setItem(SAVE_KEY, JSON.stringify({score:state.score}));
    if(msg) setStatus('保存しました');
  }catch(_){ setStatus('保存失敗'); }
}

// Events
if(tapBtn) tapBtn.addEventListener('click', ()=>{ state.score += 1; render(); });
if(saveBtn) saveBtn.addEventListener('click', ()=> save(true));
if(resetBtn) resetBtn.addEventListener('click', ()=>{
  if(!confirm('リセットしますか？')) return;
  state.score = 0; save(true); render();
});

// Boot
load();
render();
setStatus('READY');
