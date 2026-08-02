import { getCurrentWindow } from '@tauri-apps/api/window';
import './App.css';

function App() {
  const cerrarVentana = async () => {
    try {
      const appWindow = getCurrentWindow();
      await appWindow.hide();
    } catch (error) {
      console.error("Error al ocultar la ventana:", error);
    }
  };

  return (
    <div className="window-container">
      <div className="header-bar" data-tauri-drag-region>
        <span className="title" data-tauri-drag-region>Water Project</span>
        <button className="close-button" onClick={cerrarVentana}>
          ✕
        </button>
      </div>
    </div>
  );
}

export default App;