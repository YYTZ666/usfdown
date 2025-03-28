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

    const filteredFiles = files.filter(({ tags, name }) =>
        (versionTag === '全部' || tags.includes(versionTag)) &&
        (versionNumber === '全部' || tags.includes(versionNumber)) &&
        name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filesToDisplay = filteredFiles.slice(start, start + itemsPerPage);
    noMoreMessage.style.display = filesToDisplay.length === 0 ? 'block' : 'none';
    downloadList.innerHTML += filesToDisplay.map(generateDownloadItem).join('');

    setTimeout(() => {
        document.querySelectorAll('.download-item').forEach(item => item.classList.add('show'));
    }, 100);

    if (start + itemsPerPage >= filteredFiles.length) {
        noMoreMessage.classList.add('show');
    } else {
        noMoreMessage.classList.remove('show');
    }
}

function newWindow(link) {
    window.location.href = link;
}

// 生成列表项
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
                ${generateButton('反馈', 'newWindow', feedbackLink, 'M12 2C13.65 2 15 3.35 15 5C15 6.65 13.65 8 12 8C10.35 8 9 6.65 9 5C9 3.35 10.35 2 12 2ZM6 22C5.45 22 5 21.55 5 21C5 17.13 8.13 14 12 14C15.87 14 19 17.13 19 21C19 21.55 18.55 22 18 22H6Z')}
                ${generateButton('下载', 'newWindow', downloadLink, 'M19 9H15V3H9V9H5L12 16L19 9ZM5 18H19V20H5V18Z')}
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

// 监听滚动事件实现无限滚动加载
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
    resetAndRenderFiles();
});

searchInput.addEventListener('input', () => {
    if (!searchInput.value.trim()) return;
    resetAndRenderFiles();
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
    // 分别处理版本类型和游戏版本的筛选,不再联动
    if (['全部', '正式版', '测试版'].includes(tag)) {
        selectedVersion = tag;
        // 只更新版本类型按钮组的选中状态
        updateFilterButton('#version-all, #version-official, #version-test', button);
    }

    if (tag === '全部' || tag.startsWith('1.')) {
        selectedVersionNumber = tag;
        // 只更新游戏版本按钮组的选中状态
        updateFilterButton('[id^="version-1."], #version-number-all', button);
    }

    page = 1;
    downloadList.innerHTML = '';
    renderFiles(selectedVersion, selectedVersionNumber, searchInput.value);
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
