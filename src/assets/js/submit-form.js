document.addEventListener('DOMContentLoaded', () => {
  window.Parsley.on('form:submit', function() {
    let Container = this.$element.closest('.js-submit-message')[0];
    
    if (Container) {
      form = Container.querySelector('form');

      Container.classList.add('js-success');

      window.setTimeout(()=>{
        Container.classList.remove('js-success');
        form.reset();
      }, 3000);

      return false;
    }
  });
});