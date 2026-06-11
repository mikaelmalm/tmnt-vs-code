# TMNT Theme for VS Code 🐢

A family of 5 VS Code color themes that blend the Dracula theme's structure and contrast rhythm with Teenage Mutant Ninja Turtles aesthetics. 

Dracula's base is preserved—only keywords and identifiers change color per theme.

---

## 🎨 Theme Flavors & Color Palette

### 🟢 Shared Base (All 5 Themes)
- **Background**: `#282a36` (Dracula base)
- **Current Line / Selection**: `#44475a`
- **Foreground**: `#f8f8f2`
- **Comment**: `#6272a4`
- **Strings**: `#f1fa8c`
- **Errors**: `#ff7a7a` (Softer Red)

---

### 🟠 TMNT (Base) & Michelangelo
> *Cowabunga! Mikey is pure pizza energy.*
- **Keywords** (`const`, `function`, `import`, `class`): `#e8a87c` (Pizza Orange)
- **Identifiers** (Function names, Types, Classes): `#69cf8e` (Turtle Green)

---

### 🔵 Leonardo
> *Lead the team with cool-headed mint.*
- **Keywords** (`const`, `function`, `import`, `class`): `#6fb3e0` (Blue Bandana)
- **Identifiers** (Function names, Types, Classes): `#a8e6c0` (Light Mint)

---

### 🔴 Raphael
> *Cool, but rude. Bold crimson highlights.*
- **Keywords** (`const`, `function`, `import`, `class`): `#e06c75` (Red Bandana)
- **Identifiers** (Function names, Types, Classes): `#69cf8e` (Turtle Green)

---

### 🟣 Donatello
> *He does machines. Tech-focused purple.*
- **Keywords** (`const`, `function`, `import`, `class`): `#c792ea` (Purple Bandana)
- **Identifiers** (Function names, Types, Classes): `#69cf8e` (Turtle Green)

---

## 🛠️ Development & Building

If you want to modify the theme templates or build the extension from source, follow these steps:

### 1. Install Dependencies
This project uses **Bun** for package management:
```bash
bun install
```

### 2. Build the Theme Files
Generate the 5 VS Code theme JSON files from the `src/dracula.yml` template:
```bash
bun run build
```
This output is written to the `./theme/` directory.

### 3. Package the Extension
To package the extension into a shareable `.vsix` file:
```bash
bun run package --no-dependencies
```
The packaged file will be generated at `./bin/tmnt.vsix`.

---

## 🚀 Installation

1. In VS Code, open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
2. Select **Extensions: Install from VSIX...**.
3. Locate and select the compiled `./bin/tmnt.vsix` file.
4. Open the Command Palette again, choose **Preferences: Color Theme**, and select your preferred turtle flavor!

## 📜 License

[MIT License](./LICENSE)