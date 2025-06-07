// theme-toggle.js
(function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add('hidden');
            if (themeToggleLightIcon) themeToggleLightIcon.classList.remove('hidden');
        }
    }

    // Function to toggle theme
    function toggleTheme() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const newTheme = isDarkMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    // Check OS-level preference if no saved theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default to light if no preference
    }

    // Event listener for the toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Listen for changes in OS preference (optional, but good for dynamic changes)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (!localStorage.getItem('theme')) { // Only if user hasn't set a preference
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
})();
