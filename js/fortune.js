(function() {
    const zodiacData = {
        rat: { icon: '🐀', name: '鼠', color: '#4a90a4', wuxing: '水', compatible: ['龙', '猴', '牛'], avoid: ['马', '兔', '羊'] },
        ox: { icon: '🐂', name: '牛', color: '#8b6914', wuxing: '土', compatible: ['蛇', '鸡', '鼠'], avoid: ['龙', '羊', '狗'] },
        tiger: { icon: '🐅', name: '虎', color: '#e67e22', wuxing: '木', compatible: ['马', '狗', '猪'], avoid: ['蛇', '猴'] },
        rabbit: { icon: '🐇', name: '兔', color: '#e91e63', wuxing: '木', compatible: ['羊', '猪', '狗'], avoid: ['鸡', '龙', '鼠'] },
        dragon: { icon: '🐉', name: '龙', color: '#9c27b0', wuxing: '土', compatible: ['鸡', '猴', '鼠'], avoid: ['狗', '兔'] },
        snake: { icon: '🐍', name: '蛇', color: '#673ab7', wuxing: '火', compatible: ['鸡', '牛', '猴'], avoid: ['虎', '猪'] },
        horse: { icon: '🐎', name: '马', color: '#f44336', wuxing: '火', compatible: ['虎', '羊', '狗'], avoid: ['鼠', '牛'] },
        goat: { icon: '🐐', name: '羊', color: '#795548', wuxing: '土', compatible: ['兔', '猪', '马'], avoid: ['牛', '狗'] },
        monkey: { icon: '🐒', name: '猴', color: '#ff9800', wuxing: '金', compatible: ['龙', '蛇', '鼠'], avoid: ['虎', '猪'] },
        rooster: { icon: '🐓', name: '鸡', color: '#607d8b', wuxing: '金', compatible: ['龙', '蛇', '牛'], avoid: ['兔', '狗'] },
        dog: { icon: '🐕', name: '狗', color: '#8d6e63', wuxing: '土', compatible: ['虎', '兔', '马'], avoid: ['羊', '牛'] },
        pig: { icon: '🐖', name: '猪', color: '#f48fb1', wuxing: '水', compatible: ['兔', '羊', '虎'], avoid: ['蛇', '猴'] }
    };

    const wuxingElements = ['木', '火', '土', '金', '水'];
    const wuxingStatus = ['旺盛', '平和', '偏弱', '亏损'];

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

    const careerAdvices = {
        excellent: [
            '今日事业运极佳，适合开展新项目或提出创新想法。您的能力和努力将得到上级的认可，可能会有升职加薪的机会。',
            '工作中贵人运强，遇到困难时会有人主动相助。适合拓展人脉，与合作伙伴建立良好关系。',
            '创意灵感爆棚，适合从事创意类工作。抓住今日的灵感源泉，可能会有突破性的进展。'
        ],
        good: [
            '事业稳步发展，按计划推进即可。与同事协作顺利，团队氛围良好。',
            '工作中有小小的突破，获得领导的表扬。适合继续深耕当前领域。',
            '职场人际和谐，适合与他人合作项目。财运不错，可能会有意外收获。'
        ],
        average: [
            '事业运平稳，按部就班即可。不宜有过大的变动，保持现状是最佳选择。',
            '工作中有小阻滞，需要耐心处理。与同事沟通要更加注意方式方法。',
            '今日适合处理杂事和整理工作环境，大项目建议延后处理。'
        ],
        poor: [
            '事业运低迷，做事难以集中精神。建议处理简单事务，重要决策改日再定。',
            '工作上可能有小人作祟，注意谨言慎行。与领导沟通要更加圆滑。',
            '注意与同事的关系处理，避免发生冲突。财运不佳，不宜投资创业。'
        ]
    };

    const loveAdvices = {
        excellent: [
            '今日爱情运极佳！单身者有望遇到心仪对象，已有伴侣者感情更加甜蜜。',
            '桃花运旺盛，适合约会表白。两个人的关系会有质的飞跃。',
            '与伴侣相处融洽，适合计划未来的事情。单身的你可能会收到告白。'
        ],
        good: [
            '爱情运不错，有机会遇到心动的人。已有伴侣者适合约会增进感情。',
            '与异性相处愉快，人际关系和谐。适合参加社交活动拓展圈子。',
            '感情稳定发展，单身者可以主动一些。已有伴侣者适合制造小惊喜。'
        ],
        average: [
            '爱情运平稳，单身者暂无明显机会。建议耐心等待，不要过于主动。',
            '感情生活中平淡是真，不需要有太大期待。维持现状即可。',
            '与伴侣相处时注意沟通方式，避免因误会产生矛盾。'
        ],
        poor: [
            '爱情运低迷，单身者不宜主动表白。已有伴侣者注意避免争吵。',
            '今日感情方面容易受伤，要学会保护自己。不要轻信他人的甜言蜜语。',
            '桃花运不佳烂桃花多，单身者尤其要谨慎。已有伴侣者可能产生怀疑。'
        ]
    };

    const wealthAdvices = {
        excellent: [
            '今日财运极佳！正财偏财皆旺，适合投资理财。可能会有意外之财降临。',
            '财运亨通，有贵人相助。适合开展新的投资理财计划。',
            '财务状况极佳，可能会有奖金或额外收入。适合购置大件商品。'
        ],
        good: [
            '财运不错，保持稳定即可。可以适当进行小额投资。',
            '正财收入稳定，偏财有小惊喜。注意控制不必要的开支。',
            '财务状况良好，有加薪的可能。适合储蓄和长期投资。'
        ],
        average: [
            '财运平稳，没有太大变化。维持现有理财策略即可。',
            '收入支出平衡，不宜进行大额投资。节约开支为佳。',
            '财运一般，可能有小额支出。保持理性消费。'
        ],
        poor: [
            '财运低迷，可能会有额外支出。务必控制消费，避免破财。',
            '投资需谨慎，容易亏损。不宜冒险，保存实力为上。',
            '可能有破财之兆，建议低调行事。避免借钱给他人。'
        ]
    };

    const healthAdvices = {
        excellent: [
            '今日健康状况极佳！精力充沛，适合运动锻炼。身体状态良好，容光焕发。',
            '免疫力强，不易生病。适合进行户外活动或体育运动。',
            '身心愉悦，睡眠质量好。继续保持健康生活习惯。'
        ],
        good: [
            '健康状况良好，保持适当运动即可。注意饮食均衡。',
            '精力充沛，但也要注意休息。不要过度劳累。',
            '适合养生调理，可以尝试新的健康方式。'
        ],
        average: [
            '健康运一般，注意劳逸结合。适当休息能提高状态。',
            '可能会有些疲惫感，建议早点休息。注意不要熬夜。',
            '身体无大碍，但需注意预防季节性疾病。'
        ],
        poor: [
            '健康运欠佳，容易疲劳。注意休息，避免过度劳累。',
            '身体可能出现小状况，建议及时就医或调理。',
            '注意保养，少吃生冷辛辣食物。保持良好作息。'
        ]
    };

    const luckyItems = {
        colors: ['红色', '金色', '蓝色', '绿色', '紫色', '白色', '黑色', '黄色'],
        numbers: ['3', '7', '8', '9', '12', '18', '24', '36'],
        directions: ['正东', '正南', '正西', '正北', '东南', '西南', '东北', '西北'],
        times: ['子时(23-1)', '丑时(1-3)', '寅时(3-5)', '卯时(5-7)', '辰时(7-9)', '巳时(9-11)', '午时(11-13)', '未时(13-15)']
    };

    const monthlyFortunes = [
        '本月事业有望突破，适合制定新的发展计划。财运稳步上升，但需谨慎投资。感情方面，单身者有望遇到正缘，已有伴侣者关系更加稳定。健康需要注意休息，保持良好的作息习惯。',
        '本月整体运势平稳，各方面发展较为均衡。工作中可能会遇到一些挑战，但都能顺利解决。财运有所提升，偏财运也不错。健康状况良好，适合进行体育锻炼。',
        '本月运势先抑后扬，前期可能有些困难，后期会逐渐好转。事业上需要更加努力，财运会有所波动。感情方面需要多沟通，避免误会。健康方面注意预防感冒等季节性疾病。'
    ];

    let currentZodiac = null;
    let currentFortune = null;

    const notification = {
        container: null,
        init() {
            if (!this.container) {
                this.container = document.createElement('div');
                this.container.className = 'fortune-notification';
                document.body.appendChild(this.container);
            }
        },
        show(message, type = 'info') {
            this.init();
            const icons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
            const notification = document.createElement('div');
            notification.className = `notification-item ${type}`;
            notification.innerHTML = `
                <span class="notification-icon">${icons[type] || icons.info}</span>
                <span class="notification-message">${message}</span>
            `;
            this.container.appendChild(notification);
            setTimeout(() => {
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                    setTimeout(() => notification.remove(), 300);
                }, 2500);
            }, 10);
        }
    };

    function init() {
        displayTodayDate();
        setupEventListeners();
        loadSavedFortune();
    }

    function displayTodayDate() {
        const now = new Date();
        const heroDate = document.getElementById('heroDate');
        const heroLunar = document.getElementById('heroLunar');
        
        if (heroDate) {
            heroDate.textContent = now.toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
            });
        }
        
        if (heroLunar) {
            const lunarDate = getLunarDate(now);
            heroLunar.textContent = `农历${lunarDate}`;
        }
    }

    function getLunarDate(date) {
        const lunarMonths = ['', '正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
        const lunarDays = ['', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${lunarMonths[month > 2 ? month - 2 : month + 10]}月${lunarDays[Math.min(day, 30)]}`;
    }

    function setupEventListeners() {
        document.querySelectorAll('.zodiac-item').forEach(btn => {
            btn.addEventListener('click', () => selectZodiac(btn.dataset.zodiac));
        });

        const saveBtn = document.getElementById('saveFortuneBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveFortune);

        const detailBtn = document.getElementById('viewDetailBtn');
        if (detailBtn) detailBtn.addEventListener('click', showDetailModal);

        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) moreDetailsBtn.addEventListener('click', showExpandedDetails);

        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) closeExpanded.addEventListener('click', hideExpandedDetails);

        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('detailModal');
        if (modalClose && modal) {
            modalClose.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        }
    }

    function selectZodiac(zodiac) {
        if (!zodiac || !zodiacData[zodiac]) return;
        
        currentZodiac = zodiac;
        
        document.querySelectorAll('.zodiac-item').forEach(item => {
            item.classList.toggle('active', item.dataset.zodiac === zodiac);
        });

        const loadingSection = document.getElementById('loadingSection');
        const fortuneResult = document.getElementById('fortuneResult');
        
        if (loadingSection) loadingSection.style.display = 'flex';
        if (fortuneResult) fortuneResult.style.display = 'none';
        
        setTimeout(() => {
            const fortune = generateFortune(zodiac);
            currentFortune = fortune;
            
            if (loadingSection) loadingSection.style.display = 'none';
            if (fortuneResult) fortuneResult.style.display = 'block';
            
            displayFortune(fortune);
        }, 800);
    }

    function generateFortune(zodiac) {
        const hash = hashCode(`${zodiac}_${Date.now()}`);
        const levelRandom = (hash % 100) / 100;
        let level;
        if (levelRandom < 0.15) level = 'excellent';
        else if (levelRandom < 0.45) level = 'good';
        else if (levelRandom < 0.75) level = 'average';
        else level = 'poor';
        
        const descriptionList = fortuneDescriptions[level];
        const description = descriptionList[hash % descriptionList.length];
        
        const careerList = careerAdvices[level];
        const career = careerList[hash % careerList.length];
        
        const loveList = loveAdvices[level];
        const love = loveList[hash % loveList.length];
        
        const wealthList = wealthAdvices[level];
        const wealth = wealthList[hash % wealthList.length];
        
        const healthList = healthAdvices[level];
        const health = healthList[hash % healthList.length];
        
        const wuxing = zodiacData[zodiac].wuxing;
        const wuxingIndex = wuxingElements.indexOf(wuxing);
        const statusIndex = Math.floor(hash % 4);
        
        const luckyColors = shuffleArray([...luckyItems.colors], hash).slice(0, 3);
        const luckyNumbers = shuffleArray([...luckyItems.numbers], hash + 1).slice(0, 3);
        const luckyDirections = shuffleArray([...luckyItems.directions], hash + 2).slice(0, 2);
        const luckyTimes = shuffleArray([...luckyItems.times], hash + 3).slice(0, 2);
        
        return {
            zodiac,
            level,
            description,
            career,
            love,
            wealth,
            health,
            wuxing,
            wuxingStatus: wuxingStatus[statusIndex],
            wuxingIndex,
            luckyColors,
            luckyNumbers,
            luckyDirections,
            luckyTimes,
            timestamp: Date.now()
        };
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function shuffleArray(array, seed) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(((seed * (i + 1)) % 100) / 100 * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function displayFortune(fortune) {
        const zodiac = zodiacData[fortune.zodiac];
        
        const levelMap = {
            excellent: { text: '极佳', class: 'level-excellent', stars: 5 },
            good: { text: '良好', class: 'level-good', stars: 4 },
            average: { text: '平顺', class: 'level-average', stars: 3 },
            poor: { text: '欠佳', class: 'level-poor', stars: 2 }
        };
        const levelInfo = levelMap[fortune.level];
        
        const overviewStars = document.getElementById('overviewStars');
        if (overviewStars) {
            overviewStars.innerHTML = '★'.repeat(levelInfo.stars) + '☆'.repeat(5 - levelInfo.stars);
        }
        
        const overviewLevel = document.getElementById('overviewLevel');
        if (overviewLevel) {
            overviewLevel.textContent = `运势${levelInfo.text}`;
            overviewLevel.className = `overview-level ${levelInfo.class}`;
        }
        
        const overviewDesc = document.getElementById('overviewDesc');
        if (overviewDesc) {
            overviewDesc.textContent = fortune.description;
        }
        
        const careerScoreEl = document.getElementById('careerScore');
        const careerAnalysis = document.getElementById('careerAnalysis');
        if (careerScoreEl && careerAnalysis) {
            const levelMultiplier = { excellent: 90, good: 75, average: 55, poor: 35 };
            const score = levelMultiplier[fortune.level] + Math.floor(Math.random() * 10);
            careerScoreEl.innerHTML = `<span class="score-value">${score}</span><span class="score-unit">分</span>`;
            careerAnalysis.textContent = fortune.career;
        }
        
        const wealthScoreEl = document.getElementById('wealthScore');
        const wealthAnalysis = document.getElementById('wealthAnalysis');
        if (wealthScoreEl && wealthAnalysis) {
            const levelMultiplier = { excellent: 88, good: 72, average: 52, poor: 30 };
            const score = levelMultiplier[fortune.level] + Math.floor(Math.random() * 12);
            wealthScoreEl.innerHTML = `<span class="score-value">${score}</span><span class="score-unit">分</span>`;
            wealthAnalysis.textContent = fortune.wealth;
        }
        
        const loveScoreEl = document.getElementById('loveScore');
        const loveAnalysis = document.getElementById('loveAnalysis');
        if (loveScoreEl && loveAnalysis) {
            const levelMultiplier = { excellent: 92, good: 78, average: 58, poor: 38 };
            const score = levelMultiplier[fortune.level] + Math.floor(Math.random() * 8);
            loveScoreEl.innerHTML = `<span class="score-value">${score}</span><span class="score-unit">分</span>`;
            loveAnalysis.textContent = fortune.love;
        }
        
        const healthScoreEl = document.getElementById('healthScore');
        const healthAnalysis = document.getElementById('healthAnalysis');
        if (healthScoreEl && healthAnalysis) {
            const levelMultiplier = { excellent: 95, good: 80, average: 62, poor: 42 };
            const score = levelMultiplier[fortune.level] + Math.floor(Math.random() * 5);
            healthScoreEl.innerHTML = `<span class="score-value">${score}</span><span class="score-unit">分</span>`;
            healthAnalysis.textContent = fortune.health;
        }
        
        const wuxingChart = document.getElementById('wuxingChart');
        if (wuxingChart) {
            const wuxingCounts = { 木: 0, 火: 0, 土: 0, 金: 0, 水: 0 };
            wuxingCounts[zodiac.wuxing] = 3;
            wuxingChart.innerHTML = Object.entries(wuxingCounts).map(([wx, count]) => `
                <div class="wuxing-item">
                    <div class="wuxing-bar" style="height: ${count * 20}%; background: var(--wuxing-${wx})"></div>
                    <div class="wuxing-label">${wx}</div>
                </div>
            `).join('');
        }
        
        const wuxingAnalysis = document.getElementById('wuxingAnalysis');
        if (wuxingAnalysis) {
            const dominant = [fortune.wuxing, 3];
            const weak = wuxingElements.filter(e => e !== fortune.wuxing)[Math.floor(Math.random() * 4)];
            wuxingAnalysis.innerHTML = `<p>您的八字中${dominant[0]}气最旺(${dominant[1]}个)，${weak}气较弱。${getWuxingBalanceAdvice(dominant[0], weak)}</p>`;
        }
        
        const dayMasterEl = document.getElementById('dayMaster');
        if (dayMasterEl) {
            dayMasterEl.innerHTML = `
                <div class="day-master-title">日主${zodiac.name}</div>
                <div class="day-master-wuxing">五行属${zodiac.wuxing}</div>
                <div class="day-master-advice">${getDayMasterAdvice(zodiac)}</div>
            `;
        }
        
        const compatibleZodiac = zodiac.compatible.map(z => {
            const data = zodiacData[z];
            return `<span class="compatible-item" style="background: ${data.color}20; border-color: ${data.color}">${data.icon} ${data.name}</span>`;
        }).join('');
        
        const avoidZodiac = zodiac.avoid.map(z => {
            const data = zodiacData[z];
            return `<span class="avoid-item" style="background: rgba(139,0,0,0.1); border-color: rgba(139,0,0,0.3)">${data.icon} ${data.name}</span>`;
        }).join('');
        
        const bestMatch = document.getElementById('bestMatch');
        const avoidMatch = document.getElementById('avoidMatch');
        if (bestMatch) bestMatch.innerHTML = fortune.compatible.map(z => {
            const data = zodiacData[z];
            return `<span class="match-zodiac" style="background: ${data.color}15; border: 1px solid ${data.color}40">${data.icon} ${data.name}</span>`;
        }).join('');
        if (avoidMatch) avoidMatch.innerHTML = zodiac.avoid.map(z => {
            const data = zodiacData[z];
            return `<span class="match-zodiac avoid" style="background: rgba(139,0,0,0.08); border: 1px solid rgba(139,0,0,0.2)">${data.icon} ${data.name}</span>`;
        }).join('');
        
        const luckyColorsEl = document.getElementById('luckyColors');
        if (luckyColorsEl) luckyColorsEl.textContent = fortune.luckyColors.join('、');
        
        const luckyNumbersEl = document.getElementById('luckyNumbers');
        if (luckyNumbersEl) luckyNumbersEl.textContent = fortune.luckyNumbers.join('、');
        
        const luckyDirectionsEl = document.getElementById('luckyDirections');
        if (luckyDirectionsEl) luckyDirectionsEl.textContent = fortune.luckyDirections.join('、');
        
        const luckyTimesEl = document.getElementById('luckyTimes');
        if (luckyTimesEl) luckyTimesEl.textContent = fortune.luckyTimes.join('、');
        
        const zodiacIcon = document.getElementById('zodiacIcon');
        if (zodiacIcon) zodiacIcon.textContent = zodiac.icon;
        
        const zodiacName = document.getElementById('zodiacName');
        if (zodiacName) zodiacName.textContent = zodiac.name;
        
        const monthFortune = document.getElementById('monthFortune');
        if (monthFortune) monthFortune.textContent = monthlyFortunes[hashCode(zodiac) % monthlyFortunes.length];

        const fortuneResult = document.getElementById('fortuneResult');
        if (fortuneResult) fortuneResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function getWuxingBalanceAdvice(dominant, weak) {
        const advices = {
            '水木': '宜多接触木属性事物，如绿色植物、木质家具。',
            '木火': '宜多晒太阳，接近火炉等温暖环境。',
            '火土': '宜食用土属性食物，如山药、红薯等。',
            '土金': '宜多接触金属物品，如金银饰品。',
            '金水': '宜多接触水，如游泳、钓鱼等活动。',
            '水火': '注意水火既济，避免极端情绪波动。',
            '木土': '宜进行户外活动，接触大自然。',
            '火金': '宜保持冷静，避免冲动决策。'
        };
        const key = `${dominant}${weak}`;
        return advices[key] || '五行平衡，保持现有生活方式即可。';
    }

    function getDayMasterAdvice(zodiac) {
        const advices = {
            rat: '鼠年出生者聪明机敏，善于交际，财运不错。',
            ox: '牛年出生者踏实稳重，有责任心，适合稳定发展。',
            tiger: '虎年出生者勇敢果断，领导力强，事业发展迅速。',
            rabbit: '兔年出生者温柔细腻，人缘好，感情顺利。',
            dragon: '龙年出生者气宇轩昂，运势强劲，贵人运佳。',
            snake: '蛇年出生者智慧深沉，直觉敏锐，财运平稳。',
            horse: '马年出生者热情开朗，善于社交，桃花运旺。',
            goat: '羊年出生者温柔善良，人缘极佳，财运中等。',
            monkey: '猴年出生者聪明伶俐，财运不错，偏财运佳。',
            rooster: '鸡年出生者细心认真，财运稳定，善于理财。',
            dog: '狗年出生者忠诚可靠，人际关系好，运势平稳。',
            pig: '猪年出生者诚实厚道，财运不错，桃花运佳。'
        };
        return advices[zodiac.zodiac] || '保持现有生活方式，稳步发展。';
    }

    function saveFortune() {
        if (!currentFortune) return;
        
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_fortunes') || '[]');
            saved.unshift(currentFortune);
            const trimmed = saved.slice(0, 20);
            localStorage.setItem('tianji_fortunes', JSON.stringify(trimmed));
            notification.show('运势已保存！', 'success');
        } catch (e) {
            notification.show('保存失败，请重试', 'error');
        }
    }

    function showDetailModal() {
        if (!currentFortune) return;
        
        const modal = document.getElementById('detailModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;

        const data = zodiacData[currentFortune.zodiac];
        
        modalBody.innerHTML = `
            <div class="modal-fortune-detail">
                <div class="modal-zodiac">
                    <span class="modal-zodiac-icon">${data.icon}</span>
                    <span class="modal-zodiac-name">${data.name}年出生</span>
                </div>
                <div class="modal-section">
                    <h4>五行分析</h4>
                    <p>属${data.wuxing}，五行中${currentFortune.wuxingStatus}。${currentFortune.wuxing}是您的命定五行。</p>
                </div>
                <div class="modal-section">
                    <h4>流日运势</h4>
                    <p>今日整体运势${currentFortune.level === 'excellent' ? '极佳' : currentFortune.level === 'good' ? '良好' : currentFortune.level === 'average' ? '平顺' : '欠佳'}。</p>
                </div>
                <div class="modal-section">
                    <h4>穿衣指南</h4>
                    <p>今日幸运色：${currentFortune.luckyColors[0]}、${currentFortune.luckyColors[1]}</p>
                </div>
                <div class="modal-section">
                    <h4>开运物品</h4>
                    <p>幸运数字：${currentFortune.luckyNumbers.join('、')}</p>
                    <p>幸运方向：${currentFortune.luckyDirections[0]}、${currentFortune.luckyDirections[1]}</p>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
    }

    function closeModal() {
        const modal = document.getElementById('detailModal');
        if (modal) modal.style.display = 'none';
    }

    function showExpandedDetails() {
        if (!currentFortune) return;
        
        const expanded = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expanded || !expandedContent) return;

        const zodiac = zodiacData[currentFortune.zodiac];
        
        expandedContent.innerHTML = `
            <div class="expanded-zodiac-header">
                <span class="expanded-zodiac-icon">${zodiac.icon}</span>
                <span class="expanded-zodiac-name">${zodiac.name}年运势详解</span>
            </div>
            
            <div class="expanded-section">
                <h3>📜 命理详解</h3>
                <p>${currentFortune.description}</p>
            </div>
            
            <div class="expanded-section">
                <h3>💼 事业运势</h3>
                <p>${currentFortune.career}</p>
            </div>
            
            <div class="expanded-section">
                <h3>💕 感情运势</h3>
                <p>${currentFortune.love}</p>
            </div>
            
            <div class="expanded-section">
                <h3>💰 财富运势</h3>
                <p>${currentFortune.wealth}</p>
            </div>
            
            <div class="expanded-section">
                <h3>🏥 健康运势</h3>
                <p>${currentFortune.health}</p>
            </div>
            
            <div class="lucky-items-grid">
                <div class="lucky-item">
                    <span class="lucky-label">幸运色彩</span>
                    <span class="lucky-value">${currentFortune.luckyColors.join('、')}</span>
                </div>
                <div class="lucky-item">
                    <span class="lucky-label">幸运数字</span>
                    <span class="lucky-value">${currentFortune.luckyNumbers.join('、')}</span>
                </div>
                <div class="lucky-item">
                    <span class="lucky-label">幸运方位</span>
                    <span class="lucky-value">${currentFortune.luckyDirections.join('、')}</span>
                </div>
                <div class="lucky-item">
                    <span class="lucky-label">吉时</span>
                    <span class="lucky-value">${currentFortune.luckyTimes.join('、')}</span>
                </div>
            </div>
            
            <div class="compatibility-section">
                <h3>🔗 生肖配对</h3>
                <div class="compatibility-row">
                    <span class="comp-label">最佳匹配：</span>
                    <span class="comp-value">${zodiac.compatible.map(z => zodiacData[z].name).join('、')}</span>
                </div>
                <div class="compatibility-row">
                    <span class="comp-label">需要注意：</span>
                    <span class="comp-value avoid">${zodiac.avoid.map(z => zodiacData[z].name).join('、')}</span>
                </div>
            </div>
        `;
        
        expanded.style.display = 'block';
        expanded.scrollIntoView({ behavior: 'smooth' });
    }

    function hideExpandedDetails() {
        const expanded = document.getElementById('expandedDetails');
        if (expanded) expanded.style.display = 'none';
    }

    function loadSavedFortune() {
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_last_fortune'));
            if (saved) {
                const savedDate = new Date(saved.timestamp);
                const today = new Date();
                if (savedDate.toDateString() === today.toDateString()) {
                    currentFortune = saved;
                    displayFortune(saved);
                }
            }
        } catch (e) {}
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
