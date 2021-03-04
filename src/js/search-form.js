export default function Searchform () {
  let searchFormIsEnable = false;

  const SearchForm = document.querySelector('.page-header__search-form');

  if (typeof SearchForm === 'undefined' || !SearchForm) {
    return;
  }

  const Input = SearchForm.querySelector('.page-header__search-form-input');
  const SubmitButton = SearchForm.querySelector('.js-header-search-form-button');
  const PhoneNumber = document.querySelector('.page-header__phone-number');
  const MenuButton = document.querySelector('.page-header__menu-button');
  const LogoText = document.querySelector('.page-header__logo-link-text');

  document.body.addEventListener('click', clickHandler);

  function getClosestButtonOrForm (elem) {
    if (elem === SubmitButton) return elem;
    if (elem === SearchForm) return elem;
    
    while(elem = elem.parentElement) {
      if (elem === SubmitButton) return elem;
      if (elem === SearchForm) return elem;
    }
  }

  function clickHandler (event) {
    let target = getClosestButtonOrForm(event.target);

    if (target === SubmitButton) {
      return submitButtonHandler(event);
    }
    
    if (target === SearchForm) return;

    disableSearchForm();
  }

  function submitButtonHandler (event) {
    if (Input.value !== "") return;

    event.preventDefault();
    if (searchFormIsEnable) {
      return disableSearchForm(); 
    }
    enableSearchForm();
  }

  function enableSearchForm () {
    searchFormIsEnable = true;

    toggleForm(true);
    Input.focus();
  }

  function disableSearchForm () {
    searchFormIsEnable = false;
    Input.value = "";

    toggleForm(false);
  }

  function toggleForm (enable) {
    SearchForm.classList.toggle('page-header__search-form-active', enable);

    MenuButton.classList.toggle('page-header__phone-number--fadeout', enable);

    LogoText.classList.toggle('page-header__logo-link-text--fadeout', enable);

    if (window.matchMedia('(max-width: 1600px)').matches) {
      PhoneNumber.classList.toggle('page-header__phone-number--fadeout', enable);
    }
  }
}