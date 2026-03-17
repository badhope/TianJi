(function() {
    const entranceContainer = document.getElementById('entranceContainer');
    const taijiContainer = document.getElementById('taiji');
    const title = document.getElementById('title');
    const enterHint = document.getElementById('enterHint');
    
    function init() {
        initCosmosCanvas();
        initParticlesCanvas();
        initNebulaCanvas();
        initRunesAnimation();
        initTitleAnimation();
        
        document.addEventListener('click', handleEnter);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleEnter();
        });
    }
    
    function initCosmosCanvas() {
        const canvas = document.getElementById('cosmosCanvas');
        const ctx = canvas.getContext('2d');
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        
        const stars = [];
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random(),
                speed: Math.random() * 0.02 + 0.005,
                twinkleSpeed: Math.random() * 0.05 + 0.02
            });
        }
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            stars.forEach(star => {
                star.opacity += star.twinkleSpeed;
                if (star.opacity > 1 || star.opacity < 0.2) {
                    star.twinkleSpeed *= -1;
                }
                
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                
                if (star.radius > 1) {
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
                    const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 2);
                    gradient.addColorStop(0, `rgba(255, 215, 0, ${star.opacity * 0.3})`);
                    gradient.addColorStop(1, 'transparent');
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
                
                star.y += star.speed;
                if (star.y > canvas.height) {
                    star.y = 0;
                    star.x = Math.random() * canvas.width;
                }
            });
            
            requestAnimationFrame(draw);
        }
        draw();
    }
    
    function initParticlesCanvas() {
        const canvas = document.getElementById('particlesCanvas');
        const ctx = canvas.getContext('2d');
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        
        const particles = [];
        const colors = ['#c9a227', '#ffd700', '#8b0000', '#ff6b35', '#ff1493', '#007fff', '#50c878'];
        
        class Particle {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 3 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.velocityX = (Math.random() - 0.5) * 0.5;
                this.velocityY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.decay = Math.random() * 0.002 + 0.001;
            }
            
            update() {
                this.x += this.velocityX;
                this.y += this.velocityY;
                this.opacity -= this.decay;
                
                if (this.opacity <= 0 || 
                    this.x < 0 || this.x > canvas.width ||
                    this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color.replace(')', `, ${this.opacity})`).replace('rgb', 'rgba').replace('#', '');
                
                const r = parseInt(this.color.slice(1, 3), 16);
                const g = parseInt(this.color.slice(3, 5), 16);
                const b = parseInt(this.color.slice(5, 7), 16);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.opacity})`;
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 3);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity * 0.3})`);
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
        
        for (let i = 0; i < 80; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach(p2 => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(201, 162, 39, ${0.1 * (1 - dist / 150)})`;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        animate();
    }
    
    function initNebulaCanvas() {
        const canvas = document.getElementById('nebulaCanvas');
        const ctx = canvas.getContext('2d');
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        
        const nebulae = [];
        
        class Nebula {
            constructor() {
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 200 + 100;
                this.color = this.getRandomColor();
                this.opacity = Math.random() * 0.1 + 0.05;
                this.driftX = (Math.random() - 0.5) * 0.3;
                this.driftY = (Math.random() - 0.5) * 0.3;
                this.pulse = Math.random() * 0.02;
                this.pulseDir = 1;
            }
            
            getRandomColor() {
                const colors = [
                    { r: 107, g: 63, b: 160 },
                    { r: 30, g: 58, b: 95 },
                    { r: 139, g: 0, b: 0 },
                    { r: 201, g: 162, b: 39 },
                    { r: 75, g: 0, b: 130 }
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            update() {
                this.x += this.driftX;
                this.y += this.driftY;
                this.opacity += this.pulse * this.pulseDir;
                
                if (this.opacity > 0.15 || this.opacity < 0.02) {
                    this.pulseDir *= -1;
                }
                
                if (this.x < -this.radius || this.x > canvas.width + this.radius ||
                    this.y < -this.radius || this.y > canvas.height + this.radius) {
                    this.reset();
                }
            }
            
            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
                gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity * 0.5})`);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        for (let i = 0; i < 8; i++) {
            nebulae.push(new Nebula());
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            nebulae.forEach(n => {
                n.update();
                n.draw();
            });
            
            requestAnimationFrame(animate);
        }
        animate();
    }
    
    function initRunesAnimation() {
        const runes = document.querySelectorAll('.rune');
        
        runes.forEach((rune, index) => {
            rune.style.animationDelay = `${Math.random() * 5}s`;
            rune.style.left = `${Math.random() * 90 + 5}%`;
            rune.style.top = `${Math.random() * 90 + 5}%`;
        });
    }
    
    function initTitleAnimation() {
        const chars = document.querySelectorAll('.char');
        
        chars.forEach((char, index) => {
            char.addEventListener('mouseenter', () => {
                char.style.animation = 'none';
                char.offsetHeight;
                char.style.animation = `char-hover 0.5s ease forwards`;
            });
            
            char.addEventListener('mouseleave', () => {
                char.style.animation = 'title-glow 3s ease-in-out infinite';
            });
        });
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes char-hover {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); filter: drop-shadow(0 0 50px rgba(255, 215, 0, 1)); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
    
    function handleEnter(e) {
        if (e && e.target.closest('.taiji-container') === null && 
            e.target.closest('.enter-hint') === null &&
            e.key !== 'Enter') {
            return;
        }
        
        if (window.getComputedStyle(entranceContainer).opacity === '0') {
            return;
        }
        
        taijiContainer.classList.add('clicked');
        
        const chars = document.querySelectorAll('.char, .sub-char');
        chars.forEach((char, i) => {
            setTimeout(() => {
                char.style.transition = 'all 0.5s ease';
                char.style.transform = 'translateY(-50px) scale(0)';
                char.style.opacity = '0';
            }, i * 50);
        });
        
        createExplosionEffects();
        launchConfetti();
        
        setTimeout(() => {
            entranceContainer.classList.add('fade-out');
        }, 800);
        
        setTimeout(() => {
            window.location.href = 'pages/main.html';
        }, 1800);
    }
    
    function createExplosionEffects() {
        const colors = ['#c9a227', '#ffd700', '#8b0000', '#ff6b35', '#ff1493', '#007fff'];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                left: 50%;
                top: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const angle = (Math.PI * 2 / 50) * i + Math.random() * 0.5;
            const velocity = Math.random() * 500 + 300;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 800,
                easing: 'cubic-bezier(0, 0.5, 0.5, 1)'
            });
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
    
    function launchConfetti() {
        if (typeof confetti === 'function') {
            const duration = 2000;
            const end = Date.now() + duration;
            
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors: ['#c9a227', '#ffd700', '#8b0000', '#ff6b35']
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors: ['#c9a227', '#ffd700', '#8b0000', '#ff6b35']
                });
                
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            })();
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
