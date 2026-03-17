(function() {
    const festivalsData = [
        { name: '春节', date: '正月初一', icon: '🧧', description: '辞旧迎新，团圆喜庆', customs: ['贴春联', '放鞭炮', '拜年', '发红包'] },
        { name: '元宵节', date: '正月十五', icon: '🏮', description: '赏灯猜谜，共庆团圆', customs: ['吃元宵', '赏花灯', '猜灯谜', '舞龙舞狮'] },
        { name: '清明节', date: '四月初五', icon: '🌿', description: '祭祖扫墓，踏青游春', customs: ['扫墓祭祖', '踏青', '插柳', '放风筝'] },
        { name: '端午节', date: '五月初五', icon: '🐉', description: '纪念屈原，驱邪避疫', customs: ['吃粽子', '赛龙舟', '挂艾草', '佩香囊'] },
        { name: '中秋节', date: '八月十五', icon: '🌙', description: '赏月团圆，共叙亲情', customs: ['赏月', '吃月饼', '赏桂花', '猜灯谜'] },
        { name: '重阳节', date: '九月初九', icon: '🌼', description: '登高祈福，敬老孝亲', customs: ['登高', '赏菊', '饮菊花酒', '佩茱萸'] }
    ];

    const taboosData = [
        { category: '节日禁忌', items: ['正月初一不扫地', '元宵节不洗头', '端午日不说不吉利话', '中秋节不婚嫁'] },
        { category: '日常禁忌', items: ['筷子不插在饭中', '不把药渣倒在大路上', '室内不撑伞', '不拍别人肩膀'] },
        { category: '婚嫁禁忌', items: ['忌属相相冲', '迎亲不走回头路', '孕妇不参加婚礼', '寡妇不送亲'] },
        { category: '丧葬禁忌', items: ['守丧期间不拜年', '不穿红戴绿', '不办喜事', '不入他人宅'] }
    ];

    const customsData = [
        { name: '作揖', icon: '🙇', description: '传统礼仪，双手合十鞠躬', origin: '周礼' },
        { name: '跪拜', icon: '👑', description: '最高礼仪，三跪九叩', origin: '古代礼制' },
        { name: '敬酒', icon: '🍶', description: '酒桌礼仪，先敬长辈', origin: '饮食礼俗' },
        { name: '称呼', icon: '👤', description: '长幼有序，称呼讲究', origin: '儒家礼教' }
    ];

    function init() {
        renderFestivals();
        renderTaboos();
        renderCustoms();
        setupEventListeners();
    }

    function renderFestivals() {
        const grid = document.getElementById('festivalsGrid');
        if (!grid) return;
        
        grid.innerHTML = festivalsData.map((festival, index) => `
            <div class="festival-card" data-index="${index}">
                <div class="festival-icon">${festival.icon}</div>
                <div class="festival-name">${festival.name}</div>
                <div class="festival-date">${festival.date}</div>
                <div class="festival-desc">${festival.description}</div>
            </div>
        `).join('');
    }

    function renderTaboos() {
        const list = document.getElementById('taboosList');
        if (!list) return;
        
        list.innerHTML = taboosData.map((taboo, index) => `
            <div class="taboo-category">
                <h3>${taboo.category}</h3>
                <ul>
                    ${taboo.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    function renderCustoms() {
        const grid = document.getElementById('customsGrid');
        if (!grid) return;
        
        grid.innerHTML = customsData.map((custom, index) => `
            <div class="custom-card" data-index="${index}">
                <div class="custom-icon">${custom.icon}</div>
                <div class="custom-name">${custom.name}</div>
                <div class="custom-desc">${custom.description}</div>
                <div class="custom-origin">源于：${custom.origin}</div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.querySelectorAll('.festival-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                showFestivalDetail(festivalsData[index]);
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

    function showFestivalDetail(festival) {
        alert(`${festival.name} (${festival.date})\n${festival.description}\n习俗：${festival.customs.join('、')}`);
    }

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🏮 传统节日文化</h3>
                <div class="analysis-block">
                    <p>中国传统节日是中华民族文化的重要组成部分，蕴含着深厚的历史文化内涵。</p>
                    <p class="section-title">节日与节气</p>
                    <p>很多传统节日与二十四节气密切相关，如清明节对应春分、端午节接近夏至等。</p>
                    <p class="section-title">节日与农耕</p>
                    <p>传统节日大多源于农耕社会，反映了农业生产的季节性和周期性特点。</p>
                    <p class="section-title">节日与祭祀</p>
                    <p>很多节日最初都有祭祀性质，如清明祭祖、端午驱邪、重阳敬老等。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 民间禁忌解读</h3>
                <div class="analysis-block">
                    <p>民间禁忌是民间信仰的重要组成部分，虽然看似迷信，但往往蕴含着深层文化意义。</p>
                    <p class="section-title">禁忌的心理功能</p>
                    <p>1. 心理暗示：通过禁忌来规范行为</p>
                    <p>2. 精神寄托：表达对美好生活的向往</p>
                    <p>3. 社会规范：维护社会秩序和伦理</p>
                    <p class="section-title">理性看待</p>
                    <p>对于民间禁忌，我们应该取其精华、去其糟粕，理性看待其中的文化价值。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>📿 传统礼仪现代价值</h3>
                <div class="analysis-block">
                    <p>传统礼仪是中华文明的标志之一，在现代社会中仍具有重要价值。</p>
                    <p class="section-title">社交价值</p>
                    <p>传统礼仪有助于构建和谐的人际关系，促进社会和谐。</p>
                    <p class="section-title">文化传承</p>
                    <p>礼仪是文化的重要载体，传承礼仪就是传承文化。</p>
                    <p class="section-title">个人修养</p>
                    <p>知礼懂礼是个人修养的重要体现，有助于提升个人形象。</p>
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
