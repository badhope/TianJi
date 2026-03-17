(function() {
    const elementsData = [
        { name: '甲木', nature: '阳木', description: '参天大树栋梁之才', suitable: '正直向上' },
        { name: '乙木', nature: '阴木', description: '花草藤蔓之木', suitable: '柔性发展' },
        { name: '丙火', nature: '阳火', description: '太阳之火猛烈炽热', suitable: '领导才能' },
        { name: '丁火', nature: '阴火', description: '灯烛之火温和细腻', suitable: '艺术气质' },
        { name: '戊土', nature: '阳土', description: '高山厚土承载万物', suitable: '稳重厚道' },
        { name: '己土', nature: '阴土', description: '田园沃土滋养植物', suitable: '包容温和' },
        { name: '庚金', nature: '阳金', description: '刀斧矿石刚健锐利', suitable: '果断决绝' },
        { name: '辛金', nature: '阴金', description: '珠玉首饰精美细腻', suitable: '审美品味' },
        { name: '壬水', nature: '阳水', description: '江河湖海奔流不息', suitable: '聪明灵活' },
        { name: '癸水', nature: '阴水', description: '雨露温泉滋润万物', suitable: '柔情细腻' }
    ];

    const palacesData = [
        { name: '正官', symbol: '👔', role: '管理', description: '正式编制的工作、丈夫、女儿', feature: '正直稳重' },
        { name: '七杀', symbol: '⚔️', role: '竞争', description: '竞争压力、小人、儿子', feature: '刚健勇猛' },
        { name: '正财', symbol: '💰', role: '财运', description: '正当收入、财产、妻子', feature: '务实理财' },
        { name: '偏财', symbol: '💎', role: '偏财', description: '意外之财、投资、情人', feature: '灵活多变' },
        { name: '正印', symbol: '📚', role: '学业', description: '学历证书、母亲、长辈', feature: '学业有成' },
        { name: '偏印', icon: '🧩', role: '领悟', description: '领悟力、继母、偏门', feature: '独特思维' },
        { name: '食神', icon: '🍜', role: '技艺', description: '技艺表演、子女、福气', feature: '才华展现' },
        { name: '伤官', icon: '🎭', role: '发挥', description: '创新能力、下属、晚辈', feature: '才华横溢' },
        { name: '比肩', icon: '🤝', role: '竞争', description: '合作伙伴、兄弟、同事', feature: '竞争合作' },
        { name: '劫财', icon: '💪', role: '争夺', description: '竞争者、兄弟姐妹、财物', feature: '冲动好胜' }
    ];

    const analysisData = [
        { title: '身强身弱', content: '判断八字整体强弱，是分析命理的基础' },
        { title: '用神忌神', content: '找出对命局有利的用神和有害的忌神' },
        { title: '格局定格', content: '根据八字结构确定属于何种格局' },
        { title: '大运流年', content: '分析不同时期的运势变化' },
        { title: '五行流通', content: '看五行之气是否流通顺畅' },
        { title: '十神组合', content: '分析各十神之间的生克关系' }
    ];

    function init() {
        renderElements();
        renderPalaces();
        renderAnalysis();
        setupEventListeners();
    }

    function renderElements() {
        const grid = document.getElementById('elementsGrid');
        if (!grid) return;
        
        grid.innerHTML = elementsData.map((item, index) => `
            <div class="element-card" data-index="${index}">
                <div class="element-name">${item.name}</div>
                <div class="element-nature">${item.nature}</div>
                <p>${item.description}</p>
                <span class="element-suitable">${item.suitable}</span>
            </div>
        `).join('');
    }

    function renderPalaces() {
        const grid = document.getElementById('palacesGrid');
        if (!grid) return;
        
        grid.innerHTML = palacesData.map((palace, index) => `
            <div class="palace-card" data-index="${index}">
                <div class="palace-icon">${palace.symbol || palace.icon}</div>
                <h3>${palace.name}</h3>
                <span class="palace-role">${palace.role}</span>
                <p>${palace.description}</p>
                <span class="palace-feature">${palace.feature}</span>
            </div>
        `).join('');
    }

    function renderAnalysis() {
        const list = document.getElementById('analysisList');
        if (!list) return;
        
        list.innerHTML = analysisData.map((item, index) => `
            <div class="analysis-item" style="--delay: ${index}">
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
                <h3>📊 八字核心要素</h3>
                <div class="analysis-block">
                    <p><span class="highlight">八字</span>，又称四柱八字，是以一个人出生的年、月、日、时四个时间单位，每个单位用天干地支来表示，共八个字。</p>
                    <p class="section-title">天干地支</p>
                    <p>天干：甲乙丙丁戊己庚辛壬癸（十干）</p>
                    <p>地支：子丑寅卯辰巳午未申酉戌亥（十二支）</p>
                    <p class="section-title">五行属性</p>
                    <p>木：甲乙 | 火：丙丁 | 土：戊己 | 金：庚辛 | 水：壬癸</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🏛️ 十神详解</h3>
                <div class="analysis-block">
                    <p>十神是以日干为中心，根据与其他干的五行生克关系确定的名称。</p>
                    <p class="section-title">生我者为印星</p>
                    <p>正印：阴阳相生，如己土生辛金</p>
                    <p>偏印：阴阳同性，如戊土生庚金</p>
                    <p class="section-title">我生者为食伤</p>
                    <p>食神：阴阳相生，如辛金生癸水</p>
                    <p>伤官：阴阳同性，如庚金生壬水</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 命理提示</h3>
                <div class="analysis-block">
                    <p>八字命理是中国传统文化的组成部分，但我们应该理性看待。</p>
                    <p>1. <span class="highlight">仅供参考</span>：命理分析仅供参考，不能决定命运</p>
                    <p>2. <span class="highlight">积德改命</span>：积德行善可以改善运势</p>
                    <p>3. <span class="highlight">努力奋斗</span>：后天努力同样重要</p>
                    <p>4. <span class="highlight">取其精华</span>：学习其中合理的思想</p>
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
