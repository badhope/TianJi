(function() {
    function showToast(message, type = 'info') {
        let container = document.querySelector('.wallpaper-toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'wallpaper-toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = `wallpaper-toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    const WallpaperApp = {
    currentPage: 1,
    itemsPerPage: 12,
    currentCategory: 'all',
    wallpapers: [],
    likedWallpapers: new Set(),
    
    init() {
        this.loadWallpapers();
        this.loadLikes();
        this.renderWallpapers();
        this.bindEvents();
    },
    
    loadWallpapers() {
        this.wallpapers = [
            { id: 1, title: '太极八卦', emoji: '☯️', category: '玄学', tags: ['八卦', '阴阳'], gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', description: '阴阳调和，万物生化' },
            { id: 2, title: '周易六十四卦', emoji: '☰', category: '玄学', tags: ['周易', '卦象'], gradient: 'linear-gradient(135deg, #2d132c 0%, #801336 50%, #c72c41 100%)', description: '易有太极，是生两仪' },
            { id: 3, title: '龙脉风水', emoji: '🐉', category: '风水', tags: ['龙脉', '地理'], gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', description: '藏风聚气，得水为上' },
            { id: 4, title: '五行运转', emoji: '🔥', category: '玄学', tags: ['五行', '相生'], gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)', description: '木火土金水，相生相克' },
            { id: 5, title: '河图洛书', emoji: '🔮', category: '玄学', tags: ['河图', '洛书'], gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', description: '天垂象，见吉凶' },
            { id: 6, title: '奇门遁甲', emoji: '⛩️', category: '玄学', tags: ['奇门', '遁甲'], gradient: 'linear-gradient(135deg, #000428 0%, #004e92 100%)', description: '三奇六仪，八门九星' },
            { id: 7, title: '天干地支', emoji: '📅', category: '命理', tags: ['干支', '六十甲子'], gradient: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)', description: '甲子轮回，岁月流转' },
            { id: 8, title: '八字命理', emoji: '📊', category: '命理', tags: ['八字', '命理'], gradient: 'linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%)', description: '命由天定，运由己造' },
            { id: 9, title: '五行养生', emoji: '🌿', category: '养生', tags: ['养生', '调理'], gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', description: '法于阴阳，和于术数' },
            { id: 10, title: '经络穴位', emoji: '🧘', category: '养生', tags: ['经络', '穴位'], gradient: 'linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)', description: '通则不痛，痛则不通' },
            { id: 11, title: '丹道修炼', emoji: '⚗️', category: '道教', tags: ['炼丹', '筑基'], gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', description: '精气神三宝，炼精化气' },
            { id: 12, title: '内功心法', emoji: '💪', category: '道教', tags: ['内功', '修炼'], gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', description: '意守丹田，气沉涌泉' },
            { id: 13, title: '黄帝内经', emoji: '📜', category: '典籍', tags: ['内经', '医理'], gradient: 'linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)', description: '上医治未病' },
            { id: 14, title: '道德经', emoji: '☯️', category: '典籍', tags: ['道德经', '老子'], gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', description: '道法自然，无为而治' },
            { id: 15, title: '山海经', emoji: '🌊', category: '典籍', tags: ['山海', '神话'], gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', description: '山川异物，地理神话' },
            { id: 16, title: '神兽异兽', emoji: '🦄', category: '神话', tags: ['神兽', '异兽'], gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', description: '麒麟凤凰，祥瑞之兽' },
            { id: 17, title: '二十八星宿', emoji: '⭐', category: '玄学', tags: ['星宿', '天文'], gradient: 'linear-gradient(135deg, #0c3483 0%, #a2b6df 100%)', description: '东方苍龙，北方玄武' },
            { id: 18, title: '罗盘定向', emoji: '🧭', category: '风水', tags: ['罗盘', '方位'], gradient: 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)', description: '辨方正位，定向趋吉' },
            { id: 19, title: '六爻预测', emoji: '🔮', category: '占卜', tags: ['六爻', '预测'], gradient: 'linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%)', description: '静则观象，动则玩占' },
            { id: 20, title: '梅花易数', emoji: '🌸', category: '占卜', tags: ['梅花', '易数'], gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', description: '以象取卦，随机应变' },
            { id: 21, title: '面相学', emoji: '👤', category: '相学', tags: ['面相', '五官'], gradient: 'linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)', description: '相由心生' },
            { id: 22, title: '手相学', emoji: '✋', category: '相学', tags: ['手相', '掌纹'], gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', description: '掌中乾坤' },
            { id: 23, title: '姓名学', emoji: '✍️', category: '命理', tags: ['姓名', '五行'], gradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', description: '名正则言顺' },
            { id: 24, title: '合婚配对', emoji: '💑', category: '命理', tags: ['合婚', '姻缘'], gradient: 'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)', description: '天作之合' },
            { id: 25, title: '择吉日', emoji: '📆', category: '黄历', tags: ['择吉', '宜忌'], gradient: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)', description: '趋吉避凶' },
            { id: 26, title: '彭祖百忌', emoji: '⚠️', category: '黄历', tags: ['彭祖', '百忌'], gradient: 'linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)', description: '日逢彭祖，百忌须知' },
            { id: 27, title: '道法符咒', emoji: '🧿', category: '道教', tags: ['符咒', '道法'], gradient: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)', description: '符到雷霆，咒起风雨' },
            { id: 28, title: '堪舆宝鉴', emoji: '🏔️', category: '风水', tags: ['堪舆', '宝鉴'], gradient: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', description: '风水宝地' },
            { id: 29, title: '龙脉图腾', emoji: '🐲', category: '地理', tags: ['龙脉', '图腾'], gradient: 'linear-gradient(135deg, #c94b4b 0%, #4b134f 100%)', description: '龙脉蜿蜒' },
            { id: 30, title: '气功八段锦', emoji: '🥋', category: '养生', tags: ['气功', '八段锦'], gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)', description: '导气令和，引体令柔' },
            { id: 31, title: '五禽戏', emoji: '🦅', category: '养生', tags: ['五禽', '导引'], gradient: 'linear-gradient(135deg, #ff512f 0%, #dd2476 100%)', description: '虎鹿熊猿鸟' },
            { id: 32, title: '易经智慧', emoji: '📕', category: '典籍', tags: ['易经', '智慧'], gradient: 'linear-gradient(135deg, #ffd200 0%, #f7971e 100%)', description: '穷则变，变则通' },
            { id: 33, title: '搜神记', emoji: '👻', category: '神话', tags: ['搜神', '志怪'], gradient: 'linear-gradient(135deg, #1a1a2e 0%, #162447 50%, #1f4068 100%)', description: '神怪灵异' },
            { id: 34, title: '抱朴子', emoji: '🧪', category: '典籍', tags: ['抱朴', '金丹'], gradient: 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)', description: '仙道贵生' },
            { id: 35, title: '风水罗盘', emoji: '🧭', category: '风水', tags: ['罗盘', '理气'], gradient: 'linear-gradient(135deg, #3c1053 0%, #ad5389 100%)', description: '理气乘气' },
            { id: 36, title: '紫微斗数', emoji: '🌟', category: '命理', tags: ['紫微', '斗数'], gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', description: '星辰命理' },
        ];
    },
    
    loadLikes() {
        try {
            const likes = localStorage.getItem('wallpaperLikes');
            if (likes) {
                this.likedWallpapers = new Set(JSON.parse(likes));
            }
        } catch (e) {
            this.likedWallpapers = new Set();
        }
    },
    
    saveLikes() {
        try {
            localStorage.setItem('wallpaperLikes', JSON.stringify([...this.likedWallpapers]));
        } catch (e) {
            console.warn('Failed to save likes');
        }
    },
    
    getFilteredWallpapers() {
        if (this.currentCategory === 'all') {
            return this.wallpapers;
        }
        return this.wallpapers.filter(w => w.category === this.currentCategory);
    },
    
    getPaginatedWallpapers() {
        const filtered = this.getFilteredWallpapers();
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return filtered.slice(start, start + this.itemsPerPage);
    },
    
    getTotalPages() {
        return Math.ceil(this.getFilteredWallpapers().length / this.itemsPerPage);
    },
    
    renderWallpapers() {
        const grid = document.getElementById('wallpaperGrid');
        if (!grid) return;
        
        const wallpapers = this.getPaginatedWallpapers();
        
        grid.innerHTML = wallpapers.map(w => `
            <div class="wallpaper-card" data-id="${w.id}">
                <div class="wallpaper-preview" style="background: ${w.gradient}">
                    <span>${w.emoji}</span>
                </div>
                <div class="wallpaper-actions">
                    <button class="wallpaper-action-btn like-btn ${this.likedWallpapers.has(w.id) ? 'liked' : ''}" data-id="${w.id}" title="点赞">
                        ${this.likedWallpapers.has(w.id) ? '❤️' : '🤍'}
                    </button>
                    <button class="wallpaper-action-btn preview-btn" data-id="${w.id}" title="预览">👁️</button>
                </div>
                <div class="wallpaper-info">
                    <h3 class="wallpaper-title">${w.title}</h3>
                    <div class="wallpaper-tags">
                        ${w.tags.map(t => `<span class="wallpaper-tag">${t}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
        
        this.renderPagination();
    },
    
    renderPagination() {
        const pagination = document.getElementById('wallpaperPagination');
        if (!pagination) return;
        
        const totalPages = this.getTotalPages();
        let html = '';
        
        html += `<button class="pagination-btn" ${this.currentPage === 1 ? 'disabled' : ''} onclick="WallpaperApp.goToPage(${this.currentPage - 1})">上一页</button>`;
        
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
                html += `<button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" onclick="WallpaperApp.goToPage(${i})">${i}</button>`;
            } else if (i === this.currentPage - 2 || i === this.currentPage + 2) {
                html += `<span style="color: var(--text-muted)">...</span>`;
            }
        }
        
        html += `<button class="pagination-btn" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="WallpaperApp.goToPage(${this.currentPage + 1})">下一页</button>`;
        
        pagination.innerHTML = html;
    },
    
    goToPage(page) {
        const totalPages = this.getTotalPages();
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.renderWallpapers();
        
        window.scrollTo({ top: 300, behavior: 'smooth' });
    },
    
    filterByCategory(category) {
        this.currentCategory = category;
        this.currentPage = 1;
        this.renderWallpapers();
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    },
    
    toggleLike(id) {
        if (this.likedWallpapers.has(id)) {
            this.likedWallpapers.delete(id);
        } else {
            this.likedWallpapers.add(id);
        }
        
        this.saveLikes();
        this.renderWallpapers();
    },
    
    openPreview(id) {
        const wallpaper = this.wallpapers.find(w => w.id === id);
        if (!wallpaper) return;
        
        const modal = document.getElementById('wallpaperModal');
        if (!modal) return;
        
        modal.querySelector('.wallpaper-modal-preview').style.background = wallpaper.gradient;
        modal.querySelector('.wallpaper-modal-preview').innerHTML = `<span>${wallpaper.emoji}</span>`;
        modal.querySelector('.wallpaper-modal-title').textContent = wallpaper.title;
        modal.querySelector('.wallpaper-modal-desc').textContent = wallpaper.description;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },
    
    closePreview() {
        const modal = document.getElementById('wallpaperModal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = '';
    },
    
    setAsWallpaper(id) {
        const wallpaper = this.wallpapers.find(w => w.id === id);
        if (!wallpaper) return;
        
        try {
            localStorage.setItem('userWallpaper', JSON.stringify(wallpaper));
            showToast('壁纸已设置为: ' + wallpaper.title, 'success');
        } catch (e) {
            showToast('设置失败，请重试', 'error');
        }
    },
    
    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('like-btn')) {
                const id = parseInt(e.target.dataset.id);
                this.toggleLike(id);
            }
            
            if (e.target.classList.contains('preview-btn')) {
                const id = parseInt(e.target.dataset.id);
                this.openPreview(id);
            }
            
            if (e.target.classList.contains('wallpaper-modal-close') || e.target.classList.contains('wallpaper-modal')) {
                this.closePreview();
            }
            
            if (e.target.classList.contains('wallpaper-set-btn')) {
                const id = parseInt(e.target.dataset.id) || this.getCurrentModalId();
                this.setAsWallpaper(id);
            }
        });
    },
    
    getCurrentModalId() {
        const modal = document.getElementById('wallpaperModal');
        return modal ? parseInt(modal.dataset.id) : 0;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    WallpaperApp.init();
});
