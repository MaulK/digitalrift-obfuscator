// ==========================================
// DIGITAL RIFT - Particle System
// ==========================================

/**
 * Individual particle class
 */
class Particle {
    constructor(x, y, vx, vy, size, color, lifespan) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.size = size;
        this.color = color;
        this.lifespan = lifespan;
        this.age = 0;
        this.alpha = 1;
        this.glowIntensity = Random.range(0.5, 1);
    }

    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.age += deltaTime;

        // Fade out as particle ages
        this.alpha = 1 - (this.age / this.lifespan);

        // Add some turbulence
        this.vx += Random.range(-0.1, 0.1);
        this.vy += Random.range(-0.1, 0.1);

        // Damping
        this.vx *= 0.99;
        this.vy *= 0.99;
    }

    isDead() {
        return this.age >= this.lifespan;
    }

    draw(ctx) {
        ctx.save();

        // Glow effect
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, rgbToString(this.color, this.alpha * this.glowIntensity));
        gradient.addColorStop(0.5, rgbToString(this.color, this.alpha * 0.3));
        gradient.addColorStop(1, rgbToString(this.color, 0));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = rgbToString(this.color, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

/**
 * Particle system manager
 */
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 300;
        this.lastTime = performance.now();

        // Color palette - Cyan, Purple, Pink
        this.colors = [
            [0, 217, 255],    // Cyan
            [139, 92, 246],   // Purple
            [236, 72, 153]    // Pink
        ];

        // Connection settings
        this.connectionDistance = 120;
        this.showConnections = true;

        this.resize();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        // Create initial particles
        const initialCount = Math.min(150, this.maxParticles);
        for (let i = 0; i < initialCount; i++) {
            this.spawnParticle(
                Random.range(0, this.canvas.width),
                Random.range(0, this.canvas.height),
                Random.range(-0.5, 0.5),
                Random.range(-0.5, 0.5)
            );
        }
    }

    spawnParticle(x, y, vx, vy) {
        if (this.particles.length >= this.maxParticles) return;

        const particle = new Particle(
            x,
            y,
            vx,
            vy,
            Random.range(1, 3),
            Random.choice(this.colors),
            Random.range(5000, 15000) // Lifespan in ms
        );

        this.particles.push(particle);
    }

    spawnBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = Random.range(0, Math.PI * 2);
            const speed = Random.range(1, 3);
            this.spawnParticle(
                x,
                y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }
    }

    update() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 16.67; // Normalize to 60fps
        this.lastTime = currentTime;

        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update(deltaTime);

            // Remove dead particles
            if (particle.isDead() ||
                particle.x < -50 || particle.x > this.canvas.width + 50 ||
                particle.y < -50 || particle.y > this.canvas.height + 50) {
                this.particles.splice(i, 1);
            }
        }

        // Spawn new particles to maintain count
        if (this.particles.length < this.maxParticles / 2) {
            const edge = Random.int(0, 3);
            let x, y, vx, vy;

            switch (edge) {
                case 0: // Top
                    x = Random.range(0, this.canvas.width);
                    y = -10;
                    vx = Random.range(-0.5, 0.5);
                    vy = Random.range(0.2, 0.8);
                    break;
                case 1: // Right
                    x = this.canvas.width + 10;
                    y = Random.range(0, this.canvas.height);
                    vx = Random.range(-0.8, -0.2);
                    vy = Random.range(-0.5, 0.5);
                    break;
                case 2: // Bottom
                    x = Random.range(0, this.canvas.width);
                    y = this.canvas.height + 10;
                    vx = Random.range(-0.5, 0.5);
                    vy = Random.range(-0.8, -0.2);
                    break;
                case 3: // Left
                    x = -10;
                    y = Random.range(0, this.canvas.height);
                    vx = Random.range(0.2, 0.8);
                    vy = Random.range(-0.5, 0.5);
                    break;
            }

            this.spawnParticle(x, y, vx, vy);
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw connections between nearby particles
        if (this.showConnections) {
            this.drawConnections();
        }

        // Draw particles
        for (const particle of this.particles) {
            particle.draw(this.ctx);
        }
    }

    drawConnections() {
        this.ctx.save();

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const p1 = this.particles[i];
                const p2 = this.particles[j];

                const dist = distance(p1.x, p1.y, p2.x, p2.y);

                if (dist < this.connectionDistance) {
                    const alpha = (1 - dist / this.connectionDistance) * 0.3;

                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${alpha * Math.min(p1.alpha, p2.alpha)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }

        this.ctx.restore();
    }

    getParticleCount() {
        return this.particles.length;
    }

    setMaxParticles(max) {
        this.maxParticles = max;

        // Remove excess particles if necessary
        while (this.particles.length > this.maxParticles) {
            this.particles.pop();
        }
    }

    toggleConnections(show) {
        this.showConnections = show;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Particle, ParticleSystem };
}
