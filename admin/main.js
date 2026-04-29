document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Mock Login
            if (username === 'admin' && password === '1234') {
                localStorage.setItem('isLoggedIn', 'true');
                renderDashboard();
            } else {
                alert('아이디 또는 비밀번호가 올바르지 않습니다.');
            }
        });
    }

    // Check login status on load
    if (localStorage.getItem('isLoggedIn') === 'true') {
        renderDashboard();
    }
});

function renderDashboard() {
    document.body.classList.remove('login-body');
    document.body.innerHTML = `
        <div class="admin-layout">
            <aside class="sidebar">
                <div class="sidebar-logo">
                    <img src="../assets/logo.svg" alt="로고" width="40">
                    <span>바른몸 어드민</span>
                </div>
                <nav class="sidebar-nav">
                    <a href="#" class="active" onclick="showSection('overview')"><i data-feather="home"></i> 대시보드 홈</a>
                    <a href="#" onclick="showSection('hero')"><i data-feather="layout"></i> 히어로 섹션 관리</a>
                    <a href="#" onclick="showSection('programs')"><i data-feather="grid"></i> 프로그램 관리</a>
                    <a href="#" onclick="showSection('cases')"><i data-feather="image"></i> 임상 사례 (B/A)</a>
                    <a href="#" onclick="showSection('blog')"><i data-feather="file-text"></i> 블로그/소식</a>
                    <a href="#" onclick="logout()"><i data-feather="log-out"></i> 로그아웃</a>
                </nav>
            </aside>
            <main class="main-content">
                <header class="content-header">
                    <h1 id="section-title">대시보드 홈</h1>
                    <div class="user-info">관리자님, 환영합니다.</div>
                </header>
                <div id="dashboard-content" class="content-body">
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-header">
                                <h3>오늘의 예약</h3>
                                <i data-feather="calendar"></i>
                            </div>
                            <p class="stat-value">12건</p>
                        </div>
                        <div class="stat-card">
                            <div class="stat-header">
                                <h3>누적 방문자</h3>
                                <i data-feather="users"></i>
                            </div>
                            <p class="stat-value">2,540명</p>
                        </div>
                        <div class="stat-card">
                            <div class="stat-header">
                                <h3>새로운 문의</h3>
                                <i data-feather="message-square"></i>
                            </div>
                            <p class="stat-value">5건</p>
                        </div>
                    </div>
                    <div class="quick-actions">
                        <h2>빠른 작업</h2>
                        <button class="btn-action" onclick="showSection('programs')">프로그램 수정하기</button>
                        <button class="btn-action" onclick="showSection('cases')">새로운 B/A 업로드</button>
                    </div>
                </div>
            </main>
        </div>
    `;
    updateAdminStyles();
    feather.replace();
}

