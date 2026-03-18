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
        toast.innerHTML = `<span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('hiding');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }

    const dragonsData = [
        { 
            name: '北干龙', 
            icon: '🐉', 
            description: '从昆仑山起，经祁连山、燕山至东北三省',
            provinces: '新疆、甘肃、宁夏、内蒙古、东北',
            famous: ['长白山', '泰山']
        },
        { 
            name: '中干龙', 
            icon: '🐲', 
            description: '从昆仑山起，经秦岭、大别山至江浙沿海',
            provinces: '陕西、河南、安徽、江苏、浙江',
            famous: ['华山', '嵩山', '黄山']
        },
        { 
            name: '南干龙', 
            icon: '🐭', 
            description: '从昆仑山起，经岷山、巫山、武夷山至东南沿海',
            provinces: '四川、湖北、湖南、江西、福建、广东',
            famous: ['峨眉山', '武夷山']
        }
    ];

    const mountainsData = [
        { name: '泰山', location: '山东', rank: '五岳独尊', description: '帝王封禅之地，龙脉之祖', fengshui: '气场强大，宜登高祈福' },
        { name: '华山', location: '陕西', rank: '奇险天下第一', description: '道教圣地，龙脉之枢', fengshui: '正气凛然，宜求平安' },
        { name: '衡山', location: '湖南', rank: '南岳', description: '佛教道场共存，福寿之地', fengshui: '灵气充沛，宜求财运' },
        { name: '黄山', location: '安徽', rank: '天下第一奇山', description: '奇松怪石云海，养生仙境', fengshui: '风景秀丽，宜修身养性' },
        { name: '峨眉山', location: '四川', rank: '佛教四大名山', description: '普贤菩萨道场，佛光普照', fengshui: '佛光普照，宜祈福许愿' },
        { name: '武夷山', location: '福建', rank: '丹霞地貌', description: '茶叶产地，道教圣地', fengshui: '山水相依，宜品茶悟道' }
    ];

    const typesData = [
        { type: '回龙穴', description: '龙脉回头环绕，寓意子孙昌盛', suitable: '家族墓地、祖宅' },
        { type: '降龙穴', description: '龙脉从高处降落，气场聚集', suitable: '寺庙、道观' },
        { type: '出龙穴', description: '龙脉延伸而出，财运亨通', suitable: '商业建筑、店铺' },
        { type: '飞龙穴', description: '龙脉腾飞而起，仕途腾达', suitable: '政府机关、办公室' },
        { type: '潜龙穴', description: '龙脉潜伏地下，贵人相助', suitable: '住宅、公寓' },
        { type: '游龙穴', description: '龙脉蜿蜒流动，智慧通达', suitable: '学校、书房' }
    ];

    function init() {
        renderDragons();
        renderMountains();
        renderTypes();
        setupEventListeners();
    }

    function renderDragons() {
        const grid = document.getElementById('dragonsGrid');
        if (!grid) return;
        
        grid.innerHTML = dragonsData.map((dragon, index) => `
            <div class="dragon-card" data-index="${index}">
                <div class="dragon-icon">${dragon.icon}</div>
                <div class="dragon-name">${dragon.name}</div>
                <div class="dragon-desc">${dragon.description}</div>
                <div class="dragon-provinces">${dragon.provinces}</div>
            </div>
        `).join('');
    }

    function renderMountains() {
        const grid = document.getElementById('mountainsGrid');
        if (!grid) return;
        
        grid.innerHTML = mountainsData.map((mountain, index) => `
            <div class="mountain-card" data-index="${index}">
                <div class="mountain-name">${mountain.name}</div>
                <div class="mountain-location">${mountain.location}</div>
                <div class="mountain-rank">${mountain.rank}</div>
                <div class="mountain-desc">${mountain.description}</div>
            </div>
        `).join('');
    }

    function renderTypes() {
        const list = document.getElementById('typesList');
        if (!list) return;
        
        list.innerHTML = typesData.map((item, index) => `
            <div class="type-item">
                <h3>${item.type}</h3>
                <p>${item.description}</p>
                <span class="type-suitable">适宜：${item.suitable}</span>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.querySelectorAll('.dragon-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                showDragonDetail(dragonsData[index]);
            });
        });

        document.querySelectorAll('.mountain-card').forEach(card => {
            card.addEventListener('click', () => {
                const index = parseInt(card.dataset.index);
                showMountainDetail(mountainsData[index]);
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

    function showDragonDetail(dragon) {
        showToast(`${dragon.name}\n${dragon.description}\n经行省份：${dragon.provinces}\n著名山脉：${dragon.famous.join('、')}`, 'success');
    }

    function showMountainDetail(mountain) {
        showToast(`${mountain.name} (${mountain.location})\n${mountain.rank}\n${mountain.description}\n风水：${mountain.fengshui}`, 'success');
    }

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🐲 龙脉理论</h3>
                <div class="analysis-block">
                    <p><span class="highlight">龙脉</span>是中国风水学中的重要概念，指的是山脉的走势和地气的运行路线。好的龙脉能够聚集天地灵气，造福一方。</p>
                    <p class="section-title">龙脉的形成</p>
                    <p>龙脉源于昆仑山，称之为"万山之祖"。山脉起伏如龙行，因此得名。龙脉分为干龙、支龙、潜龙等多种类型。</p>
                    <p class="section-title">龙脉的识别</p>
                    <p>1. 观察山脉起伏是否自然流畅</p>
                    <p>2. 寻找龙脉的"入首"处</p>
                    <p>3. 感受地气的强弱</p>
                    <p>4. 判断龙脉的贵贱吉凶</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>⛰️ 三大干龙</h3>
                <div class="analysis-block">
                    <p>中国的主要龙脉分为北、中、南三大干龙，各有特点。</p>
                    <p class="section-title">北干龙</p>
                    <p>从昆仑山起，经祁连山、燕山至东北三省。特点是气势雄伟，但气候寒冷。</p>
                    <p class="section-title">中干龙</p>
                    <p>从昆仑山起，经秦岭、大别山至江浙沿海。特点是龙脉最旺，人文荟萃。</p>
                    <p class="section-title">南干龙</p>
                    <p>从昆仑山起，经岷山、巫山、武夷山至东南沿海。特点是山清水秀，物产丰富。</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🔮 龙穴选择</h3>
                <div class="analysis-block">
                    <p>龙穴是龙脉灵气聚集的点位，是风水宝地的核心。</p>
                    <p class="section-title">龙穴标准</p>
                    <p>1. 龙脉到头、蜂腰鹤膝</p>
                    <p>2. 砂水环抱、明堂开阔</p>
                    <p>3. 来龙清晰、去水曲折</p>
                    <p>4. 四兽到位、青龙白虎对称</p>
                    <p class="section-title">现代应用</p>
                    <p>在现代城市中，虽然无法看到完整龙脉，但可以通过观察地形、建筑布局来判断气场好坏。</p>
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
