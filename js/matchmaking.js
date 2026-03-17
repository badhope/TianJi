(function() {
    const zodiacData = [
        { sign: '鼠', icon: '🐀', best: ['龙', '猴', '牛'], worst: ['马', '兔', '羊'], color: '蓝金绿' },
        { sign: '牛', icon: '🐂', best: ['蛇', '鸡', '鼠'], worst: ['龙', '马', '羊'], color: '黄绿' },
        { sign: '虎', icon: '🐅', best: ['马', '狗', '猪'], worst: ['蛇', '猴'], color: '蓝灰橙' },
        { sign: '兔', icon: '🐇', best: ['狗', '羊', '猪'], worst: ['鼠', '龙', '鸡'], color: '红粉紫蓝' },
        { sign: '龙', icon: '🐉', best: ['鸡', '猴', '鼠'], worst: ['狗', '兔'], color: '银金' },
        { sign: '蛇', icon: '🐍', best: ['鸡', '牛', '猴'], worst: ['猪', '虎'], color: '黑红' },
        { sign: '马', icon: '🐎', best: ['虎', '狗', '羊'], worst: ['鼠', '牛'], color: '黄绿' },
        { sign: '羊', icon: '🐐', best: ['兔', '马', '猪'], worst: ['牛', '鼠'], color: '绿红紫' },
        { sign: '猴', icon: '🐒', best: ['龙', '蛇', '鼠'], worst: ['虎', '猪'], color: '白蓝金' },
        { sign: '鸡', icon: '🐓', best: ['龙', '蛇', '牛'], worst: ['兔', '狗'], color: '金棕' },
        { sign: '狗', icon: '🐕', best: ['虎', '兔', '马'], worst: ['龙', '鸡', '牛'], color: '红绿紫' },
        { sign: '猪', icon: '🐖', best: ['虎', '兔', '羊'], worst: ['蛇', '猴'], color: '黄灰金' }
    ];

    const elementsMatchData = [
        { combination: '木木配', description: '双方木属性相同，容易产生共鸣', evaluation: '中吉' },
        { combination: '木火配', description: '木生火，一方付出较多', evaluation: '吉' },
        { combination: '木土配', description: '木克土，需要一方迁就', evaluation: '中平' },
        { combination: '木金配', description: '金克木，不利合作', evaluation: '凶' },
        { combination: '木水配', description: '水生木，相互滋养', evaluation: '吉' },
        { combination: '火火配', description: '双方都热情，容易产生摩擦', evaluation: '中平' },
        { combination: '土土配', description: '双方都稳重，踏实可靠', evaluation: '吉' },
        { combination: '金金配', description: '双方都刚强，缺乏柔情', evaluation: '中平' },
        { combination: '水水配', description: '双方都温柔，情感丰富', evaluation: '吉' }
    ];

    const compatibilityData = [
        { title: '生肖合婚', content: '根据双方生肖判断是否相合，包括六合、三合、六冲、六害等关系' },
        { title: '五行互补', content: '分析双方八字五行属性，看是否能互补' },
        { title: '日干合婚', content: '看双方日干是否相合，相合则夫妻感情融洽' },
        { title: '用神互补', content: '看一方用神能否被另一方补足' },
        { title: '桃花运', content: '分析双方桃花星位置，判断婚姻运势' },
        { title: '婚姻宫', content: '看双方婚姻宫是否相冲相合' }
    ];

    function init() {
        renderZodiac();
        renderElementsMatch();
        renderCompatibility();
        setupEventListeners();
    }

    function renderZodiac() {
        const grid = document.getElementById('zodiacGrid');
        if (!grid) return;
        
        grid.innerHTML = zodiacData.map((item, index) => `
            <div class="zodiac-card" data-index="${index}">
                <div class="zodiac-icon">${item.icon}</div>
                <h3>${item.sign}</h3>
                <span class="zodiac-best">最配：${item.best.join('、')}</span>
                <span class="zodiac-worst">最冲：${item.worst.join('、')}</span>
            </div>
        `).join('');
    }

    function renderElementsMatch() {
        const grid = document.getElementById('elementsMatchGrid');
        if (!grid) return;
        
        grid.innerHTML = elementsMatchData.map((item, index) => `
            <div class="element-match-card" data-index="${index}">
                <h3>${item.combination}</h3>
                <p>${item.description}</p>
                <span class="element-match-evaluation">${item.evaluation}</span>
            </div>
        `).join('');
    }

    function renderCompatibility() {
        const list = document.getElementById('compatibilityList');
        if (!list) return;
        
        list.innerHTML = compatibilityData.map((item, index) => `
            <div class="compatibility-item" style="--delay: ${index}">
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
                <h3>💕 合婚概述</h3>
                <div class="analysis-block">
                    <p><span class="highlight">合婚</span>是中华传统婚嫁习俗的重要组成部分，通过分析双方的生肖、五行、八字来判断婚姻的吉凶和适配程度。</p>
                    <p class="section-title">合婚的意义</p>
                    <p>1. <span class="highlight">提前了解</span>：了解双方性格特点</p>
                    <p>2. <span class="highlight">趋吉避凶</span>：提前预防婚姻问题</p>
                    <p>3. <span class="highlight">增进了解</span>：加深对彼此的认识</p>
                    <p>4. <span class="highlight">心理安慰</span>：给双方心理支持</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔄 生肖合婚</h3>
                <div class="analysis-block">
                    <p class="section-title">六合</p>
                    <p>鼠牛合、虎猪合、兔狗合、龙鸡合、蛇猴合、马羊合</p>
                    <p class="section-title">三合</p>
                    <p>申子辰合水局、巳酉丑合金局、寅午戌合火局、亥卯未合木局</p>
                    <p class="section-title">六冲</p>
                    <p>子午冲、丑未冲、寅申冲、卯酉冲、辰戌冲、巳亥冲</p>
                    <p class="section-title">六害</p>
                    <p>子未害、丑午害、寅巳害、卯辰害、申亥害、酉戌害</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 理性看待</h3>
                <div class="analysis-block">
                    <p>合婚是传统文化，但我们应该理性看待。</p>
                    <p>1. <span class="highlight">仅作参考</span>：合婚结果仅供参考</p>
                    <p>2. <span class="highlight">相互包容</span>：婚姻需要双方共同经营</p>
                    <p>3. <span class="highlight">感情基础</span>：爱情才是婚姻的基础</p>
                    <p>4. <span class="highlight">积极沟通</span>：沟通是解决问题的关键</p>
                    <p>5. <span class="highlight">珍惜缘分</span>：百年修得同船渡</p>
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
