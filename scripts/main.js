/* ==================== THEME TOGGLE ==================== */
const themeButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const darkTheme = 'dark-theme'; // This is actually handled by data-theme attribute, but we check preference
const iconMoon = 'fa-moon';
const iconSun = 'fa-sun';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
const getCurrentIcon = () => themeIcon.classList.contains(iconSun) ? iconSun : iconMoon;

// Validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.documentElement.setAttribute('data-theme', selectedTheme === 'dark' ? 'dark' : 'light');
  themeIcon.classList[selectedTheme === 'dark' ? 'add' : 'remove'](iconSun);
  themeIcon.classList[selectedTheme === 'dark' ? 'remove' : 'add'](iconMoon);
  
  // Fix icon logic: if dark mode, screen shows SUN (to switch to light). If light mode, shows MOON.
  if (selectedTheme === 'dark') {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
  } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
  }
} else {
    // Default to dark
    themeIcon.classList.add('fa-sun');
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    let savedTheme = 'light';
    
    if (current === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        savedTheme = 'light';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        savedTheme = 'dark';
    }

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', savedTheme);
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/* ==================== MOBILE MENU ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

// Remove menu when clicking a link
const navLink = document.querySelectorAll('.nav-link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
