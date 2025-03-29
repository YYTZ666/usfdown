// 无障碍功能增强
document.addEventListener('DOMContentLoaded', function() {
    // 键盘导航处理
    initKeyboardNavigation();
    
    // ARIA状态管理
    initAriaStates();
    
    // 添加跳转到主要内容的链接
    addSkipLink();
});

function initKeyboardNavigation() {
    // 为所有可交互元素添加键盘支持
    const interactiveElements = document.querySelectorAll('button, a, input, .filter-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.show');
            if (modal) {
                closeModal();
            }
        }
    });
}

function initAriaStates() {
    // 筛选按钮状态管理
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.closest('[role="radiogroup"]');
            group.querySelectorAll('[role="radio"]').forEach(radio => {
                radio.setAttribute('aria-checked', 'false');
            });
            btn.setAttribute('aria-checked', 'true');
        });
    });
    
    // 筛选选项展开/折叠状态
    const toggleFiltersBtn = document.querySelector('.toggle-filters-btn');
    const filterGroups = document.getElementById('filter-groups');
    
    toggleFiltersBtn.addEventListener('click', () => {
        const isExpanded = toggleFiltersBtn.getAttribute('aria-expanded') === 'true';
        toggleFiltersBtn.setAttribute('aria-expanded', !isExpanded);
        filterGroups.classList.toggle('expanded');
    });
}

function addSkipLink() {
    // 添加跳转到主要内容的链接
    const skipLink = document.createElement('a');
    skipLink.href = '#download-list';
    skipLink.className = 'skip-link';
    skipLink.textContent = '跳转到主要内容';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// 更新页面标题以反映当前状态
function updatePageTitle(filterType = '') {
    const baseTitle = 'USF下载站';
    document.title = filterType ? `${filterType} - ${baseTitle}` : baseTitle;
}

// 通知屏幕阅读器内容更新
function announceToScreenReader(message) {
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.classList.add('sr-only'); // 视觉上隐藏但对屏幕阅读器可见
    announcer.textContent = message;
    document.body.appendChild(announcer);
    
    setTimeout(() => {
        document.body.removeChild(announcer);
    }, 3000);
}

// 导出函数供其他模块使用
window.accessibility = {
    updatePageTitle,
    announceToScreenReader
};
