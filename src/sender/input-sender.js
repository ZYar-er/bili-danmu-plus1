import { CONFIG, CHAT_INPUT_SELECTORS, SEND_BUTTON_SELECTORS } from '../config.js';
import { state } from '../state.js';
import { getScope } from '../core/env-detector.js';
import { firstMatch } from '../utils.js';
import { setDbg } from '../ui/debug-panel.js';
import { canSend, sendSpecialEmoji } from '../special-emoji.js';

function setNativeValue(el, value) {
  var proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  var desc = Object.getOwnPropertyDescriptor(proto, 'value');
  if (desc && desc.set) desc.set.call(el, value);
  else el.value = value;
  el.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertText' }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

// 精准 → 宽泛 降级链（新版 UI 选择器在前，旧版在后）
function findInput() {
  var scope = getScope();
  return firstMatch(scope, CHAT_INPUT_SELECTORS) || firstMatch(document, CHAT_INPUT_SELECTORS);
}

// 发送按钮只在输入框自己的容器里找，避免全屏输入框配侧栏按钮的错配
function findSendBtn(input) {
  var container = input.closest('.chat-input-ctnr')
    || input.closest('#fullscreen-danmaku-vm')
    || input.closest('.fullscreen-danmaku-container');
  if (!container) return null;
  var btn = firstMatch(container, SEND_BUTTON_SELECTORS);
  if (btn) return btn;
  // 容器内文案匹配兜底（旧版按钮文案「发送」）
  var btns = container.querySelectorAll('button');
  for (var i = 0; i < btns.length; i++) {
    var text = (btns[i].textContent || '').trim();
    if (/^发送/.test(text)) return btns[i];
  }
  return null;
}

function clickSendBtn(btn) {
  // 新版 UI：按钮是 div.send-btn-wrapper，真正可点的是内部 span.send-btn-icon；
  // 旧版 UI：wrapper 里是 button.send-btn。两种都先找内部真正可点的元素。
  var target = btn.querySelector && (
    btn.querySelector('.send-btn-icon')
    || btn.querySelector('button.send-btn')
    || btn.querySelector('.bl-button.send-btn')
    || btn.querySelector('button')
  );
  (target || btn).click();
}

export function sendDanmaku(payload) {
  var text = typeof payload === 'string' ? payload : payload && payload.text;
  var hash = payload && payload.hash;
  var type = payload && payload.type;
  if (type === 'emoji-special' && hash) return sendSpecialEmoji(hash);

  var now = Date.now();
  if (!canSend(now)) { setDbg('lastErr', 'cooldown'); return false; }
  var input = findInput();
  if (!input) { setDbg('lastErr', 'input_not_found'); return false; }
  var finalText = CONFIG.appendPlusOne ? text + ' +1' : text;
  input.focus();
  setNativeValue(input, finalText);
  state.lastSendAt = now;
  var btn = findSendBtn(input);
  if (btn) { clickSendBtn(btn); setDbg('lastErr', ''); }
  else {
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', bubbles: true }));
    setDbg('lastErr', 'send_btn_not_found_use_enter');
  }
  setDbg('lastSend', finalText);
  return true;
}
