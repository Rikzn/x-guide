import { gsap } from 'gsap';

let instances = [];

function init() {
    const tabs = Array.from(document.querySelectorAll('.js-tabs'));

    tabs.forEach(element => {
        const tabsNav = Array.from(element.querySelectorAll('.js-tabs-nav'));

        const tabItems = Array.from(element.querySelectorAll('.js-tabs-item'));

        if (!tabsNav.length || !tabItems.length) return;

        




        function setActiveTab(index, event) {
            if (event) event.preventDefault();

            /* const heightBefore = parseFloat(window.getComputedStyle(element).getPropertyValue('height'));

            gsap.set(element, {
                height: 'auto'
            }); */

            tabsNav.forEach(btn => btn.classList.remove('active'));
            tabItems.forEach(item => item.classList.remove('active'));
            tabsNav[index].classList.add('active');
            tabItems[index].classList.add('active');

            /* const heightAfter = parseFloat(window.getComputedStyle(element).getPropertyValue('height'));

            gsap.fromTo(
                element,
                { height: heightBefore },
                {
                    duration: .4,
                    height: heightAfter,
                    clearProps: 'all' 
                }
            ); */
        }

        tabsNav.forEach((btn, btnIndex) => {
            const handler = setActiveTab.bind(btn, btnIndex);
            btn.addEventListener('click', handler);

            const instance = {
                btn,
                handler
            };

            instances.push(instance);
        });

        setActiveTab(0);
    });
}

function destroy() {
    instances.forEach(instance => {
        instance.btn.removeEventListener('click', instance.handler);
    });
    instances = [];
}

// mouseover
    
    var ratingsTabs = Array.prototype.slice.call(document.querySelectorAll('.js-equipment-tabs'));

  ratingsTabs.forEach(function(element) {
    var links = Array.prototype.slice.call(element.querySelectorAll('.company-ratings__tabs-nav-link'));
    var items = Array.prototype.slice.call(element.querySelectorAll('.company-ratings__tabs-item'));

    if (links.length !== items.length) {
      console.error('Not equal amount of elements');
      return;
    }

    function setActiveTab(index) {
      links.forEach(function(link) {
        link.classList.remove('active');
      })
      items.forEach(function(item) {
        item.classList.remove('active');
      })

      links[index].classList.add('active');
      items[index].classList.add('active');
    }

    links.forEach(function(link, linkIndex) {
      link.addEventListener('mouseover', function(event) {
        event.preventDefault();
        setActiveTab(linkIndex)
      })
    })

    setActiveTab(0);
  })


export default {
    init,
    destroy
};

