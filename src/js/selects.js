import Choices from 'choices.js';

export default function Selects () {
  const SelectsForChoices = document.querySelectorAll('.js-selects-for-choices').forEach(select => {
    let select_settings = {
      position: 'bottom',
      searchEnabled: false,
      itemSelectText: '',
      classNames: {
        containerOuter: 'choices selects__choices',
        containerInner: 'choices__inner selects__choices-inner',
        list: 'choices__list selects__choices-list',
        item: 'choices__item selects__choices-item search-tours-form__select-option',
      },
    };


    if (select.getAttribute('id') === 'communication-way') {
      select_settings.callbackOnCreateTemplates = function (template) {
        return {
          item: (classNames, data) => {
            return template(`
              <div class="
                ${classNames.item}
                ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable} 
                ${data.placeholder ? classNames.placeholder : ''}"
                data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''} 
                ${data.disabled ? 'aria-disabled="true"' : ''}>
                ${!data.placeholder && data.value ? "<img src=img/icons/" + data.value + "-icn.svg>" : ""}
                <span class="chose__item-text">${data.label}</span>
              </div>
            `);
          },
          choice: (classNames, data) => {
            return template(`
              <div class="
                ${classNames.item} 
                ${classNames.itemChoice}
                ${data.disabled ? classNames.itemDisabled : classNames.itemSelectable}"
                data-select-text="${this.config.itemSelectText}" data-choice 
                ${data.disabled ? 'data-choice-disabled aria-disabled="true"': 'data-choice-selectable'} 
                data-id="${data.id}" data-value="${data.value}" ${data.groupId > 0 ? 'role="treeitem"' : 'role="option"'}>
                ${!data.placeholder && data.value  ? "<img src=img/icons/" + data.value + "-icn.svg>" : ""}
                <span class="choises__item-text">${data.label}</span>
              </div>
            `);
          },
        };
      };
    }

    const choices = new Choices(select, select_settings);

    select.addEventListener(
      'change',
      event => {
        const Choice = event.target.closest('.choices');
        Choice.classList.toggle('is-not-empty', event.detail.value !== "");
      },
      false,
    );
  });
}