(function() {
    const lunarData = {
        years: ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸丑', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'],
        months: ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'],
        days: ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'],
        zodiacs: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
        hours: ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时']
    };

    const yiList = ['祭祀', '祈福', '开光', '开市', '交易', '立券', '动土', '起基', '修造', '订盟', '纳采', '嫁娶', '安床', '移徙', '入宅', '安香', '出火', '挂匾', '开厕', '修门', '赴任', '会亲友', '求嗣', '上梁', '栽种', '纳畜', '牧养', '开生坟', '入殓', '移柩', '破土', '安葬', '启攒', '求医', '疗病', '针灸', '服药', '驱虫', '扫舍'];
    const jiList = ['嫁娶', '纳采', '订盟', '开市', '交易', '立券', '出货财', '置产', '动土', '起基', '定磉', '开池', '开厕', '破土', '启攒', '修造', '造屋', '竖柱', '上梁', '安门', '作灶', '修饰垣墙', '平治道涂', '馀事勿取'];
    const hourStatus = ['吉', '吉', '凶', '吉', '凶', '凶', '吉', '凶', '凶', '吉', '凶', '吉'];

    const wuxingAnalysisTexts = {
        '木': '今日木气旺盛，生机盎然。木主生发、条达，适合开展新事业、启动新项目。东方木位今日吉庆，有利事业拓展。',
        '火': '今日火气当令，阳气炽盛。火主礼、主明，适合社交活动、文化交流。注意心火旺盛，宜静心养性。',
        '土': '今日土气厚重，承载万物。土主信、主静，适合稳固发展、积累储蓄。中心位置土气最旺。',
        '金': '今日金气肃杀，刚健有力。金主义、主决断，适合处理重大决策、谈判签约。西方金位最利。',
        '水': '今日水气流通，智慧涌现。水主智、主变，适合创意思考、学习进修。北方水位吉庆。'
    };

    const healthAdvice = {
        '木': '宜养肝利胆，多食青色蔬果。早起活动筋骨，舒展肝气。避免熬夜伤肝。',
        '火': '宜养心安神，多食红色食物。保持心情愉悦，避免情绪激动。适量运动但勿过度。',
        '土': '宜养脾健胃，多食黄色食物。注意饮食规律，避免生冷油腻。适度散步助消化。',
        '金': '宜养肺润燥，多食白色食物。保护呼吸系统，适当加湿环境。适度锻炼增强肺气。',
        '水': '宜养肾固精，多食黑色食物。注意保暖，避免受寒。保持充足睡眠养精蓄锐。'
    };

    let currentResult = null;

    function init() {
        const dateInput = document.getElementById('dateInput');
        const queryBtn = document.getElementById('queryBtn');
        const todayBtn = document.getElementById('todayBtn');
        const moreDetailsBtn = document.getElementById('moreDetailsBtn');
        const closeExpanded = document.getElementById('closeExpanded');
        
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        
        queryBtn.addEventListener('click', () => queryCalendar(dateInput.value));
        todayBtn.addEventListener('click', () => {
            const today = new Date().toISOString().split('T')[0];
            dateInput.value = today;
            queryCalendar(today);
        });
        
        if (moreDetailsBtn) {
            moreDetailsBtn.addEventListener('click', showExpandedDetails);
        }
        
        if (closeExpanded) {
            closeExpanded.addEventListener('click', hideExpandedDetails);
        }
        
        queryCalendar(today);
    }

    function queryCalendar(dateStr) {
        const loadingSection = document.getElementById('loadingSection');
        const calendarResult = document.getElementById('calendarResult');
        
        loadingSection.classList.add('active');
        calendarResult.classList.remove('active');
        
        setTimeout(() => {
            const date = new Date(dateStr);
            const result = calculateCalendar(date);
            currentResult = result;
            displayResult(result);
            
            loadingSection.classList.remove('active');
            calendarResult.classList.add('active');
            
            if (window.addToHistory) {
                window.addToHistory('黄历查询', '📅', 'calendar.html');
            }
        }, 1200);
    }

    function calculateCalendar(date) {
        const timestamp = date.getTime();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        const yearIndex = (year - 1984 + 60) % 60;
        const yearGanZhi = lunarData.years[yearIndex];
        
        const startYear = 1900;
        const startTimestamp = new Date(startYear, 0, 31).getTime();
        const days = Math.floor((timestamp - startTimestamp) / (24 * 60 * 60 * 1000));
        
        const leapMonth = (days - days % 10000) / 10000;
        const monthDays = days % 10000;
        const monthIndex = Math.floor(monthDays / 30) % 12;
        const dayIndex = monthDays % 30;
        
        const lunarYear = year;
        const lunarMonth = lunarData.months[monthIndex];
        const lunarDay = lunarData.days[dayIndex];
        
        const hash = hashCode(`${year}-${month}-${day}`);
        
        const yiCount = 8 + Math.abs(hash) % 10;
        const jiCount = 6 + Math.abs(hash) % 8;
        
        const shuffledYi = shuffleArray([...yiList]);
        const shuffledJi = shuffleArray([...jiList]);
        
        const selectedYi = shuffledYi.slice(0, yiCount);
        const selectedJi = shuffledJi.slice(0, jiCount);
        
        const pengzu = generatePengzu(year, month, day);
        const shensha = generateShensha(hash);
        const jishen = generateJishen(hash);
        const xiongshen = generateXiongshen(hash);
        
        const hours = generateHours(hash);
        
        const zodiacFortunes = generateZodiacFortunes(year, month, day);
        
        const wuxing = ['木', '火', '土', '金', '水'][Math.abs(hash) % 5];
        
        return {
            solarDate: `${year}年${month}${day}`,
            lunarDate: `${lunarYear}年${lunarMonth}${lunarDay}`,
            yearGanZhi,
            yi: selectedYi,
            ji: selectedJi,
            pengzu,
            shensha,
            jishen,
            xiongshen,
            hours,
            zodiacFortunes,
            wuxing,
            month,
            day
        };
    }

    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function generatePengzu(year, month, day) {
        const ganzhi = lunarData.years[(year - 1984 + 60) % 60];
        const dayZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'][day % 12];
        
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        const dayTianGan = tianGan[(day + 1) % 10];
        const dayDiZhi = diZhi[day % 12];
        
        return `${dayTianGan}不${dayDiZhi}针`;
    }

    function generateShensha(hash) {
        const directions = ['东方', '南方', '西方', '北方', '东南方', '西南方', '东北方', '西北方'];
        return directions[Math.abs(hash) % directions.length];
    }

    function generateJishen(hash) {
        const jishens = ['天德', '月德', '天德合', '月德合', '天恩', '天喜', '母仓', '三合', '圣心'];
        return jishens[Math.abs(hash) % jishens.length] + '、' + jishens[(Math.abs(hash) + 3) % jishens.length];
    }

    function generateXiongshen(hash) {
        const xiongshens = ['天贼', '地贼', '血忌', '天牢', '月破', '大耗', '勾陈', '白虎', '朱雀'];
        return xiongshens[Math.abs(hash) % xiongshens.length] + '、' + xiongshens[(Math.abs(hash) + 2) % xiongshens.length];
    }

    function generateHours(hash) {
        return lunarData.hours.map((hour, index) => {
            const zodiac = lunarData.zodiacs[index % 12];
            const status = hourStatus[(index + Math.abs(hash)) % 12];
            return { hour, zodiac, status };
        });
    }

    function generateZodiacFortunes(year, month, day) {
        const hash = hashCode(`${year}-${month}-${day}`);
        
        return lunarData.zodiacs.map((zodiac, index) => {
            const score = 60 + ((hash + index * 7) % 35);
            let status;
            if (score >= 80) status = '大吉';
            else if (score >= 70) status = '吉';
            else if (score >= 55) status = '平';
            else status = '需注意';
            
            return { zodiac, score, status };
        });
    }

    function displayResult(result) {
        document.getElementById('resultDate').textContent = result.solarDate;
        document.getElementById('resultLunar').textContent = `农历${result.lunarDate} · ${result.yearGanZhi}年`;
        
        const yiListEl = document.getElementById('yiList');
        const jiListEl = document.getElementById('jiList');
        
        yiListEl.innerHTML = result.yi.map(item => `<span class="yi-ji-tag">${item}</span>`).join('');
        jiListEl.innerHTML = result.ji.map(item => `<span class="yi-ji-tag">${item}</span>`).join('');
        
        document.getElementById('pengzu').textContent = result.pengzu;
        document.getElementById('shensha').textContent = result.shensha;
        document.getElementById('jishen').textContent = result.jishen;
        document.getElementById('xiongshen').textContent = result.xiongshen;
        
        const hoursGrid = document.getElementById('hoursGrid');
        hoursGrid.innerHTML = result.hours.map(h => `
            <div class="hour-item ${h.status === '吉' ? 'good' : 'bad'}">
                <div class="hour-time">${h.hour}</div>
                <div class="hour-zodiac">${h.zodiac}</div>
                <div class="hour-status">${h.status}</div>
            </div>
        `).join('');
        
        const zodiacRow = document.getElementById('zodiacRow');
        const zodiacIcons = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐐', '🐒', '🐓', '🐕', '🐖'];
        
        zodiacRow.innerHTML = result.zodiacFortunes.map((z, i) => `
            <div class="zodiac-chip">
                <span class="zodiac-chip-icon">${zodiacIcons[i]}</span>
                <span class="zodiac-chip-name">${z.zodiac}</span>
                <span class="zodiac-chip-status ${z.score >= 70 ? 'good' : z.score >= 55 ? 'normal' : 'bad'}">${z.status}</span>
            </div>
        `).join('');
    }

    function showExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        if (!currentResult || !expandedDetails) return;
        
        generateExpandedContent(currentResult);
        
        expandedDetails.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        expandedDetails.animate([
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' }
        ], {
            duration: 400,
            easing: 'ease-out'
        });
    }

    function hideExpandedDetails() {
        const expandedDetails = document.getElementById('expandedDetails');
        if (!expandedDetails) return;
        
        expandedDetails.animate([
            { opacity: 1, transform: 'translateY(0)' },
            { opacity: 0, transform: 'translateY(30px)' }
        ], {
            duration: 300,
            easing: 'ease-in'
        }).onfinish = () => {
            expandedDetails.style.display = 'none';
            document.body.style.overflow = '';
        };
    }

    function generateExpandedContent(result) {
        const wuxing = result.wuxing;
        
        document.getElementById('wuxingAnalysis').innerHTML = `
            <p><span class="highlight">今日五行：</span>${wuxing}气当令</p>
            <p>${wuxingAnalysisTexts[wuxing]}</p>
            <p>农历日期为${result.lunarDate}，天干地支为${result.yearGanZhi}年，五行之气相互流转，今日格局利于<span class="positive">${getFavorableElement(wuxing)}</span>属性的发展，需注意<span class="negative">${getConflictingElement(wuxing)}</span>方面的调理。</p>
            <p>本月为农历${result.month}月，季节交替之际，阴阳平衡尤为重要。建议保持身心调和，顺应天时而行。</p>
        `;
        
        const yiAnalysis = result.yi.map(item => {
            return `<p>• <span class="positive">${item}</span>：${getYiExplanation(item)}</p>`;
        }).join('');
        
        const jiAnalysis = result.ji.map(item => {
            return `<p>• <span class="negative">${item}</span>：${getJiExplanation(item)}</p>`;
        }).join('');
        
        document.getElementById('yiJiAnalysis').innerHTML = `
            <p class="highlight">今日宜事项详细解读：</p>
            ${yiAnalysis}
            <p class="highlight" style="margin-top: 15px;">今日忌事项提醒：</p>
            ${jiAnalysis}
            <p style="margin-top: 15px;">总体而言，今日宜${result.yi.slice(0, 3).join('、')}，忌${result.ji.slice(0, 3).join('、')}。遵循此规律，可趋吉避凶。</p>
        `;
        
        const goodHours = result.hours.filter(h => h.status === '吉');
        const badHours = result.hours.filter(h => h.status === '凶');
        
        document.getElementById('hourAnalysis').innerHTML = `
            <p>今日十二时辰吉凶分布：</p>
            <p><span class="positive">吉时：</span>${goodHours.map(h => h.hour).join('、')}，此八时辰利于行事。</p>
            <p><span class="negative">凶时：</span>${badHours.map(h => h.hour).join('、')}，此四时辰宜静养休息。</p>
            <p>其中<span class="highlight">子时</span>（23:00-01:00）阴阳交替之际，宜睡眠休养；<span class="highlight">午时</span>（11:00-13:00）阳气最盛，利处理重要事务。</p>
            <p>建议：重要事宜安排在${goodHours[0]?.hour || '辰时'}至${goodHours[1]?.hour || '巳时'}进行，此时阳气渐生，办事最为顺利。</p>
        `;
        
        document.getElementById('directionAnalysis').innerHTML = `
            <p><span class="highlight">吉神方位：</span>${result.jishen}位于${result.shensha}，今日<span class="positive">${result.shensha}</span>方位最为吉利。</p>
            <p><span class="highlight">凶神方位：</span>${result.xiongshen}位于${getOppositeDirection(result.shensha)}，该方位需谨慎前往。</p>
            <p>财神方位：根据今日五行格局，<span class="highlight">${getWealthDirection(wuxing)}</span>方向为今日求财有利方位。</p>
            <p>喜神方位：<span class="positive">${getJoyDirection(result.day)}</span>为今日喜神所在，有利姻缘、人际关系。</p>
            <p>建议：今日出行、搬家、开业等重大活动宜朝向<span class="highlight">${result.shensha}</span>方向，可获天时地利之便。</p>
        `;
        
        document.getElementById('healthAnalysis').innerHTML = `
            <p><span class="highlight">今日养生要点：</span>${healthAdvice[wuxing]}</p>
            <p>今日五行${wuxing}气旺盛，对应人体<span class="highlight">${getCorrespondingOrgan(wuxing)}</span>。宜适当按摩调理，保持经络通畅。</p>
            <p>饮食建议：多食<span class="positive">${getFoodColor(wuxing)}</span>色食物，如${getFoods(wuxing)}，可调和五行，增益健康。</p>
            <p>起居注意：今日宜<span class="positive">早起顺应阳气</span>，夜卧<span class="negative">不宜过晚</span>，以免五行失调。适度的户外活动有助于气血流通。</p>
        `;
        
        const careerLevel = getCareerLevel(wuxing);
        document.getElementById('careerAnalysis').innerHTML = `
            <p><span class="highlight">事业运势：</span>${careerLevel}</p>
            <p>今日利于<span class="positive">${result.yi.filter(y => ['开市', '交易', '立券', '修造', '订盟'].includes(y)).join('、') || '开市交易'}</span>，这些事项今日进行可获加成。</p>
            <p>职场提示：今日处理<span class="highlight">${result.jishen}</span>相关事务较为顺利，与上司沟通宜选择上午时段。</p>
            <p>财运提示：今日<span class="positive">${getWealthTime(result)}</span>为财运最佳时段，可把握机会。投资理财宜稳健，切忌冲动行事。</p>
            <p>创业提示：今日${result.yi.includes('开市') ? '适宜' : '不太适宜'}开设新店铺或启动新项目，建议先做好充分准备。</p>
        `;
        
        document.getElementById('loveAnalysis').innerHTML = `
            <p>今日情感运势呈现<span class="${getLoveLevel(wuxing) > 70 ? 'positive' : 'neutral'}">${getLoveLevel(wuxing) > 70 ? '上升' : '平稳'}</span>态势。</p>
            <p>单身者：今日<span class="highlight">${getJoyDirection(result.day)}</span>方向有桃花运，单身者可多往该方向活动，或参加社交聚会。</p>
            <p>已婚者：今日宜注重<span class="highlight">沟通与理解</span>，避免因琐事产生争执。共同参与家务可增进感情。</p>
            <p>人际提示：<span class="positive">${result.jishen}</span>日，贵人运佳，与人合作事宜可顺利进行。注意维护新老朋友关系。</p>
            <p>今日最配生肖：<span class="highlight">${result.zodiacFortunes.slice(0, 3).map(z => z.zodiac).join('、')}</span>，与这些属相合作或交往可事半功倍。</p>
        `;
        
        const summaryScore = calculateOverallScore(result, wuxing);
        document.getElementById('summaryAnalysis').innerHTML = `
            <p><span class="highlight">今日综合评分：</span>${summaryScore}分（满分100）</p>
            <p>今日<span class="${summaryScore >= 70 ? 'positive' : summaryScore >= 50 ? 'neutral' : 'negative'}">${summaryScore >= 70 ? '大吉' : summaryScore >= 50 ? '平顺' : '需谨慎'}</span>，五行${wuxing}气当令，总体运势平稳向好。</p>
            <p>吉星高照：<span class="positive">${result.jishen}</span>，今日多逢好事，贵人相助。</p>
            <p>注意规避：<span class="negative">${result.xiongshen}</span>，凡事三思而后行，避免冲动。</p>
            <p><span class="highlight">彭祖百忌：</span>${result.pengzu}，提醒今日需注意之处。</p>
            <p>总结：今日宜${result.yi.slice(0, 5).join('、')}，忌${result.ji.slice(0, 3).join('、')}。顺应天时，趋利避害，方能诸事顺遂。</p>
        `;
    }

    function getFavorableElement(wuxing) {
        const favorable = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        return favorable[wuxing];
    }

    function getConflictingElement(wuxing) {
        const conflicting = { '木': '金', '火': '水', '土': '木', '金': '火', '水': '土' };
        return conflicting[wuxing];
    }

    function getOppositeDirection(direction) {
        const opposites = { '东方': '西方', '南方': '北方', '西方': '东方', '北方': '南方', '东南方': '西北方', '西南方': '东北方', '东北方': '西南方', '西北方': '东南方' };
        return opposites[direction] || '西方';
    }

    function getWealthDirection(wuxing) {
        const directions = { '木': '东方', '火': '南方', '土': '中央', '金': '西方', '水': '北方' };
        return directions[wuxing];
    }

    function getJoyDirection(day) {
        const directions = ['东北', '东', '东南', '南', '西南', '西', '西北', '北'];
        return directions[day % 8];
    }

    function getCorrespondingOrgan(wuxing) {
        const organs = { '木': '肝胆', '火': '心脏', '土': '脾胃', '金': '肺', '水': '肾' };
        return organs[wuxing];
    }

    function getFoodColor(wuxing) {
        const colors = { '木': '青绿色', '火': '红紫色', '土': '黄棕色', '金': '白银色', '水': '蓝黑色' };
        return colors[wuxing];
    }

    function getFoods(wuxing) {
        const foods = { '木': '菠菜、青椒、芹菜、绿茶', '火': '红枣、山楂、辣椒、石榴', '土': '小米、南瓜、土豆、蜂蜜', '金': '梨、白萝卜、银耳、杏仁', '水': '黑豆、黑木耳、海带、紫菜' };
        return foods[wuxing];
    }

    function getCareerLevel(wuxing) {
        const levels = { '木': '今日事业运势较佳，利于创新发展，适合开展新项目或拓展业务范围。', '火': '今日事业运势旺盛，适合社交应酬、公开演讲等展示才华的事项。', '土': '今日事业运势稳定，适合处理文件、合约等需要耐心细致的工作。', '金': '今日事业运势旺盛，适合谈判签约、重要决策等需要决断力的事项。', '水': '今日事业运势顺畅，适合策划创意、学习进修等需要思考的事项。' };
        return levels[wuxing];
    }

    function getWealthTime(result) {
        const goodHours = result.hours.filter(h => h.status === '吉');
        return goodHours[0]?.hour || '辰时';
    }

    function getLoveLevel(wuxing) {
        const levels = { '木': 75, '火': 82, '土': 68, '金': 78, '水': 72 };
        return levels[wuxing];
    }

    function calculateOverallScore(result, wuxing) {
        const baseScore = 65;
        const wuxingBonus = { '木': 10, '火': 15, '土': 8, '金': 12, '水': 10 };
        const jiPenalty = result.ji.length * -2;
        const yiBonus = result.yi.length * 2;
        
        return Math.min(100, Math.max(0, baseScore + wuxingBonus[wuxing] + yiBonus + jiPenalty));
    }

    function getYiExplanation(item) {
        const explanations = {
            '祭祀': '表达对天地祖先的敬意，可获神灵庇佑',
            '祈福': '祈求神灵保佑，适合许愿祈福',
            '开光': '为物品举行仪式，赋予灵性',
            '开市': '新店铺开张或重新营业，生意兴隆',
            '交易': '买卖交易顺利进行，财源广进',
            '立券': '签订契约、合同，有法律保障',
            '动土': '破土动工，建筑修造',
            '起基': '打地基、建房造屋',
            '修造': '修理建造，改造翻新',
            '订盟': '签订盟约，确立合作关系',
            '纳采': '求婚嫁娶，提亲定亲',
            '嫁娶': '举行婚礼，成婚结配',
            '安床': '安置床铺，利于休息睡眠',
            '移徙': '搬家迁居，入宅居住',
            '入宅': '搬入新居，乔迁之喜',
            '安香': '安置神位祖先牌位',
            '出火': '移动火神爷，举行仪式',
            '挂匾': '悬挂匾额，招牌开张',
            '开厕': '建造或修整厕所',
            '修门': '修理门扉，改善门户',
            '赴任': '上任就职，赴任新职',
            '会亲友': '聚会联络感情',
            '求嗣': '祈求子嗣，延续血脉',
            '上梁': '建筑上梁，稳固根基',
            '栽种': '种植树木花草',
            '纳畜': '买入家畜宠物',
            '牧养': '放牧饲养',
            '开生坟': '预先修建坟墓',
            '入殓': '将遗体放入棺材',
            '移柩': '移动灵柩',
            '破土': '动土挖掘，奠基仪式',
            '安葬': '下葬入土，安葬先人',
            '启攒': '拾骨迁葬',
            '求医': '寻医问诊，治疗疾病',
            '疗病': '治病疗养，修养身体',
            '针灸': '中医针灸治疗',
            '服药': '服用药物，调理身体',
            '驱虫': '除虫灭害',
            '扫舍': '打扫清洁卫生'
        };
        return explanations[item] || '此事今日可行，吉利顺畅';
    }

    function getJiExplanation(item) {
        const explanations = {
            '嫁娶': '传统认为此日结婚不吉',
            '纳采': '提亲可能受阻',
            '订盟': '签约合作需谨慎',
            '开市': '开业可能遇阻',
            '交易': '交易易生纠纷',
            '立券': '契约签订需审慎',
            '出货财': '出货易有损失',
            '置产': '置办产业需三思',
            '动土': '动土易招灾祸',
            '起基': '奠基可能不稳',
            '定磉': '安放基石需慎',
            '开池': '开凿池塘不吉',
            '开厕': '修建厕所有碍',
            '破土': '破土易犯煞气',
            '启攒': '迁葬易惊扰先人',
            '修造': '修建易生事端',
            '造屋': '造屋可能不顺',
            '竖柱': '立柱可能不稳',
            '上梁': '上梁可能有问题',
            '安门': '安门可能招邪',
            '作灶': '修灶可能惹灾',
            '修饰垣墙': '围墙修饰不吉',
            '平治道涂': '修路可能受阻'
        };
        return explanations[item] || '此事今日宜避免，谨慎行事';
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
