export const ITEMS1 = ['💀', '👻', '🚀', '👽', '🌎', '🌟', '🤖', '💩', '🐶', '🍿'];
export const ITEMS = [`/logos/cc.png`, `/logos/hy.png`, `/logos/ig.png`, `/logos/il.png`, `/logos/iy.png`, `/logos/rr.png`, `/logos/sp1.png`, `/logos/ss.png`, `/logos/sw.png`, `/logos/iss.png`];
export const CARDS = [...ITEMS, ...ITEMS];

export const WAIT_TIMEOUT = 500;
export const INIT_REVEAL_TIMEOUT = 1500;

export const MATCHING_CARDS = 2;

export const GAME_ACTIONS = {
  REVEAL: 'REVEAL',
  HIDE_REVEALED: 'HIDE_REVEALED',
  FIND: 'FIND',
  RESET: 'RESET',
  REVEAL_RANDOM: 'REVEAL_RANDOM',
  GAME_SCORE_1:"GAME_SCORE_1"
} as const;
