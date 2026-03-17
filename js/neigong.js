(function() {
    const basicsData = [
        { title: '气的概念', icon: '💨', description: '气是生命之源，分为先天之气和后天之气', key: '元气、真气、宗气' },
        { title: '意的运用', icon: '🧠', description: '意是修炼的指挥官，引导气的运行', key: '意念、观想、存思' },
        { title: '呼吸法门', icon: '🌬️', description: '呼吸是沟通内外的桥梁', key: '调息、吐纳、胎息' },
        { title: '放松入静', icon: '😌', description: '放松是进入修炼状态的基础', key: '松静、自然、虚无' }
    ];

    const methodsData = [
        { name: '太极拳', icon: '☯️', type: '柔功', difficulty: '★★☆☆☆', description: '以柔克刚，以静制动', benefit: '调和气血、强身健体' },
        { name: '八段锦', icon: '🧘', type: '导引', difficulty: '★☆☆☆☆', description: '八式导引术，简便易学', benefit: '舒筋活络、调理脏腑' },
        { name: '易筋经', icon: '💪', type: '硬功', difficulty: '★★★☆☆', description: '外练筋骨皮，内练精气神', benefit: '增强体质、提升力量' },
        { name: '五禽戏', icon: '🐯', type: '仿生', difficulty: '★☆☆☆☆', description: '模仿五禽动作，强身健体', benefit: '预防疾病、延年益寿' },
        { name: '六字诀', icon: '📢', type: '吐纳', difficulty: '★☆☆☆☆', description: '六字对应五脏，吐故纳新', benefit: '调理脏腑、排浊留清' },
        { name: '静坐功', icon: '🧘‍♂️', type: '静功', difficulty: '★★★★☆', description: '打坐调息，静心养性', benefit: '宁心安神、开发智慧' }
    ];

    const levelsData = [
        { level: '入门', name: '引气入体', description: '初步感知气的存在', time: '1-3个月' },
        { level: '初级', name: '气沉丹田', description: '能将气汇聚于丹田', time: '3-6个月' },
        { level: '中级', name: '小周天', description: '气通任督二脉', time: '1-2年' },
        { level: '高级', name: '大周天', description: '气通十二正经', time: '3-5年' },
        { level: '圆满', name: '打通奇经八脉', description: '八脉皆通，气场强大', time: '5-10年' }
    ];

    function init() {
        renderBasics();
        renderMethods();
        renderLevels();
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
                <span class="basic-key">${item.key}</span>
            </div>
        `).join('');
    }

    function renderMethods() {
        const grid = document.getElementById('methodsGrid');
        if (!grid) return;
        
        grid.innerHTML = methodsData.map((method, index) => `
            <div class="method-card" data-index="${index}">
                <div class="method-icon">${method.icon}</div>
                <h3>${method.name}</h3>
                <span class="method-type">${method.type}</span>
                <span class="method-difficulty">${method.difficulty}</span>
                <p>${method.description}</p>
                <span class="method-benefit">${method.benefit}</span>
            </div>
        `).join('');
    }

    function renderLevels() {
        const timeline = document.getElementById('levelsTimeline');
        if (!timeline) return;
        
        timeline.innerHTML = levelsData.map((item, index) => `
            <div class="level-item" style="--delay: ${index}">
                <div class="level-badge">${item.level}</div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="level-time">约${item.time}</span>
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
                <h3>🧘 内功修炼原理</h3>
                <div class="analysis-block">
                    <p><span class="highlight">内功</span>是中国传统武术和养生修炼的核心，通过调节呼吸、意念和身体姿势来培养和运用体内之气。</p>
                    <p class="section-title">修炼原理</p>
                    <p>1. <span class="highlight">以意引气</span>：通过意念引导气的运行</p>
                    <p>2. <span class="highlight">以气运身</span>：气带动身体的运动</p>
                    <p>3. <span class="highlight">内外合一</span>：身心合一，天人合一</p>
                    <p>4. <span class="highlight">循序渐进</span>：不可急于求成</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🏮 修炼要点</h3>
                <div class="analysis-block">
                    <p class="section-title">准备工作</p>
                    <p>1. 选择安静、通风的环境</p>
                    <p>2. 穿着宽松舒适的衣服</p>
                    <p>3. 饭前半小时或饭后一小时开始</p>
                    <p>4. 排空大小便，身体放松</p>
                    <p class="section-title">修炼禁忌</p>
                    <p>1. 过度劳累时不宜修炼</p>
                    <p>2. 情绪激动时不宜修炼</p>
                    <p>3. 孕妇及经期女性需谨慎</p>
                    <p>4. 修炼后忌立即洗澡</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 注意事项</h3>
                <div class="analysis-block">
                    <p>内功修炼需要正确的方法和态度，否则可能对身体造成伤害。</p>
                    <p>1. <span class="highlight">循序渐进</span>：不可急于求成，应根据自身情况调整强度</p>
                    <p>2. <span class="highlight">因人而异</span>：根据自身体质选择合适的功法</p>
                    <p>3. <span class="highlight">持之以恒</span>：修炼需要长期坚持，不能三天打鱼两天晒网</p>
                    <p>4. <span class="highlight">顺其自然</span>：不强求效果，让身体自然调节</p>
                    <p class="section-title">建议</p>
                    <p>初学者建议在有经验的老师指导下修炼，避免走火入魔。</p>
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
