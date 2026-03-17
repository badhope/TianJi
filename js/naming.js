(function() {
    const theoryData = [
        { title: '形音义', icon: '🔤', description: '名字的形（字形）、音（读音）、义（含义）三者俱佳为上等', key: '形美音美意美' },
        { title: '五行配置', icon: '🔄', description: '根据八字五行缺失来配置名字的五行', key: '补足缺失' },
        { title: '数理', icon: '🔢', description: '姓名笔画数对应的数理暗示', key: '81数' },
        { title: '生肖', icon: '🐀', description: '结合生肖喜好选择偏旁部首', key: '相生相助' }
    ];

    const strokesData = [
        { number: 1, meaning: '宇宙起源，万物之始', evaluation: '大吉' },
        { number: 2, meaning: '混沌未开，阴阳相生', evaluation: '中吉' },
        { number: 3, meaning: '三才配置，寓意进取', evaluation: '吉' },
        { number: 4, meaning: '四正稳固，基础牢固', evaluation: '中平' },
        { number: 5, meaning: '五福临门，运气极佳', evaluation: '大吉' },
        { number: 6, meaning: '六六大顺，万事如意', evaluation: '吉' },
        { number: 7, meaning: '七星星耀，智慧超群', evaluation: '半吉' },
        { number: 8, meaning: '八卦运筹，财源广进', evaluation: '吉' },
        { number: 9, meaning: '九九归一，成就非凡', evaluation: '半吉' },
        { number: 10, meaning: '十全十美，完美无缺', evaluation: '凶' }
    ];

    const elementsData = [
        { element: '木生火', description: '木性名字配火性名字，木火通明', suitable: '木弱火旺者' },
        { element: '火生土', description: '火性名字配土性名字，火土相生', suitable: '火弱土弱者' },
        { element: '土生金', description: '土性名字配金属名字，土金相生', suitable: '土弱金弱者' },
        { element: '金生水', description: '金属名字配水性名字，金水相生', suitable: '金弱水弱者' },
        { element: '水生木', description: '水性名字配木性名字，水木相生', suitable: '水弱木弱者' },
        { element: '木克土', description: '木性名字克土性名字，注意配置', suitable: '木旺土弱者' }
    ];

    function init() {
        renderTheory();
        renderStrokes();
        renderElements();
        setupEventListeners();
    }

    function renderTheory() {
        const grid = document.getElementById('theoryGrid');
        if (!grid) return;
        
        grid.innerHTML = theoryData.map((item, index) => `
            <div class="theory-card" data-index="${index}">
                <div class="theory-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="theory-key">${item.key}</span>
            </div>
        `).join('');
    }

    function renderStrokes() {
        const grid = document.getElementById('strokesGrid');
        if (!grid) return;
        
        grid.innerHTML = strokesData.map((item, index) => `
            <div class="stroke-card" data-index="${index}">
                <div class="stroke-number">${item.number}</div>
                <p>${item.meaning}</p>
                <span class="stroke-evaluation">${item.evaluation}</span>
            </div>
        `).join('');
    }

    function renderElements() {
        const list = document.getElementById('elementsList');
        if (!list) return;
        
        list.innerHTML = elementsData.map((item, index) => `
            <div class="element-item" style="--delay: ${index}">
                <h3>${item.element}</h3>
                <p>${item.description}</p>
                <span class="element-suitable">适宜：${item.suitable}</span>
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
                <h3>✍️ 姓名学概述</h3>
                <div class="analysis-block">
                    <p><span class="highlight">姓名学</span>是中华传统文化的的重要组成部分，通过分析名字的形、音、义、数理、五行等来推断对命运的影响。</p>
                    <p class="section-title">姓名的重要性</p>
                    <p>1. <span class="highlight">伴随一生</span>：名字是跟随一生的符号</p>
                    <p>2. <span class="highlight">能量传递</span>：名字蕴含着无形的信息能量</p>
                    <p>3. <span class="highlight">心理暗示</span>：好名字带来积极心理暗示</p>
                    <p>4. <span class="highlight">社会印象</span>：影响他人对你的第一印象</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔢 数理分析</h3>
                <div class="analysis-block">
                    <p>姓名学中，81个数理各有其吉凶含义。</p>
                    <p class="section-title">天格（姓氏笔画+1）</p>
                    <p>代表早年运势，与祖先有关。</p>
                    <p class="section-title">人格（姓+名第一字）</p>
                    <p>代表中年运势，主导命运。</p>
                    <p class="section-title">地格（名第一字+名第二字）</p>
                    <p>代表早年运势，与子女有关。</p>
                    <p class="section-title">总格（总笔画数）</p>
                    <p>代表晚年运势，一生总运。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 起名建议</h3>
                <div class="analysis-block">
                    <p>1. <span class="highlight">音韵和谐</span>：名字读起来朗朗上口</p>
                    <p>2. <span class="highlight">寓意美好</span>：名字含义积极向上</p>
                    <p>3. <span class="highlight">五行补益</span>：根据八字五行配置</p>
                    <p>4. <span class="highlight">数理吉祥</span>：避开凶险数理</p>
                    <p>5. <span class="highlight">生肖相合</span>：结合生肖选择偏旁</p>
                    <p>6. <span class="highlight">避免重名</span>：减少重名率</p>
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
