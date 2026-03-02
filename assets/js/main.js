document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    function updateThemeIcon(theme) {
        const themeIcon = themeToggle ? themeToggle.querySelector('.bi-sun, .bi-moon-stars') : null;
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.classList.remove('bi-moon-stars');
            themeIcon.classList.add('bi-sun');
        } else {
            themeIcon.classList.remove('bi-sun');
            themeIcon.classList.add('bi-moon-stars');
        }
    }

    // Check saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.classList.toggle('dark', savedTheme === 'dark');
    html.classList.toggle('light', savedTheme === 'light');
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = html.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            html.classList.toggle('dark', !isDark);
            html.classList.toggle('light', isDark);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    // RTL Toggle Logic
    const rtlToggle = document.getElementById('rtlToggle');

    function updateRtl(dir) {
        html.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
        const rtlBadge = rtlToggle ? rtlToggle.querySelector('span') : null;
        if (rtlBadge) {
            rtlBadge.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
        }
    }

    // Check saved dir or default to ltr
    const savedDir = localStorage.getItem('dir') || 'ltr';
    updateRtl(savedDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            updateRtl(newDir);
        });
    }

    // SPA Section Switcher Logic
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.spa-section');

    if (sidebarLinks.length > 0) {
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                const target = link.getAttribute('data-section');
                if (!target) return;

                // Update Active Link UI
                sidebarLinks.forEach(l => {
                    l.classList.remove('bg-emerald-500', 'text-white');
                    l.classList.add('text-slate-400', 'hover:bg-emerald-500/10');
                });
                link.classList.add('bg-emerald-500', 'text-white');
                link.classList.remove('text-slate-400', 'hover:bg-emerald-500/10');

                // Switch Sections
                sections.forEach(s => {
                    s.classList.add('hidden');
                    s.classList.remove('active-section');
                });
                const targetSection = document.getElementById(`section-${target}`);
                if (targetSection) {
                    targetSection.classList.remove('hidden');
                    targetSection.classList.add('active-section');
                }

                // Close mobile sidebar if open
                const dashboardSidebar = document.getElementById('dashboardSidebar');
                const sidebarOverlay = document.getElementById('sidebarOverlay');
                if (window.innerWidth < 1024 && dashboardSidebar) {
                    dashboardSidebar.classList.add('hidden');
                    if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
                }
            });
        });
    }

    // Logout Modal Logic
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const confirmLogout = document.getElementById('confirmLogout');
    const cancelLogout = document.getElementById('cancelLogout');
    const logoutModalContent = document.getElementById('logoutModalContent');

    if (logoutBtn && logoutModal) {
        const showModal = (e) => {
            e.preventDefault();
            e.stopPropagation();
            logoutModal.classList.remove('hidden');
            logoutModal.classList.add('flex');
            
            // Close mobile sidebar if open
            const dashboardSidebar = document.getElementById('dashboardSidebar');
            const sidebarOverlay = document.getElementById('sidebarOverlay');
            if (window.innerWidth < 1024 && dashboardSidebar) {
                dashboardSidebar.classList.add('hidden');
                if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
            }

            setTimeout(() => {
                if (logoutModalContent) {
                    logoutModalContent.classList.remove('scale-95', 'opacity-0');
                    logoutModalContent.classList.add('scale-100', 'opacity-100');
                }
            }, 10);
        };

        const closeModal = (e) => {
            if (e) e.preventDefault();
            if (logoutModalContent) {
                logoutModalContent.classList.remove('scale-100', 'opacity-100');
                logoutModalContent.classList.add('scale-95', 'opacity-0');
            }
            setTimeout(() => {
                logoutModal.classList.remove('flex');
                logoutModal.classList.add('hidden');
            }, 200);
        };

        logoutBtn.addEventListener('click', showModal);

        if (cancelLogout) {
            cancelLogout.addEventListener('click', closeModal);
        }
        
        if (confirmLogout) {
            confirmLogout.addEventListener('click', () => {
                confirmLogout.innerHTML = '<i class="bi bi-hourglass-split animate-spin"></i> Logging out...';
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 800);
            });
        }

        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) closeModal();
        });
    }

    // Dashboard Mobile Sidebar Toggle
    const dashboardMobileMenuBtn = document.getElementById('dashboardMobileMenuBtn');
    const dashboardSidebar = document.getElementById('dashboardSidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (dashboardMobileMenuBtn && dashboardSidebar) {
        dashboardMobileMenuBtn.addEventListener('click', () => {
            dashboardSidebar.classList.toggle('hidden');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('hidden');
        });

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', () => {
                dashboardSidebar.classList.add('hidden');
                sidebarOverlay.classList.add('hidden');
            });
        }
    }

    // Profile Dropdown Toggle
    const profileDropdownBtn = document.getElementById('profileDropdownBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileDropdownBtn && profileDropdown) {
        profileDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileDropdownBtn.contains(e.target)) {
                profileDropdown.classList.add('hidden');
            }
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Hash-based navigation for SPA (Deep-linking)
    function handleHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const link = document.querySelector(`.sidebar-link[data-section="${hash}"]`);
            if (link) {
                link.click();
            }
        }
    }

    window.addEventListener('hashchange', handleHash);
    handleHash();
});
