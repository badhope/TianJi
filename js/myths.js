(function() {
    function showToast(message, type = 'info') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    const timelineData = [
        { era: '混沌时期', event: '混沌初开', description: '天地未分，混沌如鸡子', icon: '🌑' },
        { era: '盘古开天', event: '开天辟地', description: '盘古大神挥斧劈开天地', icon: '🪓' },
        { era: '女娲造人', event: '抟土造人', description: '女娲以泥土造出人类', icon: '👩' },
        { era: '共工撞天', event: '天塌地陷', description: '共工怒触不周山', icon: '⛰️' },
        { era: '女娲补天', event: '炼石补天', description: '女娲炼制五彩石修补天空', icon: '🌈' }
    ];

    const godsData = [
        { name: '盘古', icon: '🧑', title: '创世神', description: '开天辟地的巨神，身体化作山河大地', power: '创造世界' },
        { name: '女娲', icon: '👩', title: '造物神', description: '抟土造人、炼石补天的人类始祖', power: '创造与修补' },
        { name: '伏羲', icon: '👴', title: '文化神', description: '发明八卦、创造文字的文明始祖', power: '智慧与文明' },
        { name: '神农', icon: '👨‍🌾', title: '农业神', description: '尝百草、发明农业的医药之祖', power: '医药与农业' },
        { name: '黄帝', icon: '👑', title: '人文初祖', description: '统一华夏、发明衣冠的中华民族始祖', power: '人文与制度' },
        { name: '嫦娥', icon: '👸', title: '月神', description: '服用仙药飞升月宫', power: '月宫之主' }
    ];

    const heroesData = [
        { name: '后羿', icon: '🏹', achievement: '射日英雄', description: '射下九日，拯救苍生', weapon: '射日弓' },
        { name: '大禹', icon: '👷', achievement: '治水英雄', description: '疏导洪水，划分九州', tool: '禹王疏' },
        { name: '姜子牙', icon: '🎋', achievement: '辅周灭商', description: '辅佐周朝建立八百周', weapon: '打神鞭' },
        { name: '哪吒', icon: '🦵', achievement: '闹海英雄', description: '三头六臂，大闹龙宫', weapon: '风火轮' },
        { name: '二郎神', icon: '🐕', achievement: '担山赶日', description: '第三只眼，啸天犬随行', weapon: '三尖两刃刀' },
        { name: '济公', icon: '👺', achievement: '活佛济世', description: '鞋儿破帽儿破的活佛', tool: '破扇子' }
    ];

    function init() {
        renderTimeline();
        renderGods();
        renderHeroes();
        setupEventListeners();
    }

    function renderTimeline() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;
        
        timeline.innerHTML = timelineData.map((item, index) => `
            <div class="timeline-item" style="--delay: ${index}">
                <div class="timeline-icon">${item.icon}</div>
                <div class="timeline-content">
                    <h3>${item.era}</h3>
                    <h4>${item.event}</h4>
                    <p>${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    function renderGods() {
        const grid = document.getElementById('godsGrid');
        if (!grid) return;
        
        grid.innerHTML = godsData.map((god, index) => `
            <div class="god-card" data-index="${index}">
                <div class="god-icon">${god.icon}</div>
                <div class="god-name">${god.name}</div>
                <div class="god-title">${god.title}</div>
            </div>
        `).join('');
    }

    function renderHeroes() {
        const grid = document.getElementById('heroesGrid');
        if (!grid) return;
        
        grid.innerHTML = heroesData.map((hero, index) => `
            <div class="hero-card" data-index="${index}">
                <div class="hero-icon">${hero.icon}</div>
                <div class="hero-name">${hero.name}</div>
                <div class="hero-achievement">${hero.achievement}</div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.querySelectorAll('.god-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                showGodDetail(godsData[index]);
            });
        });

        document.querySelectorAll('.hero-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                showHeroDetail(heroesData[index]);
            });
        });

        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', showExpandedDetails);
        }

        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) {
            closeExpanded.addEventListener('click', hideExpandedDetails);
        }
    }

    function showGodDetail(god) {
        showToast(`${god.name} - ${god.title}\n${god.description}\n神力：${god.power}`, 'success');
    }

    function showHeroDetail(hero) {
        showToast(`${hero.name} - ${hero.achievement}\n${hero.description}`, 'success');
    }

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>✨ 中国神话体系</h3>
                <div class="analysis-block">
                    <p>中国神话体系源远流长，是中华文化的重要组成部分。从混沌开辟到女娲造人，从后羿射日到嫦娥奔月，构成了完整的创世神话体系。</p>
                    <p class="section-title">神话特点</p>
                    <p>1. <span class="highlight">以人为本</span>：中国神话强调人的作用，神往往具有人形</p>
                    <p>2. <span class="highlight">实用理性</span>：神话往往与现实生活紧密结合</p>
                    <p>3. <span class="highlight">历史化</span>：很多神话人物被考证为历史人物</p>
                    <p>4. <span class="highlight">连续性</span>：神话体系发展脉络清晰</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🏛️ 神话与文化</h3>
                <div class="analysis-block">
                    <p class="section-title">文学影响</p>
                    <p>中国神话对文学产生了深远影响，《诗经》、《楚辞》、唐诗宋词中都能看到神话的影子。</p>
                    <p class="section-title">哲学思想</p>
                    <p>神话中蕴含的阴阳五行、天人合一等思想成为中华哲学的重要源头。</p>
                    <p class="section-title">民间信仰</p>
                    <p>很多神话人物成为民间信仰的对象，如关帝庙、妈祖庙、观音庙等。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔮 神话传说与占卜</h3>
                <div class="analysis-block">
                    <p>神话与占卜有着密切的联系，很多占卜方法都源于神话传说。</p>
                    <p class="section-title">周易与八卦</p>
                    <p>伏羲观天象、察地形，创制八卦，成为周易的基础。</p>
                    <p class="section-title">占星术</p>
                    <p>神话中的星宿神，如二十八星宿，成为占星术的重要依据。</p>
                    <p class="section-title">梦占</p>
                    <p>黄帝梦游华胥之境，成为梦占的典故。</p>
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
