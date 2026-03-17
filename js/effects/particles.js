(function() {
    class PageParticles {
        constructor() {
            this.canvas = null;
            this.ctx = null;
            this.particles = [];
            this.animationId = null;
            this.colors = ['#c9a227', '#8b0000', '#00aaff', '#00ff88', '#aa00ff'];
        }

        init() {
            this.createCanvas();
            this.createParticles();
            this.animate();
            this.handleResize();
        }

        createCanvas() {
            const existing = document.querySelector('.page-canvas');
            if (existing) {
                existing.remove();
            }

            this.canvas = document.createElement('canvas');
            this.canvas.className = 'page-canvas';
            this.canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
            `;
            
            document.body.insertBefore(this.canvas, document.body.firstChild);
            this.ctx = this.canvas.getContext('2d');
            this.resize();
        }

        resize() {
            if (!this.canvas) return;
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        handleResize() {
            window.addEventListener('resize', () => this.resize());
        }

        createParticles() {
            const count = Math.floor((window.innerWidth * window.innerHeight) / 15000);
            this.particles = [];
            
            for (let i = 0; i < Math.min(count, 80); i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    color: this.colors[Math.floor(Math.random() * this.colors.length)],
                    opacity: Math.random() * 0.5 + 0.2,
                    pulse: Math.random() * Math.PI * 2,
                    pulseSpeed: Math.random() * 0.02 + 0.01
                });
            }
        }

        animate() {
            if (!this.ctx) return;
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += p.pulseSpeed;
                
                if (p.x < 0) p.x = this.canvas.width;
                if (p.x > this.canvas.width) p.x = 0;
                if (p.y < 0) p.y = this.canvas.height;
                if (p.y > this.canvas.height) p.y = 0;
                
                const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
                
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = currentOpacity;
                this.ctx.fill();
                
                this.particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = p.color;
                        this.ctx.globalAlpha = (1 - distance / 150) * 0.15;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.moveTo(p.x, p.y);
                        this.ctx.lineTo(p2.x, p2.y);
                        this.ctx.stroke();
                    }
                });
            });
            
            this.ctx.globalAlpha = 1;
            this.animationId = requestAnimationFrame(() => this.animate());
        }

        destroy() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            if (this.canvas) {
                this.canvas.remove();
            }
        }
    }

    class FloatingOrbs {
        constructor() {
            this.orbs = [];
            this.container = null;
        }

        init() {
            this.createContainer();
            this.createOrbs();
        }

        createContainer() {
            const existing = document.querySelector('.floating-orbs');
            if (existing) return;

            this.container = document.createElement('div');
            this.container.className = 'floating-orbs';
            this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                overflow: hidden;
            `;
            document.body.insertBefore(this.container, document.body.firstChild);
        }

        createOrbs() {
            const colors = [
                'radial-gradient(circle, rgba(201,162,39,0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(139,0,0,0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(0,150,255,0.2) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(150,0,200,0.2) 0%, transparent 70%)'
            ];

            for (let i = 0; i < 8; i++) {
                const orb = document.createElement('div');
                orb.style.cssText = `
                    position: absolute;
                    width: ${200 + Math.random() * 300}px;
                    height: ${200 + Math.random() * 300}px;
                    background: ${colors[i % colors.length]};
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    animation: orbFloat ${15 + Math.random() * 20}s ease-in-out infinite;
                    animation-delay: ${-Math.random() * 20}s;
                `;
                this.container.appendChild(orb);
            }

            this.addOrbStyles();
        }

        addOrbStyles() {
            if (document.getElementById('orb-styles')) return;
            
            const style = document.createElement('style');
            style.id = 'orb-styles';
            style.textContent = `
                @keyframes orbFloat {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(30px, -30px) scale(1.1);
                    }
                    50% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                    75% {
                        transform: translate(-30px, -20px) scale(1.05);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    const particles = new PageParticles();
    const orbs = new FloatingOrbs();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                particles.init();
                orbs.init();
            }, 100);
        });
    } else {
        setTimeout(() => {
            particles.init();
            orbs.init();
        }, 100);
    }

    window.addEventListener('beforeunload', () => {
        particles.destroy();
    });
})();
