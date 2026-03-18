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
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}</span><span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    const divinationTypes = {
        yijing: {
            name: '易经占卜',
            description: '六十四卦，阴阳变化',
            results: [
                { gua: '乾', name: '乾为天', desc: '元亨利贞', meaning: '大吉大利，万事亨通。此时正是成就大事的时机。' },
                { gua: '坤', name: '坤为地', desc: '元亨', meaning: '地势坤，君子以厚德载物。保持低调，稳步前进。' },
                { gua: '屯', name: '水雷屯', desc: '元亨利贞', meaning: '事物初生，需耐心等待时机。' },
                { gua: '蒙', name: '山水蒙', desc: '亨', meaning: '蒙昧渐开，学习上进的好时机。' },
                { gua: '讼', name: '天水讼', desc: '有孚窒惕', meaning: '有争议纠纷，宜保持谨慎。' },
                { gua: '否', name: '天地否', desc: '否之匪人', meaning: '运势不佳，宜守不宜攻。' }
            ]
        },
        qimen: {
            name: '奇门遁甲',
            description: '时空数理，趋吉避凶',
            results: [
                { gua: '休门', name: '休养生息', desc: '宜休息调整', meaning: '当前适合休养，不宜冒进。' },
                { gua: '生门', name: '生机勃勃', desc: '求财吉利', meaning: '财运亨通，适合投资创业。' },
                { gua: '伤门', name: '损伤之象', desc: '注意意外', meaning: '需谨慎行事，避免冲突。' },
                { gua: '杜门', name: '堵塞不通', desc: '宜防守', meaning: '运势受阻，宜静待时机。' },
                { gua: '景门', name: '光明显耀', desc: '文吉', meaning: '适合文化传媒，社交活动。' },
                { gua: '死门', name: '凶险之象', desc: '大凶', meaning: '需格外谨慎，避免冒险。' }
            ]
        },
        liuren: {
            name: '六壬神数',
            description: '五行生克，预测吉凶',
            results: [
                { gua: '大吉', name: '太岁当头', desc: '贵人相助', meaning: '有贵人扶持，逢凶化吉。' },
                { gua: '青龙', name: '喜事临门', desc: '吉庆有余', meaning: '喜庆盈门，好事连连。' },
                { gua: '白虎', name: '白虎煞星', desc: '注意健康', meaning: '需注意身体，避免是非。' },
                { gua: '朱雀', name: '口舌是非', desc: '谨言慎行', meaning: '注意言语，避免争端。' },
                { gua: '玄武', name: '暗中行事', desc: '防人之心', meaning: '需谨慎，防止受骗。' },
                { gua: '勾陈', name: '纠缠之事', desc: '麻烦不断', meaning: '琐事缠身，需耐心处理。' }
            ]
        },
        ziwei: {
            name: '紫微斗数',
            description: '星宿命运，详批一生',
            results: [
                { gua: '紫微星', name: '帝王之星', desc: '领导力强', meaning: '有领导才能，适合管理岗位。' },
                { gua: '天府星', name: '福禄之星', desc: '福气深厚', meaning: '一生福禄双全，生活优渥。' },
                { gua: '天机星', name: '智慧之星', desc: '头脑灵活', meaning: '聪明过人，适合创意工作。' },
                { gua: '太阳星', name: '光明之星', desc: '正直磊落', meaning: '为人正直，适合从政。' },
                { gua: '武曲星', name: '刚毅之星', desc: '执行力强', meaning: '适合金融、军警行业。' },
                { gua: '贪狼星', name: '欲望之星', desc: '多才多艺', meaning: '欲望强烈，需控制得当。' }
            ]
        }
    };

    let currentType = null;
    let currentResult = null;

    function init() {
        setupEventListeners();
        setupExpandedDetails();
    }

    function setupEventListeners() {
        document.querySelectorAll('.type-card').forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.type;
                performDivination(type);
            });
        });

        document.getElementById('saveResultBtn')?.addEventListener('click', saveResult);
        document.getElementById('anotherBtn')?.addEventListener('click', () => {
            document.getElementById('divinationResult').style.display = 'none';
        });
    }

    function performDivination(type) {
        currentType = type;
        
        const typeData = divinationTypes[type];
        const results = typeData.results;
        
        const hash = hashCode(`${type}-${Date.now()}`);
        const resultIndex = hash % results.length;
        currentResult = results[resultIndex];

        displayResult(currentResult, typeData);

        if (window.addToHistory) {
            window.addToHistory(typeData.name, '🔮', 'divination.html');
        }
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function displayResult(result, typeData) {
        const resultDiv = document.getElementById('divinationResult');
        const title = document.getElementById('resultTitle');
        const time = document.getElementById('resultTime');
        const content = document.getElementById('resultContent');

        title.textContent = `${typeData.name} - ${result.name}`;
        time.textContent = new Date().toLocaleString('zh-CN');

        content.innerHTML = `
            <div class="result-symbol">${result.gua}</div>
            <div class="result-name">${result.name}</div>
            <div class="result-desc">${result.desc}</div>
            <div class="result-meaning">
                <h4>占卜解读</h4>
                <p>${result.meaning}</p>
            </div>
            <div class="result-advice">
                <h4>建议</h4>
                <p>${generateAdvice(result.name)}</p>
            </div>
        `;

        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth' });
    }

    function generateAdvice(name) {
        const advices = [
            '保持积极心态，把握当下机会',
            '三思而后行，谨慎做出决定',
            '多与他人商量，集思广益',
            '顺势而为，不要逆天而行',
            '耐心等待，时机成熟再行动',
            '勇于尝试，但要注意风险'
        ];
        const hash = hashCode(name);
        return advices[hash % advices.length];
    }

    function saveResult() {
        if (!currentResult || !currentType) return;
        
        try {
            const saved = JSON.parse(localStorage.getItem('tianji_divinations') || '[]');
            saved.unshift({
                type: currentType,
                result: currentResult,
                time: Date.now()
            });
            const trimmed = saved.slice(0, 30);
            localStorage.setItem('tianji_divinations', JSON.stringify(trimmed));
            
            showToast('占卜结果已保存！', 'success');
        } catch (e) {
            showToast('保存失败', 'error');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function setupExpandedDetails() {
        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', showExpandedDetails);
        }

        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) {
            closeExpanded.addEventListener('click', hideExpandedDetails);
        }
    }

    let selectedDivinationType = null;

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        const typeAnalysis = getDivinationTypeAnalysis(currentType || 'yijing');
        const detailedPrediction = getDetailedPrediction();
        const timingGuidance = getTimingGuidance();
        const advice = getDivinationAdvice();

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🔮 占卜类型深度分析</h3>
                <div class="analysis-block">
                    ${typeAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>📜 详细预测解读</h3>
                <div class="analysis-block">
                    ${detailedPrediction}
                </div>
            </div>

            <div class="detail-section">
                <h3>⏰ 时机与吉凶</h3>
                <div class="analysis-block">
                    ${timingGuidance}
                </div>
            </div>

            <div class="detail-section">
                <h3>💡 行动建议</h3>
                <div class="analysis-block">
                    ${advice}
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

    function getDivinationTypeAnalysis(type) {
        const analyses = {
            yijing: '<p><span class="highlight">易经占卜</span>源于三千多年前的伏羲画卦，是中华玄学文化的源头。以阴阳五行为基础，通过六十四卦象的变化来预测事物发展趋势。</p>',
            qimen: '<p><span class="highlight">奇门遁甲</span>被誉为"帝王之学"，是三式之首。以时空为框架，结合九宫八卦、天干地支，精准定位吉凶方位与时间。</p>',
            liuren: '<p><span class="highlight">六壬神数</span>源于天象，以五行生克为核心理论。以十二将神为用神，结合天盘地盘，预测事物发展的细微变化。</p>',
            ziwei: '<p><span class="highlight">紫微斗数</span>源于北极星命理体系，是中国传统命理学的巅峰之作。以出生时间为基础，排布十二宫位，分析命主一生运势起伏。</p>'
        };
        return analyses[type] || analyses.yijing;
    }

    function getDetailedPrediction() {
        return `
            <p><span class="highlight">整体运势评估：</span>${Math.random() > 0.5 ? '上吉' : '中吉'}</p>
            <p>当前处于${Math.random() > 0.5 ? '运势上升期' : '平稳发展期'}，整体趋势${Math.random() > 0.5 ? '向好' : '稳定'}。</p>
            <p class="section-title">事业方面</p>
            <p>${Math.random() > 0.5 ? '工作顺利，有晋升机会，但需注意与同事关系。' : '事业进入新阶段，面临挑战但机遇并存。'}</p>
            <p class="section-title">财运方面</p>
            <p>${Math.random() > 0.5 ? '正财稳定，偏财有望，但需谨慎投资。' : '财运一般，宜守不宜攻，避免冲动消费。'}</p>
            <p class="section-title">感情方面</p>
            <p>${Math.random() > 0.5 ? '感情运不错，有机会遇到合适的人。' : '感情需要耐心，缘分未到不必强求。'}</p>
        `;
    }

    function getTimingGuidance() {
        const hour = new Date().getHours();
        let timing = hour >= 5 && hour < 9 ? '清晨' : hour >= 9 && hour < 13 ? '上午' : hour >= 13 && hour < 17 ? '下午' : hour >= 17 && hour < 21 ? '傍晚' : '夜晚';
        
        return `
            <p><span class="highlight">当前时段：</span>${timing}</p>
            <p class="section-title">吉时方位</p>
            <p>${Math.random() > 0.5 ? '东南方位今日最吉，适合开展新计划。' : '正东方位今日最吉，适合会客拜访。'}</p>
            <p class="section-title">吉时提醒</p>
            <p>${Math.random() > 0.5 ? '上午9点至11点为今日黄金时段，适合重要决策。' : '下午3点至5点为今日黄金时段，适合商业洽谈。'}</p>
        `;
    }

    function getDivinationAdvice() {
        return `
            <p class="section-title">短期建议（三天内）</p>
            <p>${Math.random() > 0.5 ? '保持积极心态，把握当下机会。' : '注意休息调整，避免过度劳累。'}</p>
            <p class="section-title">中期建议（一月内）</p>
            <p>${Math.random() > 0.5 ? '事业发展进入关键期，需要更加努力。' : '财运有望提升，但需耐心等待。'}</p>
            <p class="section-title">长期建议（一年内）</p>
            <p>${Math.random() > 0.5 ? '整体运势向好，但需把握关键节点。' : '会有起起落落，保持平常心很重要。'}</p>
            <p class="section-title">开运方法</p>
            <p>${Math.random() > 0.5 ? '佩戴玉佩或水晶可提升运势。' : '保持心情愉快，正能量会吸引好运。'}</p>
        `;
    }
})();
