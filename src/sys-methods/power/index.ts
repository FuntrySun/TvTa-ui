import { Command } from '@tauri-apps/plugin-shell';
import { platform } from '@tauri-apps/plugin-os';

/**
 * 立即关机
 * @description 调用系统 shutdown 命令
 * macOS: shutdown -h now
 * Windows: shutdown /s /t 0
 */
export const shutdown = async () => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'windows') {
      await Command.create('shutdown', ['/s', '/t', '0']).execute();
    } else {
      // macOS / Linux
      await Command.create('shutdown', ['-h', 'now']).execute();
    }
  } catch (error) {
    console.error('Shutdown failed:', error);
    throw error;
  }
};

/**
 * 重启系统
 * @description 调用系统 reboot/shutdown 命令
 */
export const reboot = async () => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'windows') {
      await Command.create('shutdown', ['/r', '/t', '0']).execute();
    } else {
      await Command.create('reboot').execute();
    }
  } catch (error) {
    console.error('Reboot failed:', error);
    throw error;
  }
};

/**
 * 系统睡眠
 * @description
 * macOS: pmset sleepnow
 * Windows: rundll32.exe powrprof.dll,SetSuspendState 0,1,0
 */
export const sleep = async () => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'windows') {
      await Command.create('rundll32', ['powrprof.dll,SetSuspendState', '0,1,0']).execute();
    } else if (osPlatform === 'macos') {
      await Command.create('pmset', ['sleepnow']).execute();
    }
  } catch (error) {
    console.error('Sleep failed:', error);
    throw error;
  }
};

/**
 * 锁定屏幕
 * @description
 * macOS: pmset displaysleepnow (模拟锁屏，或调用 loginwindow)
 * Windows: rundll32.exe user32.dll,LockWorkStation
 */
export const lockScreen = async () => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'windows') {
      await Command.create('rundll32', ['user32.dll,LockWorkStation']).execute();
    } else if (osPlatform === 'macos') {
      // macOS锁屏通常使用 pmset displaysleepnow 或者 AppleScript
      // 这里使用 pmset displaysleepnow 作为近似实现
      await Command.create('pmset', ['displaysleepnow']).execute();
    }
  } catch (error) {
    console.error('Lock screen failed:', error);
    throw error;
  }
};
