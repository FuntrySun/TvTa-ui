import { Command } from '@tauri-apps/plugin-shell';
import { platform } from '@tauri-apps/plugin-os';

/**
 * 设置系统音量
 * @param value 0-100
 */
export const setSystemVolume = async (value: number) => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'macos') {
      await Command.create('osascript', ['-e', `set volume output volume ${value}`]).execute();
    }
    // Windows 需要 nircmd 或复杂的 PowerShell 脚本
  } catch (error) {
    console.error('Set volume failed:', error);
  }
};

/**
 * 设置静音状态
 * @param mute true 静音, false 取消静音
 */
export const setMute = async (mute: boolean) => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'macos') {
      const state = mute ? 'true' : 'false';
      await Command.create('osascript', ['-e', `set volume output muted ${state}`]).execute();
    }
  } catch (error) {
    console.error('Set mute failed:', error);
  }
};
