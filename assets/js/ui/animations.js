// ==========================================
// DIGITAL RIFT - Animation System
// ==========================================

/**
 * Floating geometric shapes
 */
class FloatingShape {
    constructor(container) {
        this.element = document.createElement('div');
        this.container = container;
        this.reset();
        this.element.className = 'floating-shape';
        this.setupStyle();
        this.container.appendChild(this.element);
    }

    reset() {
        this.x = Random.range(0, 100);
        this.y = Random.range(-20, 120);
        this.size = Random.range(40, 120);
        this.rotation = Random.range(0, 360);
        this.rotationSpeed = Random.range(-0.5, 0.5);
        this.floatSpeed = Random.range(0.01, 0.03);
        this.floatOffset = Random.range(0, Math.PI * 2);
        this.opacity = Random.range(0.05, 0.15);
        this.shape = Random.choice(['triangle', 'square', 'hexagon', 'circle']);
        this.color = Random.choice([
            'rgba(0, 217, 255, 0.1)',
            'rgba(139, 92, 246, 0.1)',
            'rgba(236, 72, 153, 0.1)'
        ]);
    }

    setupStyle() {
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;
        this.element.style.left = `${this.x}%`;
        this.element.style.top = `${this.y}%`;
        this.element.style.opacity = this.opacity;
        this.element.style.background = this.color;
        this.element.style.transform = `rotate(${this.rotation}deg)`;
        this.element.style.pointerEvents = 'none';
        this.element.style.transition = 'transform 0.1s linear';

        // Shape-specific styling
        switch (this.shape) {
            case 'circle':
                this.element.style.borderRadius = '50%';
                break;
            case 'triangle':
                this.element.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                break;
            case 'hexagon':
                this.element.style.clipPath = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';
                break;
            default:
                this.element.style.borderRadius = '10px';
        }
    }

    update(time) {
        this.rotation += this.rotationSpeed;
        const floatY = Math.sin(time * this.floatSpeed + this.floatOffset) * 2;

        this.element.style.transform = `
            translateY(${floatY}px)
            rotate(${this.rotation}deg)
        `;

        // Slowly drift
        this.y += 0.005;

        // Reset if gone off screen
        if (this.y > 120) {
            this.y = -20;
            this.x = Random.range(0, 100);
        }

        this.element.style.top = `${this.y}%`;
    }

    destroy() {
        this.element.remove();
    }
}

/**
 * Cursor trail effect
 */
class CursorTrail {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.points = [];
        this.maxPoints = 20;
        this.mouseX = 0;
        this.mouseY = 0;

        this.resize();
        this.setupEventListeners();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.points.push({
                x: this.mouseX,
                y: this.mouseY,
                age: 0
            });

