import { getCurrentWindow } from '@tauri-apps/api/window';

export const cerrarVentana = async (): Promise<void> => {
  try {
    const appWindow = getCurrentWindow();
    await appWindow.hide();
  } catch (error) {
    console.error('Error al ocultar la ventana:', error);
  }
};
