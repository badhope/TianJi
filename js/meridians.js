(function() {
    const meridiansData = [
        { 
            name: '任脉', 
            chinese: 'Ren Mai', 
            desc: '阴脉之海，总司人体阴经',
            detail: '任脉起于胞中，下出会阴，沿腹部正中线上行至咽喉。统领全身阴经，调节气血，与女子妊娠、月经等密切相关。'
        },
        { 
            name: '督脉', 
            chinese: 'Du Mai', 
            desc: '阳脉之海，总司人体阳经',
            detail: '督脉起于胞中，沿背部正中线上行至巅顶。统领全身阳经，调节大脑、脊髓等神经系统功能。'
        },
        { 
            name: '冲脉', 
            chinese: 'Chong Mai', 
            desc: '血海之脉，十二经之海',
            detail: '冲脉起于胞中，与任督二脉同出会阴后分三支。调节气血，与月经、生殖密切相关。'
        },
        { 
            name: '带脉', 
            chinese: 'Dai Mai', 
            desc: '约束诸经，调养带下',
            detail: '带脉起于季肋，环腰一周。约束纵行诸经，防止气血散溢，对妇科疾病有重要调节作用。'
        },
        { 
            name: '阴跷脉', 
            chinese: 'Yin Qiao Mai', 
            desc: '主司下肢运动与睡眠',
            detail: '阴跷脉起于足跟内侧，沿下肢内侧上行至目内眦。调节下肢运动，与睡眠、情绪相关。'
        },
        { 
            name: '阳跷脉', 
            chinese: 'Yang Qiao Mai', 
            desc: '主司下肢运动与清醒',
            detail: '阳跷脉起于足跟外侧，沿下肢外侧上行至目内眦。调节清醒状态，与失眠、嗜睡相关。'
        },
        { 
            name: '阴维脉', 
            chinese: 'Yin Wei Mai', 
            desc: '维系阴经，调节心胸',
            detail: '阴维脉起于小腿内侧，沿胸腹部上行。维系调节各阴经，与心胸部位疾病相关。'
        },
        { 
            name: '阳维脉', 
            chinese: 'Yang Wei Mai', 
            desc: '维系阳经，调节表证',
            detail: '阳维脉起于小腿外侧，沿颈项部上行。维系调节各阳经，与外感表证、发热相关。'
        }
    ];

    const acupointsData = [
        { name: '关元', location: '脐下3寸', effect: '补肾固本', icon: '⭕' },
        { name: '气海', location: '脐下1.5寸', effect: '调气养气', icon: '⭕' },
        { name: '神阙', location: '脐中央', effect: '回阳救逆', icon: '⭕' },
        { name: '中脘', location: '脐上4寸', effect: '调理脾胃', icon: '⭕' },
        { name: '命门', location: '第二腰椎下', effect: '补肾壮阳', icon: '⭕' },
        { name: '百会', location: '头顶正中', effect: '醒脑开窍', icon: '⭕' },
        { name: '涌泉', location: '足底前1/3', effect: '滋阴降火', icon: '⭕' },
        { name: '足三里', location: '小腿外侧', effect: '调理肠胃', icon: '⭕' }
    ];

    const practiceData = [
        {
            title: '静坐调息',
            steps: [
                '选择一个安静的环境',
                '盘坐或端坐均可',
                '舌抵上腭，意守丹田',
                '呼吸均匀绵长',
                '每次15-30分钟'
            ]
        },
        {
            title: '导引术',
            steps: [
                '晨起面向东方',
                '双手叠放于丹田',
                '顺时针揉腹36圈',
                '逆时针揉腹36圈',
                '配合呼吸节奏'
            ]
        },
        {
            title: '站桩功',
            steps: [
                '双脚与肩同宽',
                '膝盖微屈',
                '双手抱球于胸前',
                '松肩沉肘',
                '保持30分钟'
            ]
        }
    ];

    function init() {
        renderMeridians();
        renderAcupoints();
        renderPractice();
        setupEventListeners();
    }

    function renderMeridians() {
        const grid = document.getElementById('meridiansGrid');
        grid.innerHTML = meridiansData.map((m, i) => `
            <div class="meridian-card" data-index="${i}">
                <div class="meridian-name">${m.name}</div>
                <div class="meridian-chinese">${m.chinese}</div>
                <div class="meridian-desc">${m.desc}</div>
            </div>
        `).join('');
    }

    function renderAcupoints() {
        const list = document.getElementById('acupointsList');
        list.innerHTML = acupointsData.map(a => `
            <div class="acupoint-item">
                <span class="acupoint-icon">${a.icon}</span>
                <div class="acupoint-info">
                    <h4>${a.name}</h4>
                    <p>${a.location} · ${a.effect}</p>
                </div>
            </div>
        `).join('');
    }

    function renderPractice() {
        const cards = document.getElementById('practiceCards');
        cards.innerHTML = practiceData.map(p => `
            <div class="practice-card">
                <h4>${p.title}</h4>
                <ul>
                    ${p.steps.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.getElementById('meridiansGrid').addEventListener('click', handleMeridianClick);

        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('meridianModal');

        if (modalClose) {
            modalClose.addEventListener('click', () => modal.classList.remove('active'));
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
    }

    function handleMeridianClick(e) {
        const card = e.target.closest('.meridian-card');
        if (!card) return;

        const index = parseInt(card.dataset.index);
        showMeridianDetail(index);
    }

    function showMeridianDetail(index) {
        const meridian = meridiansData[index];
        const modal = document.getElementById('meridianModal');
        const modalBody = document.getElementById('modalBody');

        const locations = {
            '任脉': '会阴 → 阴部 → 腹部正中 → 咽喉 → 承浆穴',
            '督脉': '长强 → 背部正中 → 头顶 → 前额 → 龈交穴',
            '冲脉': '胞中 → 会阴 → 腹部 → 胸部 → 咽喉',
            '带脉': '季肋 → 腰部 → 带脉穴 → 归来穴',
            '阴跷脉': '足跟 → 内踝 → 腿部内侧 → 腹部 → 目内眦',
            '阳跷脉': '足跟 → 外踝 → 腿部外侧 → 颈部 → 目内眦',
            '阴维脉': '足跟 → 小腿内侧 → 腹部 → 胸部 → 颈侧',
            '阳维脉': '足跟 → 小腿外侧 → 臀部 → 颈部 → 头顶'
        };

        modalBody.innerHTML = `
            <h2>${meridian.name}</h2>
            <p class="subtitle">${meridian.chinese}</p>
            
            <h3>经脉循行</h3>
            <p>${locations[meridian.name]}</p>
            
            <h3>功能主治</h3>
            <p>${meridian.detail}</p>
            
            <h3>养生建议</h3>
            <p>${generateSuggestion(meridian.name)}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(201, 162, 39, 0.1); border-radius: 10px;">
                <p style="font-size: 0.9rem; color: var(--text-muted);">以上内容仅供了解参考，具体养生治病请咨询专业医师。</p>
            </div>
        `;

        modal.classList.add('active');

        if (window.addToHistory) {
            window.addToHistory(`奇经八脉-${meridian.name}`, '🔆', 'meridians.html');
        }
    }

    function generateSuggestion(name) {
        const suggestions = {
            '任脉': '宜练习静坐调息，每日子时盘坐30分钟，可调节任脉气血。',
            '督脉': '宜早起晒背，每次15分钟，可振奋督脉阳气。',
            '冲脉': '宜保持情绪稳定，避免过度激动，可按摩腹部调理。',
            '带脉': '宜系腰带或束腰，可轻轻敲击带脉穴。',
            '阴跷脉': '宜右侧卧睡眠，可轻轻按摩足底。',
            '阳跷脉': '宜左侧卧睡眠，避免睡前过度兴奋。',
            '阴维脉': '宜练习缓慢深长的呼吸，可调节阴维脉气机。',
            '阳维脉': '宜在清晨活动，可调节阳维脉功能。'
        };
        return suggestions[name] || '保持良好的生活习惯，适当运动调理。';
    }

    function init() {
        renderMeridians();
        renderAcupoints();
        renderPractice();
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

        const theory = getMeridianTheory();
        const cultivation = getCultivationMethod();
        const healthGuide = getHealthGuide();

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🌟 奇经八脉理论详解</h3>
                <div class="analysis-block">
                    ${theory}
                </div>
            </div>

            <div class="detail-section">
                <h3>🧘 修炼功法指导</h3>
                <div class="analysis-block">
                    ${cultivation}
                </div>
            </div>

            <div class="detail-section">
                <h3>💪 养生调护指南</h3>
                <div class="analysis-block">
                    ${healthGuide}
                </div>
            </div>

            <div class="detail-section">
                <h3>⚠️ 修炼注意事项</h3>
                <div class="analysis-block">
                    <p>1. 修炼应在专业人士指导下进行，不可盲目自学。</p>
                    <p>2. 过饥、过饱、情绪激动时不宜修炼。</p>
                    <p>3. 修炼后忌立即洗冷水澡或受寒。</p>
                    <p>4. 孕妇及经期女性不宜修炼任督二脉。</p>
                    <p>5. 修炼应循序渐进，不可急于求成。</p>
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

    function getMeridianTheory() {
        return `
            <p><span class="highlight">奇经八脉</span>是人体经络系统的重要组成部分，与十二正经不同，奇经八脉不直接与脏腑相连，但具有调节气血、平衡阴阳的重要作用。</p>
            <p class="section-title">任脉</p>
            <p>任脉起于胞中，下出会阴，沿腹部正中线上行至咽喉。任脉为"阴脉之海"，调节一身阴经气血。主治生殖、消化、呼吸系统疾病。</p>
            <p class="section-title">督脉</p>
            <p>督脉起于胞中，下出会阴，沿背部正中线上行至巅顶。督脉为"阳脉之海"，调节一身阳经气血。主治脑部、脊柱、精神类疾病。</p>
            <p class="section-title">冲脉</p>
            <p>冲脉起于胞中，下出会阴后分三支。冲脉为"血海"或"十二经之海"，调节气血运行。主治妇科、血液系统疾病。</p>
            <p class="section-title">带脉</p>
            <p>带脉起于季胁，环绕腰部一周。带脉约束纵行诸经，调节腰部气血。主治腰腹疾病、妇科病。</p>
        `;
    }

    function getCultivationMethod() {
        const hour = new Date().getHours();
        
        return `
            <p class="section-title">小周天修炼法</p>
            <p>1. 盘坐或站立，全身放松。</p>
            <p>2. 舌尖抵上腭，意守丹田。</p>
            <p>3. 吸气时气息沿任脉下行至会阴。</p>
            <p>4. 呼气时气息沿督脉上行至百会。</p>
            <p>5. 如此循环，形成小周天。</p>
            <p class="section-title">寅时修炼</p>
            <p>每日${hour >= 3 && hour < 5 ? '寅时' : '清晨'}是修炼奇经八脉的最佳时机，此时气血运行旺盛。</p>
            <p class="section-title">修炼要点</p>
            <p>${Math.random() > 0.5 ? '修炼时应保持心情平静，呼吸均匀。' : '初期修炼以15-30分钟为宜，逐渐延长。'} ${Math.random() > 0.5 ? '避免在嘈杂环境中修炼。' : '修炼后应静坐片刻再起身。'}</p>
        `;
    }

    function getHealthGuide() {
        return `
            <p class="section-title">日常调护</p>
            <p>${Math.random() > 0.5 ? '按摩腹部有助于调理任脉，可每天睡前顺时针按摩36圈。' : '敲打背部有助于调理督脉，可使用经络拍适度敲打。'}</p>
            <p class="section-title">饮食调理</p>
            <p>调理任脉宜${Math.random() > 0.5 ? '食用百合、银耳等滋阴润燥食物。' : '食用红枣、桂圆等补血养血食物。'} 调理督脉宜${Math.random() > 0.5 ? '食用生姜、羊肉等温阳食物。' : '食用核桃、黑豆等补肾食物。'}</p>
            <p class="section-title">运动建议</p>
            <p>${Math.random() > 0.5 ? '太极拳：柔和缓慢的运动方式，有助于调理气血。' : '八段锦：传统导引术，可疏通经络，调和气血。'} ${Math.random() > 0.5 ? '散步：饭后散步有助于消化吸收。' : '站桩：静立养气，适合体质虚弱者。'}</p>
        `;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
