(function() {
    const zodiacData = {
        rat: { icon: '🐀', name: '鼠', color: '#4a90a4' },
        ox: { icon: '🐂', name: '牛', color: '#8b6914' },
        tiger: { icon: '🐅', name: '虎', color: '#e67e22' },
        rabbit: { icon: '🐇', name: '兔', color: '#e91e63' },
        dragon: { icon: '🐉', name: '龙', color: '#9c27b0' },
        snake: { icon: '🐍', name: '蛇', color: '#673ab7' },
        horse: { icon: '🐎', name: '马', color: '#f44336' },
        goat: { icon: '🐐', name: '羊', color: '#795548' },
        monkey: { icon: '🐒', name: '猴', color: '#ff9800' },
        rooster: { icon: '🐓', name: '鸡', color: '#607d8b' },
        dog: { icon: '🐕', name: '狗', color: '#8d6e63' },
        pig: { icon: '🐖', name: '猪', color: '#f48fb1' }
    };

    const fortuneDescriptions = {
        excellent: [
            '今日运势极佳，各方面都将有出色的表现。事业上可能会有意外的惊喜和机遇，爱情方面也会有甜蜜的收获。财运亨通，适合进行投资理财。保持积极乐观的心态，好运将伴随您一整天。',
            '今天是收获满满的一天！您之前的努力将得到回报，无论是事业还是感情都会有好的进展。财运上如有神助，不妨把握机会。身体状态良好，适合外出活动。',
            '运势处于巅峰状态，各方面都能顺利发展。特别是人际关系方面，您将得到贵人的帮助和支持。工作中如有创意想法不妨大胆提出，很可能获得认可。'
        ],
        good: [
            '今日运势良好，保持平稳的心态即可。有小波折但都能顺利解决。事业上按部就班前进，感情上与伴侣相处融洽。财运方面保守为佳，不宜冒险。',
            '整体运势不错，工作和生活中都有好消息传来。与人合作要保持诚信，这将为您带来更多机遇。健康方面注意休息，保持充足的睡眠质量。',
            '今天是充实的一天，虽然可能会有些忙碌，但结果会让您满意。财运有小幅上升，可以考虑小额投资。感情上需要多花时间陪伴重要的人。'
        ],
        average: [
            '今日运势一般，建议保持低调。可能会遇到一些小挑战，但只要沉下心来都能克服。事业上没有太大进展，需要耐心等待时机。财运平稳，不宜有大的财务动作。',
            '运势趋于平稳，没有太多波澜。工作中可能会感到有些疲惫，建议适当休息。感情方面要多沟通，避免误会。健康需要注意饮食规律。',
            '今天是比较平常的一天，不需要有太大期待。做好本职工作，保持良好心态即可。财运没有明显变化，投资需谨慎。适合进行一些轻松的活动。'
        ],
        poor: [
            '今日运势较低迷，需要调整好心态。可能会遇到一些困难和挫折，但这些都是成长的机会。建议暂时放缓脚步，多反思总结。',
            '运势不佳，凡事三思而后行。工作上可能会遇到阻力，要保持耐心。感情上容易产生误会，需要多沟通。财运方面可能会有破财风险，务必谨慎。',
            '今天需要特别小心谨慎。可能会遇到一些意外情况，保持冷静最为重要。建议暂时不要做重大决定，多听取他人意见。健康方面注意防护。'
        ]
    };

    const luckyItems = {
        colors: ['红色', '金色', '蓝色', '绿色', '紫色', '白色', '黑色', '黄色'],
        numbers: ['3', '7', '8', '9', '12', '18', '24', '36'],
        directions: ['正东', '正南', '正西', '正北', '东南', '西南', '东北', '西北']
    };

    let currentZodiac = null;
    let currentFortune = null;

    function init() {
        setupEventListeners();
        loadSavedFortune();
    }

    function setupEventListeners() {
        document.querySelectorAll('.zodiac-btn').forEach(btn => {
            btn.addEventListener('click', () => selectZodiac(btn.dataset.zodiac));
        });

        const saveBtn = document.getElementById('saveFortuneBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveFortune);
        }

        const shareBtn = document.getElementById('shareFortuneBtn');
        if (shareBtn) {
            shareBtn.addEventListener('click', shareFortune);
        }

        const detailBtn = document.getElementById('viewDetailBtn');
        if (detailBtn) {
            detailBtn.addEventListener('click', showDetailModal);
        }

        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', showExpandedDetails);
        }

        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) {
            closeExpanded.addEventListener('click', hideExpandedDetails);
        }

        const modalClose = document.getElementById('modalClose');
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        const modal = document.getElementById('detailModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    }

    function selectZodiac(zodiac) {
        currentZodiac = zodiac;
        
        document.querySelectorAll('.zodiac-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.zodiac === zodiac) {
                btn.classList.add('active');
            }
        });

        const loadingSection = document.getElementById('loadingSection');
        const fortuneResult = document.getElementById('fortuneResult');
        
        if (loadingSection && fortuneResult) {
            loadingSection.style.display = 'block';
            fortuneResult.style.display = 'none';
        }

        setTimeout(() => {
            generateFortune(zodiac);
        }, 1500);
    }

    function generateFortune(zodiac) {
        const hash = hashCode(zodiac + new Date().toDateString());
        const rand = (n) => Math.abs(hash) % n;
        
        const overall = Math.floor(rand(40) + 60);
        const career = Math.floor(rand(40) + 50);
        const love = Math.floor(rand(40) + 55);
        const wealth = Math.floor(rand(40) + 50);
        const health = Math.floor(rand(30) + 70);

        let fortuneLevel;
        if (overall >= 85) fortuneLevel = 'excellent';
        else if (overall >= 70) fortuneLevel = 'good';
        else if (overall >= 55) fortuneLevel = 'average';
        else fortuneLevel = 'poor';

        const descriptions = fortuneDescriptions[fortuneLevel];
        const description = descriptions[rand(descriptions.length)];

        currentFortune = {
            zodiac,
            date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }),
            overall,
            career,
            love,
            wealth,
            health,
            luckyColor: luckyItems.colors[rand(luckyItems.colors.length)],
            luckyNumber: luckyItems.numbers[rand(luckyItems.numbers.length)],
            luckyDirection: luckyItems.directions[rand(luckyItems.directions.length)],
            description,
            timestamp: Date.now()
        };

        displayFortune(currentFortune);
        
        if (window.addToHistory) {
            window.addToHistory('每日运势', '☀️', 'fortune.html');
        }
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    function displayFortune(fortune) {
        const loadingSection = document.getElementById('loadingSection');
        const fortuneResult = document.getElementById('fortuneResult');
        
        if (loadingSection) loadingSection.style.display = 'none';
        if (fortuneResult) fortuneResult.style.display = 'block';

        const data = zodiacData[fortune.zodiac];
        
        const resultZodiac = document.getElementById('resultZodiac');
        if (resultZodiac) {
            resultZodiac.innerHTML = `
                <span class="result-zodiac-icon">${data.icon}</span>
                <span class="result-zodiac-name">${data.name}年</span>
            `;
        }

        const resultDate = document.getElementById('resultDate');
        if (resultDate) resultDate.textContent = fortune.date;

        animateScore('overall', fortune.overall);
        animateScore('career', fortune.career);
        animateScore('love', fortune.love);
        animateScore('wealth', fortune.wealth);
        animateScore('health', fortune.health);

        const luckyColor = document.getElementById('luckyColor');
        const luckyNumber = document.getElementById('luckyNumber');
        const luckyDirection = document.getElementById('luckyDirection');
        
        if (luckyColor) luckyColor.textContent = fortune.luckyColor;
        if (luckyNumber) luckyNumber.textContent = fortune.luckyNumber;
        if (luckyDirection) luckyDirection.textContent = fortune.luckyDirection;

        const fortuneDesc = document.getElementById('fortuneDesc');
        if (fortuneDesc) fortuneDesc.textContent = fortune.description;
    }

    function animateScore(type, value) {
        const fill = document.getElementById(`${type}Score`);
        const valueEl = document.getElementById(`${type}Value`);
        
        if (fill) {
            setTimeout(() => {
                fill.style.width = `${value}%`;
            }, 100);
        }
        
        if (valueEl) {
            let current = 0;
            const increment = value / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    current = value;
                    clearInterval(timer);
                }
                valueEl.textContent = Math.floor(current);
            }, 30);
        }
    }

    function saveFortune() {
        if (!currentFortune) return;
        
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_fortunes') || '[]');
            saved.unshift(currentFortune);
            const trimmed = saved.slice(0, 30);
            localStorage.setItem('tianji_fortunes', JSON.stringify(trimmed));
            
            if (window.addToFavorites) {
                window.addToFavorites('运势结果', '☀️', 'fortune.html');
            }
            
            alert('运势结果已保存！');
        } catch (e) {
            alert('保存失败，请重试');
        }
    }

    function shareFortune() {
        if (!currentFortune || !currentFortune.zodiac) return;
        
        const data = zodiacData[currentFortune.zodiac];
        const text = `【${data.name}年今日运势】\n综合: ${currentFortune.overall}分\n事业: ${currentFortune.career}分\n爱情: ${currentFortune.love}分\n财运: ${currentFortune.wealth}分\n健康: ${currentFortune.health}分\n幸运颜色: ${currentFortune.luckyColor}\n幸运数字: ${currentFortune.luckyNumber}\n\n来源: 天机`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                alert('运势已复制到剪贴板！');
            });
        } else {
            alert('您的浏览器不支持复制功能');
        }
    }

    function showDetailModal() {
        if (!currentFortune) return;
        
        const modal = document.getElementById('detailModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;

        const data = zodiacData[currentFortune.zodiac];
        
        let levelText = '';
        if (currentFortune.overall >= 85) levelText = '极佳';
        else if (currentFortune.overall >= 70) levelText = '良好';
        else if (currentFortune.overall >= 55) levelText = '一般';
        else levelText = '欠佳';

        modalBody.innerHTML = `
            <div style="text-align: center; margin-bottom: 20px;">
                <span style="font-size: 3rem;">${data.icon}</span>
                <h3 style="color: var(--primary-gold); margin-top: 10px;">${data.name}年 · ${levelText}运势</h3>
                <p style="color: var(--text-muted);">${currentFortune.date}</p>
            </div>
            
            <h3>📊 各项运势详解</h3>
            <p><strong>综合运势：</strong>${currentFortune.overall}分 - ${levelText}</p>
            <p><strong>事业运势：</strong>${currentFortune.career}分 - ${currentFortune.career >= 70 ? '事业发展顺利' : '需要多加努力'}</p>
            <p><strong>爱情运势：</strong>${currentFortune.love}分 - ${currentFortune.love >= 70 ? '感情甜蜜' : '需要注意沟通'}</p>
            <p><strong>财运运势：</strong>${currentFortune.wealth}分 - ${currentFortune.wealth >= 70 ? '财运亨通' : '需谨慎理财'}</p>
            <p><strong>健康运势：</strong>${currentFortune.health}分 - ${currentFortune.health >= 70 ? '身体健康' : '注意休息'}</p>
            
            <h3>🍀 今日幸运元素</h3>
            <p>幸运颜色：<span style="color: var(--primary-gold);">${currentFortune.luckyColor}</span></p>
            <p>幸运数字：<span style="color: var(--primary-gold);">${currentFortune.luckyNumber}</span></p>
            <p>财神方位：<span style="color: var(--primary-gold);">${currentFortune.luckyDirection}</span></p>
            
            <h3>💡 运势建议</h3>
            <p>${currentFortune.description}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px;">
                <p style="font-size: 0.9rem; color: var(--text-muted);">本运势仅供娱乐参考，请勿过分迷信。人生掌握在自己手中，努力奋斗才是最重要的！</p>
            </div>
        `;
        
        modal.classList.add('active');
    }

    function closeModal() {
        const modal = document.getElementById('detailModal');
        if (modal) modal.classList.remove('active');
    }

    function showExpandedDetails() {
        if (!currentFortune) return;
        
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        const data = zodiacData[currentFortune.zodiac];
        
        let levelText = '';
        let levelClass = '';
        if (currentFortune.overall >= 85) {
            levelText = '极佳';
            levelClass = 'excellent';
        } else if (currentFortune.overall >= 70) {
            levelText = '良好';
            levelClass = 'good';
        } else if (currentFortune.overall >= 55) {
            levelText = '一般';
            levelClass = 'average';
        } else {
            levelText = '欠佳';
            levelClass = 'poor';
        }

        const zodiacAnalysis = getZodiacDetailedAnalysis(currentFortune.zodiac, currentFortune.overall);
        const careerGuidance = getCareerGuidance(currentFortune.career);
        const loveAnalysis = getLoveAnalysis(currentFortune.love, currentFortune.zodiac);
        const wealthAdvice = getWealthAdvice(currentFortune.wealth);
        const healthGuidance = getHealthGuidance(currentFortune.health);
        const monthlyFortune = getMonthlyFortune(currentFortune.zodiac);
        const yearlyFortune = getYearlyFortune(currentFortune.zodiac);
        const warnings = getWarnings(currentFortune.zodiac, currentFortune.overall);

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🐀 生肖本命运势</h3>
                <div class="analysis-block">
                    <p><span class="highlight">今日运势评级：</span>${levelText}</p>
                    <p>${zodiacAnalysis}</p>
                    <p class="section-title">命理点评</p>
                    <p>${data.name}年出生之人，今日天干地支相互作用，五行气场处于<span class="highlight">${getTodayElement()}</span>当令之时。结合您的生肖特性，今日在<span class="positive">${getFavorableDirections(currentFortune.zodiac)}</span>方向行事较为有利。</p>
                    <p>今日各宫位磁场分布：事业宫<span class="positive">${currentFortune.career}%</span>、财帛宫<span class="${currentFortune.wealth >= 70 ? 'positive' : 'negative'}">${currentFortune.wealth}%</span>、夫妻宫<span class="${currentFortune.love >= 70 ? 'positive' : 'negative'}">${currentFortune.love}%</span>、疾厄宫<span class="${currentFortune.health >= 70 ? 'positive' : 'negative'}">${currentFortune.health}%</span>。整体命盘呈现${levelText}之象。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>💼 事业官运深度分析</h3>
                <div class="analysis-block">
                    <p><span class="highlight">事业运势指数：</span>${currentFortune.career}分</p>
                    <p>${careerGuidance}</p>
                    <p class="section-title">事业吉时</p>
                    <p>今日事业发展<span class="${currentFortune.career >= 70 ? 'positive' : 'negative'}">${currentFortune.career >= 70 ? '顺遂' : '需稳扎稳打'}</span>。上午9点至11点为事业吉时，此时段利于开展重要工作。下午3点至5点宜处理协调事务。</p>
                    <p class="section-title">贵人方位</p>
                    <p>事业上的贵人多出现在<span class="highlight">${get贵人方位(currentFortune.zodiac)}</span>方向。与属<span class="highlight">${get贵人属相(currentFortune.zodiac)}</span>的人合作可事半功倍。</p>
                    <p class="section-title">事业建议</p>
                    <p>${getCareerAdvice(currentFortune.career)}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>❤️ 感情婚姻深度解读</h3>
                <div class="analysis-block">
                    <p><span class="highlight">感情运势指数：</span>${currentFortune.love}分</p>
                    <p>${loveAnalysis}</p>
                    <p class="section-title">今日感情吉时</p>
                    <p>感情发展<span class="${currentFortune.love >= 70 ? 'positive' : 'negative'}">${currentFortune.love >= 70 ? '甜蜜顺利' : '需要用心经营'}</span>。晚间7点至9点为感情交流的黄金时段，此时与伴侣沟通效果最佳。</p>
                    <p class="section-title">单身者指引</p>
                    <p>${getSingleAdvice(currentFortune.zodiac, currentFortune.love)}</p>
                    <p class="section-title">已有伴侣者</p>
                    <p>${getCoupleAdvice(currentFortune.love)}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>💰 财富运势全面分析</h3>
                <div class="analysis-block">
                    <p><span class="highlight">财富运势指数：</span>${currentFortune.wealth}分</p>
                    <p>${wealthAdvice}</p>
                    <p class="section-title">今日财位</p>
                    <p>财神爷今日降临<span class="highlight">${currentFortune.luckyDirection}</span>方位，起床后面向该方向深呼吸三次，可提升今日财运。</p>
                    <p class="section-title">幸运数字与颜色</p>
                    <div class="lucky-grid">
                        <div class="lucky-item">
                            <div class="label">幸运数字</div>
                            <div class="value">${currentFortune.luckyNumber}</div>
                        </div>
                        <div class="lucky-item">
                            <div class="label">幸运颜色</div>
                            <div class="value">${currentFortune.luckyColor}</div>
                        </div>
                        <div class="lucky-item">
                            <div class="label">财神方位</div>
                            <div class="value">${currentFortune.luckyDirection}</div>
                        </div>
                        <div class="lucky-item">
                            <div class="label">今日吉数</div>
                            <div class="value">${getAuspiciousNumber(currentFortune.zodiac)}</div>
                        </div>
                    </div>
                    <p class="section-title">财富建议</p>
                    <p>${getWealthDetailedAdvice(currentFortune.wealth, currentFortune.zodiac)}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🏥 健康养生专业指导</h3>
                <div class="analysis-block">
                    <p><span class="highlight">健康运势指数：</span>${currentFortune.health}分</p>
                    <p>${healthGuidance}</p>
                    <p class="section-title">今日养生要点</p>
                    <p>${getTodayHealthCare(currentFortune.zodiac)}</p>
                    <p class="section-title">饮食建议</p>
                    <p>${getDietAdvice(currentFortune.health)}</p>
                    <p class="section-title">运动建议</p>
                    <p>${getExerciseAdvice(currentFortune.health)}</p>
                    <p class="section-title">健康禁忌</p>
                    <p>${getHealthWarnings(currentFortune.zodiac)}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>📅 本月运势总览</h3>
                <div class="analysis-block">
                    <p>${monthlyFortune}</p>
                    <p class="section-title">本月吉祥方位</p>
                    <p>本月<span class="highlight">${getMonthlyAuspiciousDirection(currentFortune.zodiac)}</span>为本次月最有利方位，可在此方向进行重要活动。</p>
                    <p class="section-title">本月幸运数字</p>
                    <p>本月数字<span class="highlight">${getMonthlyLuckyNumber(currentFortune.zodiac)}</span>将为您带来好运。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🗓️ 全年运势展望</h3>
                <div class="analysis-block">
                    <p>${yearlyFortune}</p>
                    <p class="section-title">本年度关键词</p>
                    <p>${getYearKeyword(currentFortune.zodiac)}</p>
                    <p class="section-title">需要注意的月份</p>
                    <p>${getCautionMonths(currentFortune.zodiac)}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 今日注意事项</h3>
                <div class="analysis-block">
                    ${warnings}
                </div>
            </div>

            <div class="detail-section">
                <h3>🔮 今日开运指南</h3>
                <div class="analysis-block">
                    <p class="section-title">穿衣指南</p>
                    <p>今日穿着<span class="highlight">${currentFortune.luckyColor}</span>颜色的衣物可增强运势。</p>
                    <p class="section-title">佩戴饰品</p>
                    <p>佩戴<span class="highlight">${getAccessory(currentFortune.zodiac)}</span>可提升今日气场。</p>
                    <p class="section-title">开运动作</p>
                    <p>${getLuckyAction(currentFortune.zodiac)}</p>
                    <p class="section-title">睡前仪式</p>
                    <p>睡前默念三遍"天地无极，乾坤借法"，可净化今日气场，提升睡眠质量。</p>
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

    function getZodiacDetailedAnalysis(zodiac, overall) {
        const analyses = {
            rat: `鼠年出生者今日机灵敏锐，思维活跃。子鼠为水，智慧之星照耀今日运势，适合进行脑力劳动和创意工作。`,
            ox: `丑牛今日踏实稳重，脚踏实地的工作将获得回报。属牛者今日不宜急躁，稳步前进必有收获。`,
            tiger: `寅虎今日气势如虹，魄力十足。有利于开展新项目或进行重要决策，但需注意避免过于冲动。`,
            rabbit: `卯兔今日温顺柔和，人际关系顺畅。适合处理需要协调沟通的事务，贵人运佳。`,
            dragon: `辰龙今日龙腾四海，气场强大。事业上有望获得突破性进展，但需注意锋芒毕露带来的副作用。`,
            snake: `巳蛇今日智慧深邃，思考深入。适合进行研究和分析工作，直觉也非常准确。`,
            horse: `午马今日活力四射，行动力强。适合外出办事或进行体育活动，但要避免过度消耗体力。`,
            goat: `未羊今日和气生财，人缘极佳。适合社交活动，与人合作可获得意外收获。`,
            monkey: `申猴今日聪明伶俐，反应敏捷。适合处理突发状况，创新思维活跃。`,
            rooster: `酉鸡今日精神抖擞，效率提升。适合处理重要事务，但要避免过于追求完美。`,
            dog: `戌狗今日忠诚正直，人际磁场正面。适合表达情感或处理与信用相关的事务。`,
            pig: `亥猪今日福气满满，心态平和。适合修身养性，但需注意避免过于慵懒。`
        };
        return analyses[zodiac] || '';
    }

    function getCareerGuidance(score) {
        if (score >= 85) return '今日事业运极佳，工作中的努力将得到上级认可，有望获得晋升或加薪的机会。适合开展新项目或接受挑战性任务。';
        if (score >= 70) return '事业发展顺利，工作中的人际关系和谐，任务能够按时完成。适当把握机会展示自己的能力。';
        if (score >= 55) return '事业运势平稳，按部就班完成工作即可。遇到困难时可寻求同事帮助，团队协作将带来转机。';
        return '事业发展遇到一定阻力，建议保持低调，多学习提升专业技能，等待时机再行动。';
    }

    function getLoveAnalysis(score, zodiac) {
        if (score >= 85) return '今日感情运势极佳，单身者有望遇到理想对象，已有伴侣者感情甜蜜。桃花运旺盛，适合表白或约会。';
        if (score >= 70) return '感情生活和谐，与伴侣相处融洽。单身者可多参加社交活动，有机会结识新朋友。';
        if (score >= 55) return '感情运势一般，需要主动表达情感。适当的沟通可以化解误会，增进彼此了解。';
        return '感情运势较低迷，建议暂时保持理性，不要过于冲动做决定。';
    }

    function getWealthAdvice(score) {
        if (score >= 85) return '财运亨通！今日有望获得意外之财，如中奖、投资收益等。但需理性把握，不可贪心冒进。';
        if (score >= 70) return '财运良好，正财收入稳定。适当进行理财规划，可获得额外收益。';
        if (score >= 55) return '财运平稳，不宜进行大额投资。保持现有财务状况，避免冲动消费。';
        return '财运较低迷，建议守财为主，避免冒险投资。精打细算度过今日。';
    }

    function getHealthGuidance(score) {
        if (score >= 85) return '今日健康状况极佳，精力充沛。适合进行各种运动和户外活动，身体状态达到最佳。';
        if (score >= 70) return '健康状况良好，保持规律作息即可。适当运动有助于提升整体状态。';
        if (score >= 55) return '身体状态一般，需要注意休息。避免过度劳累，保持充足睡眠。';
        return '健康运势欠佳，建议进行全面体检或调理。注意预防感冒等常见疾病。';
    }

    function getMonthlyFortune(zodiac) {
        const monthFortunes = {
            rat: '本月整体运势平稳上升，工作中有望取得突破。财运方面正财为主，偏财可适当关注。',
            ox: '本月事业运势良好，适合稳扎稳打。人际关系的处理需要多加注意，避免小人干扰。',
            tiger: '本月气势如虹，适合开展新事业。但需注意团队协作，过于独断可能影响发展。',
            rabbit: '本月人缘运势极佳，适合拓展社交圈。感情方面有不错的发展机会。',
            dragon: '本月事业财运双丰收，是收获的季节。但需注意休息，避免过度劳累。',
            snake: '本月智慧运势突出，适合学习进修。思考问题时角度独特，常有创见。',
            horse: '本月行动力强，适合外出办事。但需注意交通安全，户外活动需做好准备。',
            goat: '本月和气生财，适合团队合作。财运稳定，人际关系带来实际收益。',
            monkey: '本月思维敏捷，适合创意工作。财运有波动，需谨慎理财。',
            rooster: '本月工作效率高，适合处理重要事务。但需注意细节，避免因小失大。',
            dog: '本月信用运势佳，适合建立长期关系。感情稳定，家庭和睦。',
            pig: '本月福气满满，适合修身养性。但需避免过度享乐，保持积极进取。'
        };
        return monthFortunes[zodiac] || '本月运势平稳，顺势而为即可。';
    }

    function getYearlyFortune(zodiac) {
        const yearFortunes = {
            rat: '龙年整体运势先抑后扬，上半年需要韬光养晦，下半年运势上升。',
            ox: '龙年是属牛者的冲太岁年份，需要低调行事，注意健康。',
            tiger: '龙年事业运势极佳，有望获得重用。但需注意处理好人际关系。',
            rabbit: '龙年人财运亨通，适合进行投资理财。感情方面也有不错的发展。',
            dragon: '龙年是属龙者的值太岁之年，运势波动较大，需要谨慎应对。',
            snake: '龙年智慧运势突出，适合学术研究或技术深耕。',
            horse: '龙年驿马星动，适合外出发展或变换工作环境。',
            goat: '龙年人缘运势佳，适合建立人脉网络。团队合作带来好运。',
            monkey: '龙年事业上有望突破，适合创业或转型。',
            rooster: '龙年财运稳定，正财收入可观。需要注意健康保养。',
            dog: '龙年感情运势佳，适合结婚或确立关系。',
            pig: '龙年整体运势平稳，是积累沉淀的一年，为来年开始准备。'
        };
        return yearFortunes[zodiac] || '龙年运势平稳发展，顺势而为。';
    }

    function getWarnings(zodiac, overall) {
        let warnings = '';
        
        if (overall < 60) {
            warnings += `<div class="warning-box"><p>⚠️ 今日整体运势欠佳，建议保持谨慎，避免冒险行为。</p></div>`;
        }
        
        const zodiacWarnings = {
            rat: '<p>属鼠者今日需注意头部健康，避免过度用脑。</p>',
            ox: '<p>属牛者今日脾胃较虚弱，饮食需清淡。</p>',
            tiger: '<p>属虎者今日肝火较旺，需保持心态平和。</p>',
            rabbit: '<p>属兔者今日注意呼吸系统健康。</p>',
            dragon: '<p>属龙者今日注意调节情绪，避免激动。</p>',
            snake: '<p>属蛇者今日注意消化系统，避免暴饮暴食。</p>',
            horse: '<p>属马者今日注意心血管健康，避免剧烈运动。</p>',
            goat: '<p>属羊者今日注意皮肤护理，避免过敏。</p>',
            monkey: '<p>属猴者今日注意神经系统，适当放松。</p>',
            rooster: '<p>属鸡者今日注意呼吸系统，早晚注意保暖。</p>',
            dog: '<p>属狗者今日注意关节健康，避免受凉。</p>',
            pig: '<p>属猪者今日注意泌尿系统，保持水分补充。</p>'
        };
        
        warnings += zodiacWarnings[zodiac] || '';
        
        if (!warnings) {
            warnings = '<p>今日运势平稳，无特殊注意事项。保持良好心态即可。</p>';
        }
        
        return warnings;
    }

    function getTodayElement() {
        const elements = ['木', '火', '土', '金', '水'];
        const day = new Date().getDate();
        return elements[day % 5];
    }

    function getFavorableDirections(zodiac) {
        const directions = {
            rat: '东、东南',
            ox: '东北、西南',
            tiger: '东南、西北',
            rabbit: '东、北',
            dragon: '南、东南',
            snake: '西南、东北',
            horse: '东南、西',
            goat: '西南、东北',
            monkey: '北、西',
            rooster: '西南、东',
            dog: '南、东南',
            pig: '东北、西南'
        };
        return directions[zodiac] || '东';
    }

    function get贵人方位(zodiac) {
        const directions = {
            rat: '东南', ox: '西南', tiger: '西北', rabbit: '北',
            dragon: '南', snake: '东北', horse: '西', goat: '西南',
            monkey: '北', rooster: '东', dog: '南', pig: '东北'
        };
        return directions[zodiac] || '东';
    }

    function get贵人属相(zodiac) {
        const compatible = {
            rat: '龙、猴、牛', ox: '蛇、鸡、猴', tiger: '马、狗',
            rabbit: '羊、狗、猪', dragon: '猴、鼠', snake: '鸡、牛',
            horse: '虎、羊、狗', goat: '马、猪、兔', monkey: '蛇、鼠',
            rooster: '龙、牛、蛇', dog: '虎、兔、马', pig: '羊、兔'
        };
        return compatible[zodiac] || '鼠';
    }

    function getCareerAdvice(score) {
        if (score >= 80) return '今日事业运势极佳，把握机会展示才华，有望获得重用。工作中可大胆提出创新想法。';
        if (score >= 60) return '保持积极工作态度，与同事协作配合。遇到问题及时沟通解决。';
        return '今日事业运普通，宜韬光养晦，多学习积累，为后续发展做准备。';
    }

    function getSingleAdvice(zodiac, score) {
        if (score >= 75) return '今日桃花运旺盛！适合参加聚会或相亲活动，有望遇到有缘人。佩戴粉色水晶可增强运势。';
        if (score >= 50) return '感情运平稳，可以多参加社交活动认识新朋友。保持开放心态，缘分自然会来。';
        return '今日不宜急于求成，建议先把精力投入工作或兴趣爱好，缘分天注定。';
    }

    function getCoupleAdvice(score) {
        if (score >= 75) return '今日与伴侣感情甜蜜，适合安排浪漫约会或送礼物增进感情。';
        if (score >= 50) return '感情稳定，注意多沟通交流，遇到分歧耐心倾听对方想法。';
        return '今日与伴侣可能有些小摩擦，建议保持冷静，多站在对方角度思考问题。';
    }

    function getAuspiciousNumber(zodiac) {
        const numbers = {
            rat: '2、6、9', ox: '1、5、9', tiger: '1、3、4',
            rabbit: '3、4、9', dragon: '1、6、8', snake: '2、8、9',
            horse: '2、3、7', goat: '3、6、9', monkey: '1、7、8',
            rooster: '5、7、8', dog: '3、5、7', pig: '2、5、8'
        };
        return numbers[zodiac] || '8';
    }

    function getWealthDetailedAdvice(score, zodiac) {
        if (score >= 80) return '今日财运极佳，可适当参与投资或购买理财产品。但不可贪心，设置合理的盈利目标。';
        if (score >= 60) return '正财稳定，适合努力工作获取收入。偏财方面可关注小额投资。';
        return '今日财运一般，守成为主。避免冲动消费和风险投资，把精力放在正财收入上。';
    }

    function getTodayHealthCare(zodiac) {
        const careTips = {
            rat: '今日宜养心，多做深呼吸练习，避免情绪波动。',
            ox: '注意脾胃调理，早餐要吃好，避免生冷食物。',
            tiger: '注意肝脏保养，保持规律作息，避免熬夜。',
            rabbit: '呼吸系统较弱，户外活动需注意空气质量。',
            dragon: '注意心脏健康，保持情绪稳定，避免激动。',
            snake: '调理脾胃，饮食要有规律，避免暴饮暴食。',
            horse: '心血管健康要注意，避免剧烈运动和情绪波动。',
            goat: '注意皮肤护理，保持肌肤清洁，适当补水。',
            monkey: '神经系统需要放松，避免过度思考和工作。',
            rooster: '呼吸系统较弱，早晚注意保暖，适当锻炼。',
            dog: '关节健康要注意，避免受凉和过度劳累。',
            pig: '注意水分补充，保持充足睡眠，调节作息。'
        };
        return careTips[zodiac] || '保持规律作息即可。';
    }

    function getDietAdvice(score) {
        if (score >= 75) return '今日适合清补，多吃蔬菜水果，适当补充优质蛋白。';
        if (score >= 50) return '饮食以清淡为主，避免辛辣刺激性食物。';
        return '今日脾胃较弱，建议喝粥调理，少吃油腻食物。';
    }

    function getExerciseAdvice(score) {
        if (score >= 75) return '适合各种运动，跑步、游泳、瑜伽都可以进行。';
        if (score >= 50) return '适合轻度运动，如散步、太极、瑜伽等。';
        return '建议休息为主，避免剧烈运动，可进行简单的伸展练习。';
    }

    function getHealthWarnings(zodiac) {
        const warnings = {
            rat: '避免过度用脑，注意休息眼睛。',
            ox: '避免生冷食物，注意饮食卫生。',
            tiger: '避免情绪激动，保持心平气和。',
            rabbit: '避免去人多的地方，预防呼吸道疾病。',
            dragon: '避免过度劳累，注意心脏休息。',
            snake: '避免暴饮暴食，规律用餐。',
            horse: '避免剧烈运动，注意安全。',
            goat: '避免熬夜，保持充足睡眠。',
            monkey: '避免过度思虑，适当放松。',
            rooster: '注意保暖，预防感冒。',
            dog: '避免受凉，保护关节。',
            pig: '避免久坐，多活动身体。'
        };
        return warnings[zodiac] || '保持良好生活习惯。';
    }

    function getMonthlyAuspiciousDirection(zodiac) {
        const directions = {
            rat: '东南', ox: '西南', tiger: '西北', rabbit: '北',
            dragon: '东南', snake: '东北', horse: '西', goat: '西南',
            monkey: '北', rooster: '西南', dog: '南', pig: '东北'
        };
        return directions[zodiac] || '东';
    }

    function getMonthlyLuckyNumber(zodiac) {
        const numbers = {
            rat: '6', ox: '5', tiger: '3', rabbit: '9',
            dragon: '8', snake: '2', horse: '7', goat: '3',
            monkey: '7', rooster: '8', dog: '5', pig: '8'
        };
        return numbers[zodiac] || '8';
    }

    function getYearKeyword(zodiac) {
        const keywords = {
            rat: '突破、创新、挑战',
            ox: '稳健、积累、沉淀',
            tiger: '进取、开拓、领导',
            rabbit: '和谐、平衡、发展',
            dragon: '飞跃、腾飞、荣耀',
            snake: '智慧、深化、领悟',
            horse: '行动、远行、突破',
            goat: '合作、收获、人和',
            monkey: '灵活、创意、转型',
            rooster: '精进、细致、完美',
            dog: '忠诚、正义、守护',
            pig: '福气、圆满、修养'
        };
        return keywords[zodiac] || '发展、成长';
    }

    function getCautionMonths(zodiac) {
        const months = {
            rat: '农历三月、七月',
            ox: '农历五月、八月',
            tiger: '农历六月、九月',
            rabbit: '农历四月、七月',
            dragon: '农历三月、八月',
            snake: '农历五月、七月',
            horse: '农历四月、六月',
            goat: '农历二月、五月',
            monkey: '农历四月、八月',
            rooster: '农历三月、六月',
            dog: '农历五月、九月',
            pig: '农历四月、七月'
        };
        return months[zodiac] || '农历五月、六月';
    }

    function getAccessory(zodiac) {
        const accessories = {
            rat: '水晶或金属饰品',
            ox: '玉质或陶瓷饰品',
            tiger: '木质或皮革饰品',
            rabbit: '玉石或珍珠饰品',
            dragon: '金属或宝石饰品',
            snake: '玉质或黑曜石饰品',
            horse: '金属或火红色饰品',
            goat: '玉石或羊脂玉饰品',
            monkey: '金属或猴形饰品',
            rooster: '金属或羽毛饰品',
            dog: '玉石或狗形饰品',
            pig: '玉石或粉水晶饰品'
        };
        return accessories[zodiac] || '金属饰品';
    }

    function getLuckyAction(zodiac) {
        const actions = {
            rat: '早晨面向东方深呼吸9次，可提升今日运势。',
            ox: '上午进行适度运动，有助于气血流通。',
            tiger: '中午午休15分钟，可恢复精力。',
            rabbit: '下午3点后适合静坐养心。',
            dragon: '傍晚进行户外活动，吸收天地灵气。',
            snake: '晚上9点前入睡，养精蓄锐。',
            horse: '上午10点前完成重要决定。',
            goat: '午后与友人品茶论道，增进人缘。',
            monkey: '上午进行创意工作，思维活跃。',
            rooster: '傍晚进行整理收纳，净化气场。',
            dog: '晚间与家人共度时光，享受温馨。',
            pig: '睡前进行冥想，放松身心。'
        };
        return actions[zodiac] || '保持积极乐观的心态。';
    }

    function loadSavedFortune() {
        try {
            const saved = localStorage.getItem('tianji_last_fortune');
            if (saved) {
                const fortune = JSON.parse(saved);
                const today = new Date().toDateString();
                if (new Date(fortune.timestamp).toDateString() === today) {
                    currentFortune = fortune;
                    currentZodiac = fortune.zodiac;
                    
                    document.querySelectorAll('.zodiac-btn').forEach(btn => {
                        if (btn.dataset.zodiac === fortune.zodiac) {
                            btn.classList.add('active');
                        }
                    });
                }
            }
        } catch (e) {}
    }

    function saveLastFortune() {
        if (currentFortune) {
            try {
                localStorage.setItem('tianji_last_fortune', JSON.stringify(currentFortune));
            } catch (e) {}
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
