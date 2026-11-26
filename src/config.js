// 常量
export const TIMING = {
  CLICK_DEBOUNCE_MS: 320,
  FEEDBACK_MS: 280,
  GHOST_CLEANUP_MS: 30000,
  NO_PLAYER_THRESHOLD: 30,
  LOW_FREQ_POLL_MS: 2000,
  DM_WAIT_POLL_MS: 300,
  DM_SCAN_POLL_MS: 300,
  LEAVE_DELAY_MS: 50,
};

export const UI = {
  HIT_PADDING_PX: 2,
  MARGIN_PX: 8,
  BTN_APPROX_W: 42,
  BTN_APPROX_H: 26,
  Z_INDEX: 2147483647,
  OPACITY_OPTIONS: [0.3, 0.5, 0.7, 0.8, 0.95],
};

export const DM_CONTAINER_SELECTORS = [
  '#live-player .web-player-danmaku .danmaku-item-container',
  '#live-player .danmaku-item-container',
  '.web-player-danmaku .danmaku-item-container',
  '.danmaku-item-container',
  '#live-player .web-player-danmaku',
  '.web-player-danmaku',
  '.live-player-dm-wrap',
];

export const DM_CLASS = 'bili-danmaku-x-dm';
export const DM_NODE_SELECTOR = '.' + DM_CLASS + '[role="comment"]';
// 旧版播放器 / 新版播放器（live-player-mounter、live-player-ctnr），按优先级降级
export const PLAYER_SELECTORS = [
  '#live-player',
  '#live-player-ctnr',
  '.live-player-mounter',
  '.bilibili-live-player-video',
  '.live-player-container',
  '.player-section',
];

// 弹幕输入框：新版 UI 把输入区收进 .chat-main-row，textarea 仍是 .chat-input
export const CHAT_INPUT_SELECTORS = [
  '.chat-main-row .chat-input-ctnr textarea.chat-input',
  '.chat-input-ctnr textarea.chat-input',
  '.chat-input-area textarea.chat-input',
  '#fullscreen-danmaku-vm textarea.chat-input',
  '#fullscreen-danmaku-vm input.chat-input',
  '.chat-input',
];

// 发送按钮：新版 UI 是 div.send-btn-wrapper（内部 span.send-btn-icon），旧版是 button.send-btn
export const SEND_BUTTON_SELECTORS = [
  '.chat-main-row .send-btn-wrapper',
  '.chat-input-ctnr .send-btn-wrapper',
  '.send-btn-wrapper',
  '.chat-input-ctnr button.send-btn',
  '.bl-button.send-btn',
  '#fullscreen-danmaku-vm .send-danmaku',
  '#fullscreen-danmaku-vm .send-btn-wrapper',
  '#fullscreen-danmaku-vm button',
];

// 持久化
export function storageGet(key, def) {
  try { const v = GM_getValue(key); if (v !== void 0) return v; } catch (e) { /* ignore */ }
  try { const v = localStorage.getItem('dm1_' + key); if (v !== null) return JSON.parse(v); } catch (e) { /* ignore */ }
  return def;
}

export function storageSet(key, val) {
  try { GM_setValue(key, val); } catch (e) { /* ignore */ }
  try { localStorage.setItem('dm1_' + key, JSON.stringify(val)); } catch (e) { /* ignore */ }
}

export const CONFIG = {
  enableSendCooldown: storageGet('enableSendCooldown', true),
  cooldownMs: storageGet('cooldownMs', 2000),
  cooldownMsOptions: [0, 300, 600, 1200, 2000, 3000],
  appendPlusOne: false,
  debug: storageGet('debug', false),
  btnOpacity: storageGet('btnOpacity', 0.8),
};
