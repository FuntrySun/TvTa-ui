import { Command } from '@tauri-apps/plugin-shell';
import { platform } from '@tauri-apps/plugin-os';

/**
 * 打开蓝牙设置面板 (推荐)
 * @description
 * macOS: 打开系统设置蓝牙面板
 * Windows: 打开 ms-settings:bluetooth
 */
export const openBluetoothSettings = async () => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'windows') {
      await Command.create('powershell', ['start', 'ms-settings:bluetooth']).execute();
    } else if (osPlatform === 'macos') {
      await Command.create('open', ['/System/Library/PreferencePanes/Bluetooth.prefPane']).execute();
    }
  } catch (error) {
    console.error('Open Bluetooth settings failed:', error);
    throw error;
  }
};

/**
 * 设置蓝牙状态 (实验性)
 * @description 
 * macOS: 尝试使用 blueutil (需用户自行安装 brew install blueutil)
 * Windows: 尝试使用 PowerShell (通常需要特殊权限或模块)
 * @deprecated 建议使用 openBluetoothSettings
 */
export const setBluetoothState = async (enable: boolean) => {
  // 仅作为占位，实际很难通过原生命令通用控制
  console.warn('setBluetoothState is experimental and requires external tools (like blueutil on macOS).');
  const osPlatform = await platform();
  if (osPlatform === 'macos') {
     // 示例：如果安装了 blueutil
     // await Command.create('blueutil', ['-p', enable ? '1' : '0']).execute();
  }
};
