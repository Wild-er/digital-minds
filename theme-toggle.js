// theme-toggle.js
document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // If any of these critical elements don't exist, log an error and don't proceed.
    // This helps in debugging if IDs in HTML don't match.
    if (!themeToggleBtn) {
        console.error("Theme toggle button ('theme-toggle') not found!");
        return;
    }
    if (!themeToggleDarkIcon) {
        console.error("Theme toggle dark icon ('theme-toggle-dark-icon') not found!");
        // We might still want the button to work, but icon switching will fail.
        // Depending on desired robustness, we could return here or allow partial functionality.
    }
    if (!themeToggleLightIcon) {
        console.error("Theme toggle light icon ('theme-toggle-light-icon') not found!");
    }

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

    function toggleTheme() {
        const isDarkMode = document.documentElement.classList.contains('dark');
        const newTheme = isDarkMode ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    }

    // Initialize theme based on saved preference or OS setting
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (prefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light'); // Default to light
    }

    // Attach event listener to the button
    themeToggleBtn.addEventListener('click', toggleTheme);

    // Listen for changes in OS preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        // Only apply OS preference if the user hasn't manually set a theme
        if (!localStorage.getItem('theme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
});
