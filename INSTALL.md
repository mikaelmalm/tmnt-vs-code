### TMNT Theme for Visual Studio Code

This extension contributes 5 themes (TMNT Base, Leonardo, Raphael, Michelangelo, and Donatello) that blend Dracula's layout with TMNT accents.

#### Install from VSIX

1. Download the `tmnt.vsix` file.
2. In VS Code, open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
3. Type and select `Extensions: Install from VSIX...`.
4. Select the downloaded `tmnt.vsix` file and install.

#### Install using Git

You can also clone the repository into your extensions directory to install manually:

```bash
git clone https://github.com/malm/tmnt-vs-code.git ~/.vscode/extensions/theme-tmnt
cd ~/.vscode/extensions/theme-tmnt
bun install
bun run build
```

#### Activating Theme

1. Go to `File -> Preferences -> Color Theme` (or `Cmd+K Cmd+T`).
2. Select your preferred turtle flavor (e.g. `TMNT Leonardo`).
