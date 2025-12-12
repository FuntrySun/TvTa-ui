import { Command } from '@tauri-apps/plugin-shell';
import { platform } from '@tauri-apps/plugin-os';

/**
 * 设置 WiFi 开关状态
 * @param enable true 开启, false 关闭
 * @description
 * macOS: networksetup -setairportpower en0 on/off (默认尝试 en0)
 * Windows: netsh interface set interface "Wi-Fi" admin=enabled/disabled
 */
export const setWifiState = async (enable: boolean) => {
  const osPlatform = await platform();
  const state = enable ? 'on' : 'off'; // macOS
  const winState = enable ? 'enabled' : 'disabled'; // Windows

  try {
    if (osPlatform === 'windows') {
      // 注意：接口名称 "Wi-Fi" 可能因系统语言或硬件不同而不同
      await Command.create('netsh', ['interface', 'set', 'interface', 'Wi-Fi', `admin=${winState}`]).execute();
    } else if (osPlatform === 'macos') {
      // 默认尝试 en0 (通常是 WiFi)
      await Command.create('networksetup', ['-setairportpower', 'en0', state]).execute();
    }
  } catch (error) {
    console.error('Set WiFi state failed:', error);
    throw error;
  }
};

/**
 * 获取 WiFi 开关状态 (仅作为示例，实际解析输出较复杂)
 * @returns Promise<boolean>
 */
export const getWifiState = async (): Promise<boolean> => {
  const osPlatform = await platform();
  try {
    if (osPlatform === 'macos') {
      const output = await Command.create('networksetup', ['-getairportpower', 'en0']).execute();
      return output.stdout.includes(': On');
    }
    // Windows获取状态比较复杂，此处省略
    return false;
  } catch (error) {
    return false;
  }
};
