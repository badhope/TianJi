(function() {
    const classicsData = [
        { name: '周易', icon: '☯️', author: '伏羲、周文王', dynasty: '商周', description: '群经之首，八卦六十四卦', value: '哲学源头' },
        { name: '诗经', icon: '📖', author: '孔子编', dynasty: '春秋', description: '中国第一部诗歌总集', value: '文学典范' },
        { name: '尚书', icon: '📜', author: '孔子编', dynasty: '春秋', description: '上古帝王文告汇编', value: '政治智慧' },
        { name: '礼记', icon: '📕', author: '戴圣编', dynasty: '汉', description: '儒家礼学论文汇编', value: '礼仪规范' },
        { name: '春秋', icon: '📗', author: '孔子编', dynasty: '春秋', description: '鲁国编年史', value: '史学典范' },
        { name: '论语', icon: '📘', author: '孔子弟子', dynasty: '春秋', description: '孔子及其弟子言行录', value: '儒家思想' }
    ];

    const historyData = [
        { name: '史记', icon: '📜', author: '司马迁', dynasty: '汉', description: '中国第一部纪传体通史', value: '史家绝唱' },
        { name: '汉书', icon: '📙', author: '班固', dynasty: '汉', description: '中国第一部断代史', value: '史学范本' },
        { name: '资治通鉴', icon: '📓', author: '司马光', dynasty: '宋', description: '编年体通史巨著', value: '治世经典' },
        { name: '二十四史', icon: '📚', author: '多朝', dynasty: '各代', description: '历代正史总汇', value: '史学瑰宝' },
        { name: '三国志', icon: '📒', author: '陈寿', dynasty: '晋', description: '魏蜀吴三国史书', value: '三国之源' },
        { name: '明史', icon: '📕', author: '张廷玉', dynasty: '清', description: '明朝历史记录', value: '明代史料' }
    ];

    const philosophyData = [
        { name: '道德经', icon: '☯️', author: '老子', dynasty: '春秋', description: '道家思想源头', value: '道家经典' },
        { name: '庄子', icon: '🦋', author: '庄周', dynasty: '战国', description: '道家代表著作', value: '逍遥自在' },
        { name: '孟子', icon: '👤', author: '孟轲', dynasty: '战国', description: '儒家代表著作', value: '仁政思想' },
        { name: '荀子', icon: '🎋', author: '荀况', dynasty: '战国', description: '儒家代表著作', value: '性恶论' },
        { name: '黄帝内经', icon: '💓', author: '黄帝', dynasty: '战国', description: '中医理论源头', value: '医学瑰宝' },
        { name: '山海经', icon: '🏔️', author: '不详', dynasty: '战国', description: '古代神话地理', value: '神话宝库' }
    ];

    const literatureData = [
        { name: '楚辞', icon: '🎭', author: '屈原', dynasty: '战国', description: '骚体诗歌总集', value: '浪漫主义' },
        { name: '唐诗三百首', icon: '🌸', author: '蘅塘退士编', dynasty: '清', description: '唐诗精选集', value: '诗歌典范' },
        { name: '宋词', icon: '🌙', author: '多人', dynasty: '宋', description: '宋代词作精选', value: '词学瑰宝' },
        { name: '红楼梦', icon: '🏠', author: '曹雪芹', dynasty: '清', description: '中国古典小说巅峰', value: '四大名著' },
        { name: '水浒传', icon: '⚔️', author: '施耐庵', dynasty: '元末', description: '农民起义小说', value: '四大名著' },
        { name: '三国演义', icon: '🗡️', author: '罗贯中', dynasty: '明', description: '三国历史小说', value: '四大名著' }
    ];

    function init() {
        renderClassics();
        renderHistory();
        renderPhilosophy();
        renderLiterature();
        setupEventListeners();
    }

    function renderClassics() {
        const grid = document.getElementById('classicsGrid');
        if (!grid) return;
        
        grid.innerHTML = classicsData.map((item, index) => `
            <div class="classic-card" data-index="${index}">
                <div class="classic-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.author} · ${item.dynasty}</p>
                <span class="classic-desc">${item.description}</span>
            </div>
        `).join('');
    }

    function renderHistory() {
        const grid = document.getElementById('historyGrid');
        if (!grid) return;
        
        grid.innerHTML = historyData.map((item, index) => `
            <div class="history-card" data-index="${index}">
                <div class="history-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.author} · ${item.dynasty}</p>
                <span class="history-desc">${item.description}</span>
            </div>
        `).join('');
    }

    function renderPhilosophy() {
        const grid = document.getElementById('philosophyGrid');
        if (!grid) return;
        
        grid.innerHTML = philosophyData.map((item, index) => `
            <div class="philosophy-card" data-index="${index}">
                <div class="philosophy-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.author} · ${item.dynasty}</p>
                <span class="philosophy-desc">${item.description}</span>
            </div>
        `).join('');
    }

    function renderLiterature() {
        const grid = document.getElementById('literatureGrid');
        if (!grid) return;
        
        grid.innerHTML = literatureData.map((item, index) => `
            <div class="literature-card" data-index="${index}">
                <div class="literature-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.author} · ${item.dynasty}</p>
                <span class="literature-desc">${item.description}</span>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', showExpandedDetails);
        }

        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) {
            closeExpanded.addEventListener('click', hideExpandedDetails);
        }
    }

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>📚 四部分类法</h3>
                <div class="analysis-block">
                    <p>中国古代图书分为经、史、子、集四部，称为<span class="highlight">四部分类法</span>。</p>
                    <p class="section-title">经部</p>
                    <p>儒家经典，如《诗经》、《尚书》、《礼记》、《周易》、《春秋》等。</p>
                    <p class="section-title">史部</p>
                    <p>历史著作，如《史记》、《汉书》、《资治通鉴》等。</p>
                    <p class="section-title">子部</p>
                    <p>诸子百家著作，如《老子》、《庄子》、《孟子》等。</p>
                    <p class="section-title">集部</p>
                    <p>文学作品，如《楚辞》、《唐诗》、《宋词》、《红楼梦》等。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>📖 典籍价值</h3>
                <div class="analysis-block">
                    <p>中国古代典籍是中华文化的瑰宝，蕴含着丰富的哲学思想、治国智慧和文学艺术。</p>
                    <p class="section-title">思想价值</p>
                    <p>典籍蕴含着儒、道、佛等各家思想，是中华精神的载体。</p>
                    <p class="section-title">实践价值</p>
                    <p>典籍中的治国理政、修身齐家思想至今仍有借鉴意义。</p>
                    <p class="section-title">艺术价值</p>
                    <p>典籍中的诗词歌赋、小说戏曲是中华文学艺术的巅峰。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔍 典籍传承</h3>
                <div class="analysis-block">
                    <p>古代典籍的传承经历了漫长的发展过程。</p>
                    <p>1. <span class="highlight">简牍时代</span>：战国至东汉</p>
                    <p>2. <span class="highlight">帛书时代</span>：战国至唐</p>
                    <p>3. <span class="highlight">纸书时代</span>：东汉至今</p>
                    <p>4. <span class="highlight">数字化时代</span>：现代</p>
                    <p>现代通过古籍整理、数字化等方式让典籍焕发新生。</p>
                </div>
            </div>
        `;
        
        expandedDetails.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            if (expandedDetails) {
                expandedDetails.animate([
                    { opacity: 0, transform: 'translateY(30px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ], {
                    duration: 500,
                    easing: 'ease-out'
                });
            }
        }, 10);
    }

    function hideExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        if (!expandedDetails) return;
        
        expandedDetails.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(30px)' }
        ], {
            duration: 400,
            easing: 'ease-in'
        }).onfinish = () => {
            expandedDetails.style.display = 'none';
            document.body.style.overflow = '';
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
