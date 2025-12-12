<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMessage, useDialog } from 'naive-ui';
import {
  shutdown,
  reboot,
  sleep,
  lockScreen,
  setWifiState,
  getWifiState,
  openBluetoothSettings,
  setSystemVolume,
  setMute,
  getMacAddress,
  sendSystemNotification,
  setAutoStart,
  isAutoStartEnabled,
  selectSaveLocation,
} from '@/sys-methods';

const message = useMessage();
const dialog = useDialog();

// 状态
const wifiEnabled = ref(false);
const volume = ref(50);
const isMuted = ref(false);
const macAddress = ref('');
const autoStartEnabled = ref(false);
const savePath = ref('');

// 初始化
onMounted(async () => {
  try {
    wifiEnabled.value = await getWifiState();
    macAddress.value = await getMacAddress();
    autoStartEnabled.value = await isAutoStartEnabled();
  } catch (e) {
    console.error('Init failed', e);
  }
});

// 电源管理操作确认
const confirmAction = (action: string, handler: () => Promise<void>) => {
  dialog.warning({
    title: '危险操作确认',
    content: `确定要执行 ${action} 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await handler();
        message.success(`${action} 指令已发送`);
      } catch (error: any) {
        message.error(`执行失败: ${error.message || error}`);
      }
    },
  });
};

// 事件处理
const handleShutdown = () => confirmAction('关机', shutdown);
const handleReboot = () => confirmAction('重启', reboot);
const handleSleep = () => confirmAction('睡眠', sleep);
const handleLockScreen = async () => {
  try {
    await lockScreen();
    message.success('已锁定屏幕');
  } catch (error: any) {
    message.error(`锁定失败: ${error}`);
  }
};

const handleWifiChange = async (value: boolean) => {
  try {
    await setWifiState(value);
    wifiEnabled.value = value;
    message.success(`WiFi 已${value ? '开启' : '关闭'}`);
  } catch (error: any) {
    message.error(`设置 WiFi 失败: ${error}`);
    // 恢复状态
    wifiEnabled.value = !value;
  }
};

const handleBluetooth = async () => {
  try {
    await openBluetoothSettings();
    message.success('已打开蓝牙设置');
  } catch (error: any) {
    message.error(`打开蓝牙设置失败: ${error}`);
  }
};

const handleVolumeChange = async (value: number) => {
  try {
    await setSystemVolume(value);
    volume.value = value;
  } catch (error: any) {
    message.error(`设置音量失败: ${error}`);
  }
};

const handleMuteChange = async (value: boolean) => {
  try {
    await setMute(value);
    isMuted.value = value;
    message.success(value ? '已静音' : '已取消静音');
  } catch (error: any) {
    message.error(`设置静音失败: ${error}`);
  }
};

const handleNotification = async () => {
  try {
    await sendSystemNotification('系统测试', '这是一条来自 Trao UI 的系统通知测试');
    message.success('通知已发送');
  } catch (error: any) {
    message.error(`发送通知失败: ${error}`);
  }
};

const handleAutoStartChange = async (value: boolean) => {
  try {
    await setAutoStart(value);
    autoStartEnabled.value = value;
    message.success(`开机自启已${value ? '开启' : '关闭'}`);
  } catch (error: any) {
    message.error(`设置开机自启失败: ${error}`);
    autoStartEnabled.value = !value;
  }
};

const handleSelectSavePath = async () => {
  const path = await selectSaveLocation();
  if (path) {
    savePath.value = path;
    message.success(`已选择路径: ${path}`);
  }
};
</script>

<template>
  <div class="space-y-6">
    <n-card title="电源与会话管理">
      <div class="flex gap-4 flex-wrap">
        <n-button type="error" @click="handleShutdown">关机</n-button>
        <n-button type="warning" @click="handleReboot">重启</n-button>
        <n-button type="info" @click="handleSleep">睡眠</n-button>
        <n-button type="primary" secondary @click="handleLockScreen">锁定屏幕</n-button>
      </div>
    </n-card>

    <n-grid :cols="2" :x-gap="12" :y-gap="12">
      <n-grid-item>
        <n-card title="网络与连接">
          <n-space vertical>
            <div class="flex items-center justify-between">
              <span>WiFi 开关 (macOS/Win)</span>
              <n-switch :value="wifiEnabled" @update:value="handleWifiChange" />
            </div>
            <div class="flex items-center justify-between">
              <span>蓝牙设置</span>
              <n-button size="small" @click="handleBluetooth">打开面板</n-button>
            </div>
            <div class="flex items-center justify-between">
              <span>MAC 地址</span>
              <n-tag type="success">{{ macAddress || '获取中...' }}</n-tag>
            </div>
          </n-space>
        </n-card>
      </n-grid-item>

      <n-grid-item>
        <n-card title="音量控制 (macOS)">
          <n-space vertical>
            <div class="flex items-center gap-4">
              <span>音量</span>
              <n-slider v-model:value="volume" :step="10" @update:value="handleVolumeChange" />
            </div>
            <div class="flex items-center justify-between mt-2">
              <span>静音</span>
              <n-switch :value="isMuted" @update:value="handleMuteChange" />
            </div>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card title="系统功能">
      <n-space vertical>
        <div class="flex items-center justify-between">
          <span>系统通知</span>
          <n-button type="primary" @click="handleNotification">发送测试通知</n-button>
        </div>
        <n-divider />
        <div class="flex items-center justify-between">
          <span>开机自启</span>
          <n-switch :value="autoStartEnabled" @update:value="handleAutoStartChange" />
        </div>
        <n-divider />
        <div class="flex items-center justify-between">
          <span>文件保存路径</span>
          <div class="flex gap-2 items-center">
            <span class="text-xs text-gray-400 truncate max-w-[200px]">{{ savePath || '未选择' }}</span>
            <n-button size="small" @click="handleSelectSavePath">选择...</n-button>
          </div>
        </div>
      </n-space>
    </n-card>
  </div>
</template>