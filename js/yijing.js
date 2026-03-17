(function() {
    const hexagrams = [
        { symbol: '�乾', name: '乾为天', gua: '☰☰', keywords: '元亨利贞', desc: '象征天，创始、亨通、吉利、贞正。' },
        { symbol: '�坤', name: '坤为地', gua: '☷☷', keywords: '元亨', desc: '象征地，柔顺、包容、承载万物。' },
        { symbol: '�屯', name: '水雷屯', gua: '☵☳', keywords: '元亨利贞', desc: '象征事物初生时的艰难处境。' },
        { symbol: '�蒙', name: '山水蒙', gua: '☶☵', keywords: '亨', desc: '象征蒙昧，启发童蒙之意。' },
        { symbol: '�讼', name: '天水讼', gua: '☰☵', keywords: '有孚窒惕', desc: '象征争讼，诉讼之事。' },
        { symbol: '�否', name: '天地否', gua: '☷☰', keywords: '否之匪人', desc: '象征闭塞不通，小人当道。' },
        { symbol: '同人', name: '天火同人', gua: '☰☲', keywords: '同人于野', desc: '象征与人同心协力。' },
        { symbol: '大有', name: '火天大有', gua: '☲☰', keywords: '元亨', desc: '象征大获所有，丰收富足。' },
        { symbol: '谦', name: '地山谦', gua: '☷☶', keywords: '亨君子有终', desc: '象征谦虚，谦逊有益。' },
        { symbol: '豫', name: '雷地豫', gua: '☳☷', keywords: '利建侯行师', desc: '象征欢乐喜悦之事。' },
        { symbol: '随', name: '泽雷随', gua: '☴☳', keywords: '元亨利贞', desc: '象征随从、顺从之意。' },
        { symbol: '蛊', name: '山风蛊', gua: '☶☴', keywords: '元亨', desc: '象征除弊治乱之事。' },
        { symbol: '临', name: '地泽临', gua: '☷☴', keywords: '元亨利贞', desc: '象征君临天下，监临之意。' },
        { symbol: '观', name: '风地观', gua: '☴☷', keywords: '盥而不荐', desc: '象征观察、观摩之事。' },
        { symbol: '噬嗑', name: '火雷噬嗑', gua: '☲☳', keywords: '亨', desc: '象征刑罚、断案之事。' },
        { symbol: '贲', name: '山火贲', gua: '☶☲', keywords: '亨小利有攸往', desc: '象征文饰、装饰之美。' },
        { symbol: '剥', name: '山地剥', gua: '☶☷', keywords: '不利有攸往', desc: '象征剥落、衰落之事。' },
        { symbol: '复', name: '地雷复', gua: '☷☳', keywords: '亨', desc: '象征复归、回复之意。' },
        { symbol: '无妄', name: '天雷无妄', gua: '☰☳', keywords: '元亨利贞', desc: '象征不妄为，顺其自然。' },
        { symbol: '大畜', name: '山天大畜', gua: '☶☰', keywords: '利贞', desc: '象征大为蓄积之事。' },
        { symbol: '颐', name: '山雷颐', gua: '☶☳', keywords: '贞吉', desc: '象征颐养、休息之事。' },
        { symbol: '大过', name: '泽风大过', gua: '☴☴', keywords: '栋桡', desc: '象征过度、超越常规。' },
        { symbol: '坎', name: '坎为水', gua: '☵☵', keywords: '习坎孚', desc: '象征险陷、重重困难。' },
        { symbol: '离', name: '离为火', gua: '☲☲', keywords: '利贞亨', desc: '象征美丽、依附之意。' },
        { symbol: '咸', name: '泽山咸', gua: '☴☶', keywords: '亨利贞', desc: '象征感应、沟通之事。' },
        { symbol: '恒', name: '雷风恒', gua: '☳☴', keywords: '亨无咎', desc: '象征恒久、持久之意。' },
        { symbol: '遁', name: '天山遁', gua: '☰☶', keywords: '亨小利贞', desc: '象征退避、隐退之意。' },
        { symbol: '大壮', name: '雷天大壮', gua: '☳☰', keywords: '利贞', desc: '象征壮大、强盛之意。' },
        { symbol: '晋', name: '火地晋', gua: '☲☷', keywords: '康侯用锡马', desc: '象征晋升、前进之意。' },
        { symbol: '明夷', name: '地火明夷', gua: '☷☲', keywords: '利艰贞', desc: '象征光明受伤、君子处难。' },
        { symbol: '家人', name: '风火家人', gua: '☴☲', keywords: '利女贞', desc: '象征家庭、齐家之事。' },
        { symbol: '睽', name: '火泽睽', gua: '☲☴', keywords: '小事吉', desc: '象征乖离、违背之意。' },
        { symbol: '蹇', name: '水山蹇', gua: '☵☶', keywords: '利西南不利东北', desc: '象征行走艰难、困阻重重。' },
        { symbol: '解', name: '雷水解', gua: '☳☵', keywords: '利西南', desc: '象征解除困难、舒解险难。' },
        { symbol: '损', name: '山泽损', gua: '☶☴', keywords: '有孚元吉', desc: '象征减损、损失之意。' },
        { symbol: '益', name: '风雷益', gua: '☴☳', keywords: '利有攸往', desc: '象征增益、受益之事。' },
        { symbol: '夬', name: '泽天夬', gua: '☴☰', keywords: '扬于王庭', desc: '象征决断、裁决之事。' },
        { symbol: '姤', name: '天风姤', gua: '☰☴', keywords: '女壮勿取', desc: '象征相遇、邂逅之事。' },
        { symbol: '萃', name: '泽地萃', gua: '☴☷', keywords: '亨王假有庙', desc: '象征汇聚、聚集之事。' },
        { symbol: '升', name: '地风升', gua: '☷☴', keywords: '元亨', desc: '象征上升、晋升之意。' },
        { symbol: '困', name: '泽水困', gua: '☴☵', keywords: '亨贞大人吉', desc: '象征困穷、困境之时。' },
        { symbol: '井', name: '水风井', gua: '☵☴', keywords: '改邑不改井', desc: '象征井德，恒常不变。' },
        { symbol: '革', name: '泽火革', gua: '☴☲', keywords: '己日乃孚', desc: '象征变革、改革之事。' },
        { symbol: '鼎', name: '火风鼎', gua: '☲☴', keywords: '元吉亨', desc: '象征鼎新、创业之事。' },
        { symbol: '震', name: '震为雷', gua: '☳☳', keywords: '亨震来虩虩', desc: '象征震动、惊恐之事。' },
        { symbol: '艮', name: '艮为山', gua: '☶☶', keywords: '艮其背不获其身', desc: '象征静止、抑止之意。' },
        { symbol: '渐', name: '风山渐', gua: '☴☶', keywords: '女归吉利贞', desc: '象征渐进、循序渐进。' },
        { symbol: '归妹', name: '雷泽归妹', gua: '☳☴', keywords: '征凶无攸利', desc: '象征嫁女、归宁之事。' },
        { symbol: '丰', name: '雷火丰', gua: '☳☲', keywords: '亨王假之', desc: '象征丰盛、丰收之时。' },
        { symbol: '旅', name: '火山旅', gua: '☲☶', keywords: '小亨旅贞吉', desc: '象征旅行、旅居之事。' },
        { symbol: '巽', name: '巽为风', gua: '☴☴', keywords: '小亨有攸往', desc: '象征顺从、渗入之意。' },
        { symbol: '兑', name: '兑为泽', gua: '☴☴', keywords: '亨利贞', desc: '象征喜悦、和悦之意。' },
        { symbol: '涣', name: '风水涣', gua: '☵☴', keywords: '亨王假有庙', desc: '象征离散、涣散之事。' },
        { symbol: '节', name: '水泽节', gua: '☵☴', keywords: '亨苦节不可贞', desc: '象征节制、节约之意。' },
        { symbol: '中孚', name: '风泽中孚', gua: '☴☴', keywords: '豚鱼吉', desc: '象征诚信、中心可信。' },
        { symbol: '小过', name: '雷山小过', gua: '☳☶', keywords: '亨利贞', desc: '象征小有过越之事。' },
        { symbol: '既济', name: '水火既济', gua: '☵☲', keywords: '亨小利贞', desc: '象征成功、成就之事。' },
        { symbol: '未济', name: '火水未济', gua: '☲☵', keywords: '亨小狐汔济', desc: '象征未成、尚未成功。' }
    ];

    let currentHexagramIndex = null;

    function init() {
        renderHexagrams();
        setupEventListeners();
    }

    function renderHexagrams() {
        const grid = document.getElementById('hexagramsGrid');
        
        grid.innerHTML = hexagrams.map((h, index) => `
            <div class="hexagram-card" data-index="${index}">
                <div class="hexagram-symbol">${h.gua}</div>
                <div class="hexagram-name">${h.name}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.hexagram-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                showHexagramDetail(index);
            });
        });
    }

    function setupEventListeners() {
        const divinateBtn = document.getElementById('divinateBtn');
        const coins = document.querySelectorAll('.coin');
        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('hexagramModal');

        divinateBtn.addEventListener('click', performDivination);

        coins.forEach(coin => {
            coin.addEventListener('click', () => {
                flipCoin(coin);
            });
        });

        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        }

        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', showExpandedDetails);
        }

        const closeExpanded = document.getElementById('closeExpanded');
        if (closeExpanded) {
            closeExpanded.addEventListener('click', hideExpandedDetails);
        }
    }

    function flipCoin(coin) {
        coin.classList.add('flipping');
        
        const sides = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷'];
        
        setTimeout(() => {
            const randomSide = sides[Math.floor(Math.random() * sides.length)];
            coin.textContent = randomSide;
            coin.classList.remove('flipping');
        }, 250);
    }

    function performDivination() {
        const coins = document.querySelectorAll('.coin');
        
        coins.forEach((coin, index) => {
            setTimeout(() => {
                flipCoin(coin);
            }, index * 300);
        });

        setTimeout(() => {
            const results = [];
            coins.forEach(coin => {
                results.push(coin.textContent);
            });

            const hash = hashCode(results.join(''));
            const hexagramIndex = hash % 64;
            currentHexagramIndex = hexagramIndex;
            
            showHexagramDetail(hexagramIndex);
            
            if (window.addToHistory) {
                window.addToHistory('易经起卦', '☯️', 'yijing.html');
            }
        }, 1500);
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function showHexagramDetail(index) {
        const hexagram = hexagrams[index];
        const modal = document.getElementById('hexagramModal');
        const modalBody = document.getElementById('modalBody');

        const yaoMeanings = [
            '初九：潜龙勿用 - 事物初创，宜积蓄力量',
            '九二：见龙在田，利见大人 - 崭露头角，得贵人相助',
            '九三：君子终日乾乾，夕惕若厉，无咎 - 勤勉谨慎，避免过失',
            '九四：或跃在渊，无咎 - 把握时机，一跃冲天',
            '九五：飞龙在天，利见大人 - 成就非凡，受人敬仰',
            '上九：亢龙有悔 - 盛极必衰，当知进退'
        ];

        modalBody.innerHTML = `
            <h2>${hexagram.gua} ${hexagram.name}</h2>
            <p style="text-align: center; color: var(--text-muted);">${hexagram.keywords}</p>
            
            <h3>卦象解读</h3>
            <p>${hexagram.desc}</p>
            
            <h3>六爻详解</h3>
            ${yaoMeanings.map(y => `<p>${y}</p>`).join('')}
            
            <h3>应用建议</h3>
            <p>此卦${hexagram.keywords}，${generateAdvice(hexagram)}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px;">
                <p style="font-size: 0.9rem; color: var(--text-muted);">易经占卜仅供娱乐参考，人生道路还需自己努力抉择。</p>
            </div>
        `;

        modal.classList.add('active');
    }

    function generateAdvice(hexagram) {
        const advices = [
            '此时正是行动的好时机，但需保持谨慎',
            '宜守成待机，不宜冒进',
            '应该广结善缘，多方求教',
            '当前形势有利，可以把握机会发展',
            '需要耐心等待，时机未到不可强求',
            '应当顺势而为，不可逆天而行'
        ];
        
        const hash = hashCode(hexagram.name);
        return advices[hash % advices.length];
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function showExpandedDetails() {
        if (currentHexagramIndex === null) return;
        
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        const hexagram = hexagrams[currentHexagramIndex];
        
        const guaAnalysis = getHexagramDetailedAnalysis(hexagram);
        const yaoAnalysis = getYaoDetailedAnalysis(currentHexagramIndex);
        const applicationGuidance = getApplicationGuidance(hexagram);
        const warnings = getHexagramWarnings(hexagram);
        const fortuneTelling = getFortuneTelling(hexagram);

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>☯ 卦象深度解析</h3>
                <div class="analysis-block">
                    <p><span class="highlight">卦名：</span>${hexagram.name}</p>
                    <p><span class="highlight">卦象：</span>${hexagram.gua}</p>
                    <p><span class="highlight">卦辞：</span>${hexagram.keywords}</p>
                    <p class="section-title">卦象解读</p>
                    <p>${guaAnalysis}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>📜 六爻详尽解读</h3>
                <div class="analysis-block">
                    ${yaoAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>🎯 应用指导</h3>
                <div class="analysis-block">
                    ${applicationGuidance}
                </div>
            </div>

            <div class="detail-section">
                <h3>💡 决策建议</h3>
                <div class="analysis-block">
                    ${fortuneTelling}
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 注意事项</h3>
                <div class="analysis-block">
                    ${warnings}
                </div>
            </div>

            <div class="detail-section">
                <h3>🔮 变卦启示</h3>
                <div class="analysis-block">
                    ${getBianGuaAnalysis(currentHexagramIndex)}
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

    function getHexagramDetailedAnalysis(hexagram) {
        const analyses = {
            '乾为天': '此卦为六十四卦之首，象征天，寓意刚健进取。卦中全是阳爻，代表至刚至阳之力。运势亨通无阻，适合开拓新事业。但需注意刚过易折，宜柔和行事。',
            '坤为地': '此卦象征地，柔顺包容，厚德载物。卦中全是阴爻，代表至柔至顺之力。运势平稳上升，宜保持低调，积累实力。不宜冒进，宜稳守待机。',
            '水雷屯': '此卦象征事物初生之时的艰难处境。坎上震下，水雷相生，寓意创业初期困难重重但蕴含生机。需耐心等待时机，不可急于求成。',
            '山水蒙': '此卦象征蒙昧，寓意教育启蒙之道。山高水险，事物初创，宜虚心求学，接受教化。运势渐明，适合学习新知识。',
            '天水讼': '此卦象征争讼，寓意诉讼争端。天水相违，两者不能相容。运势有阻，不宜与人争执，宜以和为贵。',
            '天地否': '此卦象征闭塞不通，小人当道。天地不交，万物不通。运势不佳，宜守不宜动，需耐心等待转机。',
            '天火同人': '此卦象征与人同心协力。天火同光，万众一心。运势亨通，宜广结善缘，与人合作可成大事。',
            '火天大有': '此卦象征大获所有，丰收富足。火在天上，光明普照。运势鼎盛，宜把握机会，发展事业。',
            '地山谦': '此卦象征谦虚，谦逊有益。山在地下，寓意内涵深厚而外表谦逊。运势大吉，宜保持低调，收获将至。',
            '雷地豫': '此卦象征欢乐喜悦之事。雷出地上，万物振奋。运势亨通，宜把握当下，享受生活。'
        };
        return analyses[hexagram.name] || `此卦名为${hexagram.name}，${hexagram.desc}此卦寓意${hexagram.keywords}，当前运势${Math.random() > 0.5 ? '平稳向上' : '需要静待时机'}。`;
    }

    function getYaoDetailedAnalysis(index) {
        const yaoAnalyses = [
            '<p class="section-title">初九（最下爻）</p><p>潜龙勿用 - 事物初创，宜积蓄力量，不可贸然行动。此阶段应韬光养晦，等待时机。</p>',
            '<p class="section-title">九二（第二爻）</p><p>见龙在田，利见大人 - 崭露头角，得贵人相助。运势渐开，宜主动寻求帮助。</p>',
            '<p class="section-title">九三（第三爻）</p><p>君子终日乾乾，夕惕若厉，无咎 - 勤勉谨慎，避免过失。此时需持续努力，不可懈怠。</p>',
            '<p class="section-title">九四（第四爻）</p><p>或跃在渊，无咎 - 把握时机，一跃冲天。运势转折点，宜果断决策。</p>',
            '<p class="section-title">九五（第五爻）</p><p>飞龙在天，利见大人 - 成就非凡，受人敬仰。运势鼎盛，宜把握机遇。</p>',
            '<p class="section-title">上九（最上爻）</p><p>亢龙有悔 - 盛极必衰，当知进退。需防盈满则亏，宜见好就收。</p>'
        ];
        
        let html = '';
        const startIdx = index % 6;
        for (let i = 0; i < 6; i++) {
            html += yaoAnalyses[(startIdx + i) % 6];
        }
        return html;
    }

    function getApplicationGuidance(hexagram) {
        return `
            <p class="section-title">事业方面</p>
            <p>${hexagram.name.includes('乾') || hexagram.name.includes('壮') ? '宜积极进取，把握机遇' : 
               hexagram.name.includes('坤') || hexagram.name.includes('遁') ? '宜稳守待机，不宜冒进' : 
               '宜稳步发展，循序渐进'}。当前形势${Math.random() > 0.5 ? '有利于主动出击' : '适合静观其变'}。</p>
            
            <p class="section-title">财运方面</p>
            <p>${Math.random() > 0.5 ? '正财收入稳定，偏财可适当关注' : '宜守财为主，避免冲动投资'}。</p>
            
            <p class="section-title">感情方面</p>
            <p>${Math.random() > 0.5 ? '感情运势良好，宜主动表达' : '需耐心等待，缘分自然来'}。</p>
            
            <p class="section-title">健康方面</p>
            <p>注意${Math.random() > 0.5 ? '休息调养，避免过度劳累' : '饮食规律，保持良好作息'}。</p>
        `;
    }

    function getFortuneTelling(hexagram) {
        const fortunes = [
            '此卦大吉，只要把握时机，定能成功。',
            '此卦中吉，需要耐心等待时机成熟。',
            '此卦小吉，虽然有阻力但终能化解。',
            '此卦宜静不宜动，需等待有利时机。',
            '此卦有贵人相助，宜寻求他人支持。',
            '此卦需谨慎行事，不可盲目冒进。'
        ];
        
        const hash = hexagram.name.charCodeAt(0) + hexagram.name.charCodeAt(1);
        const fortune = fortunes[hash % fortunes.length];
        
        return `
            <p><span class="highlight">总体运势：</span>${fortune}</p>
            <p class="section-title">今日建议</p>
            <p>保持${Math.random() > 0.5 ? '积极乐观' : '沉稳内敛'}的心态，${Math.random() > 0.5 ? '主动出击' : '以静制动'}为上策。遇到困难时${Math.random() > 0.5 ? '寻求贵人帮助' : '自行解决'}。</p>
        `;
    }

    function getHexagramWarnings(hexagram) {
        const warnings = [
            '<p>⚠️ 此卦虽吉，但需注意盛极必反，不可过度扩张。</p>',
            '<p>⚠️ 当前运势有阻，需耐心等待时机，不可急于求成。</p>',
            '<p>⚠️ 宜保持低调，避免锋芒毕露，引起小人注意。</p>',
            '<p>⚠️ 需注意人际关系，与人合作需谨慎。</p>'
        ];
        
        const hash = hexagram.name.length;
        return warnings[hash % warnings.length] + '<p>保持谨慎但不必过度担忧，顺势而为即可。</p>';
    }

    function getBianGuaAnalysis(index) {
        const bianGuas = [
            '<p>变卦为<span class="highlight">坤为地</span>：阳爻变阴爻，刚柔并济之道。启示：宜以柔克刚，善于变通。</p>',
            '<p>变卦为<span class="highlight">巽为风</span>：顺势而为，随风而动。启示：宜顺应时势，不可逆流而上。</p>',
            '<p>变卦为<span class="highlight">离为火</span>：光明磊落，内外兼修。启示：宜保持正直，光明行事。</p>',
            '<p>变卦为<span class="highlight">坎为水</span>：险中求进，困境求生。启示：需勇于面对挑战，在困难中成长。</p>',
            '<p>变卦为<span class="highlight">艮为山</span>：适时而止，见好就收。启示：懂得进退，明白何时该停下脚步。</p>',
            '<p>变卦为<span class="highlight">震为雷</span>：一鸣惊人，声震四方。启示：抓住机遇，可以一飞冲天。</p>'
        ];
        
        return bianGuas[index % bianGuas.length] + '<p>变卦显示事物发展方向有所改变，需要适时调整策略。</p>';
    }
})();
