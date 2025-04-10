// 定义常量
const downloadList = document.getElementById('download-list');
const modal = document.getElementById('modal');
const downloadUrl = document.getElementById('download-url');
const noMoreMessage = document.getElementById('no-more');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.filter-btn');
const announcement = document.getElementById('announcement');
const closeBtn = document.getElementById('close-btn');
const itemsPerPage = 10;

let page = 1;
let selectedVersion = '全部';
let selectedVersionNumber = '全部';

// 渲染文件列表
function renderFiles(versionTag = '全部', versionNumber = '全部', searchTerm = '') {
    const start = (page - 1) * itemsPerPage;

    const filteredFiles = files.filter(({ tags, name, supportVersions }) => {
        // 版本和版本号筛选
        const versionMatch = versionTag === '全部' || tags.includes(versionTag);
        const numberMatch = versionNumber === '全部' || tags.includes(versionNumber);
        
        // 搜索词为空时不进行搜索筛选
        const searchMatch = !searchTerm.trim() || 
            name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            // 增加对适配版本号的搜索
            supportVersions.some(version => 
                version.toLowerCase().includes(searchTerm.toLowerCase())
            );

        return versionMatch && numberMatch && searchMatch;
    });

    const filesToDisplay = filteredFiles.slice(start, start + itemsPerPage);
    noMoreMessage.style.display = filesToDisplay.length === 0 ? 'block' : 'none';
    
    // 计算是否是最后一页
    const isLastPage = start + itemsPerPage >= filteredFiles.length;
    
    // 构建HTML内容
    let htmlContent = '';
    filesToDisplay.forEach((file, index) => {
        htmlContent += generateDownloadItem(file);
        
        if ((index + 1) % 7 === 0 && (!isLastPage || index !== filesToDisplay.length - 1)) {
            const ad = getRandomAd();
            htmlContent += generateAdItem(ad);
        }
    });
    
    downloadList.innerHTML += htmlContent;

    setTimeout(() => {
        document.querySelectorAll('.download-item').forEach(item => item.classList.add('show'));
    }, 100);

    // 更新加载
    if (isLastPage) {
        noMoreMessage.classList.add('show');
    } else {
        noMoreMessage.classList.remove('show');
    }
}

function newWindow(link) {
    window.location.href = link;
}

// 生成列表
function generateDownloadItem({ name, description, tags, downloadLink, feedbackLink }) {
    return `
    <div class="download-item">
        <div class="download-content">
            <div class="download-header">
                <h3>${name}</h3>
                <div class="download-tags">${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            </div>
            <div class="download-description">
                <p>${description}</p>
                <span class="show-more">展开更多</span>
            </div>
            <div class="button-container">
                ${generateButton('分享', 'openShareModal', downloadLink, 'M18 8C19.1 8 20 8.9 20 10V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V10C4 8.9 4.9 8 6 8H8V6C8 3.8 9.8 2 12 2C14.2 2 16 3.8 16 6V8H18ZM12 12V17H14L12 19L10 17H12V12H10L12 14L14 12H12ZM16 8V6C16 4.9 15.1 4 14 4C12.9 4 12 4.9 12 6V8H16Z')}
                ${generateButton('详情', 'openDetailsModal', name, 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z')}
                ${generateButton('下载', 'newWindow', downloadLink, 'M19 9H15V3H9V9H5L12 16L19 9ZM5 18H19V20H5V18Z')}
            </div>
        </div>
    </div>`;
}

// 生成广告项箱管
function generateAdItem(ad) {
    return `
    <div class="download-item ad-item ${ad.isAd ? 'is-ad' : 'is-recommended'}">
        <div class="ad-badge">${ad.badgeText}</div>
        <div class="download-content">
            <div class="download-header">
                <h3>${ad.title}</h3>
            </div>
            <div class="download-description">
                <p>${ad.description}</p>
            </div>
            <div class="button-container">
                <button class="btn" onclick="window.open('${ad.buttonLink}', '_blank')">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035l4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z" fill="currentColor"/>
                    </svg>
                    ${ad.buttonText}
                </button>
            </div>
        </div>
    </div>`;
}

