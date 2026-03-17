(function() {
    const ruishouData = [
        { name: '青龙', icon: '🐉', category: '瑞兽', element: '木', description: '东方之神，主木，象征着权力与尊贵。', ability: '守护东方，带来生机与活力', color: '#4CAF50' },
        { name: '白虎', icon: '🐅', category: '瑞兽', element: '金', description: '西方之神，主金，象征着正义与勇猛。', ability: '守护西方，驱邪避凶', color: '#9E9E9E' },
        { name: '朱雀', icon: '🦅', category: '瑞兽', element: '火', description: '南方之神，主火，象征着吉祥与热情。', ability: '守护南方，带来好运与繁荣', color: '#F44336' },
        { name: '玄武', icon: '🐢', category: '瑞兽', element: '水', description: '北方之神，主水，象征着智慧与长寿。', ability: '守护北方，镇宅保平安', color: '#2196F3' },
        { name: '麒麟', icon: '🦌', category: '瑞兽', element: '土', description: '仁德之兽，象征着祥瑞与太平。', ability: '预示盛世出现', color: '#FF9800' },
        { name: '凤凰', icon: '🦅', category: '瑞兽', element: '火', description: '百鸟之王，象征着吉祥如意。', ability: '浴火重生', color: '#E91E63' },
        { name: '貔貅', icon: '🦁', category: '瑞兽', element: '金', description: '招财进宝，只进不出。', ability: '镇宅招财', color: '#FFD700' },
        { name: '狻猊', icon: '🦁', category: '瑞兽', element: '火', description: '形似狮子，喜烟好坐。', ability: '护法辟邪', color: '#8B4513' }
    ];

    const xiongshouData = [
        { name: '饕餮', icon: '👹', category: '凶兽', element: '土', description: '贪吃之兽，象征着贪婪。', ability: '寓意警示', color: '#5D4037' },
        { name: '穷奇', icon: '👺', category: '凶兽', element: '金', description: '助恶之兽，象征着邪恶。', ability: '预示凶兆', color: '#3E2723' },
        { name: '梼杌', icon: '👾', category: '凶兽', element: '木', description: '顽固之兽，象征着冥顽不灵。', ability: '寓意警醒', color: '#1B5E20' },
        { name: '混沌', icon: '🌑', category: '凶兽', element: '水', description: '是非不分，象征着愚昧。', ability: '寓意迷惑', color: '#263238' }
    ];

    const shenniaoData = [
        { name: '鲲鹏', icon: '🐟', category: '神鸟', element: '水', description: '化为鹏，扶摇直上九万里。', ability: '象征远大志向', color: '#00BCD4' },
        { name: '鸿鹄', icon: '🦅', category: '神鸟', element: '风', description: '志向高远，鸿鹄之志。', ability: '象征抱负', color: '#03A9F4' },
        { name: '玄鸟', icon: '🐦', category: '神鸟', element: '木', description: '商族始祖，象征祥瑞。', ability: '预示吉兆', color: '#4CAF50' },
        { name: '金乌', icon: '☀️', category: '神鸟', element: '火', description: '太阳之精，十日所化。', ability: '象征太阳', color: '#FF5722' }
    ];

    const lingshouData = [
        { name: '九尾狐', icon: '🦊', category: '灵兽', element: '木', description: '九条尾巴，象征着智慧与长寿。', ability: '迷惑与幻化', color: '#FF4081' },
        { name: '白泽', icon: '🦌', category: '灵兽', element: '水', description: '通晓万物，能言人语。', ability: '辟邪除灾', color: '#ECEFF1' },
        { name: '獬豸', icon: '🦌', category: '灵兽', element: '金', description: '明辨是非，象征公正。', ability: '断案如神', color: '#607D8B' },
        { name: '乘黄', icon: '🦌', category: '灵兽', element: '土', description: '神马之车，乘坐可延年益寿。', ability: '长寿祥瑞', color: '#FFC107' }
    ];

    function init() {
        renderBeasts();
        setupEventListeners();
    }

    function renderBeasts() {
        renderCategory('ruishouGrid', ruishouData);
        renderCategory('xiongshouGrid', xiongshouData);
        renderCategory('shenniaoGrid', shenniaoData);
        renderCategory('lingshouGrid', lingshouData);
    }

    function renderCategory(gridId, data) {
        const grid = document.getElementById(gridId);
        if (!grid) return;
        
        grid.innerHTML = data.map((beast, index) => `
            <div class="beast-card" data-index="${index}" data-category="${gridId}" style="--delay: ${index}">
                <div class="beast-icon" style="color: ${beast.color}">${beast.icon}</div>
                <div class="beast-name">${beast.name}</div>
                <div class="beast-element">${beast.element}</div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.querySelectorAll('.beast-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                const index = parseInt(card.dataset.index);
                let beast;
                
                switch(category) {
                    case 'ruishouGrid': beast = ruishouData[index]; break;
                    case 'xiongshouGrid': beast = xiongshouData[index]; break;
                    case 'shenniaoGrid': beast = shenniaoData[index]; break;
                    case 'lingshouGrid': beast = lingshouData[index]; break;
                }
                
                showBeastModal(beast);
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

        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('beastModal');
        if (modalClose && modal) {
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }

    function showBeastModal(beast) {
        const modal = document.getElementById('beastModal');
        const modalBody = document.getElementById('modalBody');
        
        if (!modal || !modalBody) return;
        
        modalBody.innerHTML = `
            <div class="detail-header" style="text-align: center; padding: 20px;">
                <div class="beast-icon-large" style="font-size: 80px; color: ${beast.color};">${beast.icon}</div>
                <h2 style="color: ${beast.color}; margin-top: 10px;">${beast.name}</h2>
                <span class="beast-badge" style="background: ${beast.color}; padding: 5px 15px; border-radius: 20px; color: white;">${beast.category}</span>
            </div>
            <div class="detail-content" style="padding: 20px;">
                <div class="detail-row">
                    <span class="detail-label">属性：</span>
                    <span class="detail-value">${beast.element}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">描述：</span>
                    <span class="detail-value">${beast.description}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">神力：</span>
                    <span class="detail-value">${beast.ability}</span>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🐉 四象神兽</h3>
                <div class="analysis-block">
                    <p><span class="highlight">青龙、白虎、朱雀、玄武</span>又称四灵，是中国古代神话中的四方之神兽。它们各镇守一方，分别对应木、金、火、水四种元素。</p>
                    <p class="section-title">青龙（东方）</p>
                    <p>青龙代表东方，属木，色青。主春季，象征着生长与繁荣。在风水学中，青龙位代表贵人、事业与财运。</p>
                    <p class="section-title">白虎（西方）</p>
                    <p>白虎代表西方，属金，色白。主秋季，象征着威武与正义。白虎位代表武职、权威与魄力。</p>
                    <p class="section-title">朱雀（南方）</p>
                    <p>朱雀代表南方，属火，色红。主夏季，象征着热情与吉祥。朱雀位代表功名、声望与文化。</p>
                    <p class="section-title">玄武（北方）</p>
                    <p>玄武代表北方，属水，色黑。主冬季，象征着智慧与长寿。玄武位代表偏财、玄学与暗中力量。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🦌 瑞兽文化</h3>
                <div class="analysis-block">
                    <p>瑞兽是指寓意吉祥的神兽，它们的出现预示着太平盛世的到来。麒麟、凤凰、貔貅等都是典型的瑞兽。</p>
                    <p class="section-title">麒麟</p>
                    <p>麒麟是仁德之兽，只有在盛世才会出现。传说孔子出生时，有麒麟降临，这就是"麒麟吐玉书"的典故。</p>
                    <p class="section-title">凤凰</p>
                    <p>凤凰是百鸟之王，象征着吉祥如意。凤凰涅槃，浴火重生，寓意着重生与希望。</p>
                    <p class="section-title">貔貅</p>
                    <p>貔貅以财为食，只进不出，因此被视为招财进宝的神兽。很多商家都会摆放貔貅来招揽生意。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔮 神兽与风水</h3>
                <div class="analysis-block">
                    <p>在风水学中，神兽有着重要的镇宅化煞作用。正确摆放神兽可以起到趋吉避凶的效果。</p>
                    <p class="section-title">摆放原则</p>
                    <p>1. 貔貅：头朝门口或窗外，忌朝内</p>
                    <p>2. 麒麟：放置在文昌位或财位</p>
                    <p>3. 狮子：分公母，公左母右，头朝外</p>
                    <p>4. 龙：宜放置在水位，如鱼缸</p>
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
