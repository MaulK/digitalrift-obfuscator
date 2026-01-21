# Digital Rift - Luau Script Obfuscator

<div align="center">

![Digital Rift Logo](https://img.shields.io/badge/Digital-Rift-00d9ff?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMiAyMkgyMkwxMiAyWiIgZmlsbD0iIzAwZDlmZiIvPgo8L3N2Zz4=)

**Advanced Luau Script Obfuscation with Immersive Dimensional Effects**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0-blue.svg)](https://github.com/yourusername/mido-obfuscator)
[![Status](https://img.shields.io/badge/status-production-green.svg)](https://github.com/yourusername/mido-obfuscator)

[Live Demo](#) • [Documentation](docs/DEPLOYMENT.md) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 🌌 Overview

**Digital Rift** is a cutting-edge Luau script obfuscator designed for Roblox developers who want to protect their code with military-grade obfuscation techniques. Built with stunning visual effects and a modern UI, it combines powerful security features with an immersive user experience.

### ✨ Key Features

- **🔐 Advanced Obfuscation** - Multiple layers of protection including string encryption, variable renaming, control flow obfuscation
- **⚡ Real-time Processing** - Fast obfuscation with live feedback and statistics
- **🎨 Stunning UI** - Immersive dimensional rift effects with particle systems and smooth animations
- **🛡️ Security Options** - Anti-VM detection, dead code injection, constant wrapping
- **📋 Easy Export** - Copy to clipboard or download obfuscated code
- **🎯 Single-line Output** - Produces compact, minified code without line breaks

---

## 🚀 Quick Start

### Option 1: Direct Usage (No Installation Required)

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mido-obfuscator.git
   cd mido-obfuscator
   ```

2. **Open in browser**
   ```bash
   open index.html
   # Or double-click index.html
   ```

3. **Start obfuscating!**
   - Paste your Luau script in the input panel
   - Configure obfuscation settings
   - Click "OBFUSCATE"
   - Copy or download the result

### Option 2: Deploy Online

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed hosting instructions on:
- GitHub Pages
- Netlify
- Vercel
- Other static hosting services

---

## 🎮 Usage

### Basic Workflow

1. **Input Your Script**
   - Paste your Luau code into the left panel
   - Or click "Load Sample" to see an example

2. **Configure Settings**
   - **Rename Variables** - Obfuscate variable and function names
   - **Encrypt Strings** - Encode strings with XOR + Base64
   - **Control Flow** - Add state machine protection
   - **Dead Code Injection** - Insert junk code (increases size)
   - **Wrap Constants** - Obfuscate numeric constants
   - **Anti-VM Detection** - Add runtime environment checks

3. **Obfuscate**
   - Click the central "OBFUSCATE" button
   - Watch the dimensional rift animation
   - View results in the right panel

4. **Export**
   - Click "Copy" to copy to clipboard
   - Click "Download" to save as `.lua` file

### Example

**Before:**
```lua
local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function greet(name)
    print("Hello, " .. name)
end

greet(player.Name)
```

**After:** (minified single line)
```lua
--[[ Digital Rift Obfuscator v2.0 - Maximum Protection ]]return(function(...)local _S={{"\110\145\154\154\157\054\040",27}}local function IY4x3L7(IIvQ2)local onLNr=_S[IIvQ2]if not onLNr then return""end local _bzqhXb=""local _AAhG06=onLNr[1]for IIvQ2=1,#_AAhG06,4 do local _c=0 for _j=0,3 do if IIvQ2+_j<=#_AAhG06 then local c=string.byte(_AAhG06,IIvQ2+_j)_c=_c*8+(c-48)end end _bzqhXb=_bzqhXb..string.char(_c)end local _k=onLNr[2]local _r=""for IIvQ2=1,#_bzqhXb do _r=_r..string.char(bit32.bxor(string.byte(_bzqhXb,IIvQ2),_k))end return _r end...
```

---

## 📁 Project Structure

```
mido-obfuscator/
├── index.html              # Main HTML file
├── README.md               # This file
├── LICENSE                 # MIT License
├── .gitignore              # Git ignore rules
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   ├── core/
│   │   │   ├── obfuscator.js   # Obfuscation engine
│   │   │   └── utils.js        # Utility functions
│   │   └── ui/
│   │       ├── app.js          # Main application logic
│   │       ├── animations.js   # Visual effects
│   │       └── particles.js    # Particle system
│   └── images/             # Assets (logos, icons)
└── docs/
    └── DEPLOYMENT.md       # Deployment guide
```

---

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Advanced animations and effects
- **Vanilla JavaScript** - No framework dependencies
- **Canvas API** - Particle effects and animations
- **Web APIs** - Clipboard, File Download

---

## 🔒 Security Features

### Obfuscation Techniques

1. **String Encryption**
   - XOR cipher with random keys
   - Octal escape encoding
   - Double-layer encoding

2. **Variable Renaming**
   - Cryptic variable names
   - Pattern-based obfuscation
   - Function name mangling

3. **Control Flow Obfuscation**
   - State machine wrapper
   - Opaque predicates (always true/false conditions)
   - Conditional execution paths

4. **Dead Code Injection**
   - Unreachable code insertion
   - Fake function declarations
   - Junk variables and operations

5. **Constant Wrapping**
   - Mathematical expression obfuscation
   - Bitwise operation encoding

6. **Anti-VM Detection**
   - Runtime environment checks
   - Timing analysis protection
   - CoreGui detection

---

## ⚠️ Responsible Use

This tool is designed for **legitimate code protection purposes only**. Please use it responsibly:

- ✅ Protect proprietary game logic
- ✅ Secure intellectual property
- ✅ Prevent unauthorized code modification
- ❌ Do not use for malicious purposes
- ❌ Do not obfuscate malware or exploits
- ❌ Respect platform terms of service

---

## 📊 Performance

- **Obfuscation Speed**: ~10-50ms for typical scripts
- **Output Size**: 2-5x original size (depending on settings)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **No Dependencies**: Pure vanilla JavaScript

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- Inspired by modern obfuscation techniques and dimensional aesthetics
- Built with passion for the Roblox development community
- Special thanks to all contributors and users

---

## 📬 Contact

Project Link: [https://github.com/yourusername/mido-obfuscator](https://github.com/yourusername/mido-obfuscator)

---

<div align="center">

**Made with ⚡ by the Digital Rift Team**

[⬆ Back to Top](#digital-rift---luau-script-obfuscator)

</div>