function updateAdminStyles() {
    // Add additional styles for dashboard layout dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .admin-layout { display: flex; min-height: 100vh; font-family: 'Noto Sans KR', sans-serif; }
        .sidebar { width: 280px; background: #1a1c23; color: white; padding: 40px 0; display: flex; flex-direction: column; box-shadow: 4px 0 10px rgba(0,0,0,0.05); }
        .sidebar-logo { padding: 0 32px 48px; display: flex; align-items: center; gap: 14px; }
        .sidebar-logo span { font-family: 'Outfit', sans-serif; font-size: 1.1rem; font-weight: 700; letter-spacing: 1px; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 4px; }
        .sidebar-nav a { padding: 16px 32px; color: rgba(255,255,255,0.5); text-decoration: none; transition: 0.3s; font-size: 0.95rem; font-weight: 500; border-left: 4px solid transparent; display: flex; align-items: center; gap: 12px; }
        .sidebar-nav a i { width: 18px; height: 18px; }
        .sidebar-nav a:hover { color: white; background: rgba(255,255,255,0.05); }
        .sidebar-nav a.active { background: rgba(177, 153, 94, 0.1); color: var(--primary); border-left-color: var(--primary); font-weight: 700; }
        .main-content { flex: 1; background: #f4f7fa; }
        .content-header { background: white; padding: 24px 48px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .content-header h1 { font-size: 1.5rem; font-weight: 700; color: #333; }
        .user-info { font-size: 0.9rem; color: #888; }
        .content-body { padding: 48px; max-width: 1200px; margin: 0 auto; width: 100%; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 48px; }
        .stat-card { background: white; padding: 32px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.03); border: 1px solid #eee; }
        .stat-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
        .stat-header i { color: var(--primary); width: 20px; height: 20px; opacity: 0.6; }
        .stat-card h3 { font-size: 0.85rem; color: #999; text-transform: uppercase; letter-spacing: 1px; }
        .stat-value { font-size: 2.2rem; font-weight: 700; color: var(--primary); }
        .quick-actions { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.03); border: 1px solid #eee; }
        .quick-actions h2 { font-size: 1.2rem; margin-bottom: 24px; }
        .btn-action { padding: 14px 28px; background: var(--primary); color: white; border: none; border-radius: 12px; cursor: pointer; margin-right: 12px; font-weight: 600; transition: 0.3s; }
        .btn-action:hover { background: var(--primary-dark); transform: translateY(-2px); }
    `;
    document.head.appendChild(style);
}

function showSection(section) {
    const title = document.getElementById('section-title');
    const content = document.getElementById('dashboard-content');
    const data = getClinicData();
    
    // Update active nav link
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    document.querySelector(`.sidebar-nav a[onclick*="${section}"]`).classList.add('active');

    if (section === 'programs') {
        title.innerText = '프로그램 관리';
        let html = `
            <div class="admin-card">
                <div class="card-header">
                    <h2>프로그램 리스트</h2>
                    <button class="btn-action" onclick="addProgram()">+ 새 프로그램 추가</button>
                </div>
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>아이콘</th>
                            <th>프로그램명</th>
                            <th>설명</th>
                            <th>관리</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        data.programs.forEach(prog => {
            html += `
                <tr>
                    <td><span class="table-icon">${prog.icon}</span></td>
                    <td><strong>${prog.title}</strong></td>
                    <td class="td-desc">${prog.desc}</td>
                    <td>
                        <button class="btn-edit" onclick="editProgram(${prog.id})">수정</button>
                    </td>
                </tr>
            `;
        });
        
        html += `</tbody></table></div>`;
        content.innerHTML = html;
        feather.replace();
    } else if (section === 'hero') {
        title.innerText = '히어로 섹션 관리';
        content.innerHTML = `
            <div class="admin-card">
                <h2>히어로 콘텐츠 수정</h2>
                <form id="edit-hero-form" class="admin-form">
                    <div class="form-group">
                        <label>메인 타이틀</label>
                        <input type="text" id="hero-title" value="${data.hero.title}" required>
                    </div>
                    <div class="form-group">
                        <label>서브 타이틀</label>
                        <textarea id="hero-subtitle" rows="3" required>${data.hero.subtitle}</textarea>
                    </div>
                    <div class="form-group">
                        <label>배경 이미지 URL</label>
                        <input type="text" id="hero-bg" value="${data.hero.bgImg}" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">변경사항 저장</button>
                    </div>
                </form>
            </div>
        `;
        
        document.getElementById('edit-hero-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const updatedData = getClinicData();
            updatedData.hero = {
                title: document.getElementById('hero-title').value,
                subtitle: document.getElementById('hero-subtitle').value,
                bgImg: document.getElementById('hero-bg').value
            };
            saveClinicData(updatedData);
            alert('히어로 섹션이 업데이트되었습니다.');
        });
    } else if (section === 'cases') {
        title.innerText = '임상 사례 (B/A) 관리';
        let html = `
            <div class="admin-card">
                <div class="card-header">
                    <h2>등록된 사례</h2>
                    <button class="btn-action" onclick="addCase()">+ 새 사례 추가</button>
                </div>
                <div class="cases-grid">
        `;
        
        data.cases.forEach(c => {
            html += `
                <div class="admin-case-card">
                    <div class="case-previews">
                        <img src="${c.before}" alt="Before">
                        <img src="${c.after}" alt="After">
                    </div>
                    <div class="case-info">
                        <h3>${c.title}</h3>
                        <button class="btn-edit" onclick="deleteCase(${c.id})">삭제</button>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
        content.innerHTML = html;
        updateCaseStyles();
    } else if (section === 'overview') {
        title.innerText = '대시보드 홈';
        content.innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>오늘의 예약</h3>
                    <p class="stat-value">12건</p>
                </div>
                <div class="stat-card">
                    <h3>누적 방문자</h3>
                    <p class="stat-value">2,540명</p>
                </div>
                <div class="stat-card">
                    <h3>새로운 문의</h3>
                    <p class="stat-value">5건</p>
                </div>
            </div>
            <div class="quick-actions">
                <h2>빠른 작업</h2>
                <button class="btn-action" onclick="showSection('programs')">프로그램 수정하기</button>
                <button class="btn-action" onclick="showSection('cases')">새로운 B/A 업로드</button>
            </div>
        `;
    }
}

function editProgram(id) {
    const data = getClinicData();
    const prog = data.programs.find(p => p.id === id);
    if (!prog) return;

    const content = document.getElementById('dashboard-content');
    content.innerHTML = `
        <div class="admin-card">
            <h2>프로그램 수정</h2>
            <form id="edit-program-form" class="admin-form">
                <input type="hidden" id="edit-id" value="${prog.id}">
                <div class="form-group">
                    <label>프로그램 명</label>
                    <input type="text" id="edit-title" value="${prog.title}" required>
                </div>
                <div class="form-group">
                    <label>아이콘 (Feather Icon 이름)</label>
                    <input type="text" id="edit-icon" value="${prog.icon}" required>
                    <small style="color: #888;">예: star, activity, heart, anchor (feathericons.com 참고)</small>
                </div>
                <div class="form-group">
                    <label>설명</label>
                    <textarea id="edit-desc" rows="4" required>${prog.desc}</textarea>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="showSection('programs')">취소</button>
                    <button type="submit" class="btn-primary">저장하기</button>
                </div>
            </form>
        </div>
    `;

    document.getElementById('edit-program-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedData = getClinicData();
        const index = updatedData.programs.findIndex(p => p.id === id);
        
        updatedData.programs[index] = {
            ...updatedData.programs[index],
            title: document.getElementById('edit-title').value,
            icon: document.getElementById('edit-icon').value,
            desc: document.getElementById('edit-desc').value
        };
        
        saveClinicData(updatedData);
        alert('저장되었습니다.');
        showSection('programs');
    });
}

function deleteCase(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const data = getClinicData();
    data.cases = data.cases.filter(c => c.id !== id);
    saveClinicData(data);
    showSection('cases');
}

function updateCaseStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
        .cases-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .admin-case-card { background: #f8f9fa; border-radius: 12px; overflow: hidden; border: 1px solid #eee; }
        .case-previews { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: #ddd; height: 150px; }
        .case-previews img { width: 100%; height: 100%; object-fit: cover; }
        .case-info { padding: 15px; display: flex; justify-content: space-between; align-items: center; }
        .case-info h3 { font-size: 1rem; }
    `;
    document.head.appendChild(style);
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    location.reload();
}
