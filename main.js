// Folio — Client JS
 
// Auto-grow textareas
document.querySelectorAll('.field-textarea').forEach(ta => {
  const resize = () => {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };
  ta.addEventListener('input', resize);
  // Run once on load
  if (ta.value) resize();
});
 
// Char counter for title (optional UX touch)
const titleInput = document.querySelector('#title');
if (titleInput) {
  titleInput.addEventListener('input', () => {
    const max = parseInt(titleInput.getAttribute('maxlength') || '200');
    const remaining = max - titleInput.value.length;
    let counter = titleInput.parentElement.querySelector('.char-counter');
    if (!counter) {
      counter = document.createElement('span');
      counter.className = 'field-hint char-counter';
      titleInput.parentElement.appendChild(counter);
    }
    counter.textContent = remaining < 40 ? `${remaining} characters remaining` : '';
  });
}
 
// Smooth page transitions (fade out before navigate)
document.querySelectorAll('a:not([href^="#"]):not([href^="mailto"]):not([target])').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('javascript')) return;
    // Let default forms work
  });
});