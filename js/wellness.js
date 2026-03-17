(function() {
    const methodsData = [
        {
            icon: '🧘',
            name: '打坐静修',
            desc: '盘坐宁心，调息养气。每日30分钟，可静心养神。'
        },
        {
            icon: '🥋',
            name: '太极拳',
            desc: '柔和缓慢，以意导气。适合各年龄段锻炼。'
        },
        {
            icon: '🏃',
            name: '八段锦',
            desc: '导引养生，舒筋活络。八式动作，简单易学。'
        },
        {
            icon: '🖐️',
            name: '五禽戏',
            desc: '模仿虎鹿熊猿鸟，强身健体，延年益寿。'
        }
    ];

    const foodsData = [
        { icon: '🍎', name: '苹果', effect: '健脾养胃' },
        { icon: '🍌', name: '香蕉', effect: '润肠通便' },
        { icon: '🍊', name: '橙子', effect: '生津止渴' },
        { icon: '🍇', name: '葡萄', effect: '补血养颜' },
        { icon: '🥕', name: '胡萝卜', effect: '明目养肝' },
        { icon: '🥦', name: '西兰花', effect: '抗氧化' },
        { icon: '🍵', name: '绿茶', effect: '清热解毒' },
        { icon: '🫘', name: '红豆', effect: '利水消肿' },
        { icon: '🌾', name: '小米', effect: '养胃安神' },
        { icon: '🍄', name: '木耳', effect: '清肺活血' }
    ];

    function init() {
        renderMethods();
        renderFoods();
    }

    function renderMethods() {
        const grid = document.getElementById('methodsGrid');
        grid.innerHTML = methodsData.map(m => `
            <div class="method-card">
                <div class="method-icon">${m.icon}</div>
                <h3>${m.name}</h3>
                <p>${m.desc}</p>
            </div>
        `).join('');
    }

    function renderFoods() {
        const grid = document.getElementById('foodsGrid');
        grid.innerHTML = foodsData.map(f => `
            <div class="food-item">
                <div class="food-icon">${f.icon}</div>
                <h4>${f.name}</h4>
                <p>${f.effect}</p>
            </div>
        `).join('');
    }

    function init() {
        renderMethods();
        renderFoods();
        setupEventListeners();
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

        const constitutionAnalysis = getConstitutionAnalysis();
        const seasonalGuidance = getSeasonalGuidance();
        const dietAdvice = getDietAdvice();
        const exerciseGuidance = getExerciseGuidance();

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🧘 体质辨识与调养</h3>
                <div class="analysis-block">
                    ${constitutionAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>🌸 四季养生详解</h3>
                <div class="analysis-block">
                    ${seasonalGuidance}
                </div>
            </div>

            <div class="detail-section">
                <h3>🍵 食疗药膳指导</h3>
                <div class="analysis-block">
                    ${dietAdvice}
                </div>
            </div>

            <div class="detail-section">
                <h3>🏃 导引功法修炼</h3>
                <div class="analysis-block">
                    ${exerciseGuidance}
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 养生禁忌提醒</h3>
                <div class="analysis-block">
                    <p>1. 忌熬夜：子时（23:00-1:00）是肝脏排毒最佳时机，熬夜会伤肝。</p>
                    <p>2. 忌暴饮暴食：饮食应有规律，每餐七分饱为宜。</p>
                    <p>3. 忌久坐：长时间久坐会导致气血不畅，应适当活动。</p>
                    <p>4. 忌情绪过激：情绪波动大会影响脏腑功能，保持平和心态。</p>
                    <p>5. 忌盲目进补：应根据自身体质选择合适的补品，不可盲目。</p>
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

    function getConstitutionAnalysis() {
        const month = new Date().getMonth() + 1;
        
        return `
            <p><span class="highlight">中医体质分类：</span>${month % 2 === 0 ? '平和质' : '气虚质'}</p>
            <p>根据您的出生时节分析，您的体质偏向${month % 2 === 0 ? '平和型' : '气虚型'}。</p>
            <p class="section-title">平和质特征</p>
            <p>体态适中，面色润泽，精力充沛，睡眠良好，舌淡红苔薄白。此类体质者养生以协调阴阳为主。</p>
            <p class="section-title">气虚质特征</p>
            <p>气短懒言，容易疲乏，易出汗，舌淡有齿痕。此类体质者养生以补气为主。</p>
            <p class="section-title">调养建议</p>
            <p>${month % 2 === 0 ? '宜适当运动，如太极拳、八段锦等柔和运动。饮食宜清淡，多食山药、黄芪等补气食物。' : '宜静养为主，避免过度劳累。饮食宜温补，多食红枣、枸杞等养血食物。'}</p>
        `;
    }

    function getSeasonalGuidance() {
        const month = new Date().getMonth() + 1;
        
        let season = '', advice = '';
        if (month >= 3 && month <= 5) {
            season = '春季';
            advice = '春季属木，对应肝脏。此时应养肝护肝，多食绿色蔬菜。肝气旺盛，容易情绪波动，应保持心情舒畅。';
        } else if (month >= 6 && month <= 8) {
            season = '夏季';
            advice = '夏季属火，对应心脏。此时应养心安神，多食清淡食物。心火旺盛，容易心烦失眠，应保持心平气和。';
        } else if (month >= 9 && month <= 11) {
            season = '秋季';
            advice = '秋季属金，对应肺脏。此时应养肺润燥，多食白色食物。肺气旺盛，容易咳嗽干燥，应注意润肺。';
        } else {
            season = '冬季';
            advice = '冬季属水，对应肾脏。此时应养肾藏精，多食黑色食物。肾气旺盛，应注意保暖，避免受寒。';
        }
        
        return `
            <p>当前季节：<span class="highlight">${season}</span></p>
            <p>${advice}</p>
            <p class="section-title">${season}养生要点</p>
            <p>${season === '春季' ? '宜早睡早起，广步于庭。饮食少酸多甘辛。可练习太极拳疏肝理气。' : 
               season === '夏季' ? '宜晚睡早起，午休养心。饮食清淡多果蔬。可练习静坐养心安神。' : 
               season === '秋季' ? '宜早睡早起，收敛神气。饮食多酸少辛。可练习导引术润肺生津。' : 
               '宜早睡晚起，保养阳气。饮食温热多补。可练习八段锦补肾固精。'}</p>
        `;
    }

    function getDietAdvice() {
        return `
            <p class="section-title">早餐建议</p>
            <p>${Math.random() > 0.5 ? '小米粥+鸡蛋：养胃补气，营养丰富。' : '牛奶+面包：补充蛋白质和能量。'} 早餐应在7-9点之间进食，此时是胃经当令。 </p>
            <p class="section-title">午餐建议</p>
            <p>${Math.random() > 0.5 ? '粗粮饭+鱼肉+蔬菜：营养均衡，补充体力。' : '面条+肉类+蔬菜：易于消化，提供能量。'} 午餐应在11-13点之间进食，此时是心经当令。</p>
            <p class="section-title">晚餐建议</p>
            <p>${Math.random() > 0.5 ? '蔬菜粥+小菜：清淡易消化，不增加肠胃负担。' : '水果+酸奶：补充维生素，有助睡眠。'} 晚餐应在17-19点之间进食，此时是肾经当令。</p>
            <p class="section-title">养生茶饮</p>
            <p>${Math.random() > 0.5 ? '枸杞菊花茶：清肝明目，适合长期使用电脑者。' : '玫瑰花茶：疏肝解郁，适合情绪波动者。'} ${Math.random() > 0.5 ? '山楂决明茶：降脂明目，适合三高人群。' : '桂圆红枣茶：补气养血，适合体质虚弱者。'}</p>
        `;
    }

    function getExerciseGuidance() {
        const hour = new Date().getHours();
        
        let bestTime = '';
        if (hour >= 5 && hour < 7) bestTime = '清晨5-7点';
        else if (hour >= 7 && hour < 9) bestTime = '上午7-9点';
        else if (hour >= 17 && hour < 19) bestTime = '傍晚17-19点';
        else bestTime = '任何时间';
        
        return `
            <p>最佳锻炼时间：<span class="highlight">${bestTime}</span></p>
            <p class="section-title">推荐功法</p>
            <p>${Math.random() > 0.5 ? '太极拳：柔和缓慢，适合各年龄段，可强身健体、调节气血。' : '八段锦：简单易学，适合办公室人群，可缓解疲劳、疏通经络。'}</p>
            <p class="section-title">导引术</p>
            <p>${Math.random() > 0.5 ? '五禽戏：模仿虎、鹿、熊、鸟、猴动作，全面锻炼身体。' : '易筋经：拉伸筋骨，适合体质较强的人群，可增强体质。'}</p>
            <p class="section-title">注意事项</p>
            <p>运动前应热身5-10分钟，运动后应拉伸放松。运动量以微微出汗为宜，不可大汗淋漓。运动后忌立即洗澡，以免受寒。</p>
        `;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
