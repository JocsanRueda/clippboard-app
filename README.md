# Tau Clipboard Manager

**Tau** is a powerful, modern, and lightweight clipboard manager designed specifically for Linux. Built with **Tauri**, **React**, and **TypeScript**, it offers a seamless experience for managing your clipboard history, supporting various media types and extensive customization options.

## 🚀 Features

### 📋 Comprehensive Clipboard History
- **Multi-format Support**: Automatically captures and stores:
  - **Text**: Plain text with quick edit capabilities.
  - **Images**: View thumbnails and copy images back to clipboard.
  - **Audio & Video**: Preview media files directly within the app.
  - **Documents**: Keep track of file paths.
- **Search**: Instantly find items in your history with a built-in search bar.
- **Pinning**: Pin important items to prevent them from being deleted or cleared.
- **Sorting**: Order items by ascending or descending date.
- **Quick Actions**: Copy, edit, or delete items with a single click.

### 🎨 Customization & Themes
- **Theming Engine**: Choose from pre-installed themes or **create your own**.
  - Customize primary, secondary, and tertiary colors.
  - Adjust border widths and colors.
  - Set font sizes.
- **UI Tweaks**: Toggle rounded window corners for a distinct look.
- **Dark/Light Mode**: Fully supports system preferences or manual toggling.

### ⚙️ Advanced Settings
- **History Limits**: Set a maximum number of items to keep (e.g., 10, 50, 100, or unlimited).
- **Expiration**: Configure auto-deletion of items after a specific time (e.g., 1 hour, 24 hours).
- **Global Shortcuts**: Customizable keyboard shortcut (default `Ctrl+H`) to toggle the window visibility instantly from anywhere.
- **Localization**: Available in **English** and **Spanish**.

### 🐧 Linux Optimized
- **Tray Icon**: Runs quietly in the background.
- **Performance**: Built with Rust (Tauri) for minimal resource usage compared to Electron apps.

## 🛠️ Technologies Used

- **Core**: Tauri (Rust)
- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Icons**: React Icons

## 📦 Installation

### Prerequisites

Ensure you have the following dependencies installed on your Linux system (Ubuntu/Debian example):

```bash
sudo apt-get update
sudo apt-get install -y libgtk-3-dev libwebkit2gtk-4.1-dev libappindicator3-dev librsvg2-dev patchelf libsoup-3.0-dev javascriptcoregtk-4.1-dev
```

You also need **Node.js** (v18+) and **Rust** installed.

### Building from Source

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/tau-clipboard.git
    cd tau-clipboard
    ```

2.  **Install frontend dependencies:**
    ```bash
    pnpm install
    # or
    npm install
    ```

3.  **Run in development mode:**
    ```bash
    pnpm tauri dev
    # or
    npm run tauri dev
    ```

4.  **Build for production:**
    ```bash
    pnpm tauri build
    ```
    The output `.deb` or `.AppImage` will be in `src-tauri/target/release/bundle/`.

## ⌨️ Usage

1.  **Launch Tau**: The app will start in the background.
2.  **Open History**: Press the global shortcut (default `Ctrl+H`) or click the tray icon.
3.  **Copy Item**: Click on any item in the list to copy it back to your system clipboard.
4.  **Edit Item**: Click the edit icon on text items to modify content directly.
5.  **Manage**: Use the settings menu to configure themes, shortcuts, and data retention policies.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License.
