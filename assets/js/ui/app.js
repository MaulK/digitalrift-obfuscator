// ==========================================
// DIGITAL RIFT - Main Application
// ==========================================

/**
 * Main Application Class
 */
class DigitalRiftApp {
    constructor() {
        this.animationManager = null;
        this.obfuscator = null;
        this.isObfuscating = false;

        this.init();
    }

    /**
     * Initialize application
     */
    init() {
        console.log('🌌 Digital Rift - Initializing...');

        // Show loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');

        // Initialize animation system
        setTimeout(() => {
            this.animationManager = new AnimationManager();
            console.log('✅ Animation system initialized');

            // Hide loading overlay after animations are ready
            setTimeout(() => {
                if (loadingOverlay) {
                    loadingOverlay.classList.add('hidden');
                }
                console.log('✅ Digital Rift ready');
            }, 1500);
        }, 500);

        // Initialize obfuscator
        this.obfuscator = new LuauObfuscator();

        // Setup UI event listeners
        this.setupEventListeners();

        // Start stats update loop
        this.startStatsUpdate();

        // Setup button animations
        this.setupButtonAnimations();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Obfuscate button
        const obfuscateBtn = document.getElementById('obfuscate-btn');
        if (obfuscateBtn) {
            obfuscateBtn.addEventListener('click', () => this.handleObfuscate());
        }

        // Load sample button
        const loadSampleBtn = document.getElementById('load-sample');
        if (loadSampleBtn) {
            loadSampleBtn.addEventListener('click', () => this.loadSample());
        }

        // Clear input button
        const clearInputBtn = document.getElementById('clear-input');
        if (clearInputBtn) {
            clearInputBtn.addEventListener('click', () => this.clearInput());
        }

        // Copy output button
        const copyBtn = document.getElementById('copy-output');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copyOutput());
        }

        // Download output button
        const downloadBtn = document.getElementById('download-output');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadOutput());
        }

        // Input code textarea
        const inputCode = document.getElementById('input-code');
        if (inputCode) {
            inputCode.addEventListener('input', debounce(() => {
                this.updateInputStats();
            }, 300));
        }

        // Settings checkboxes
        const settingCheckboxes = [
            'opt-names', 'opt-strings', 'opt-control',
            'opt-deadcode', 'opt-constants', 'opt-antivm'
        ];

        settingCheckboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    this.updateObfuscatorOptions();
                });
            }
        });
    }

    /**
     * Setup button particle animations
     */
    setupButtonAnimations() {
        const obfuscateBtn = document.getElementById('obfuscate-btn');
        if (obfuscateBtn) {
            obfuscateBtn.addEventListener('mouseenter', (e) => {
                const rect = e.target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                this.animationManager.triggerParticleBurst(centerX, centerY);
            });
        }
    }

    /**
     * Update obfuscator options from UI
     */
    updateObfuscatorOptions() {
        const options = {
            renameVariables: document.getElementById('opt-names')?.checked ?? true,
            encryptStrings: document.getElementById('opt-strings')?.checked ?? true,
            controlFlow: document.getElementById('opt-control')?.checked ?? true,
            deadCode: document.getElementById('opt-deadcode')?.checked ?? false,
            wrapConstants: document.getElementById('opt-constants')?.checked ?? false,
            antiVM: document.getElementById('opt-antivm')?.checked ?? false
        };

        this.obfuscator = new LuauObfuscator(options);
    }

    /**
     * Handle obfuscate button click
     */
    async handleObfuscate() {
        if (this.isObfuscating) return;

        const inputCode = document.getElementById('input-code')?.value || '';

        if (!inputCode.trim()) {
            this.showStatus('Please enter code to obfuscate', 'error');
            return;
        }

        this.isObfuscating = true;
        this.showStatus('Processing...', 'processing');

        // Visual effects
        const obfuscateBtn = document.getElementById('obfuscate-btn');
        if (obfuscateBtn) {
            obfuscateBtn.style.transform = 'scale(0.9)';
            const rect = obfuscateBtn.getBoundingClientRect();
            this.animationManager.triggerParticleBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }

        // Simulate async processing for better UX
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            // Perform obfuscation
            this.updateObfuscatorOptions();
            const result = this.obfuscator.obfuscate(inputCode);

            // Update output
            const outputCode = document.getElementById('output-code');
            if (outputCode) {
                outputCode.value = result.code;
                this.updateOutputStats();
            }

            // Update stats
            const timeDisplay = document.getElementById('obfuscation-time');
            if (timeDisplay) {
                timeDisplay.textContent = `Time: ${result.stats.executionTime}ms`;
            }

            // Enable copy and download buttons
            document.getElementById('copy-output')?.removeAttribute('disabled');
            document.getElementById('download-output')?.removeAttribute('disabled');

            this.showStatus('Success!', 'ready');

            // More visual effects
            setTimeout(() => {
                if (obfuscateBtn) {
                    obfuscateBtn.style.transform = '';
                }
            }, 200);

        } catch (error) {
            console.error('Obfuscation error:', error);
            this.showStatus('Error occurred', 'error');
        } finally {
            this.isObfuscating = false;
        }
    }

    /**
     * Load sample code
     */
    loadSample() {
        const sampleCode = `-- Sample Luau Script
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()
local humanoid = character:WaitForChild("Humanoid")

local function onHealthChanged(health)
    if health <= 0 then
        print(player.Name .. " has died!")
    end
end

humanoid.HealthChanged:Connect(onHealthChanged)

local function greetPlayer(playerName)
    local message = "Hello, " .. playerName .. "!"
    print(message)
    return message
end

greetPlayer(player.Name)

-- Main game loop
while wait(1) do
    local currentHealth = humanoid.Health
    local maxHealth = humanoid.MaxHealth
    local healthPercent = (currentHealth / maxHealth) * 100
    
    if healthPercent < 50 then
        print("Warning: Low health!")
    end
end`;

        const inputCode = document.getElementById('input-code');
        if (inputCode) {
            inputCode.value = sampleCode;
            this.updateInputStats();
        }

        // Trigger particle burst
        const loadSampleBtn = document.getElementById('load-sample');
        if (loadSampleBtn) {
            const rect = loadSampleBtn.getBoundingClientRect();
            this.animationManager.triggerParticleBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
    }

    /**
     * Clear input
     */
    clearInput() {
        const inputCode = document.getElementById('input-code');
        if (inputCode) {
            inputCode.value = '';
            this.updateInputStats();
        }
    }

    /**
     * Copy output to clipboard
     */
    async copyOutput() {
        const outputCode = document.getElementById('output-code');
        if (!outputCode || !outputCode.value) return;

        try {
            await navigator.clipboard.writeText(outputCode.value);

            const copyBtn = document.getElementById('copy-output');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span class="btn-glow"></span>Copied!';

                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            }

            // Trigger particle burst
            const rect = copyBtn.getBoundingClientRect();
            this.animationManager.triggerParticleBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );

        } catch (error) {
            console.error('Copy failed:', error);
            this.showStatus('Copy failed', 'error');
        }
    }

    /**
     * Download output as file
     */
    downloadOutput() {
        const outputCode = document.getElementById('output-code');
        if (!outputCode || !outputCode.value) return;

        const blob = new Blob([outputCode.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `obfuscated_${Date.now()}.lua`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Trigger particle burst
        const downloadBtn = document.getElementById('download-output');
        if (downloadBtn) {
            const rect = downloadBtn.getBoundingClientRect();
            this.animationManager.triggerParticleBurst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
    }

    /**
     * Update input statistics
     */
    updateInputStats() {
        const inputCode = document.getElementById('input-code');
        const linesDisplay = document.getElementById('input-lines');
        const charsDisplay = document.getElementById('input-chars');

        if (inputCode && linesDisplay && charsDisplay) {
            const lines = inputCode.value.split('\n').length;
            const chars = inputCode.value.length;

            linesDisplay.textContent = `Lines: ${lines}`;
            charsDisplay.textContent = `Characters: ${chars}`;
        }
    }

    /**
     * Update output statistics
     */
    updateOutputStats() {
        const outputCode = document.getElementById('output-code');
        const linesDisplay = document.getElementById('output-lines');
        const charsDisplay = document.getElementById('output-chars');

        if (outputCode && linesDisplay && charsDisplay) {
            const lines = outputCode.value.split('\n').length;
            const chars = outputCode.value.length;

            linesDisplay.textContent = `Lines: ${lines}`;
            charsDisplay.textContent = `Characters: ${chars}`;
        }
    }

    /**
     * Show status message
     */
    showStatus(message, type = 'ready') {
        const statusDisplay = document.getElementById('status');
        if (statusDisplay) {
            statusDisplay.textContent = message;
            statusDisplay.className = 'stat-value';

            if (type === 'processing') {
                statusDisplay.classList.add('status-processing');
            } else if (type === 'ready') {
                statusDisplay.classList.add('status-ready');
            } else if (type === 'error') {
                statusDisplay.style.color = '#ef4444';
            }
        }
    }

    /**
     * Start stats update loop
     */
    startStatsUpdate() {
        setInterval(() => {
            if (!this.animationManager) return;

            const fpsDisplay = document.getElementById('fps-counter');
            if (fpsDisplay) {
                const fps = this.animationManager.getFPS();
                fpsDisplay.textContent = `${fps} FPS`;

                // Color based on performance
                if (fps >= 55) {
                    fpsDisplay.style.color = '#10b981';
                } else if (fps >= 30) {
                    fpsDisplay.style.color = '#f59e0b';
                } else {
                    fpsDisplay.style.color = '#ef4444';
                }
            }

            const particleDisplay = document.getElementById('particle-count');
            if (particleDisplay) {
                const count = this.animationManager.getParticleCount();
                particleDisplay.textContent = `${count}`;
            }
        }, 1000);
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.digitalRiftApp = new DigitalRiftApp();
});

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DigitalRiftApp };
}
