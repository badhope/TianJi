(function() {
    const trigramsData = [
        { name: '乾', symbol: '☰', nature: '天', direction: '西北', meaning: '刚健', attribute: '金' },
        { name: '坤', symbol: '☷', nature: '地', direction: '西南', meaning: '柔顺', attribute: '土' },
        { name: '震', symbol: '☳', nature: '雷', direction: '东', meaning: '震动', attribute: '木' },
        { name: '巽', symbol: '☴', nature: '风', direction: '东南', meaning: '进入', attribute: '木' },
        { name: '坎', symbol: '☵', nature: '水', direction: '北', meaning: '危险', attribute: '水' },
        { name: '离', symbol: '☲', nature: '火', direction: '南', meaning: '附丽', attribute: '火' },
        { name: '艮', symbol: '☶', nature: '山', direction: '东北', meaning: '停止', attribute: '土' },
        { name: '兑', symbol: '☱', nature: '泽', direction: '西', meaning: '喜悦', attribute: '金' }
    ];

    const hexagramsData = [
        { name: '乾', number: 1, meaning: '元亨利贞', evaluation: '大吉' },
        { name: '坤', number: 2, meaning: '元亨，利牝马之贞', evaluation: '吉' },
        { name: '屯', number: 3, meaning: '元亨利贞，勿用有攸往', evaluation: '中平' },
        { name: '蒙', number: 4, meaning: '亨，匪我求童蒙，童蒙求我', evaluation: '中平' },
        { name: '需', number: 5, meaning: '有孚，光亨，贞吉，利涉大川', evaluation: '吉' },
        { name: '讼', number: 6, meaning: '有孚窒惕，中吉，终凶', evaluation: '凶' },
        { name: '师', number: 7, meaning: '贞丈人吉，无咎', evaluation: '吉' },
        { name: '比', number: 8, meaning: '吉，原筮元永贞，无咎', evaluation: '吉' },
        { name: '小畜', number: 9, meaning: '亨，密云不雨，自我西郊', evaluation: '小吉' },
        { name: '履', number: 10, meaning: '履虎尾，不咥人，亨', evaluation: '吉' }
    ];

    const theoryData = [
        { title: '象数派', icon: '🔢', description: '注重卦象数字分析，推崇象数变化', representative: '邵雍' },
        { title: '义理派', icon: '📖', description: '注重卦辞爻辞的义理阐释', representative: '王弼' },
        { title: '象数义理结合', icon: '⚖️', description: '兼顾象数与义理，综合分析', representative: '朱熹' },
        { title: '占卜派', icon: '🔮', description: '注重占卜问卦的实际应用', representative: '京房' }
    ];

    function init() {
        renderTrigrams();
        renderHexagrams();
        renderTheory();
        setupEventListeners();
    }

    function renderTrigrams() {
        const grid = document.getElementById('trigramsGrid');
        if (!grid) return;
        
        grid.innerHTML = trigramsData.map((trigram, index) => `
            <div class="trigram-card" data-index="${index}">
                <div class="trigram-symbol">${trigram.symbol}</div>
                <h3>${trigram.name}</h3>
                <p>${trigram.nature} · ${trigram.direction}</p>
                <span class="trigram-meaning">${trigram.meaning}</span>
            </div>
        `).join('');
    }

    function renderHexagrams() {
        const list = document.getElementById('hexagramsList');
        if (!list) return;
        
        list.innerHTML = hexagramsData.map((hexagram, index) => `
            <div class="hexagram-item" data-index="${index}">
                <span class="hexagram-number">${hexagram.number}</span>
                <span class="hexagram-name">${hexagram.name}</span>
                <span class="hexagram-meaning">${hexagram.meaning}</span>
                <span class="hexagram-evaluation">${hexagram.evaluation}</span>
            </div>
        `).join('');
    }

    function renderTheory() {
        const grid = document.getElementById('theoryGrid');
        if (!grid) return;
        
        grid.innerHTML = theoryData.map((item, index) => `
            <div class="theory-card" data-index="${index}">
                <div class="theory-icon">${item.icon}</div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="theory-representative">代表：${item.representative}</span>
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
                <h3>☯ 易经六十四卦</h3>
                <div class="analysis-block">
                    <p><span class="highlight">六十四卦</span>是易经的核心，由八卦两两相重而成。每卦六爻，共三百八十四爻。</p>
                    <p class="section-title">卦序</p>
                    <p>六十四卦有一定的排列顺序，《周易》按照"二二相偶，非覆即变"的原则排列。</p>
                    <p class="section-title">卦象</p>
                    <p>每个卦象都有其象征意义，如乾为天、坤为地、坎为水、离为火等。</p>
                    <p class="section-title">卦辞</p>
                    <p>卦辞是对整个卦象的总体解释，是判断吉凶的主要依据。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>📜 爻辞详解</h3>
                <div class="analysis-block">
                    <p>每卦有六爻，从下往上分别为初九、九二、九三、九四、九五、上九（阳爻），或初六、六二、六三、六四、六五、上六（阴爻）。</p>
                    <p class="section-title">爻位</p>
                    <p>1. <span class="highlight">初爻</span>：事物开始</p>
                    <p>2. <span class="highlight">二爻</span>：事物发展</p>
                    <p>3. <span class="highlight">三爻</span>：事物变化</p>
                    <p>4. <span class="highlight">四爻</span>：事物转折</p>
                    <p>5. <span class="highlight">五爻</span>：事物鼎盛</p>
                    <p>6. <span class="highlight">上爻</span>：事物终结</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔮 变卦与互卦</h3>
                <div class="analysis-block">
                    <p class="section-title">变卦</p>
                    <p>变卦是指某一爻发生变化后形成的新卦。阳爻变阴爻，阴爻变阳爻。变卦可以提供更多参考信息。</p>
                    <p class="section-title">互卦</p>
                    <p>互卦是指从本卦中抽取二三爻和四五爻组成的新卦。互卦可以分析事物发展的中间过程。</p>
                    <p class="section-title">错卦</p>
                    <p>错卦是指将本卦所有爻都变为相反的卦，可以从对立面来分析问题。</p>
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