// 生成按钮
function generateButton(text, action, link, svgPath) {
    return `
    <button class="btn" onclick="${action}('${link}')">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="${svgPath}" fill="#333"/>
        </svg>
        ${text}
    </button>`;
}

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 200) {
        loadMoreFiles();
    }
});

// 加载更多文件
function loadMoreFiles() {
    page++;
    renderFiles(selectedVersion, selectedVersionNumber, searchInput.value);
}

// 搜索功能
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchInput.value.trim()) {
        resetAndRenderFiles();
    }
});

searchInput.addEventListener('input', () => {
    // 如果搜索框为空,重置为显示所有内容
    if (!searchInput.value.trim()) {
        resetAndRenderFiles();
        return;
    }
    // 当有内容时才进行搜索
    if (searchInput.value.trim().length >= 1) {
        resetAndRenderFiles();
    }
});

// 过滤功能
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleFilter(button.dataset.tag, button);
    });
});

/**
 * 处理过滤
 * @param {*} tag 
 * @param {*} button 
 */
function handleFilter(tag, button) {
    const buttonGroup = button.closest('.filter-buttons');
    
    // 移除同组中其他按钮的选中状态
    buttonGroup.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('selected');
        btn.setAttribute('aria-checked', 'false');
    });
    
    // 设置当前按钮的选中状态
    button.classList.add('selected');
    button.setAttribute('aria-checked', 'true');
    
    // 更新选中的筛选值
    if (button.closest('[aria-label="版本类型"]')) {
        selectedVersion = tag;
    } else {
        selectedVersionNumber = tag;
    }
    
    // 重新渲染列表
    resetAndRenderFiles();
}

function updateFilterButton(selector, activeButton) {
    document.querySelectorAll(selector).forEach(btn => btn.classList.remove('selected'));
    activeButton.classList.add('selected');
}

function resetAndRenderFiles() {
    page = 1;
    downloadList.innerHTML = '';
    renderFiles(selectedVersion, selectedVersionNumber, searchInput.value);
}

// 打开分享弹窗
function openShareModal(link) {
    downloadUrl.textContent = `https://usfdown.zuyst.top/${link}`;
    document.querySelector('.modal-overlay').classList.add('show');
    modal.classList.add('show');
}

// 关闭弹窗事件
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-overlay').addEventListener('click', closeModal);

function closeModal() {
    document.querySelector('.modal-overlay').classList.remove('show');
    modal.classList.remove('show');
}

document.getElementById('copy-url').addEventListener('click', () => {
    navigator.clipboard.writeText(downloadUrl.textContent)
        .then(() => {
            const btn = document.getElementById('copy-url');
            btn.textContent = '已复制';
            btn.classList.add('success');
            setTimeout(() => {
                btn.textContent = '复制链接';
                btn.classList.remove('success');
            }, 2000);
        });
});

// 文本展开功能
document.addEventListener('DOMContentLoaded', setupExpandToggle);

function setupExpandToggle() {
    document.querySelectorAll('.download-item').forEach(item => {
        const p = item.querySelector('p');
        const showMoreButton = item.querySelector('.show-more');

        const limitedHeight = 3 * parseFloat(window.getComputedStyle(p).lineHeight);

        if (p.scrollHeight > limitedHeight) {
            showMoreButton.style.display = 'inline-block';
            showMoreButton.addEventListener('click', () => toggleExpand(p, showMoreButton));
        }
    });
}

function toggleExpand(p, button) {
    p.classList.toggle('expanded');
    button.textContent = p.classList.contains('expanded') ? '收起' : '展开更多';
}

// 公告栏关闭
closeBtn.addEventListener('click', () => announcement.classList.add('hide'));

// 初始化文件渲染
renderFiles();

// 初始化筛选器收起展开功能
document.addEventListener('DOMContentLoaded', () => {
    const filterGroups = document.querySelectorAll('.filter-group');
    
    filterGroups.forEach(group => {
        const header = group.querySelector('.filter-header');
        header.addEventListener('click', () => {
            group.classList.toggle('collapsed');
        });
    });
});

