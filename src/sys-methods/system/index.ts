import { Command } from '@tauri-apps/plugin-shell';
import { platform } from '@tauri-apps/plugin-os';

/**
 * 获取 MAC 地址 (简单实现)
 */
export const getMacAddress = async (): Promise<string> => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'macos') {
      const output = await Command.create('networksetup', ['-getmacaddress', 'en0']).execute();
      // Output format: "Ethernet Address: xx:xx:xx:xx:xx:xx (Device: en0)"
      const match = output.stdout.match(/([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})/);
      return match ? match[0] : '';
    } else if (osPlatform === 'windows') {
      const output = await Command.create('getmac', []).execute();
      // 解析 getmac 输出
      return output.stdout; 
    }
    return '';
  } catch (error) {
    return '';
  }
};
