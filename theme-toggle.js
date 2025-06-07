// theme-toggle.js (Full logic with CSS-driven icon display)
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (!themeToggleBtn) {
        console.error("Theme toggle button ('theme-toggle') not found! Theme functionality will be disabled.");
        return;
    }

    // Icon elements (theme-toggle-dark-icon, theme-toggle-light-icon) are styled by CSS
    // based on the presence of the 'dark' class on the <html> element.
    // This script no longer directly manipulates their 'hidden' class.

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    function toggleTheme() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const newTheme = isDarkMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    // Initialize theme based on saved preference in localStorage or OS setting
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
        // console.log('Applied saved theme:', savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
        // console.log('Applied OS preference: dark');
    } else {
        applyTheme('light'); // Default to light
        // console.log('Applied default theme: light');
    }

    // Attach event listener to the button
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Listen for changes in OS preference (e.g., if OS theme changes while page is open)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Only apply OS preference if the user hasn't manually set (and saved) a theme
        if (!localStorage.getItem('theme')) {
            const newOsTheme = event.matches ? 'dark' : 'light';
            applyTheme(newOsTheme);
            // console.log('OS theme preference changed to:', newOsTheme);
        }
    });
});
