(function() {
    const theoryData = [
        { title: '阴阳平衡', icon: '☯️', description: '阴阳平衡是健康的根本', key: '阴平阳秘' },
        { title: '对立统一', icon: '⚖️', description: '阴阳相互对立又相互依存', key: '相反相成' },
        { title: '消长转化', icon: '🔄', description: '阴阳此消彼长，不断转化', key: '物极必反' },
        { title: '天人相应', icon: '🌍', description: '人体与自然环境相呼应', key: '顺应四时' }
    ];

    const organsData = [
        { name: '心', icon: '❤️', nature: '火', function: '主血脉、藏神', emotion: '喜', season: '夏' },
        { name: '肝', icon: '💚', nature: '木', function: '主疏泄、藏血', emotion: '怒', season: '春' },
        { name: '脾', icon: '💛', nature: '土', function: '主运化、统血', emotion: '思', season: '长夏' },
        { name: '肺', icon: '🤍', nature: '金', function: '主气、司呼吸', emotion: '悲', season: '秋' },
        { name: '肾', icon: '🖤', nature: '水', function: '藏精、主水', emotion: '恐', season: '冬' }
    ];

    const healthData = [
        { title: '起居有常', content: '作息规律，顺应日出日落' },
        { title: '饮食有节', content: '定时定量，不暴饮暴食' },
        { title: '不妄作劳', content: '劳逸结合，避免过度劳累' },
        { title: '虚邪贼风', content: '避之有时，预防外邪侵袭' },
        { title: '精神内守', content: '保持情志安定，不过喜过悲' },
        { title: '法于阴阳', content: '遵循阴阳变化规律生活' }
    ];

    function init() {
        renderTheory();
        renderOrgans();
        renderHealth();
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

    function renderOrgans() {
        const grid = document.getElementById('organsGrid');
        if (!grid) return;
        
        grid.innerHTML = organsData.map((organ, index) => `
            <div class="organ-card" data-index="${index}">
                <div class="organ-icon">${organ.icon}</div>
                <h3>${organ.name}</h3>
                <span class="organ-nature">${organ.nature}</span>
                <p>${organ.function}</p>
                <span class="organ-emotion">情志：${organ.emotion}</span>
                <span class="organ-season">旺于${organ.season}</span>
            </div>
        `).join('');
    }

    function renderHealth() {
        const list = document.getElementById('healthList');
        if (!list) return;
        
        list.innerHTML = healthData.map((item, index) => `
            <div class="health-item" style="--delay: ${index}">
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
                <h3>📜 黄帝内经概述</h3>
                <div class="analysis-block">
                    <p><span class="highlight">黄帝内经</span>是中国最早的医学典籍，分为《素问》和《灵枢》两部分。它奠定了中医的理论基础，被誉为"医之始祖"。</p>
                    <p class="section-title">核心思想</p>
                    <p>1. <span class="highlight">整体观念</span>：人体是一个有机整体</p>
                    <p>2. <span class="highlight">辨证论治</span>：根据症状辨证治疗</p>
                    <p>3. <span class="highlight">预防为主</span>：治未病是最高境界</p>
                    <p>4. <span class="highlight">天人合一</span>：人与自然和谐统一</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🧠 阴阳五行与健康</h3>
                <div class="analysis-block">
                    <p class="section-title">阴阳与疾病</p>
                    <p>阴阳失调是疾病的根本原因。阳盛则热，阴盛则寒；阳虚则寒，阴虚则热。</p>
                    <p class="section-title">五行与脏腑</p>
                    <p>木对应肝，春气通于肝</p>
                    <p>火对应心，夏气通于心</p>
                    <p>土对应脾，长夏气通于脾</p>
                    <p>金对应肺，秋气通于肺</p>
                    <p>水对应肾，冬气通于肾</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🏥 养生智慧</h3>
                <div class="analysis-block">
                    <p>《黄帝内经》提出了"上医治未病"的理念，强调预防为主。</p>
                    <p>1. <span class="highlight">法于阴阳</span>：顺应自然规律生活</p>
                    <p>2. <span class="highlight">和于术数</span>：掌握养生方法</p>
                    <p>3. <span class="highlight">食饮有节</span>：饮食有节制</p>
                    <p>4. <span class="highlight">起居有常</span>：作息有规律</p>
                    <p>5. <span class="highlight">不妄作劳</span>：不过度劳累</p>
                    <p>6. <span class="highlight">精神内守</span>：保持心情平静</p>
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
