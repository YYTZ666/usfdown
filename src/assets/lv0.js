import { files } from '../config/file.js';

document.addEventListener('astro:page-load', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
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

    let currentStep = 'step-1';
    let selectedPlatform = '';
    let selectedMajorVersion = '';
    let selectedMinorVersion = '';
    let selectedDeployment = '';
    let fetchedVersions = window.preFetchedVersions || [];

    let currentData = [];
    let displayedCount = 0;
    const pageSize = 10;
    let observer = null;

    window.goToStep = goToStep;
    window.selectPlatform = selectPlatform;
    window.selectMajorVersion = selectMajorVersion;
    window.selectMinorVersion = selectMinorVersion;
    window.selectDeployment = selectDeploymentFunc;
    window.prevStep = prevStep;
    window.nextStep = nextStep;

    function goToStep(stepId) {
        document.querySelectorAll('.step-container').forEach(el => {
            el.classList.remove('active');
            el.style.display = 'none';
        });
        
        const target = document.getElementById(stepId);
        if (target) {
            target.style.display = 'block';
            void target.offsetWidth;
            target.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
        currentStep = stepId;
        updateFooterButtons();
        updateSelectionHighlight();
    }

    function updateFooterButtons() {
        const btnPrev = document.getElementById('btn-prev');
        const btnNext = document.getElementById('btn-next');
        
        if (!btnPrev || !btnNext) return;

        btnPrev.disabled = false;
        btnNext.disabled = true;
        btnNext.textContent = '下一步';
        btnNext.onclick = nextStep;

        switch (currentStep) {
            case 'step-1':
                btnPrev.disabled = true;
                if (selectedPlatform) btnNext.disabled = false;
                break;
            case 'step-unsupported':
                btnNext.disabled = false;
                btnNext.textContent = '返回下载站';
                btnNext.onclick = () => window.location.href = '/';
                break;
            case 'step-2':
                if (selectedMajorVersion) btnNext.disabled = false;
                break;
            case 'step-3':
                if (selectedMinorVersion) btnNext.disabled = false;
                break;
            case 'step-4':
                btnNext.disabled = false;
                btnNext.textContent = '下载完成';
                break;
            case 'step-5':
                if (selectedDeployment) btnNext.disabled = false;
                btnNext.textContent = '完成';
                break;
        }
        
        btnNext.style.display = 'block';
    }

    function prevStep() {
        switch (currentStep) {
            case 'step-unsupported':
            case 'step-2':
                goToStep('step-1');
                break;
            case 'step-3':
                goToStep('step-2');
                break;
            case 'step-4':
                goToStep('step-3');
                break;
            case 'step-5':
                goToStep('step-4');
                break;
        }
    }

    function nextStep() {
        switch (currentStep) {
            case 'step-1':
                if (selectedPlatform === 'java' || selectedPlatform === 'china') {
                    goToStep('step-unsupported');
                } else if (selectedPlatform === 'bedrock') {
                    goToStep('step-2');
                    initVersions();
                }
                break;
            case 'step-2':
                if (selectedMajorVersion) {
                    goToStep('step-3');
                    processMinorVersions(selectedMajorVersion);
                }
                break;
            case 'step-3':
                if (selectedMinorVersion) {
                    goToStep('step-4');
                    showResults(selectedMinorVersion);
                }
                break;
            case 'step-4':
                goToStep('step-5');
                break;
            case 'step-5':
                window.location.href = '/';
                break;
        }
    }

    function updateSelectionHighlight() {
        document.querySelectorAll('.option-card').forEach(card => card.classList.remove('selected'));

        if (currentStep === 'step-1' && selectedPlatform) {
            const cards = document.querySelectorAll('#step-1 .option-card');
            if (selectedPlatform === 'bedrock' && cards[0]) cards[0].classList.add('selected');
            if (selectedPlatform === 'java' && cards[1]) cards[1].classList.add('selected');
            if (selectedPlatform === 'china' && cards[2]) cards[2].classList.add('selected');
        } else if (currentStep === 'step-2' && selectedMajorVersion) {
             const cards = document.querySelectorAll('#major-versions-grid .option-card');
             cards.forEach(card => {
                 if (card.getAttribute('data-value') === selectedMajorVersion) {
                     card.classList.add('selected');
                 }
             });
        } else if (currentStep === 'step-3' && selectedMinorVersion) {
             const cards = document.querySelectorAll('#minor-versions-grid .option-card');
             cards.forEach(card => {
                 if (card.getAttribute('data-value') === selectedMinorVersion) {
                     card.classList.add('selected');
                 }
             });
        } else if (currentStep === 'step-5' && selectedDeployment) {
             const cards = document.querySelectorAll('#step-5 .option-card');
             if (selectedDeployment === 'local' && cards[0]) cards[0].classList.add('selected');
             if (selectedDeployment === 'simpfun' && cards[1]) cards[1].classList.add('selected');
             if (selectedDeployment === 'other' && cards[2]) cards[2].classList.add('selected');
        }
    }

    function selectDeploymentFunc(type) {
        selectedDeployment = type;
        updateSelectionHighlight();
        updateFooterButtons();
    }

    function selectPlatform(platform) {
        selectedPlatform = platform;
        updateSelectionHighlight();
        updateFooterButtons();
    }

    function initVersions() {
        const loading = document.getElementById('step-2-loading');
        const grid = document.getElementById('major-versions-grid');
        
        if (!loading || !grid) return;

        if (fetchedVersions.length > 0) {
            loading.style.display = 'none';
            if (grid.children.length === 0) processMajorVersions(fetchedVersions);
            return;
        }

        loading.innerHTML = `<p class="error-message">未找到预加载的版本数据。</p>`;
    }

    function processMajorVersions(versions) {
        const majorSet = new Set();

        versions.forEach(v => {
            const parts = v.split('.');
            if (parts.length >= 2) {
                const major = `${parts[0]}.${parts[1]}`;
                majorSet.add(major);
            }
        });

        const sortedMajors = Array.from(majorSet).sort((a, b) => {
            return compareVersions(b, a);
        });

        const grid = document.getElementById('major-versions-grid');
        if (!grid) return;
        grid.innerHTML = '';

        sortedMajors.forEach(major => {
            const card = document.createElement('div');
            card.className = 'option-card';
            card.setAttribute('data-value', major);
            
            let displayName = major;
            if (major === '1.26') {
                 displayName = '1.26 (26.X)';
            }

            card.innerHTML = `<h3>${displayName}</h3>`;
            card.onclick = () => selectMajorVersion(major);
            grid.appendChild(card);
        });
        updateSelectionHighlight();
    }

    function selectMajorVersion(major) {
        selectedMajorVersion = major;
        updateSelectionHighlight();
        updateFooterButtons();
    }

    function processMinorVersions(major) {
        const versionKeys = fetchedVersions;
        const minorSet = new Set();

        versionKeys.forEach(v => {
            if (v.startsWith(major + '.')) {
                const parts = v.split('.');
                if (parts.length >= 3) {
                    const minor = `${parts[0]}.${parts[1]}.${parts[2]}`;
                    minorSet.add(minor);
                }
            }
        });

        const sortedMinors = Array.from(minorSet).sort((a, b) => {
            return compareVersions(b, a);
        });

        const grid = document.getElementById('minor-versions-grid');
        if (!grid) return;
        grid.innerHTML = '';

        sortedMinors.forEach(minor => {
            const card = document.createElement('div');
            card.className = 'option-card';
            card.setAttribute('data-value', minor);
            card.onclick = () => selectMinorVersion(minor);
            card.innerHTML = `<h3>${minor}</h3>`;
            grid.appendChild(card);
        });
        updateSelectionHighlight();
    }

    function selectMinorVersion(minor) {
        selectedMinorVersion = minor;
        updateSelectionHighlight();
        updateFooterButtons();
    }

    function showResults(targetVersion) {
        const fileList = document.getElementById('file-list');
        const resultMessage = document.getElementById('result-message');
        if (!fileList || !resultMessage) return;
        fileList.innerHTML = '';
        resultMessage.innerHTML = '';

        if (typeof files === 'undefined') {
            resultMessage.innerHTML = '<p class="error-message">无法加载文件配置。</p>';
            return;
        }

        const exactMatches = [];
        const approximateMatches = [];

        files.forEach(file => {
            if (!file.supportVersions) return;

            let isExact = false;
            let isApprox = false;

            file.supportVersions.forEach(sv => {
                const cleanSv = sv.toLowerCase();
                
                if (cleanSv === '26.x' && targetVersion.startsWith('1.26')) {
                    isExact = true;
                    return;
                }

                const svParts = sv.split('.');
                const targetParts = targetVersion.split('.');

                if (sv === targetVersion) {
                    isExact = true;
                } else if (svParts.length >= 3 && targetParts.length >= 3) {
                    if (svParts[0] === targetParts[0] && svParts[1] === targetParts[1] && svParts[2] === targetParts[2]) {
                        isExact = true;
                    }
                }

                if (!isExact) {
                    if (svParts.length >= 2 && targetParts.length >= 2) {
                        if (svParts[0] === targetParts[0] && svParts[1] === targetParts[1]) {
                            isApprox = true;
                        }
                    }
                }
            });

            if (isExact) {
                exactMatches.push(file);
            } else if (isApprox) {
                approximateMatches.push(file);
            }
        });

        let displayFiles = [];
        if (exactMatches.length > 0) {
            displayFiles = exactMatches.sort((a, b) => {
                 const dateA = new Date(a.releaseDate);
                 const dateB = new Date(b.releaseDate);
                 return dateB - dateA;
            });
            resultMessage.innerHTML = `<p class="success-message" style="color: #52c41a; text-align: center; margin-bottom: 1rem;">找到完全匹配的版本！</p>`;
        } else if (approximateMatches.length > 0) {
            displayFiles = approximateMatches;
            resultMessage.innerHTML = `
                <div class="warning-message">
                    对于你所选择的版本 (${targetVersion}) 没有完全相同的匹配版号。<br>
                    近似的 USF 版本可能可以使用，请按照从上往下的顺序尝试是否可用于此版本的 Minecraft。
                </div>
            `;
            
            displayFiles.sort((a, b) => {
                const getBestVersion = (f) => {
                    const validVersions = f.supportVersions.filter(v => v.startsWith(selectedMajorVersion));
                    if (validVersions.length === 0) return Infinity;
                    
                    const diffs = validVersions.map(v => {
                        const p = v.split('.');
                        const t = targetVersion.split('.');
                        if (p.length < 3 || t.length < 3) return Infinity;
                        return Math.abs(parseInt(p[2]) - parseInt(t[2]));
                    });
                    return Math.min(...diffs);
                };

                const diffA = getBestVersion(a);
                const diffB = getBestVersion(b);
                
                if (diffA !== diffB) {
                    return diffA - diffB;
                }
                
                 const dateA = new Date(a.releaseDate);
                 const dateB = new Date(b.releaseDate);
                 return dateB - dateA;
            });
        } else {
            resultMessage.innerHTML = '<p style="text-align: center; padding: 2rem;">没有找到兼容的插件版本。</p>';
        }

        renderFiles(displayFiles, fileList);
    }

    function renderCard(file, index) {
        const card = document.createElement('div');
        card.className = 'file-card';
         
        const tagsHtml = (file.urgentUpdate ? '<span class="tag urgent">紧急更新</span>' : '') + 
                         (file.tags ? file.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : '');
        const versions = file.supportVersions ? file.supportVersions.join(', ') : '未知版本';
        
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
        infoBtn.onclick = () => openModal(file);

        return card;
    }

    function loadMore(container) {
        const nextBatch = currentData.slice(displayedCount, displayedCount + pageSize);
        nextBatch.forEach((file, index) => {
            container.appendChild(renderCard(file, displayedCount + index));
        });
        displayedCount += nextBatch.length;

        if (displayedCount < currentData.length) {
            const lastCard = container.lastElementChild;
            if (lastCard) {
                observer.observe(lastCard);
            }
        }
    }

    function renderFiles(data, container) {
        container.innerHTML = '';
        currentData = data;
        displayedCount = 0;

        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                observer.unobserve(entries[0].target);
                loadMore(container);
            }
        }, { rootMargin: '100px' });

        if (data.length === 0) return;

        loadMore(container);
    }

    const modal = document.getElementById('detail-modal');
    const modalClose = document.getElementById('modal-close');
    
    function openModal(file) {
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalVersions = document.getElementById('modal-versions');
        const modalDate = document.getElementById('modal-date');
        const modalChangelog = document.getElementById('modal-changelog');
        const modalContributors = document.getElementById('modal-contributors');
        const modalDownload = document.getElementById('modal-download');
        const copyBtn = document.getElementById('modal-copy');

        if (modalTitle) modalTitle.textContent = file.name;
        if (modalDesc) modalDesc.textContent = file.description || '暂无描述';
        if (modalVersions) modalVersions.textContent = file.supportVersions ? file.supportVersions.join(', ') : '未知版本';
        if (modalDate) modalDate.textContent = file.releaseDate || '未知';
        
        if (modalChangelog) {
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
        }

        if (modalContributors) {
            modalContributors.innerHTML = '';
            if (file.contributors && file.contributors.length > 0) {
                modalContributors.innerHTML = file.contributors.map(c => `<span class="tag">${c}</span>`).join('');
            }
        }

        if (modalDownload) modalDownload.href = file.downloadLink;

        if (copyBtn) {
            copyBtn.onclick = () => {
                 const link = new URL(file.downloadLink, window.location.href).href;
                 navigator.clipboard.writeText(link).then(() => {
                    const toast = document.getElementById('toast');
                    if (toast) {
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                 });
            };
        }

        if (modal) {
            modal.classList.add('show');
            body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            body.style.overflow = '';
        }
    }

    if (modalClose) modalClose.onclick = closeModal;
    if (modal) modal.onclick = (e) => { if (e.target === modal) closeModal(); };

    function compareVersions(v1, v2) {
        const p1 = v1.split('.').map(Number);
        const p2 = v2.split('.').map(Number);
        const len = Math.max(p1.length, p2.length);
        
        for (let i = 0; i < len; i++) {
            const n1 = p1[i] || 0;
            const n2 = p2[i] || 0;
            if (n1 > n2) return 1;
            if (n1 < n2) return -1;
        }
        return 0;
    }

    updateFooterButtons();
});
