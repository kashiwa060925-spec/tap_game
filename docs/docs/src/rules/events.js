
export const eventCatalog = {
  onLevelUp: [
    { action: 'recalcDerived' },
    { action: 'toast', args: { text: 'レベルアップ！' } },
  ],
  onBattleWin: [
    { action: 'gainExp' },
    { action: 'gainGold' },
    { action: 'spawnNextEnemy' },
  ],
};
