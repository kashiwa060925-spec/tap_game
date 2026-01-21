
const KEY = 'taprpg_save_v1';
export const storage = {
  save(data){ try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e){} },
  load(){ try { const s = localStorage.getItem(KEY); return s ? JSON.parse(s) : null; } catch(e){ return null; } },
  clear(){ try { localStorage.removeItem(KEY); } catch(e){} },
};
