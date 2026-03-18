(function() {
    function showToast(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}</span><span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    const userPanel = document.getElementById('userPanel');
    const userToggle = document.getElementById('userToggle');
    const historyList = document.getElementById('historyList');
    const favoritesList = document.getElementById('favoritesList');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    const STORAGE_KEYS = {
        history: 'tianji_history',
        favorites: 'tianji_favorites'
    };

    function init() {
        loadUserData();
        setupEventListeners();
        initAnimations();
        initDailyQuote();
    }

    function initDailyQuote() {
        const quotes = [
            { text: "道可道，非常道；名可名，非常名。", source: "《道德经》" },
            { text: "天行健，君子以自强不息。", source: "《周易》" },
            { text: "知人者智，自知者明。", source: "《道德经》" },
            { text: "大音希声，大象无形。", source: "《道德经》" },
            { text: "祸兮福之所倚，福兮祸之所伏。", source: "《道德经》" },
            { text: "上善若水，水善利万物而不争。", source: "《道德经》" },
            { text: "千里之行，始于足下。", source: "《道德经》" },
            { text: "万物并作，吾以观复。", source: "《道德经》" },
            { text: "见素抱朴，少私寡欲。", source: "《道德经》" },
            { text: "知足不辱，知止不殆。", source: "《道德经》" },
            { text: "无极而太极。太极动而生阳，静而生阴。", source: "《太极拳论》" },
            { text: "一阴一阳之谓道，继之者善也，成之者性也。", source: "《周易》" },
            { text: "易有太极，是生两仪，两仪生四象，四象生八卦。", source: "《周易》" },
            { text: "穷则变，变则通，通则久。", source: "《周易》" },
            { text: "天行有常，不为尧存，不为桀亡。", source: "《荀子》" },
            { text: "阴阳者，天地之道也，万物之纲纪。", source: "《黄帝内经》" },
            { text: "正气存内，邪不可干。", source: "《黄帝内经》" },
            { text: "上医治未病，中医治欲病，下医治已病。", source: "《黄帝内经》" },
            { text: "春夏养阳，秋冬养阴。", source: "《黄帝内经》" },
            { text: "法于阴阳，和于术数。", source: "《黄帝内经》" },
            { text: "山不在高，有仙则名；水不在深，有龙则灵。", source: "《陋室铭》" },
            { text: "大鹏一日同风起，扶摇直上九万里。", source: "《上李邕》" },
            { text: "海上生明月，天涯共此时。", source: "《望月怀远》" },
            { text: "人生得意须尽欢，莫使金樽空对月。", source: "《将进酒》" },
            { text: "天地不仁，以万物为刍狗。", source: "《道德经》" },
            { text: "反者道之动，弱者道之用。", source: "《道德经》" },
            { text: "人法地，地法天，天法道，道法自然。", source: "《道德经》" },
            { text: "万物并作，吾以观复。", source: "《道德经》" },
            { text: "致虚极，守静笃。", source: "《道德经》" },
            { text: "物壮则老，是谓不道，不道早已。", source: "《道德经》" }
        ];

        let currentIndex = Math.floor(Math.random() * quotes.length);
        
        function updateQuote() {
            const quoteText = document.getElementById('quoteText');
            const quoteSource = document.getElementById('quoteSource');
            
            if (quoteText) {
                quoteText.style.opacity = 0;
                setTimeout(() => {
                    quoteText.textContent = `"${quotes[currentIndex].text}"`;
                    if (quoteSource) quoteSource.textContent = `—— ${quotes[currentIndex].source}`;
                    quoteText.style.opacity = 1;
                }, 300);
            }
        }

        function nextQuote() {
            currentIndex = (currentIndex + 1) % quotes.length;
            updateQuote();
        }

        const refreshBtn = document.getElementById('quoteRefresh');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', nextQuote);
        }

        updateQuote();
        
        setInterval(() => {
            nextQuote();
        }, 30000);
    }

    function loadUserData() {
        const history = getFromStorage(STORAGE_KEYS.history) || [];
        const favorites = getFromStorage(STORAGE_KEYS.favorites) || [];
        renderHistory(history);
        renderFavorites(favorites);
    }

    function getFromStorage(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch {
            return null;
        }
    }

    function saveToStorage(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.warn('Storage quota exceeded');
        }
    }

    function renderHistory(history) {
        if (!history || history.length === 0) {
            historyList.innerHTML = '<p class="empty-tip">暂无历史记录</p>';
            return;
        }

        historyList.innerHTML = history.slice(0, 10).map(item => `
            <div class="history-item" data-url="${item.url}">
                <span class="item-icon">${item.icon}</span>
                <span class="item-title">${item.title}</span>
                <span class="item-time">${formatTime(item.time)}</span>
            </div>
        `).join('');

        historyList.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                window.location.href = item.dataset.url;
            });
        });
    }

    function renderFavorites(favorites) {
        if (!favorites || favorites.length === 0) {
            favoritesList.innerHTML = '<p class="empty-tip">暂无收藏</p>';
            return;
        }

        favoritesList.innerHTML = favorites.slice(0, 10).map(item => `
            <div class="favorite-item" data-url="${item.url}">
                <span class="item-icon">${item.icon}</span>
                <span class="item-title">${item.title}</span>
                <button class="remove-btn" data-url="${item.url}">×</button>
            </div>
        `).join('');

        favoritesList.querySelectorAll('.favorite-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('remove-btn')) {
                    window.location.href = item.dataset.url;
                }
            });
        });

        favoritesList.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFavorite(btn.dataset.url);
            });
        });
    }

    function formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前';
        if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前';
        return date.toLocaleDateString('zh-CN');
    }

    function removeFavorite(url) {
        const favorites = getFromStorage(STORAGE_KEYS.favorites) || [];
        const newFavorites = favorites.filter(f => f.url !== url);
        saveToStorage(STORAGE_KEYS.favorites, newFavorites);
        renderFavorites(newFavorites);
    }

    function setupEventListeners() {
        userToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            userPanel.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!userPanel.contains(e.target)) {
                userPanel.classList.remove('active');
            }
        });

        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });

        document.querySelectorAll('.title-char').forEach(char => {
            char.addEventListener('click', () => {
                const section = char.dataset.section;
                scrollToSection(section);
            });
        });
    }

    function handleSearch() {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            showToast('搜索功能开发中: ' + query, 'warning');
        }
    }

    function scrollToSection(section) {
        const element = document.querySelector(`.element-card[data-section="${section}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.style.animation = 'none';
            element.offsetHeight;
            element.style.animation = 'card-highlight 0.5s ease';
        }
    }

    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.element-card, .classic-card').forEach(el => {
            observer.observe(el);
        });

        const style = document.createElement('style');
        style.textContent = `
            @keyframes card-highlight {
                0%, 100% { box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); }
                50% { box-shadow: 0 0 40px var(--glow-gold); }
            }
            
            .element-card, .classic-card {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.6s ease;
            }
            
            .element-card.visible, .classic-card.visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        initBgParticles();
        initEnergyFlow();
    }

    function initBgParticles() {
        const canvas = document.getElementById('bgParticlesCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 0.5,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                alpha: Math.random() * 0.5 + 0.2,
                color: ['#c9a227', '#8b6914', '#f0d875', '#d4af37'][Math.floor(Math.random() * 4)]
            };
        }
        
        function init() {
            resize();
            for (let i = 0; i < 100; i++) {
                particles.push(createParticle());
            }
            animate();
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
                
                particles.forEach(p2 => {
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = '#c9a227';
                        ctx.globalAlpha = (1 - dist / 150) * 0.15;
                        ctx.stroke();
                    }
                });
            });
            
            ctx.globalAlpha = 1;
            animationId = requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', resize);
        init();
    }

    function initEnergyFlow() {
        const canvas = document.getElementById('energyCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let waves = [];
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function init() {
            resize();
            for (let i = 0; i < 3; i++) {
                waves.push({
                    y: canvas.height * (0.3 + i * 0.2),
                    amplitude: 30 + i * 10,
                    frequency: 0.01 - i * 0.002,
                    speed: 0.02 + i * 0.01,
                    offset: i * Math.PI / 2,
                    color: `rgba(201, 162, 39, ${0.1 - i * 0.02})`
                });
            }
            animate();
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            waves.forEach((wave, index) => {
                wave.offset += wave.speed;
                
                ctx.beginPath();
                ctx.moveTo(0, wave.y);
                
                for (let x = 0; x < canvas.width; x++) {
                    const y = wave.y + Math.sin(x * wave.frequency + wave.offset) * wave.amplitude;
                    ctx.lineTo(x, y);
                }
                
                ctx.strokeStyle = wave.color;
                ctx.lineWidth = 2;
                ctx.stroke();
                
                const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude);
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.5, wave.color);
                gradient.addColorStop(1, 'transparent');
                
                ctx.lineTo(canvas.width, wave.y + wave.amplitude);
                ctx.lineTo(0, wave.y + wave.amplitude);
                ctx.fillStyle = gradient;
                ctx.globalAlpha = 0.3;
                ctx.fill();
                ctx.globalAlpha = 1;
            });
            
            requestAnimationFrame(animate);
        }
        
        window.addEventListener('resize', resize);
        init();
    }

    window.addToHistory = function(title, icon, url) {
        const history = getFromStorage(STORAGE_KEYS.history) || [];
        const existingIndex = history.findIndex(h => h.url === url);
        
        if (existingIndex > -1) {
            history.splice(existingIndex, 1);
        }
        
        history.unshift({
            title,
            icon,
            url,
            time: Date.now()
        });
        
        const trimmedHistory = history.slice(0, 50);
        saveToStorage(STORAGE_KEYS.history, trimmedHistory);
        renderHistory(trimmedHistory);
    };

    window.addToFavorites = function(title, icon, url) {
        const favorites = getFromStorage(STORAGE_KEYS.favorites) || [];
        
        if (favorites.some(f => f.url === url)) {
            return false;
        }
        
        favorites.unshift({
            title,
            icon,
            url,
            time: Date.now()
        });
        
        saveToStorage(STORAGE_KEYS.favorites, favorites);
        renderFavorites(favorites);
        return true;
    };

    window.removeFromFavorites = removeFavorite;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
