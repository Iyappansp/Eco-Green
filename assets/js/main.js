// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

function updateThemeIcon(theme) {
  if (!themeIcon) return;
  if (theme === 'light') {
    themeIcon.classList.remove('bi-moon-stars');
    themeIcon.classList.add('bi-sun');
  } else {
    themeIcon.classList.remove('bi-sun');
    themeIcon.classList.add('bi-moon-stars');
  }
}

// Check saved theme or default to dark (as current UI is dark)
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

// Mobile Menu logic (as seen in some files)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Logout Modal Logic
const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');

if (logoutBtn && logoutModal) {
  const showModal = (e) => {
    e.preventDefault();
    logoutModal.classList.remove('hidden');
    logoutModal.classList.add('flex');
    setTimeout(() => {
        document.getElementById('logoutModalContent').classList.remove('scale-95', 'opacity-0');
        document.getElementById('logoutModalContent').classList.add('scale-100', 'opacity-100');
    }, 10);
  };

  logoutBtn.addEventListener('click', showModal);

  const closeModal = () => {
    document.getElementById('logoutModalContent').classList.remove('scale-100', 'opacity-100');
    document.getElementById('logoutModalContent').classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        logoutModal.classList.remove('flex');
        logoutModal.classList.add('hidden');
    }, 200);
  };

  cancelLogout.addEventListener('click', closeModal);
  
  confirmLogout.addEventListener('click', () => {
    confirmLogout.innerHTML = '<i class="bi bi-hourglass-split animate-spin"></i> Logging out...';
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
  });

  logoutModal.addEventListener('click', (e) => {
    if (e.target === logoutModal) closeModal();
  });
}


// Profile Dropdown Logic
const profileDropdownBtn = document.getElementById('profileDropdownBtn');
const profileDropdown = document.getElementById('profileDropdown');

if (profileDropdownBtn && profileDropdown) {
    profileDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
        if (!profileDropdown.contains(e.target) && !profileDropdownBtn.contains(e.target)) {
            profileDropdown.classList.add('hidden');
        }
    });
}
