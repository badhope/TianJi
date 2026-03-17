(function() {
    const typesData = [
        { name: '动功', icon: '🏃', description: '以运动导引为主，如太极拳、八段锦', focus: '外练筋骨' },
        { name: '静功', icon: '🧘', description: '以静坐调息为主，如静坐功、站桩', focus: '内养精气' },
        { name: '硬功', icon: '💪', description: '以增强体质为主，如易筋经', focus: '强化身体' },
        { name: '软功', icon: '🧘‍♀️', description: '以柔化疏通为主，如柔功术', focus: '疏通经络' }
    ];

    const practiceData = [
        { name: '调息', icon: '🌬️', description: '调节呼吸，使之深长均匀', level: '入门' },
        { name: '调心', icon: '🧠', description: '集中注意力，排除杂念', level: '进阶' },
        { name: '调身', icon: '🧍', description: '调整身体姿势，使之放松', level: '入门' },
        { name: '意守', icon: '🎯', description: '将意念集中于特定部位', level: '进阶' },
        { name: '周天', icon: '🔄', description: '引导气运行小周天或大周天', level: '高级' },
        { name: '收功', icon: '✅', description: '修炼结束时的收束方法', level: '必备' }
    ];

    const effectsData = [
        { title: '强身健体', content: '增强体质，提高免疫力，预防疾病' },
        { title: '延年益寿', content: '调理脏腑，延缓衰老，延长寿命' },
        { title: '疏通经络', content: '促进气血运行，打通经络阻滞' },
        { title: '调节情志', content: '缓解压力，改善情绪，提高睡眠质量' },
        { title: '开发潜能', content: '激发人体潜在能力，提高专注力' },
        { title: '修身养性', content: '培养气质，提升个人修养' }
    ];

    function init() {
        renderTypes();
        renderPractice();
        renderEffects();
        setupEventListeners();
    }

    function renderTypes() {
        const grid = document.getElementById('typesGrid');
        if (!grid) return;
        
        grid.innerHTML = typesData.map((type, index) => `
            <div class="type-card" data-index="${index}">
                <div class="type-icon">${type.icon}</div>
                <h3>${type.name}</h3>
                <p>${type.description}</p>
                <span class="type-focus">${type.focus}</span>
            </div>
        `).join('');
    }

    function renderPractice() {
        const grid = document.getElementById('practiceGrid');
        if (!grid) return;
        
        grid.innerHTML = practiceData.map((item, index) => `
            <div class="practice-card" data-index="${index}">
                <div class="practice-icon">${item.icon}</div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="practice-level">${item.level}</span>
            </div>
        `).join('');
    }

    function renderEffects() {
        const list = document.getElementById('effectsList');
        if (!list) return;
        
        list.innerHTML = effectsData.map((item, index) => `
            <div class="effect-item" style="--delay: ${index}">
                <h3>${item.title}</h3>
                <p>${item.content}</p>
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
                <h3>🌬️ 气功原理</h3>
                <div class="analysis-block">
                    <p><span class="highlight">气功</span>是中国传统文化的瑰宝，通过调息、调心、调身来培养和运用体内之气，达到强身健体、延年益寿的目的。</p>
                    <p class="section-title">理论基础</p>
                    <p>1. <span class="highlight">气血理论</span>：气是生命之源，血是生命之物质基础</p>
                    <p>2. <span class="highlight">经络理论</span>：气沿经络运行，经络通则百病不生</p>
                    <p>3. <span class="highlight">天人合一</span>：人与自然相呼应，<span class="highlight">顺应自然而修炼</span></p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🧘 修炼要点</h3>
                <div class="analysis-block">
                    <p class="section-title">准备工作</p>
                    <p>1. 选择安静、通风的环境</p>
                    <p>2. 穿着宽松舒适的衣服</p>
                    <p>3. 饭前半小时或饭后一小时开始</p>
                    <p>4. 排空大小便，身体放松</p>
                    <p class="section-title">修炼原则</p>
                    <p>1. <span class="highlight">循序渐进</span>：不可急于求成</p>
                    <p>2. <span class="highlight">持之以恒</span>：需要长期坚持</p>
                    <p>3. <span class="highlight">顺其自然</span>：不强求效果</p>
                    <p>4. <span class="highlight">因人而异</span>：选择适合自己的功法</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 注意事项</h3>
                <div class="analysis-block">
                    <p>气功修炼需要正确的方法和态度，否则可能对身体造成伤害。</p>
                    <p>1. <span class="highlight">选择正统</span>：选择有传承的正统功法</p>
                    <p>2. <span class="highlight">明师指导</span>：初学者应有老师指导</p>
                    <p>3. <span class="highlight">身体不适停练</span>：身体不适时暂停修炼</p>
                    <p>4. <span class="highlight">避免走火入魔</span>：不要过分追求特异功能</p>
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
