use tauri::{
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIconBuilder, TrayIconEvent},
    Manager, PhysicalPosition, WindowEvent,
};

fn posicionar_en_esquina(window: &tauri::WebviewWindow) {
    if let Ok(Some(monitor)) = window.current_monitor() {
        let size = window.outer_size().unwrap_or_default();
        let monitor_size = monitor.size();
        
        let x = monitor_size.width as i32 - size.width as i32 - 12;
        let y = monitor_size.height as i32 - size.height as i32 - 50;

        let _ = window.set_position(PhysicalPosition::new(x, y));
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let quit_i = MenuItem::with_id(app, "quit", "Salir", true, None::<&str>)?;
            let show_i = MenuItem::with_id(app, "show", "Abrir App", true, None::<&str>)?;
            let menu = Menu::with_items(app, &[&show_i, &quit_i])?;

            TrayIconBuilder::new()
                .icon(app.default_window_icon().unwrap().clone())
                .menu(&menu)
                .on_tray_icon_event(|tray, event| {
                    if let TrayIconEvent::Click {
                        button: MouseButton::Left,
                        button_state: MouseButtonState::Up,
                        ..
                    } = event
                    {
                        let app = tray.app_handle();
                        if let Some(window) = app.get_webview_window("main") {
                            posicionar_en_esquina(&window);
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                })
                .on_menu_event(|app, event| match event.id.as_ref() {
                    "show" => {
                        if let Some(window) = app.get_webview_window("main") {
                            posicionar_en_esquina(&window);
                            let _ = window.show();
                            let _ = window.set_focus();
                        }
                    }
                    "quit" => {
                        app.exit(0);
                    }
                    _ => {}
                })
                .build(app)?;

            Ok(())
        })
        .on_window_event(|window, event| match event {
            // Solo se oculta cuando presionas la X o el botón de cerrar
            WindowEvent::CloseRequested { api, .. } => {
                api.prevent_close();
                window.hide().unwrap();
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("Error al ejecutar la aplicación de Tauri");
}