// 初始化筛选器展开/收起功能
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-filters-btn');
    const filterGroups = document.querySelector('.filter-groups');
    const filterGroupsCollapsed = true;

    toggleBtn.addEventListener('click', () => {
        filterGroups.classList.toggle('expanded');
        const isExpanded = filterGroups.classList.contains('expanded');
        toggleBtn.querySelector('svg').style.transform = isExpanded ? 'rotate(180deg)' : '';
    });
});

// 主题检测和自动切换
function setupThemeDetection() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // 监听系统主题变化
    darkModeMediaQuery.addEventListener('change', (e) => {
        // 可以在这里添加主题切换时的过渡动画
        document.documentElement.style.transition = 'background-color 0.3s ease';
    });
}

// 添加页面滚动进度监听
function updateScrollProgress() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrolled / total, 1);
    document.documentElement.style.setProperty('--scroll-progress', progress);
}

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);

document.addEventListener('DOMContentLoaded', () => {
    setupThemeDetection();
    updateScrollProgress();
    // ...existing initialization code...
});

// 添加详情模态框打开函数
function openDetailsModal(name) {
    const version = files.find(f => f.name === name);
    if (!version) return;
    let importantTipHtml = '';
    if (version.importantTip) {
        importantTipHtml = `<div class="details-section important-tip"><h4>重要提示</h4><p>${version.importantTip}</p></div>`;
    }
    // 新增：紧急更新标识
    let urgentUpdateHtml = '';
    if (version.urgentUpdate) {
        urgentUpdateHtml = `<div class="details-section urgent-update"><h4>紧急更新</h4><p>此版本为紧急更新，请尽快更新！</p></div>`;
    }
    const detailsModal = document.createElement('div');
    detailsModal.className = 'modal details-modal';
    detailsModal.innerHTML = `
        <div class="modal-header">版本详情 - ${version.name}</div>
        <div class="details-content">
            <div class="details-meta">
                <span class="meta-item">
                    <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="currentColor"/></svg>
                    状态: ${version.tags.includes('正式版') ? '正式版' : '测试版'}
                </span>
                ${version.releaseDate ? `
                <span class="meta-item">
                    <svg viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" fill="currentColor"/></svg>
                    发布时间: ${version.releaseDate}
                </span>
                ` : ''}
            </div>
            ${urgentUpdateHtml}
            ${importantTipHtml}
            <div class="details-section">
                <h4>更新日志</h4>
                <ul>
                    ${version.changelog.map(log => `<li>${log}</li>`).join('')}
                </ul>
            </div>
            <div class="details-section">
                <h4>适配版本</h4>
                <div class="tag-list">
                    ${version.supportVersions.map(v => `<span class="version-tag">${v}</span>`).join('')}
                </div>
            </div>
            <div class="details-section">
                <h4>贡献者</h4>
                <div class="tag-list">
                    ${version.contributors.map(c => `<span class="version-tag">${c}</span>`).join('')}
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn modal-close">关闭</button>
            <button class="btn" onclick="openFeedbackOptions('${version.feedbackLink}')">
                <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.89 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor"/></svg>
                反馈问题
            </button>
        </div>
    `;

    document.querySelector('.modal-overlay').classList.add('show');
    document.body.appendChild(detailsModal);
    setTimeout(() => detailsModal.classList.add('show'), 0);

    // 绑定关闭事件
    const closeBtn = detailsModal.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');
    
    const closeModal = () => {
        document.querySelector('.modal-overlay').classList.remove('show');
        detailsModal.classList.remove('show');
        setTimeout(() => detailsModal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
}

function openFeedbackOptions(baseLink) {
    const feedbackModal = document.createElement('div');
    feedbackModal.className = 'modal feedback-modal';
    feedbackModal.innerHTML = `
        <div class="modal-header">选择反馈类型</div>
        <div class="feedback-options">
            <button class="btn feedback-btn" onclick="handleFeedback('${baseLink}', 'plugin', this)">
                <svg viewBox="0 0 24 24"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" fill="currentColor"/></svg>
                插件问题
            </button>
            <button class="btn feedback-btn" onclick="handleFeedback('${baseLink}', 'website', this)">
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" fill="currentColor"/></svg>
                下载站问题
            </button>
        </div>
        <p class="feedback-note">USF维护组将及时响应你的所需，请关注解决进度。</p>
    `;

    document.body.appendChild(feedbackModal);
    setTimeout(() => feedbackModal.classList.add('show'), 0);

    // 点击遮罩或弹窗外部关闭
    feedbackModal.addEventListener('click', (e) => {
        if (e.target === feedbackModal) {
            closeFeedbackModal(feedbackModal);
        }
    });
}

function handleFeedback(baseLink, type, buttonElement) {
    const urls = {
        plugin: 'https://github.com/USFrameTeam/USF/issues/new',
        website: 'https://f.wps.cn/ksform/w/write/H8xHDueu/'
    };
    
    // 找到当前弹窗并关闭
    const modal = buttonElement.closest('.feedback-modal');
    if (modal) {
        closeFeedbackModal(modal);
    }
    
    // 打开新窗口
    window.open(urls[type], '_blank');
}

function closeFeedbackModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
}

// 添加以下代码来处理筛选器的展开/折叠
document.addEventListener('DOMContentLoaded', function() {
    // 筛选器展开/折叠功能
    const toggleFiltersBtn = document.querySelector('.toggle-filters-btn');
    const filterGroups = document.querySelector('.filter-groups');

    toggleFiltersBtn?.addEventListener('click', () => {
        const isExpanded = filterGroups.classList.contains('expanded');
        filterGroups.classList.toggle('expanded');
        toggleFiltersBtn.setAttribute('aria-expanded', !isExpanded);
        
        // 更新按钮中的箭头方向
        const svg = toggleFiltersBtn.querySelector('svg');
        if (svg) {
            svg.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });

    // 版本类型筛选
    const versionTypeButtons = document.querySelectorAll('[data-tag]');
    versionTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除同组中其他按钮的selected类
            const group = button.closest('.filter-buttons');
            group.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('selected');
                btn.setAttribute('aria-checked', 'false');
            });
            
            // 添加当前按钮的selected类
            button.classList.add('selected');
            button.setAttribute('aria-checked', 'true');
            
            // 这里可以添加筛选逻辑
            filterDownloadList();
        });
    });
});

