(function() {
    const UIComponents = {
        loadingOverlay: null,
        toastContainer: null,
        
        init: function() {
            this.createLoadingOverlay();
            this.createToastContainer();
            this.initBackToTop();
            this.initScrollIndicator();
            this.bindGlobalEvents();
        },
        
        createLoadingOverlay: function() {
            const overlay = document.createElement('div');
            overlay.className = 'loading-overlay';
            overlay.id = 'globalLoading';
            overlay.innerHTML = `
                <div class="loading-spinner"></div>
                <div class="loading-text">加载中...</div>
                <div class="loading-subtext">请稍候</div>
                <div class="loading-progress">
                    <div class="loading-progress-bar"></div>
                </div>
            `;
            document.body.appendChild(overlay);
            this.loadingOverlay = overlay;
        },
        
        createToastContainer: function() {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            document.body.appendChild(container);
            this.toastContainer = container;
        },
        
        showLoading: function(text, subtext) {
            if (!this.loadingOverlay) return;
            
            const textEl = this.loadingOverlay.querySelector('.loading-text');
            const subtextEl = this.loadingOverlay.querySelector('.loading-subtext');
            
            if (text) textEl.textContent = text;
            if (subtext) subtextEl.textContent = subtext;
            
            this.loadingOverlay.classList.add('active');
        },
        
        hideLoading: function() {
            if (!this.loadingOverlay) return;
            this.loadingOverlay.classList.remove('active');
        },
        
        showToast: function(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `toast-notification ${type}`;
            
            const icons = {
                success: '✓',
                error: '✕',
                warning: '⚠',
                info: 'ℹ'
            };
            
            toast.innerHTML = `
                <span class="toast-icon">${icons[type]}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close">×</button>
            `;
            
            this.toastContainer.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 10);
            
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.hideToast(toast));
            
            if (duration > 0) {
                setTimeout(() => this.hideToast(toast), duration);
            }
        },
        
        hideToast: function(toast) {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        },
        
        showActionFeedback: function(type = 'success') {
            const feedback = document.createElement('div');
            feedback.className = `action-feedback ${type}`;
            
            const icons = {
                success: '✓',
                error: '✕',
                info: 'ℹ'
            };
            
            feedback.textContent = icons[type] || '✓';
            document.body.appendChild(feedback);
            
            setTimeout(() => feedback.classList.add('show'), 10);
            setTimeout(() => {
                feedback.classList.remove('show');
                setTimeout(() => feedback.remove(), 400);
            }, 1000);
        },
        
        initBackToTop: function() {
            const btn = document.createElement('button');
            btn.className = 'back-to-top';
            btn.id = 'backToTop';
            btn.innerHTML = '↑';
            btn.title = '返回顶部';
            document.body.appendChild(btn);
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    btn.classList.add('visible');
                } else {
                    btn.classList.remove('visible');
                }
            });
            
            btn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        },
        
        initScrollIndicator: function() {
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.id = 'scrollIndicator';
            indicator.innerHTML = `
                <span>↓</span>
                <span>向下滚动</span>
            `;
            document.body.appendChild(indicator);
            
            window.addEventListener('scroll', () => {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = window.scrollY / scrollHeight;
                
                if (scrollProgress > 0.1) {
                    indicator.classList.remove('visible');
                } else {
                    indicator.classList.add('visible');
                }
            });
        },
        
        bindGlobalEvents: function() {
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('.btn');
                if (btn && !btn.disabled) {
                    this.showActionFeedback('success');
                }
            });
            
            window.addEventListener('error', (e) => {
                this.showToast('加载失败，请刷新页面重试', 'error', 5000);
            });
        },
        
        createSkeleton: function(type, count = 1) {
            const skeletons = [];
            for (let i = 0; i < count; i++) {
                const skeleton = document.createElement('div');
                skeleton.className = `skeleton-${type}`;
                
                switch(type) {
                    case 'text':
                        skeleton.classList.add('skeleton-text');
                        break;
                    case 'title':
                        skeleton.classList.add('skeleton-title');
                        break;
                    case 'card':
                        skeleton.classList.add('skeleton-card');
                        break;
                }
                skeletons.push(skeleton);
            }
            return skeletons;
        },
        
        setPageTitle: function(title) {
            document.title = title + ' - 天机';
        },
        
        animateElements: function(selector, animation = 'fadeIn', delay = 0) {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                el.style.animationDelay = `${delay + index * 0.1}s`;
                el.classList.add(animation);
            });
        }
    };
    
    const LazyLoader = {
        images: [],
        init: function() {
            if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.loadImage(entry.target);
                            this.observer.unobserve(entry.target);
                        }
                    });
                });
            }
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.images.push(img);
                if (this.observer) {
                    this.observer.observe(img);
                } else {
                    this.loadImage(img);
                }
            });
        },
        
        loadImage: function(img) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.classList.add('loaded');
        }
    };
    
    const PerformanceMonitor = {
        marks: {},
        
        mark: function(name) {
            this.marks[name] = performance.now();
        },
        
        measure: function(name, startMark, endMark) {
            const start = this.marks[startMark] || 0;
            const end = this.marks[endMark] || performance.now();
            return end - start;
        },
        
        log: function() {
            if (window.PerformanceObserver) {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach(entry => {
                        if (entry.entryType === 'navigation') {
                            console.log('Page Load Time:', entry.loadTime);
                            console.log('DOM Content Loaded:', entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart);
                        }
                    });
                });
                observer.observe({ entryType: 'navigation' });
            }
        }
    };
    
    window.UIComponents = UIComponents;
    window.LazyLoader = LazyLoader;
    window.PerformanceMonitor = PerformanceMonitor;
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => UIComponents.init());
    } else {
        UIComponents.init();
    }
})();
