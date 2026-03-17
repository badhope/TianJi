(function() {
    const toolsData = [
        { icon: '🧭', name: '罗盘定向', desc: '测定方位吉凶', action: '使用罗盘测定房屋朝向' },
        { icon: '📐', name: '八卦定位', desc: '分析八宫吉位', action: '按八卦方位分析气场分布' },
        { icon: '🏠', name: '户型分析', desc: '评估房屋格局', action: '分析户型优劣与化解方法' },
        { icon: '🌲', name: '环境勘察', desc: '考察周边环境', action: '勘察山水道路对住宅的影响' },
        { icon: '🔮', name: '能量检测', desc: '测量气场强弱', action: '使用仪器或感知气场' },
        { icon: '✨', name: '开运布局', desc: '调整吉祥摆设', action: '提供风水调整建议' }
    ];

    const knowledgeData = [
        {
            title: '选址原则',
            content: '风水学讲究"藏风聚气"，选址时应选择背山面水、左青龙右白虎的格局。山环水抱之处最易聚气，是建造居所的理想之地。'
        },
        {
            title: '大门朝向',
            content: '大门是住宅的气口，朝向直接影响家宅运势。坐北朝南的门向最为吉利，可吸纳阳气与财气。避免正对厕所、厨房或楼梯。'
        },
        {
            title: '客厅布局',
            content: '客厅宜宽敞明亮，沙发应靠墙摆放，忌背后空旷。客厅中央忌有横梁压顶，可通过装修化解。植物摆放宜选择阔叶类。'
        },
        {
            title: '卧室风水',
            content: '床头宜靠墙，不宜正对门或窗户。床下不宜堆放杂物，以免影响气场流通。镜子不宜正对床铺，容易导致失眠。'
        },
        {
            title: '厨房忌讳',
            content: '厨房忌与卫生间相邻或相对。炉灶不宜正对水槽，水火相克。厨房门不宜正对大门或卧室门，以免油烟直冲。'
        },
        {
            title: '办公室风水',
            content: '办公桌宜背后有靠，前方开阔。座位不宜正对大门或走廊。电脑宜摆放在文昌位，有助于提升事业运势。'
        }
    ];

    function init() {
        renderTools();
        renderKnowledge();
        setupEventListeners();
        initCompass();
    }

    function initCompass() {
        if (window.Compass) {
            window.Compass.init('compassContainer');
        }
    }

    function renderTools() {
        const grid = document.getElementById('toolsGrid');
        grid.innerHTML = toolsData.map(t => `
            <div class="tool-card">
                <div class="tool-icon">${t.icon}</div>
                <h3>${t.name}</h3>
                <p>${t.desc}</p>
            </div>
        `).join('');
    }

    function renderKnowledge() {
        const cards = document.getElementById('knowledgeCards');
        cards.innerHTML = knowledgeData.map(k => `
            <div class="knowledge-card">
                <h4>${k.title}</h4>
                <p>${k.content}</p>
            </div>
        `).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
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

        const houseAnalysis = getHouseFengShuiAnalysis();
        const directionAnalysis = getDirectionAnalysis();
        const placementAdvice = getPlacementAdvice();
        const seasonalTips = getSeasonalFengShuiTips();

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🏠 居家风水深度解析</h3>
                <div class="analysis-block">
                    <p class="section-title">客厅风水</p>
                    <p>${houseAnalysis.livingRoom}</p>
                    <p class="section-title">卧室风水</p>
                    <p>${houseAnalysis.bedroom}</p>
                    <p class="section-title">厨房风水</p>
                    <p>${houseAnalysis.kitchen}</p>
                    <p class="section-title">卫生间风水</p>
                    <p>${houseAnalysis.bathroom}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🧭 方位能量分析</h3>
                <div class="analysis-block">
                    ${directionAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>📍 物品摆放建议</h3>
                <div class="analysis-block">
                    ${placementAdvice}
                </div>
            </div>

            <div class="detail-section">
                <h3>🌸 季节风水调整</h3>
                <div class="analysis-block">
                    ${seasonalTips}
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 风水禁忌提醒</h3>
                <div class="analysis-block">
                    <p>1. 镜子不可对门：镜子对门会反射财气，导致漏财。</p>
                    <p>2. 床头不可对窗：床头对窗易受风寒，影响健康。</p>
                    <p>3. 横梁压顶：横梁压顶会影响事业运和健康运。</p>
                    <p>4. 门对门：门对门会导致口角是非，需用屏风化解。</p>
                    <p>5. 灶台对水槽：水火相冲，会影响家庭和睦。</p>
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

    function getHouseFengShuiAnalysis() {
        const month = new Date().getMonth() + 1;
        
        return {
            livingRoom: month % 2 === 0 ?
                '客厅是家庭的核心区域，代表家庭的事业运和贵人运。客厅光线充足则阳气旺盛，家人事业顺利。客厅保持整洁，家具摆放有序，能提升整体运势。沙发应靠墙摆放，象征有靠山。' :
                '客厅是接待客人和家人聚会的场所，主导家庭的人际关系。客厅家具摆放宜左高右低，左方代表青龙位，主男主人运势。客厅如有横梁，需用吊顶或假花化解。',
            bedroom: Math.random() > 0.5 ?
                '卧室是休息睡眠的场所，主导感情和健康运。床头宜靠墙，不宜悬空。床头不宜对门或窗户，容易受外界气场干扰。卧室颜色宜柔和，不宜过于鲜艳或深沉。' :
                '卧室的床位直接影响睡眠质量和运势。床头朝向宜根据主人命理选择，一般宜向东或东南。卧室镜子不宜对床，容易导致失眠。卧室内不宜放置过多电器，以免影响磁场。',
            kitchen: month % 3 === 0 ?
                '厨房代表家庭的财库，炉灶位置至关重要。炉灶不宜正对水槽，水火相克会导致家庭不和。厨房门不宜对大门或卧室门，以免油烟直冲。厨房保持通风，灶台干净整洁，财运自然来。' :
                '厨房是烹饪之地，主导家人的健康和财运。灶台位置宜坐凶向吉，背靠实墙为佳。厨房颜色宜以浅色为主，避免过于燥热的红色。厨房窗户宜开在东或东南方，采光通风为佳。',
            bathroom: Math.random() > 0.5 ?
                '卫生间是排污之地，主导晦气和病符。卫生间门不宜对厨房门或卧室门，以免秽气扩散。卫生间宜保持干燥清洁，常开换气扇。卫生间的镜子不宜对马桶，以免影响运势。' :
                '卫生间是家中阴气较重的地方，需注意化解。卫生间门宜常关闭，马桶盖使用后宜放下。卫生间可放置绿色植物或香薰化解异味。卫生间的灯具宜保持明亮，驱散阴暗之气。'
        };
    }

    function getDirectionAnalysis() {
        return `
            <p class="section-title">正东（震位）</p>
            <p>代表长男和事业运，宜放置木质物品或绿色植物。忌堆放杂物或金属物品。</p>
            <p class="section-title">正南（离位）</p>
            <p>代表中女和桃花运，宜放置红色物品或灯具。忌放置黑色或蓝色物品。</p>
            <p class="section-title">正西（兑位）</p>
            <p>代表少女和口才运，宜放置白色或金属物品。忌放置红色物品。</p>
            <p class="section-title">正北（坎位）</p>
            <p>代表中男和事业运，宜放置蓝色或黑色物品。忌放置红色或绿色物品。</p>
            <p class="section-title">东南（巽位）</p>
            <p>代表长女和财运，宜放置绿色植物或木质物品。忌放置金属物品。</p>
            <p class="section-title">西南（坤位）</p>
            <p>代表母亲和人际关系，宜放置陶瓷或石头物品。忌放置金属物品。</p>
            <p class="section-title">西北（乾位）</p>
            <p>代表父亲和贵人运，宜放置金属物品或圆形物品。忌放置红色物品。</p>
            <p class="section-title">东北（艮位）</p>
            <p>代表少男和学业运，宜放置陶瓷或石头物品。忌放置金属物品。</p>
        `;
    }

    function getPlacementAdvice() {
        return `
            <p class="section-title">招财植物</p>
            <p>${Math.random() > 0.5 ? '富贵竹：适合放置在客厅或书房，代表事业学业进步。' : '发财树：适合放置在客厅财位，提升整体财运。'}绿植需保持叶面清洁，枯叶及时剪除。</p>
            <p class="section-title">镇宅摆件</p>
            <p>${Math.random() > 0.5 ? '貔貅：适合放置在客厅或办公室，可招财进宝。需注意貔貅头部宜向外。' : '金蟾：适合放置在客厅或店铺，可聚财守财。需注意金蟾口宜向内。'}</p>
            <p class="section-title">风水画</p>
            <p>${Math.random() > 0.5 ? '山水画：适合放置在客厅或办公室，代表靠山和水主财。' : '牡丹画：适合放置在客厅或卧室，代表富贵荣华。'}画作宜选择明亮色调，避免过于阴暗的作品。</p>
            <p class="section-title">灯光布局</p>
            <p>家中灯光宜柔和明亮，过明过暗都不利。客厅主灯宜放在正中央，卧室宜使用暖色调灯光。走廊和楼梯处宜安装小夜灯照明。</p>
        `;
    }

    function getSeasonalFengShuiTips() {
        const month = new Date().getMonth() + 1;
        
        let season = '';
        if (month >= 3 && month <= 5) season = '春季';
        else if (month >= 6 && month <= 8) season = '夏季';
        else if (month >= 9 && month <= 11) season = '秋季';
        else season = '冬季';
        
        return `
            <p>当前为<span class="highlight">${season}</span>，风水调整建议如下：</p>
            <p class="section-title">${season}特点</p>
            <p>${season === '春季' ? '木气旺盛，宜在东方放置绿色植物或水养植物，提升生气。' : 
               season === '夏季' ? '火气旺盛，宜在南方放置红色物品或水晶，化解燥热。' : 
               season === '秋季' ? '金气旺盛，宜在西方放置白色物品或金属摆件，提升财运。' : 
               '水气旺盛，宜在北方放置蓝色物品或鱼缸，提升事业运。'}</p>
            <p class="section-title">${season}开运方法</p>
            <p>${Math.random() > 0.5 ? '保持室内通风换气，让新鲜空气流通。' : '适当调整家具位置，保持气场流通。'} ${Math.random() > 0.5 ? '多晒太阳，吸收天地之精华。' : '使用香薰或精油，营造和谐氛围。'}</p>
        `;
    }
})();
