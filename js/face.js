(function() {
    const facePartsData = [
        { part: '天庭', meaning: '天庭饱满者，命中主贵，少年得志。额头发亮者近期运势亨通。' },
        { part: '眉毛', meaning: '眉长过眼者重情义，眉浓密者事业心强。眉毛杂乱者需注意情绪管理。' },
        { part: '眼睛', meaning: '眼睛清澈有神者聪明过人，眼窝深陷者思虑过重。眼神坚定者意志坚强。' },
        { part: '鼻子', meaning: '鼻梁挺直者性格刚毅，鼻头圆润者财运亨通。鼻翼丰满者善于理财。' },
        { part: '嘴巴', meaning: '嘴形端正者为人正直，嘴角上扬者乐观开朗。唇色红润者气血充足。' },
        { part: '耳朵', meaning: '耳朵厚大者福泽深厚，耳垂长者长寿有福。耳朵贴脑者聪明伶俐。' }
    ];

    const palmLinesData = [
        { line: '生命线', meaning: '生命线深刻且弧度优美者身体健康，精力充沛。线有断裂者需注意保养。' },
        { line: '智慧线', meaning: '智慧线修长且末端分叉者思维敏捷，创造力强。线过短者务实稳重。' },
        { line: '感情线', meaning: '感情线深刻者感情丰富，线上有岛纹者感情路上多波折。线末端下垂者用情专一。' },
        { line: '事业线', meaning: '事业线直且清晰者事业心强，有上升趋势。线有分叉者职业多变动。' },
        { line: '财运线', meaning: '财运线明显者理财能力佳，多条财运线者收入来源广泛。' },
        { line: '手型', meaning: '手型方正者性格稳重，手指修长者适合文化艺术。手指节大者意志坚定。' }
    ];

    function init() {
        renderFaceParts();
        renderPalmLines();
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

    let selectedFacePart = null;
    let selectedPalmLine = null;

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        const expandedContent = document.getElementById('expandedContent');
        
        if (!expandedDetails || !expandedContent) return;

        const faceAnalysis = getFaceDetailedAnalysis();
        const palmAnalysis = getPalmDetailedAnalysis();
        const comprehensiveAnalysis = getComprehensiveAnalysis();
        const suggestions = getSuggestions();

        expandedContent.innerHTML = `
            <div class="detail-section">
                <h3>🔮 面相深度解读</h3>
                <div class="analysis-block">
                    <p class="section-title">天庭（额头）</p>
                    <p>${faceAnalysis.tianting}</p>
                    <p class="section-title">眉眼</p>
                    <p>${faceAnalysis.meiyan}</p>
                    <p class="section-title">鼻相</p>
                    <p>${faceAnalysis.bixiang}</p>
                    <p class="section-title">口相</p>
                    <p>${faceAnalysis.kouxiang}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>✋ 手相深度解析</h3>
                <div class="analysis-block">
                    <p class="section-title">生命线</p>
                    <p>${palmAnalysis.shengming}</p>
                    <p class="section-title">智慧线</p>
                    <p>${palmAnalysis.zhihui}</p>
                    <p class="section-title">感情线</p>
                    <p>${palmAnalysis.ganqing}</p>
                    <p class="section-title">事业线</p>
                    <p>${palmAnalysis.shiye}</p>
                </div>
            </div>

            <div class="detail-section">
                <h3>🎯 综合命理分析</h3>
                <div class="analysis-block">
                    ${comprehensiveAnalysis}
                </div>
            </div>

            <div class="detail-section">
                <h3>💡 运势提升建议</h3>
                <div class="analysis-block">
                    ${suggestions}
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

    function getFaceDetailedAnalysis() {
        const day = new Date().getDate();
        const isEven = day % 2 === 0;
        
        return {
            tianting: isEven ? 
                '您的天庭饱满，主贵相。额头光泽度良好，说明近期事业运势上升。适合开展新计划，有贵人相助。少年时期运势平顺，中年后运势渐开。' : 
                '您的天庭略显扁平，需多加努力。额头光泽暗淡时，应注意休息调整。适合稳扎稳打，不宜冒进。提升运势建议多学习新知识。',
            meiyan: Math.random() > 0.5 ?
                '您的眉毛浓密修长，主事业心强，适合管理层发展。眼睛明亮有神，思维敏捷，擅长分析与判断。人际关系处理得当，贵人运佳。' :
                '您的眉毛略带杂毛，需注意情绪管理。眼睛温柔内敛，感情细腻。适合从事艺术、文化类工作。近期人际关系需多加维护。',
            bixiang: day % 3 === 0 ?
                '您的鼻梁挺直，主性格刚毅果决。鼻头圆润，财运亨通，有聚财之相。鼻翼丰满，善于理财，投资眼光独到。适合从事金融、管理类工作。' :
                '您的鼻梁略有起伏，性格略带犹豫。鼻头较小，财运需靠后天努力。适合稳健型投资，不宜冒险。鼻子代表中年运势，建议关注健康。',
            kouxiang: day % 4 === 0 ?
                '您的嘴形端正，主为人正直可靠。嘴角自然上扬，乐观开朗，人缘佳。唇色红润，气血充足，身体健康。适合销售、公关类工作。' :
                '您的嘴形偏小，性格内敛含蓄。唇色偏淡，需注意气血调养。适合技术、研究类工作。说话时注意语气委婉，更利人际关系。'
        };
    }

    function getPalmDetailedAnalysis() {
        const month = new Date().getMonth() + 1;
        
        return {
            shengming: month % 2 === 0 ?
                '您的生命线深刻且弧度优美，说明身体健康，精力充沛。线纹清晰者寿数较长，日常应注意保养。有细小岛纹者需注意消化系统健康。' :
                '您的生命线长度适中，弧度平缓。说明体质中等，需后天调养。线上有细小纹路者需注意作息规律。建议适度运动增强体质。',
            zhihui: Math.random() > 0.5 ?
                '您的智慧线修长且末端分叉，思维敏捷，创造力强。适合从事创意类工作。线纹深刻者记忆力好，学习能力强。' :
                '您的智慧线较短但清晰，务实稳重，脚踏实地。适合从事技术、管理类工作。线纹带岛者想象力丰富，但有时想太多。',
            ganqing: month % 3 === 0 ?
                '您的感情线深刻且无断裂，主感情丰富。线上无岛纹者感情之路较为平顺。适合与温柔体贴的伴侣相处。' :
                '您的感情线略带波折，线上有细小岛纹者感情路上多经历。适合晚婚，婚后感情稳定。注意不要把工作情绪带入感情。',
            shiye: Math.random() > 0.5 ?
                '您的事業綫清晰直達中指根部，主事業心強，有上升趨勢。線上有分叉者職業多變動，但每次變動都是成長機會。' :
                '您的事業綫較短但清晰，說明事業發展平穩。適合穩定型工作，不宜頻繁跳槽。建議在專業領域深耕，會有更好發展。'
        };
    }

    function getComprehensiveAnalysis() {
        return `
            <p><span class="highlight">总体面相评级：</span>${Math.random() > 0.5 ? '优良' : '中等偏上'}</p>
            <p>您的整体面相显示出${Math.random() > 0.5 ? '事业心强、财运亨通' : '性格温和、人缘极佳'}的特点。</p>
            <p class="section-title">命理综合点评</p>
            <p>结合面相与手相分析，您的先天条件${Math.random() > 0.5 ? '较好' : '中等'}。面相主前半生运势，手相主后半生运势，两者互补。</p>
            <p>建议：${Math.random() > 0.5 ? '保持积极心态，多行善积德' : '注意休息调养，适度运动'}，可提升整体运势。</p>
        `;
    }

    function getSuggestions() {
        return `
            <p class="section-title">事业方面</p>
            <p>${Math.random() > 0.5 ? '适合开创事业，但需注意团队合作' : '适合稳定发展，不宜过于激进'}。多参加行业交流活动，拓展人脉。</p>
            <p class="section-title">财运方面</p>
            <p>${Math.random() > 0.5 ? '正财稳定，可适当尝试理财' : '注意守财，避免冲动消费'}。佩戴玉石类饰品有助提升财运。</p>
            <p class="section-title">感情方面</p>
            <p>${Math.random() > 0.5 ? '桃花运不错，主动出击有望成功' : '缘分未到，需耐心等待'}。注意提升个人魅力。</p>
            <p class="section-title">健康方面</p>
            <p>注意${Math.random() > 0.5 ? '脾胃健康，饮食规律' : '心脑血管，定期体检'}。保持良好作息是健康之本。</p>
        `;
    }

    function renderFaceParts() {
        const grid = document.getElementById('facePartsGrid');
        grid.innerHTML = facePartsData.map(f => `
            <div class="face-part-card">
                <h3>${f.part}</h3>
                <p>${f.meaning}</p>
            </div>
        `).join('');
    }

    function renderPalmLines() {
        const grid = document.getElementById('palmLinesGrid');
        grid.innerHTML = palmLinesData.map(p => `
            <div class="palm-line-card">
                <h3>${p.line}</h3>
                <p>${p.meaning}</p>
            </div>
        `).join('');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
