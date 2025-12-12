import { enable, disable, isEnabled } from '@tauri-apps/plugin-autostart';

/**
 * 设置是否开机自启
 * @param enable true 开启, false 关闭
 */
export const setAutoStart = async (enableAutoStart: boolean) => {
  try {
    if (enableAutoStart) {
      await enable();
    } else {
      await disable();
    }
  } catch (error) {
    console.error('Set auto start failed:', error);
    throw error;
  }
};

/**
 * 检查是否已开启开机自启
 */
export const isAutoStartEnabled = async (): Promise<boolean> => {
  try {
    return await isEnabled();
  } catch (error) {
    console.error('Check auto start failed:', error);
    return false;
  }
};
