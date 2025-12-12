import { save } from '@tauri-apps/plugin-dialog';

/**
 * 选择文件保存位置
 * @param options 配置项 (默认文件名、过滤器等)
 * @returns 返回选择的路径，取消则返回 null
 */
export const selectSaveLocation = async (options?: {
  defaultPath?: string;
  title?: string;
  filters?: { name: string; extensions: string[] }[];
}): Promise<string | null> => {
  try {
    const filePath = await save({
      defaultPath: options?.defaultPath,
      title: options?.title || '选择保存位置',
      filters: options?.filters
    });
    return filePath;
  } catch (error) {
    console.error('Select save location failed:', error);
    return null;
  }
};