            if (this.points.length > this.maxPoints) {
                this.points.shift();
            }
        });
    }

    update() {
        for (let i = this.points.length - 1; i >= 0; i--) {
            this.points[i].age += 0.05;

            if (this.points[i].age >= 1) {
                this.points.splice(i, 1);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.points.length < 2) return;

        this.ctx.save();
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        for (let i = 0; i < this.points.length - 1; i++) {
            const point = this.points[i];
            const nextPoint = this.points[i + 1];
            const alpha = (1 - point.age) * 0.3;
            const width = (1 - point.age) * 3;

            const gradient = this.ctx.createLinearGradient(
                point.x, point.y,
                nextPoint.x, nextPoint.y
            );
            gradient.addColorStop(0, `rgba(0, 217, 255, ${alpha})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${alpha})`);

            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = width;
            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
            this.ctx.lineTo(nextPoint.x, nextPoint.y);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }
}

/**
 * Rift divider animation
 */
class RiftDivider {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width = canvas.offsetWidth;
        this.height = canvas.height = 60;
        this.time = 0;
        this.amplitude = 15;
        this.frequency = 0.02;
        this.speed = 0.02;
    }

    update() {
        this.time += this.speed;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        const centerY = this.height / 2;

        // Draw multiple waves
        this.drawWave(centerY, this.amplitude, this.time, 'rgba(0, 217, 255, 0.5)', 2);
        this.drawWave(centerY, this.amplitude * 0.7, this.time + 1, 'rgba(139, 92, 246, 0.4)', 1.5);
        this.drawWave(centerY, this.amplitude * 0.5, this.time + 2, 'rgba(236, 72, 153, 0.3)', 1);

        // Draw glow particles along the wave
        this.drawWaveParticles(centerY);
    }

    drawWave(centerY, amplitude, offset, color, lineWidth) {
        this.ctx.save();
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = color;

        this.ctx.beginPath();
        for (let x = 0; x <= this.width; x++) {
            const y = centerY + Math.sin((x * this.frequency) + offset) * amplitude;
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawWaveParticles(centerY) {
        this.ctx.save();

        for (let x = 0; x < this.width; x += 30) {
            const y = centerY + Math.sin((x * this.frequency) + this.time) * this.amplitude;
            const size = 2 + Math.sin(this.time + x * 0.1) * 1;

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, size * 3);
            gradient.addColorStop(0, 'rgba(0, 217, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(0, 217, 255, 0)');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size * 3, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    resize() {
        this.width = this.canvas.width = this.canvas.offsetWidth;
    }
}

/**
 * Main animation manager
 */
class AnimationManager {
    constructor() {
        this.particleSystem = null;
        this.cursorTrail = null;
        this.riftDivider = null;
        this.floatingShapes = [];
        this.performanceMonitor = new PerformanceMonitor();
        this.isRunning = false;
        this.animationFrameId = null;
        this.qualityLevel = 'high'; // high, medium, low

        this.init();
    }

    init() {
        // Initialize particle system
        const riftCanvas = document.getElementById('rift-canvas');
        if (riftCanvas) {
            this.particleSystem = new ParticleSystem(riftCanvas);
        }

        // Initialize cursor trail
        const cursorCanvas = document.getElementById('cursor-trail');
        if (cursorCanvas) {
            this.cursorTrail = new CursorTrail(cursorCanvas);
        }

        // Initialize rift divider
        const riftDividerCanvas = document.getElementById('rift-divider-canvas');
        if (riftDividerCanvas) {
            this.riftDivider = new RiftDivider(riftDividerCanvas);
        }

        // Initialize floating shapes
        const shapesContainer = document.querySelector('.floating-shapes');
        if (shapesContainer) {
            const shapeCount = this.getShapeCountForQuality();
            for (let i = 0; i < shapeCount; i++) {
                this.floatingShapes.push(new FloatingShape(shapesContainer));
            }
        }

        // Handle window resize
        window.addEventListener('resize', throttle(() => {
            if (this.particleSystem) this.particleSystem.resize();
            if (this.cursorTrail) this.cursorTrail.resize();
            if (this.riftDivider) this.riftDivider.resize();
        }, 250));

        this.start();
    }

    getShapeCountForQuality() {
        switch (this.qualityLevel) {
            case 'high': return 8;
            case 'medium': return 5;
            case 'low': return 3;
            default: return 8;
        }
    }

    adjustQuality() {
        const avgFps = this.performanceMonitor.getAverageFPS();

        if (avgFps < 30 && this.qualityLevel !== 'low') {
            this.qualityLevel = 'low';
            this.applyQualitySettings();
            console.log('Quality adjusted to LOW');
        } else if (avgFps < 45 && this.qualityLevel === 'high') {
            this.qualityLevel = 'medium';
            this.applyQualitySettings();
            console.log('Quality adjusted to MEDIUM');
        } else if (avgFps > 55 && this.qualityLevel !== 'high') {
            this.qualityLevel = 'high';
            this.applyQualitySettings();
            console.log('Quality adjusted to HIGH');
        }
    }

    applyQualitySettings() {
        if (!this.particleSystem) return;

        switch (this.qualityLevel) {
            case 'high':
                this.particleSystem.setMaxParticles(300);
                this.particleSystem.toggleConnections(true);
                break;
            case 'medium':
                this.particleSystem.setMaxParticles(150);
                this.particleSystem.toggleConnections(true);
                break;
            case 'low':
                this.particleSystem.setMaxParticles(75);
                this.particleSystem.toggleConnections(false);
                break;
        }
    }

    update() {
        this.performanceMonitor.update();

        if (this.particleSystem) {
            this.particleSystem.update();
        }

        if (this.cursorTrail) {
            this.cursorTrail.update();
        }

        if (this.riftDivider) {
            this.riftDivider.update();
        }

        const time = performance.now() * 0.001;
        for (const shape of this.floatingShapes) {
            shape.update(time);
        }

        // Adjust quality every 2 seconds
        if (this.performanceMonitor.frameCount === 0) {
            this.adjustQuality();
        }
    }

    draw() {
        if (this.particleSystem) {
            this.particleSystem.draw();
        }

        if (this.cursorTrail) {
            this.cursorTrail.draw();
        }

        if (this.riftDivider) {
            this.riftDivider.draw();
        }
    }

    animate() {
        if (!this.isRunning) return;

        this.update();
        this.draw();

        this.animationFrameId = requestAnimFrame(() => this.animate());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    getFPS() {
        return this.performanceMonitor.getFPS();
    }

    getParticleCount() {
        return this.particleSystem ? this.particleSystem.getParticleCount() : 0;
    }

    triggerParticleBurst(x, y) {
        if (this.particleSystem) {
            this.particleSystem.spawnBurst(x, y, 20);
        }
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FloatingShape,
        CursorTrail,
        RiftDivider,
        AnimationManager
    };
}
