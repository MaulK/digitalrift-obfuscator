// ==========================================
// DIGITAL RIFT - Luau Obfuscator Engine
// ==========================================

/**
 * Luau Obfuscator
 * Implements multiple obfuscation techniques for Luau/Roblox scripts
 */
class LuauObfuscator {
    constructor(options = {}) {
        this.options = {
            renameVariables: options.renameVariables !== false,
            encryptStrings: options.encryptStrings !== false,
            controlFlow: options.controlFlow !== false,
            deadCode: options.deadCode === true,
            wrapConstants: options.wrapConstants === true,
            antiVM: options.antiVM === true
        };

        this.variableMap = new Map();
        this.functionMap = new Map();
        this.stringMap = new Map();
        this.obfuscationId = this.generateId();
    }

    /**
     * Generate random identifier
     */
    generateId(length = 8) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = chars[Random.int(0, 51)]; // First char must be letter
        const allChars = chars + '0123456789_';
        for (let i = 1; i < length; i++) {
            result += allChars[Random.int(0, allChars.length - 1)];
        }
        return result;
    }

    /**
     * Generate obfuscated variable name
     */
    generateVarName() {
        const patterns = [
            () => `_${this.generateId(Random.int(6, 10))}`,
            () => `__${this.generateId(Random.int(4, 8))}__`,
            () => `_0x${Random.int(100000, 999999).toString(16)}`,
            () => {
                const prefix = Random.choice(['l', 'll', 'I', 'II', 'O', 'o']);
                return prefix + this.generateId(Random.int(3, 6));
            }
        ];

        return Random.choice(patterns)();
    }

    /**
     * Encrypt string using XOR + Base64
     */
    encryptString(str) {
        const key = Random.int(1, 255);
        let encrypted = '';

        for (let i = 0; i < str.length; i++) {
            const charCode = str.charCodeAt(i) ^ key;
            encrypted += String.fromCharCode(charCode);
        }

        const base64 = btoa(encrypted);
        return { encrypted: base64, key };
    }

    /**
     * Generate string decryption function
     */
    generateStringDecryptor() {
        const funcName = this.generateVarName();
        const paramStr = this.generateVarName();
        const paramKey = this.generateVarName();
        const varResult = this.generateVarName();
        const varI = this.generateVarName();
        const varDecoded = this.generateVarName();

        return `
local function ${funcName}(${paramStr}, ${paramKey})
    local ${varDecoded} = ""
    for ${varI} = 1, #${paramStr} do
        ${varDecoded} = ${varDecoded} .. string.char(string.byte(${paramStr}, ${varI}) ~ ${paramKey})
    end
    return ${varDecoded}
end
local function _decode(${paramStr})
    local ${varResult} = ""
    for ${varI} = 1, #${paramStr}, 4 do
        local ${varDecoded} = 0
        for j = 0, 3 do
            if ${varI} + j <= #${paramStr} then
                local c = string.byte(${paramStr}, ${varI} + j)
                if c >= 65 and c <= 90 then
                    ${varDecoded} = ${varDecoded} * 64 + (c - 65)
                elseif c >= 97 and c <= 122 then
                    ${varDecoded} = ${varDecoded} * 64 + (c - 71)
                elseif c >= 48 and c <= 57 then
                    ${varDecoded} = ${varDecoded} * 64 + (c + 4)
                elseif c == 43 then
                    ${varDecoded} = ${varDecoded} * 64 + 62
                elseif c == 47 then
                    ${varDecoded} = ${varDecoded} * 64 + 63
                end
            end
        end
        for j = 2, 0, -1 do
            if ${varI} + j <= #${paramStr} then
                ${varResult} = ${varResult} .. string.char(math.floor(${varDecoded} / (256 ^ j)) % 256)
            end
        end
    end
    return ${funcName}(${varResult}, ${paramKey})
end`.trim();
    }

    /**
     * Generate dead code
     */
    generateDeadCode() {
        const templates = [
            () => {
                const var1 = this.generateVarName();
                const var2 = this.generateVarName();
                return `local ${var1} = ${Random.int(1, 100)}; local ${var2} = ${var1} * ${Random.int(2, 10)}`;
            },
            () => {
                const var1 = this.generateVarName();
                return `local ${var1} = function() return ${Random.int(1, 1000)} end`;
            },
            () => {
                const var1 = this.generateVarName();
                const items = Array.from({ length: Random.int(3, 6) }, () => Random.int(1, 100));
                return `local ${var1} = {${items.join(', ')}}`;
            },
            () => {
                const var1 = this.generateVarName();
                const var2 = this.generateVarName();
                const val = Random.int(10, 50);
                return `if ${val} > ${val + 10} then local ${var1} = true else local ${var2} = false end`;
            }
        ];

        return Random.choice(templates)();
    }

    /**
     * Wrap constants
     */
    wrapConstant(value) {
        if (typeof value === 'number') {
            const ops = [
                () => `(${value + Random.int(1, 10)} - ${Random.int(1, 10)})`,
                () => `(${value * 2} / 2)`,
                () => `(${value} + 0)`,
                () => `math.floor(${value + 0.5})`,
            ];
            return Random.choice(ops)();
        }
        return value;
    }

    /**
     * Generate anti-VM detection code
     */
    generateAntiVM() {
        const checks = [
            `-- Anti-VM Check`,
            `local _vm_check = pcall(function() return game:GetService("CoreGui") end)`,
            `if not _vm_check then return end`,
            ``
        ];
        return checks.join('\n');
    }

    /**
     * Generate opaque predicate (always true/false but hard to analyze)
     */
    generateOpaquePredicate(alwaysTrue = true) {
        const predicates = alwaysTrue ? [
            `(${Random.int(5, 20)} * ${Random.int(2, 8)}) > ${Random.int(1, 10)}`,
            `(${Random.int(100, 500)} + ${Random.int(1, 50)}) >= ${Random.int(50, 100)}`,
            `math.abs(${Random.int(-100, -10)}) > 0`,
            `(${Random.int(10, 50)} % ${Random.int(2, 5)}) >= 0`
        ] : [
            `${Random.int(5, 10)} > ${Random.int(100, 500)}`,
            `${Random.int(1, 5)} < 0`,
            `false and true`
        ];
        return Random.choice(predicates);
    }

    /**
     * Generate instruction table for VM-like execution
     */
    generateInstructionTable(code) {
        const lines = code.split('\n').filter(line => line.trim() && !line.trim().startsWith('--'));
        const instructions = [];

        lines.forEach((line, idx) => {
            instructions.push({
                id: idx,
                code: line,
                encoded: this.encodeToOctal(line)
            });
        });

        return instructions;
    }

    /**
     * Encode string to octal escape sequences
     */
    encodeToOctal(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const code = str.charCodeAt(i);
            result += '\\' + code.toString(8).padStart(3, '0');
        }
        return result;
    }

    /**
     * Maximum security obfuscation
     */
    obfuscate(code) {
        const startTime = performance.now();

        // Step 1: Extract and encode all strings with multiple layers
        const stringRegex = /(['\"`])((?:\\.|(?!\1).)*?)\1/g;
        const stringTable = [];
        const stringMap = new Map();
        let match;
        let tempCode = code;

        while ((match = stringRegex.exec(code)) !== null) {
            const str = match[2];
            if (!stringMap.has(str)) {
                stringMap.set(str, stringTable.length);
                // Double encode: XOR then Octal
                const xorKey = Random.int(1, 255);
                let xored = '';
                for (let i = 0; i < str.length; i++) {
                    xored += String.fromCharCode(str.charCodeAt(i) ^ xorKey);
                }
                stringTable.push({
                    encoded: this.encodeToOctal(xored),
                    key: xorKey
                });
            }
        }

        // Replace strings with complex lookups
        const stringDecoderName = this.generateVarName();
        tempCode = code.replace(stringRegex, (fullMatch, quote, str) => {
            const idx = stringMap.get(str);
            return `${stringDecoderName}(${idx + 1})`;
        });

        // Step 2: Variable and function renaming with obfuscated names
        if (this.options.renameVariables) {
            const varRegex = /\blocal\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
            const variables = new Set();
            let match;

            while ((match = varRegex.exec(tempCode)) !== null) {
                const varName = match[1];
                const reserved = ['game', 'workspace', 'script', 'print', 'warn', 'error', 'wait', 'spawn', 'delay', '_S', '_L', '_R', '_V', '_X', stringDecoderName];
                if (!reserved.includes(varName) && !varName.startsWith('_')) {
                    variables.add(varName);
                }
            }

            variables.forEach(varName => {
                if (!this.variableMap.has(varName)) {
                    this.variableMap.set(varName, this.generateVarName());
                }
                const newName = this.variableMap.get(varName);
                const regex = new RegExp(`\\b${varName}\\b`, 'g');
                tempCode = tempCode.replace(regex, newName);
            });

            // Function renaming
            const funcRegex = /\bfunction\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
            while ((match = funcRegex.exec(tempCode)) !== null) {
                const funcName = match[1];
                if (!this.functionMap.has(funcName)) {
                    this.functionMap.set(funcName, this.generateVarName());
                }
                const newName = this.functionMap.get(funcName);
                const regex = new RegExp(`\\b${funcName}\\b`, 'g');
                tempCode = tempCode.replace(regex, newName);
            }
        }

        // Step 3: Add dead code and opaque predicates
        if (this.options.deadCode) {
            const lines = tempCode.split('\n');
            const newLines = [];
            for (let i = 0; i < lines.length; i++) {
                // Add opaque predicate wrapper randomly
                if (Random.boolean() && lines[i].trim() && !lines[i].trim().startsWith('--')) {
                    const predicate = this.generateOpaquePredicate(true);
                    newLines.push(`if ${predicate} then`);
                    newLines.push(lines[i]);
                    newLines.push(`else`);
                    newLines.push(this.generateDeadCode());
                    newLines.push(`end`);
                } else {
                    newLines.push(lines[i]);
                }

                // Insert junk code
                if (Random.int(1, 100) > 70 && lines[i].trim()) {
                    newLines.push(this.generateDeadCode());
                }
            }
            tempCode = newLines.join('\n');
        }

        // Step 4: Constant wrapping with complex expressions
        if (this.options.wrapConstants) {
            tempCode = tempCode.replace(/\b(\d+)\b/g, (match, num) => {
                const n = parseInt(num);
                if (n <= 5) return match;

                // More complex wrapping
                const methods = [
                    () => `(${n + Random.int(10, 50)} - ${Random.int(10, 50)})`,
                    () => `(${n * 2} / 2)`,
                    () => `(${n} + ${Random.int(5, 15)} - ${Random.int(5, 15)})`,
                    () => `math.floor(${n + 0.5})`,
                    () => `(${n * 3} / 3)`,
                    () => `bit32.bxor(${n}, 0)`
                ];
                return Random.choice(methods)();
            });
        }

        // Step 5: Build the multi-layered wrapper
        let wrappedCode = `--[[ Digital Rift Obfuscator v2.0 - Maximum Protection ]]\n`;
        wrappedCode += `return(function(...)`;

        // String decode table and decoder
        if (stringTable.length > 0) {
            wrappedCode += `\nlocal _S={`;
            stringTable.forEach((item, idx) => {
                wrappedCode += `{"${item.encoded}",${item.key}}`;
                if (idx < stringTable.length - 1) wrappedCode += ',';
            });
            wrappedCode += `}\n`;

            // Complex string decoder with anti-debugging
            const xorVar = this.generateVarName();
            const resultVar = this.generateVarName();
            const iVar = this.generateVarName();
            const decodedVar = this.generateVarName();

            wrappedCode += `local function ${stringDecoderName}(${iVar})\n`;
            wrappedCode += `local ${xorVar}=_S[${iVar}]\n`;
            wrappedCode += `if not ${xorVar} then return ""end\n`;
            wrappedCode += `local ${resultVar}=""\n`;
            wrappedCode += `local ${decodedVar}=${xorVar}[1]\n`;
            wrappedCode += `for ${iVar}=1,#${decodedVar},4 do\n`;
            wrappedCode += `local _c=0\n`;
            wrappedCode += `for _j=0,3 do\n`;
            wrappedCode += `if ${iVar}+_j<=#${decodedVar} then\n`;
            wrappedCode += `local c=string.byte(${decodedVar},${iVar}+_j)\n`;
            wrappedCode += `_c=_c*8+(c-48)\n`;
            wrappedCode += `end end\n`;
            wrappedCode += `${resultVar}=${resultVar}..string.char(_c)\n`;
            wrappedCode += `end\n`;
            wrappedCode += `local _k=${xorVar}[2]\n`;
            wrappedCode += `local _r=""\n`;
            wrappedCode += `for ${iVar}=1,#${resultVar} do\n`;
            wrappedCode += `_r=_r..string.char(bit32.bxor(string.byte(${resultVar},${iVar}),_k))\n`;
            wrappedCode += `end\n`;
            wrappedCode += `return _r\n`;
            wrappedCode += `end\n`;
        }

        // Anti-VM and anti-debugging
        if (this.options.antiVM) {
            const checkVar = this.generateVarName();
            const timeVar = this.generateVarName();
            wrappedCode += `local ${checkVar}=pcall(function()return game:GetService("CoreGui")end)\n`;
            wrappedCode += `if not ${checkVar} then return end\n`;
            wrappedCode += `local ${timeVar}=tick()\n`;
            wrappedCode += `if tick()-${timeVar}>0.1 then return end\n`;
        }

        // Control flow obfuscation with state machine
        if (this.options.controlFlow) {
            const stateVar = this.generateVarName();
            const loaderVar = this.generateVarName();
            const execVar = this.generateVarName();

            wrappedCode += `local ${stateVar}=${Random.int(10000, 99999)}\n`;
            wrappedCode += `local ${execVar}=${Random.int(1000, 9999)}\n`;
            wrappedCode += `local ${loaderVar}=function()\n`;

            // Add multiple opaque predicates
            wrappedCode += `if ${this.generateOpaquePredicate(true)} then\n`;
            wrappedCode += `if ${stateVar}>${execVar} then\n`;

            // Insert the actual code
            wrappedCode += tempCode;

            wrappedCode += `\nend\n`;
            wrappedCode += `else\n`;
            wrappedCode += `error("${this.encodeToOctal("Invalid state")}")\n`;
            wrappedCode += `end\n`;
            wrappedCode += `end\n`;
            wrappedCode += `return ${loaderVar}()\n`;
        } else {
            wrappedCode += tempCode;
        }

        wrappedCode += `end)(...)`

        // Minify: Remove newlines and collapse whitespace carefully to preserve escape sequences
        // First, protect strings with escape sequences by marking them
        const stringProtector = [];
        let protectedCode = wrappedCode.replace(/"([^"\\]*(\\.[^"\\]*)*)"/g, (match) => {
            const index = stringProtector.length;
            stringProtector.push(match);
            return `__STRING_${index}__`;
        });

        // Now minify the protected code
        protectedCode = protectedCode
            .replace(/\n/g, ' ')  // Replace newlines with spaces
            .replace(/\s+/g, ' ') // Collapse multiple spaces into one
            .replace(/\s*([(){}[\],;=<>+\-*/~])\s*/g, '$1') // Remove spaces around operators
            .replace(/\s+then\s+/g, ' then ') // Keep space around 'then'
            .replace(/\s+else\s+/g, ' else ') // Keep space around 'else'
            .replace(/\s+end\s+/g, ' end ') // Keep space around 'end'
            .replace(/\s+if\s+/g, ' if ') // Keep space around 'if'
            .replace(/\s+local\s+/g, ' local ') // Keep space around 'local'
            .replace(/\s+function\s+/g, ' function ') // Keep space around 'function'
            .replace(/\s+return\s+/g, ' return ') // Keep space around 'return'
            .replace(/\s+for\s+/g, ' for ') // Keep space around 'for'
            .replace(/\s+do\s+/g, ' do ') // Keep space around 'do'
            .replace(/^\s+|\s+$/g, ''); // Trim leading/trailing whitespace

        // Restore the protected strings
        wrappedCode = protectedCode.replace(/__STRING_(\d+)__/g, (match, index) => {
            return stringProtector[parseInt(index)];
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        return {
            code: wrappedCode,
            stats: {
                originalLength: code.length,
                obfuscatedLength: wrappedCode.length,
                variablesRenamed: this.variableMap.size,
                functionsRenamed: this.functionMap.size,
                stringsEncoded: stringTable.length,
                complexityIncrease: Math.round((wrappedCode.length / code.length) * 100) + '%',
                executionTime
            }
        };
    }

    /**
     * Reset obfuscator state
     */
    reset() {
        this.variableMap.clear();
        this.functionMap.clear();
        this.stringMap.clear();
        this.obfuscationId = this.generateId();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LuauObfuscator };
}
