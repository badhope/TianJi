(function() {
    const basicsData = [
        { title: '阴阳', icon: '☯️', description: '宇宙最根本的两种对立统一的力量', application: '万事万物' },
        { title: '五行', icon: '🔄', description: '木火土金水五种基本物质及其运动', application: '相生相克' },
        { title: '八卦', icon: '☰', description: '乾兑离震巽坎艮坤八种基本卦象', application: '推演变化' },
        { title: '天干', icon: '⛨', description: '甲乙丙丁戊己庚辛壬癸十干', application: '时间历法' },
        { title: '地支', icon: '⛨', description: '子丑寅卯辰巳午未申酉戌亥十二支', application: '方位生肖' },
        { title: '河图洛书', icon: '🐢', description: '中华文化源头，天地之数', application: '理数之源' }
    ];

    const toolsData = [
        { name: '周易', icon: '📖', type: '占卜', description: '群经之首，八卦六十四卦', difficulty: '★★★★★' },
        { name: '八字', icon: '📊', type: '命理', description: '以年月日时四柱论命', difficulty: '★★★★☆' },
        { name: '六爻', icon: '🪙', type: '占卜', description: '以铜钱起卦预测吉凶', difficulty: '★★★☆☆' },
        { name: '奇门遁甲', icon: '🗺️', type: '占卜', description: '最高层次的预测学', difficulty: '★★★★★' },
        { name: '大六壬', icon: '📿', type: '占卜', description: '三式之首，神课奇门', difficulty: '★★★★★' },
        { name: '铁板神数', icon: '🔢', type: '命理', description: '邵子神数，精准无比', difficulty: '★★★★★' }
    ];

    const conceptsData = [
        { concept: '天人合一', explanation: '人与自然和谐统一的思想，是玄学的核心理念' },
        { concept: '阴阳平衡', explanation: '阴阳此消彼长，维持平衡是吉利的前提' },
        { concept: '五行流通', explanation: '五行相生相克，流通有序则吉祥如意' },
        { concept: '气场', explanation: '看不见摸不着但真实存在的能量场' },
        { concept: '福报', explanation: '因果报应，积德行善可增福报' },
        { concept: '缘分', explanation: '前世修来的际遇，珍惜有缘人' }
    ];

    function init() {
        renderBasics();
        renderTools();
        renderConcepts();
        setupEventListeners();
    }

    function renderBasics() {
        const grid = document.getElementById('basicsGrid');
        if (!grid) return;
        
        grid.innerHTML = basicsData.map((item, index) => `
            <div class="basic-card" data-index="${index}">
                <div class="basic-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="basic-application">${item.application}</span>
            </div>
        `).join('');
    }

    function renderTools() {
        const grid = document.getElementById('toolsGrid');
        if (!grid) return;
        
        grid.innerHTML = toolsData.map((tool, index) => `
            <div class="tool-card" data-index="${index}">
                <div class="tool-icon">${tool.icon}</div>
                <h3>${tool.name}</h3>
                <span class="tool-type">${tool.type}</span>
                <p>${tool.description}</p>
                <span class="tool-difficulty">${tool.difficulty}</span>
            </div>
        `).join('');
    }

    function renderConcepts() {
        const list = document.getElementById('conceptsList');
        if (!list) return;
        
        list.innerHTML = conceptsData.map((item, index) => `
            <div class="concept-item" style="--delay: ${index}">
                <h3>${item.concept}</h3>
                <p>${item.explanation}</p>
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
                <h3>🔮 玄学体系</h3>
                <div class="analysis-block">
                    <p><span class="highlight">玄学</span>是中国传统文化的重要组成部分，涵盖了预测、占卜、风水、命理等多个领域。</p>
                    <p class="section-title">玄学分类</p>
                    <p>1. <span class="highlight">预测学</span>：周易、六爻、奇门遁甲等</p>
                    <p>2. <span class="highlight">命理学</span>：八字、紫微斗数、铁板神数等</p>
                    <p>3. <span class="highlight">相学</span>：面相、手相、骨相、体相</p>
                    <p>4. <span class="highlight">风水学</span>：阳宅、阴宅、峦头、理气</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>☯️ 阴阳五行</h3>
                <div class="analysis-block">
                    <p class="section-title">阴阳</p>
                    <p>阴阳是宇宙最根本的规律，一切事物都可以用阴阳来概括。如天为阳地为阴，男为阳女为阴。</p>
                    <p class="section-title">五行</p>
                    <p>木生火、火生土、土生金、金生水、水生木</p>
                    <p>木克土、土克水、水克火、火克金、金克木</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 理性看待</h3>
                <div class="analysis-block">
                    <p>玄学是中华文化的宝贵遗产，但我们应该理性看待。</p>
                    <p>1. <span class="highlight">文化价值</span>：玄学蕴含着古人对宇宙人生的深刻思考</p>
                    <p>2. <span class="highlight">心理作用</span>：好的兆头可以增强信心</p>
                    <p>3. <span class="highlight">避免迷信</span>：不应过分依赖，应以积极行动为主</p>
                    <p>4. <span class="highlight">取其精华</span>：学习其中合理的思想成分</p>
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
