import { files } from '../config/file.js';

document.addEventListener('astro:page-load', () => {
    const fileList = document.getElementById('file-list');
    const searchInput = document.getElementById('search-input');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    const modal = document.getElementById('detail-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalVersions = document.getElementById('modal-versions');
    const modalDate = document.getElementById('modal-date');
    const modalChangelog = document.getElementById('modal-changelog');
    const modalContributors = document.getElementById('modal-contributors');
    const modalDownload = document.getElementById('modal-download');
    const modalCopy = document.getElementById('modal-copy');
    const toast = document.getElementById('toast');

    let currentData = [];
    let displayedCount = 0;
    const pageSize = 10;
    let observer = null;

    if (!fileList) return;

    if (typeof files === 'undefined') {
        fileList.innerHTML = '<p style="padding: 2rem; text-align: center;">无法加载文件配置，请检查 config/file.js</p>';
        return;
    }

    function createTagHtml(text, extraClass = '') {
        const className = extraClass ? `tag ${extraClass}` : 'tag';
        return `<span class="${className}">${text}</span>`;
    }

    function renderCard(file, index) {
        const card = document.createElement('div');
        card.className = 'file-card';
        if (file.urgentUpdate) {
            card.classList.add('urgent-card');
        }
        card.style.animationDelay = `${(index % pageSize) * 0.05}s`;

        const tagsHtml = (file.urgentUpdate ? createTagHtml('紧急更新', 'urgent') : '') + 
                         (file.tags ? file.tags.map(tag => createTagHtml(tag)).join('') : '');
        const versions = file.supportVersions ? file.supportVersions.join(', ') : '未知版本';
        
        card.dataset.fileIndex = index;

        card.innerHTML = `
            <div class="card-main">
                <div class="file-title">${file.name}</div>
                <div class="file-brief">${file.description || '暂无描述'}</div>
            </div>
            <div class="card-meta">
                <div class="meta-row">
                    <span>适用版本: ${versions}</span>
                </div>
                <div class="tags">${tagsHtml}</div>
            </div>
            <div class="card-actions">
                <button class="icon-btn action-info" aria-label="查看详情" title="查看详情">
                    <svg class="icon"><use href="#icon-info"></use></svg>
                    <span class="btn-text">详情</span>
                </button>
                <a href="${file.downloadLink}" class="icon-btn action-download" download title="下载">
                    <svg class="icon"><use href="#icon-download"></use></svg>
                    <span class="btn-text">下载</span>
                </a>
            </div>
        `;
        
        const infoBtn = card.querySelector('.action-info');
        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(file);
        });

        return card;
    }

    function loadMore() {
        const nextBatch = currentData.slice(displayedCount, displayedCount + pageSize);
        nextBatch.forEach((file, index) => {
            fileList.appendChild(renderCard(file, displayedCount + index));
        });
        displayedCount += nextBatch.length;

        if (displayedCount < currentData.length) {
            const lastCard = fileList.lastElementChild;
            if (lastCard) {
                observer.observe(lastCard);
            }
        }
    }

    function renderFiles(data) {
        fileList.innerHTML = '';
        currentData = data;
        displayedCount = 0;

        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.unobserve(entries[0].target);
                loadMore();
            }
        }, { rootMargin: '100px' });

        if (data.length === 0) {
            fileList.innerHTML = '<p style="padding: 2rem; text-align: center; grid-column: 1/-1;">没有找到匹配的文件</p>';
            return;
        }

        loadMore();
    }

    renderFiles(files);

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            const filtered = files.filter(file => 
                (file.name && file.name.toLowerCase().includes(keyword)) || 
                (file.description && file.description.toLowerCase().includes(keyword)) ||
                (file.tags && file.tags.some(tag => tag.toLowerCase().includes(keyword)))
            );
            renderFiles(filtered);
        });
    }

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    function setTheme(isDark) {
        if (isDark) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
        }
    }

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = body.getAttribute('data-theme') === 'dark';
            setTheme(!isDark);
            localStorage.setItem('theme', !isDark ? 'dark' : 'light');
        });
    }

    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (menuToggle && sidebar && sidebarClose && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('show');
            body.style.overflow = 'hidden';
        });

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
            body.style.overflow = '';
        };

        sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    const productsLink = document.querySelector('.products-link');
    if (productsLink) {
        productsLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const dropdown = productsLink.nextElementSibling;
                if (dropdown) {
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    }

    function openModal(file) {
        modalTitle.textContent = file.name;
        modalDesc.textContent = file.description || '暂无描述';
        modalVersions.textContent = file.supportVersions ? file.supportVersions.join(', ') : '未知版本';
        modalDate.textContent = file.releaseDate || '未知';
        
        modalChangelog.innerHTML = '';
        if (file.changelog && file.changelog.length > 0) {
            file.changelog.forEach(log => {
                const li = document.createElement('li');
                li.textContent = log;
                modalChangelog.appendChild(li);
            });
        } else {
            modalChangelog.innerHTML = '<li>暂无更新日志</li>';
        }

        modalContributors.innerHTML = '';
        if (file.contributors && file.contributors.length > 0) {
            modalContributors.innerHTML = file.contributors.map(c => createTagHtml(c)).join('');
        } else {
            modalContributors.textContent = '-';
        }

        modalDownload.href = file.downloadLink;
        
        const currentCopyBtn = document.getElementById('modal-copy');
        currentCopyBtn.onclick = () => {
             const link = new URL(file.downloadLink, window.location.href).href;
             copyToClipboard(link);
        };

        modal.classList.add('show');
        body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('show');
        body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) closeModal();
    });

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast();
        }).catch(err => {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast();
            } catch (err) {}
            document.body.removeChild(textArea);
        });
    }

    function showToast() {
        if (toast) {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
    }
});
