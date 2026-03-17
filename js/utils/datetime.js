(function() {
    const TianJiTime = {
        currentYear: 2026,
        currentMonth: new Date().getMonth() + 1,
        currentDay: new Date().getDate(),
        
        getCurrentDate: function() {
            return new Date();
        },
        
        getCurrentYear: function() {
            return this.currentYear;
        },
        
        formatDate: function(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        
        formatDateTime: function(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        
        formatChineseDate: function(date) {
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}年${month}月${day}日`;
        },
        
        getLunarYear: function(year) {
            const years = ['甲子', '乙丑', '丙寅', '丁卯', '戊辰', '己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌', '丁亥', '戊子', '己丑', '庚寅', '辛卯', '壬辰', '癸巳', '甲午', '乙未', '丙申', '丁酉', '戊戌', '己亥', '庚子', '辛丑', '壬寅', '癸丑', '甲辰', '乙巳', '丙午', '丁未', '戊申', '己酉', '庚戌', '辛亥', '壬子', '癸丑', '甲寅', '乙卯', '丙辰', '丁巳', '戊午', '己未', '庚申', '辛酉', '壬戌', '癸亥'];
            return years[(year - 1984 + 60) % 60];
        },
        
        getZodiac: function(year) {
            const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
            return zodiacs[(year - 1984) % 12];
        }
    };
    
    const Compass = {
        element: null,
        isActive: false,
        
        init: function(containerId) {
            this.element = document.getElementById(containerId);
            if (!this.element) return;
            
            this.createCompass();
            this.startTracking();
        },
        
        createCompass: function() {
            if (!this.element) return;
            
            this.element.innerHTML = `
                <div class="enhanced-compass">
                    <div class="compass-ring outer-ring">
                        <div class="compass-degrees"></div>
                    </div>
                    <div class="compass-ring middle-ring">
                        <div class="compass-directions">
                            <span class="direction n">北</span>
                            <span class="direction ne">东北</span>
                            <span class="direction e">东</span>
                            <span class="direction se">东南</span>
                            <span class="direction s">南</span>
                            <span class="direction sw">西南</span>
                            <span class="direction w">西</span>
                            <span class="direction nw">西北</span>
                        </div>
                    </div>
                    <div class="compass-ring inner-ring">
                        <div class="compass-ganzhi"></div>
                    </div>
                    <div class="compass-needle" id="compassNeedle">
                        <div class="needle-north"></div>
                        <div class="needle-south"></div>
                    </div>
                    <div class="compass-center">
                        <div class="center-dot"></div>
                    </div>
                    <div class="compass-reading" id="compassReading">
                        <span class="reading-direction">北</span>
                        <span class="reading-degree">0°</span>
                    </div>
                </div>
            `;
        },
        
        startTracking: function() {
            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', (event) => {
                    this.handleOrientation(event);
                });
            }
            
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition((position) => {
                    this.handleGeolocation(position);
                }, null, { enableHighAccuracy: true });
            }
            
            this.startAnimation();
        },
        
        handleOrientation: function(event) {
            let alpha = event.alpha;
            if (alpha !== null) {
                this.updateNeedle(alpha);
            }
        },
        
        handleGeolocation: function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const magneticDeclination = this.calculateMagneticDeclination(lat, lon);
            this.magneticDeclination = magneticDeclination;
        },
        
        calculateMagneticDeclination: function(lat, lon) {
            return Math.sin(lon * Math.PI / 180) * 10;
        },
        
        updateNeedle: function(angle) {
            const needle = document.getElementById('compassNeedle');
            const reading = document.getElementById('compassReading');
            
            if (needle) {
                const adjustedAngle = (angle + (this.magneticDeclination || 0)) % 360;
                needle.style.transform = `rotate(${-angle}deg)`;
                
                if (reading) {
                    const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
                    const index = Math.round(angle / 45) % 8;
                    reading.querySelector('.reading-direction').textContent = directions[index];
                    reading.querySelector('.reading-degree').textContent = `${Math.round(angle)}°`;
                }
            }
        },
        
        startAnimation: function() {
            let simulatedAngle = 0;
            let increasing = true;
            
            const animate = () => {
                if (!this.isActive) {
                    simulatedAngle += increasing ? 0.5 : -0.5;
                    if (simulatedAngle >= 360) {
                        simulatedAngle = 0;
                    }
                    
                    this.updateNeedle(simulatedAngle);
                }
                
                requestAnimationFrame(animate);
            };
            
            animate();
        },
        
        stop: function() {
            this.isActive = true;
        },
        
        resume: function() {
            this.isActive = false;
        }
    };
    
    const Calendar = {
        element: null,
        selectedDate: null,
        
        init: function(containerId) {
            this.element = document.getElementById(containerId);
            if (!this.element) return;
            
            this.renderCalendar();
            this.bindEvents();
        },
        
        renderCalendar: function() {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth();
            
            this.element.innerHTML = this.generateCalendarHTML(year, month);
        },
        
        generateCalendarHTML: function(year, month) {
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDay = firstDay.getDay();
            const totalDays = lastDay.getDate();
            
            const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            
            let html = `
                <div class="calendar-container">
                    <div class="calendar-header">
                        <button class="calendar-nav prev">&lt;</button>
                        <span class="calendar-title">${year}年 ${monthNames[month]}</span>
                        <button class="calendar-nav next">&gt;</button>
                    </div>
                    <div class="calendar-weekdays">
                        <span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span>
                    </div>
                    <div class="calendar-days">
            `;
            
            let day = 1;
            for (let i = 0; i < 6; i++) {
                for (let j = 0; j < 7; j++) {
                    if ((i === 0 && j < startDay) || day > totalDays) {
                        html += '<span class="calendar-day empty"></span>';
                    } else {
                        const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                        const dayInfo = this.getDayInfo(year, month + 1, day);
                        html += `
                            <span class="calendar-day ${isToday ? 'today' : ''}" data-date="${year}-${month + 1}-${day}">
                                <span class="day-number">${day}</span>
                                ${dayInfo ? `<span class="day-info">${dayInfo}</span>` : ''}
                            </span>
                        `;
                        day++;
                    }
                }
            }
            
            html += `
                    </div>
                </div>
            `;
            
            return html;
        },
        
        getDayInfo: function(year, month, day) {
            const hash = Math.abs(hashCode(`${year}-${month}-${day}`));
            const wuxing = ['木', '火', '土', '金', '水'][hash % 5];
            return wuxing;
        },
        
        bindEvents: function() {
            if (!this.element) return;
            
            this.element.addEventListener('click', (e) => {
                const nav = e.target.closest('.calendar-nav');
                if (nav) {
                    this.navigateMonth(nav.classList.contains('prev') ? -1 : 1);
                    return;
                }
                
                const day = e.target.closest('.calendar-day');
                if (day && !day.classList.contains('empty')) {
                    this.selectDate(day.dataset.date);
                }
            });
        },
        
        navigateMonth: function(direction) {
            const title = this.element.querySelector('.calendar-title');
            if (!title) return;
            
            const match = title.textContent.match(/(\d+)年\s*(.+)/);
            if (!match) return;
            
            let year = parseInt(match[1]);
            const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
            let month = monthNames.indexOf(match[2]);
            
            month += direction;
            if (month > 11) {
                month = 0;
                year++;
            } else if (month < 0) {
                month = 11;
                year--;
            }
            
            this.element.innerHTML = this.generateCalendarHTML(year, month);
        },
        
        selectDate: function(dateStr) {
            this.selectedDate = dateStr;
            
            this.element.querySelectorAll('.calendar-day').forEach(day => {
                day.classList.remove('selected');
            });
            
            const dayElement = this.element.querySelector(`[data-date="${dateStr}"]`);
            if (dayElement) {
                dayElement.classList.add('selected');
            }
            
            if (window.onCalendarDateSelect) {
                window.onCalendarDateSelect(dateStr);
            }
        }
    };
    
    function hashCode(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    
    window.TianJiTime = TianJiTime;
    window.Compass = Compass;
    window.TianJiCalendar = Calendar;
})();