// 筛选下载列表
function filterDownloadList() {
    const selectedVersionType = document.querySelector('#version-type-label + .filter-buttons .selected').dataset.tag;
    const selectedGameVersion = document.querySelector('#game-version-label + .filter-buttons .selected').dataset.tag;
    const searchText = document.querySelector('#search-input').value.toLowerCase();
    
    const downloadItems = document.querySelectorAll('.download-item');
    downloadItems.forEach(item => {
        const versionTags = Array.from(item.querySelectorAll('.tag')).map(tag => tag.textContent);
        const itemText = item.textContent.toLowerCase();
        
        const matchesVersionType = selectedVersionType === '全部' || versionTags.includes(selectedVersionType);
        const matchesGameVersion = selectedGameVersion === '全部' || versionTags.includes(selectedGameVersion);
        const matchesSearch = !searchText || itemText.includes(searchText);
        
        if (matchesVersionType && matchesGameVersion && matchesSearch) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// 添加筛选器展开/收起功能
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-filters-btn');
    const filterOptions = document.querySelector('.filter-options');

    toggleBtn?.addEventListener('click', () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        
        // 更新按钮状态
        toggleBtn.setAttribute('aria-expanded', !isExpanded);
        
        // 切换展开状态
        filterOptions.classList.toggle('expanded');
        
        // 保存状态到本地存储
        localStorage.setItem('filterExpanded', !isExpanded);
    });

    // 恢复上次的展开/收起状态
    const wasExpanded = localStorage.getItem('filterExpanded') === 'true';
    if (wasExpanded) {
        toggleBtn.setAttribute('aria-expanded', 'true');
        filterOptions.classList.add('expanded');
    }
});

// 初始化筛选器展开/收起功能
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.toggle-filters-btn');
    const filterGroups = document.querySelector('.filter-groups');
    
    if (toggleBtn && filterGroups) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            filterGroups.classList.toggle('expanded');
            
            // 保存状态到本地存储
            localStorage.setItem('filterExpanded', !isExpanded);
        });

        // 默认收起状态
        localStorage.setItem('filterExpanded', 'false');
        toggleBtn.setAttribute('aria-expanded', 'false');
        filterGroups.classList.remove('expanded');
    }
});
