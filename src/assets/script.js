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

    if (!fileList) return;

    const cards = () => fileList.querySelectorAll('.file-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            const allCards = cards();
            
            if (!keyword) {
                allCards.forEach(card => card.style.display = '');
                return;
            }
            
            allCards.forEach(card => {
                const name = (card.dataset.name || '').toLowerCase();
                const desc = (card.dataset.desc || '').toLowerCase();
                const tags = (card.dataset.tags || '').toLowerCase();
                const match = name.includes(keyword) || desc.includes(keyword) || tags.includes(keyword);
                card.style.display = match ? '' : 'none';
            });
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

    fileList.addEventListener('click', (e) => {
        const downloadBtn = e.target.closest('.action-download');
        const infoBtn = e.target.closest('.action-info');
        
        if (downloadBtn) {
            e.preventDefault();
            showEulaModal(downloadBtn.href);
            return;
        }
        
        if (infoBtn) {
            e.preventDefault();
            openModalFromBtn(infoBtn);
        }
    });

    if (modalDownload) {
        modalDownload.addEventListener('click', (e) => {
            e.preventDefault();
            showEulaModal(modalDownload.href);
        });
    }

    let pendingDownloadUrl = null;

    function showEulaModal(url) {
        pendingDownloadUrl = url;
        document.getElementById('eula-agree').checked = false;
        document.getElementById('eula-confirm').disabled = true;
        document.getElementById('eula-modal').classList.add('show');
        body.style.overflow = 'hidden';
    }

    function closeEulaModal() {
        document.getElementById('eula-modal').classList.remove('show');
        body.style.overflow = '';
        pendingDownloadUrl = null;
    }

    document.getElementById('eula-agree').addEventListener('change', function() {
        document.getElementById('eula-confirm').disabled = !this.checked;
    });

    document.getElementById('eula-cancel').addEventListener('click', closeEulaModal);

    document.getElementById('eula-confirm').addEventListener('click', () => {
        if (pendingDownloadUrl) {
            const a = document.createElement('a');
            a.href = pendingDownloadUrl;
            a.setAttribute('download', '');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            closeEulaModal();
        }
    });

    document.getElementById('eula-modal-close').addEventListener('click', closeEulaModal);
    document.getElementById('eula-modal').addEventListener('click', (e) => {
        if (e.target.id === 'eula-modal') closeEulaModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const eulaModal = document.getElementById('eula-modal');
            if (eulaModal && eulaModal.classList.contains('show')) {
                closeEulaModal();
            } else if (modal && modal.classList.contains('show')) {
                closeModal();
            }
        }
    });

    function openModalFromBtn(btn) {
        modalTitle.textContent = btn.dataset.name || '文件详情';
        modalDesc.textContent = btn.dataset.desc || '暂无描述';
        modalVersions.textContent = btn.dataset.versions || '未知版本';
        modalDate.textContent = btn.dataset.date || '未知';
        
        modalChangelog.innerHTML = '';
        const changelogStr = btn.dataset.changelog || '';
        if (changelogStr) {
            changelogStr.split('|||').forEach(log => {
                if (!log.trim()) return;
                const li = document.createElement('li');
                li.textContent = log;
                modalChangelog.appendChild(li);
            });
        } else {
            modalChangelog.innerHTML = '<li>暂无更新日志</li>';
        }

        modalContributors.innerHTML = '';
        const contributorsStr = btn.dataset.contributors || '';
        if (contributorsStr) {
            contributorsStr.split(',').forEach(c => {
                if (!c.trim()) return;
                const span = document.createElement('span');
                span.className = 'tag';
                span.textContent = c;
                modalContributors.appendChild(span);
            });
        } else {
            modalContributors.textContent = '-';
        }

        modalDownload.href = btn.dataset.download || '#';
        
        const currentCopyBtn = document.getElementById('modal-copy');
        currentCopyBtn.onclick = () => {
            const link = new URL(btn.dataset.download || '#', window.location.href).href;
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

    function showToast(message) {
        if (toast) {
            if (message) {
                toast.textContent = message;
            }
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                if (message) {
                    setTimeout(() => { toast.textContent = '已复制到剪贴板'; }, 300);
                }
            }, 2000);
        }
    }
});
