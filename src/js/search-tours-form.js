import Choices from 'choices.js';
import moment from 'moment';
import daterangepicker from 'daterangepicker';
import accordionsFactory from './accordionsFactory';

moment.locale('ru');

function init() {
    const SearchToursForm = document.querySelector('.search-tours-form');
    if (!SearchToursForm) return;
    const DateRangeInput = SearchToursForm.querySelector('.search-tours-form__input--date-range');
    const SearchToursFormSelectInputs = Array.from(SearchToursForm.querySelectorAll('.search-tours-form__input--select'));
    let applyButton;

    let DatePickerIsShown = false;

    let date = new Date();
    date.setDate(date.getDate() + 7);

    const PickerOption = {
        // showDropdowns: true,
        // endDate: date,
        // minDate: new Date(),
        autoUpdateInput: false,
        buttonClasses: 'search-tours-form__date-button',
        applyButtonClasses: 'search-tours-form__date-button--apply',
        cancelButtonClasses: 'search-tours-form__date-button--cancel',
        locale: {
            lang: 'fr',
            format: 'D MMMM',
            separator: ' - ',
            applyLabel: 'Применить',
            cancelLabel: 'Сбросить',
            fromLabel: 'From',
            toLabel: 'To',
            customRangeLabel: 'Custom',
            weekLabel: 'W',
            daysOfWeek: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            firstDay: 1
        }
    };

    $(DateRangeInput).daterangepicker(PickerOption);

    $(DateRangeInput).on('show.daterangepicker', toggleDateRangeInput);
    $(DateRangeInput).on('hide.daterangepicker', toggleDateRangeInput);

    $(DateRangeInput).on('apply.daterangepicker', function(ev, picker) {
        $(this).val(picker.startDate.format('D MMMM') + ' - ' + picker.endDate.format('D MMMM'));
    });
  
    $(DateRangeInput).on('cancel.daterangepicker', function(ev, picker) {
        $(this).val('');
    });

    applyButton = document.querySelector('.search-tours-form__date-button--apply');

    if (DateRangeInput) {
        DateRangeInput.addEventListener('click', clickHandler);
    }

   

    function clickHandler(e) {
        if (!DatePickerIsShown) {
            return (DatePickerIsShown = !DatePickerIsShown);
        }

        applyButton.click();
    }

    function toggleDateRangeInput(ev, picker) {
        DatePickerIsShown = picker.isShowing;
        DateRangeInput.classList.toggle('calendar-shown');
    }

    window.tourFiltersSelects = [];

    SearchToursFormSelectInputs.forEach(input => {


        const options = {
            position: 'bottom',
            searchEnabled: false,
            itemSelectText: '',
            shouldSort: false,
            shouldSortItems: false,
            classNames: {
                containerOuter: 'choices search-tours-form__input--select',
                containerInner: 'choices__inner search-tours-form__input--select-inner',
                list: 'choices__list search-tours-form__select-option-list',
                item: 'choices__item search-tours-form__select-option'
            }
        }

        
        const choices = new Choices(input, options);

        window.tourFiltersSelects.push(choices);

        if (input) {
            input.addEventListener(
                'change',
                event => {
                    const input = event.target;
                    const formGroup = input.closest('.search-tours-form__group');
                    const placeholder = formGroup.querySelector('.search-tours-form__input-placeholder');
    
                    placeholder.classList.toggle('search-tours-form__input-placeholder--hidden', event.detail.value !== '');
                },
                false
            );
        }

        
    });

    date = null;
}

export default {
    init
};
