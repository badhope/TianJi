(function() {
    const typesData = [
        { name: '外丹', icon: '🔥', description: '以铅汞等金属炼制仙丹', risk: '高', focus: '肉体飞升' },
        { name: '内丹', icon: '🧘', description: '以人身為鼎炉修炼内丹', risk: '中', focus: '精气神合一' },
        { name: '灵宝', icon: '✨', description: '以符咒为主的修炼法门', risk: '低', focus: '通灵祈福' },
        { name: '房中', icon: '💕', description: '以阴阳双修为辅', risk: '高', focus: '采阴补阳' }
    ];

    const elixirsData = [
        { name: '九转还丹', icon: '🔴', description: '炼制九年方成，功效最强', effect: '长生不老', difficulty: '★★★★★' },
        { name: '太乙神丹', icon: '🟡', description: '以太乙真金炼制', effect: '起死回生', difficulty: '★★★★☆' },
        { name: '地元神丹', icon: '🟢', description: '以地元药材炼制', effect: '延年益寿', difficulty: '★★★☆☆' },
        { name: '天皇金液', icon: '⚪', description: '以天皇巨星之力炼制', effect: '白日飞升', difficulty: '★★★★★' }
    ];

    const mastersData = [
        { name: '葛洪', dynasty: '晋', title: '炼丹祖师', contribution: '著《抱朴子》，集炼丹之大成', icon: '👴' },
        { name: '陶弘景', dynasty: '梁', title: '医药大家', contribution: '著《真诰》，发展道教理论', icon: '📚' },
        { name: '魏伯阳', dynasty: '汉', title: '万古丹经王', contribution: '著《周易参同契》，丹经之祖', icon: '📖' },
        { name: '吕洞宾', dynasty: '唐', title: '纯阳真人', contribution: '内丹修炼大成，度化世人', icon: '🗡️' }
    ];

    function init() {
        renderTypes();
        renderElixirs();
        renderMasters();
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
                <span class="type-risk">风险：${type.risk}</span>
                <span class="type-focus">${type.focus}</span>
            </div>
        `).join('');
    }

    function renderElixirs() {
        const grid = document.getElementById('elixirsGrid');
        if (!grid) return;
        
        grid.innerHTML = elixirsData.map((elixir, index) => `
            <div class="elixir-card" data-index="${index}">
                <div class="elixir-icon">${elixir.icon}</div>
                <h3>${elixir.name}</h3>
                <p>${elixir.description}</p>
                <span class="elixir-effect">${elixir.effect}</span>
                <span class="elixir-difficulty">${elixir.difficulty}</span>
            </div>
        `).join('');
    }

    function renderMasters() {
        const grid = document.getElementById('mastersGrid');
        if (!grid) return;
        
        grid.innerHTML = mastersData.map((master, index) => `
            <div class="master-card" data-index="${index}">
                <div class="master-icon">${master.icon}</div>
                <h3>${master.name}</h3>
                <span class="master-dynasty">${master.dynasty}</span>
                <span class="master-title">${master.title}</span>
                <p>${master.contribution}</p>
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
                <h3>⚗️ 炼丹术起源</h3>
                <div class="analysis-block">
                    <p><span class="highlight">炼丹术</span>起源于古代方术，是道教的重要组成部分。炼丹家试图通过炼制和服用"仙丹"来达到长生不老的目的。</p>
                    <p class="section-title">历史发展</p>
                    <p>1. 秦汉时期：方术兴起，开始寻找长生不老药</p>
                    <p>2. 魏晋时期：葛洪发展理论，炼丹术成熟</p>
                    <p>3. 隋唐时期：炼丹达到鼎盛</p>
                    <p>4. 宋元后：内丹术兴起，外丹逐渐衰落</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔥 外丹与内丹</h3>
                <div class="analysis-block">
                    <p class="section-title">外丹</p>
                    <p>外丹是以铅、汞、硫等物质在鼎炉中炼制而成的丹药。古代认为服用后可长生不老，甚至白日飞升。但很多外丹含有重金属，服用危险。</p>
                    <p class="section-title">内丹</p>
                    <p>内丹是以人身為鼎炉，以精气神為药材，在体内修炼而成的"内丹"。相比外丹更为安全，是现代道教修炼的主要方式。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 理性看待</h3>
                <div class="analysis-block">
                    <p>古代炼丹术虽然带有迷信色彩，但其中也蕴含着古代化学、医学等科学成分。</p>
                    <p>1. <span class="highlight">外丹风险</span>：古代很多丹药含有汞、铅等重金属，服用会导致中毒</p>
                    <p>2. <span class="highlight">内丹价值</span>：内丹修炼中的导引、吐纳等方法有益身心健康</p>
                    <p>3. <span class="highlight">文化价值</span>：炼丹术对古代化学、制药有重要贡献</p>
                    <p>4. <span class="highlight">现代观点</span>：应取其精华，去其糟粕</p>
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
