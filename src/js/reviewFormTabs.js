export default function ReviewFormTabs() {
    const reviewForms = Array.from(document.querySelectorAll('.modal__form'));

    reviewForms.forEach(reviewForm => {
        const tabsNav = Array.from(reviewForm.querySelectorAll('.modal__form-upload-files-checkbox-input'));
        const tabsItems = Array.from(reviewForm.querySelectorAll('.modal__form-upload-files-tabs-item'));

        let activeIndex = 0;

        const setActiveTab = index => {
            tabsNav.forEach(box => box.checked = false);
            tabsItems.forEach(item => item.classList.remove('active'));

            tabsNav[index].checked = true;
            tabsItems[index].classList.add('active');

            activeIndex = index;
        }

        setActiveTab(activeIndex);

        tabsNav.forEach((box, boxIndex) => {
            box.addEventListener('change', event => {
                setActiveTab(boxIndex);
            })
        })

    })
}