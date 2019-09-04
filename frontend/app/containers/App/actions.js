import {
  OPEN_GLOBAL_DIALOG,
  CLOSE_GLOBAL_DIALOG
} from './constants';

export function openGlobalDialog(config) {
  return {
    type: OPEN_GLOBAL_DIALOG,
    config,
  };
}

export function closeGlobalDialog() {
  return {
    type: CLOSE_GLOBAL_DIALOG,
  };
}
