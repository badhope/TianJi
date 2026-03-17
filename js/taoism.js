(function() {
    const historyData = [
        { period: '远古', event: '道家思想起源', description: '黄帝问道于广成子' },
        { period: '春秋', event: '老子传道', description: '老子西出函谷关，著《道德经》' },
        { period: '战国', event: '庄子发展', description: '庄子继承并发展道家思想' },
        { period: '东汉', event: '道教创立', description: '张道陵创立天师道' },
        { period: '魏晋', event: '葛洪炼丹', description: '葛洪著《抱朴子》，发展丹道' },
        { period: '唐宋', event: '鼎盛时期', description: '吕洞宾度化世人，全真教兴起' }
    ];

    const immortalsData = [
        { name: '铁拐李', icon: '🦵', weapon: '铁拐', specialty: '悬壶济世', description: '八仙之首，蓬头垢面却身怀绝技' },
        { name: '汉钟离', icon: '👴', weapon: '扇子', specialty: '点化凡人', description: '东岳大帝转世，神通广大' },
        { name: '吕洞宾', icon: '🗡️', weapon: '长剑', specialty: '剑术通神', description: '纯阳真人，黄粱梦醒悟道' },
        { name: '何仙姑', icon: '👩', weapon: '荷花', specialty: '预测未来', description: '手持荷花，能知过去未来' },
        { name: '蓝采和', icon: '🎋', weapon: '花篮', specialty: '采药治病', description: '踏歌而行，游戏人间' },
        { name: '韩湘子', icon: '🎵', weapon: '笛子', specialty: '吹笛致雨', description: '韩愈侄子，八仙中最年轻' },
        { name: '曹国舅', icon: '👑', weapon: '玉板', specialty: '净化心灵', description: '皇室出身，看破红尘' },
        { name: '张果老', icon: '🐢', weapon: '渔鼓', specialty: '倒骑毛驴', description: '年龄最大，神仙中最神秘' }
    ];

    const sectsData = [
        { name: '正一道', icon: '⚔️', location: '江西龙虎山', founder: '张道陵', focus: '符箓驱邪' },
        { name: '全真道', icon: '🧘', location: '陕西重阳宫', founder: '王重阳', focus: '内丹修炼' },
        { name: '灵宝道', icon: '📜', location: '江苏阁皂山', founder: '葛洪', focus: '经典教义' },
        { name: '上清道', icon: '🏔️', location: '江苏茅山', founder: '陶弘景', focus: '存神修炼' }
    ];

    function init() {
        renderHistory();
        renderImmortals();
        renderSects();
        setupEventListeners();
    }

    function renderHistory() {
        const timeline = document.getElementById('historyTimeline');
        if (!timeline) return;
        
        timeline.innerHTML = historyData.map((item, index) => `
            <div class="history-item" style="--delay: ${index}">
                <div class="history-period">${item.period}</div>
                <h3>${item.event}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
    }

    function renderImmortals() {
        const grid = document.getElementById('immortalsGrid');
        if (!grid) return;
        
        grid.innerHTML = immortalsData.map((immortal, index) => `
            <div class="immortal-card" data-index="${index}">
                <div class="immortal-icon">${immortal.icon}</div>
                <h3>${immortal.name}</h3>
                <p>${immortal.description}</p>
                <span class="immortal-specialty">${immortal.specialty}</span>
            </div>
        `).join('');
    }

    function renderSects() {
        const grid = document.getElementById('sectsGrid');
        if (!grid) return;
        
        grid.innerHTML = sectsData.map((sect, index) => `
            <div class="sect-card" data-index="${index}">
                <div class="sect-icon">${sect.icon}</div>
                <h3>${sect.name}</h3>
                <p>${sect.location}</p>
                <span class="sect-founder">祖师：${sect.founder}</span>
                <span class="sect-focus">${sect.focus}</span>
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
                <h3>☯ 道教思想</h3>
                <div class="analysis-block">
                    <p>道教是中国本土宗教，以"道"为最高信仰，追求长生不老、得道成仙。</p>
                    <p class="section-title">核心思想</p>
                    <p>1. <span class="highlight">道法自然</span>：顺应自然规律</p>
                    <p>2. <span class="highlight">清静无为</span>：保持内心清静</p>
                    <p>3. <span class="highlight">返璞归真</span>：回归自然本性</p>
                    <p>4. <span class="highlight">长生久视</span>：追求长生不老</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🏛️ 主要流派</h3>
                <div class="analysis-block">
                    <p class="section-title">正一道</p>
                    <p>以符箓驱邪为主要手段，注重斋醮科仪，是天师道的传承。</p>
                    <p class="section-title">全真道</p>
                    <p>以内丹修炼为主，注重清修，主张儒释道三教合一。</p>
                    <p class="section-title">符箓派</p>
                    <p>以符咒驱邪避鬼为主要手段，适合入门修炼。</p>
                    <p class="section-title">丹鼎派</p>
                    <p>以炼制外丹、内丹为主，追求长生不老。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 修道须知</h3>
                <div class="analysis-block">
                    <p>修道需要正确的方法和态度。</p>
                    <p>1. <span class="highlight">积德行善</span>：修道先修身，积德为先</p>
                    <p>2. <span class="highlight">清心寡欲</span>：减少欲望，保持内心平静</p>
                    <p>3. <span class="highlight">持之以恒</span>：修炼需要长期坚持</p>
                    <p>4. <span class="highlight">顺其自然</span>：不强求，顺应天道</p>
                    <p class="section-title">建议</p>
                    <p>初学者建议从读经开始，了解道教思想基础。</p>
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
