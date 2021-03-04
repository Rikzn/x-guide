import accordionsFactory from './accordionsFactory';

export default function Accordions () {
    const AccordionsInstances = [];

    AccordionsInstances.length && AccordionsInstances.forEach((inst) => {
        typeof inst.destroy === 'function' && inst.destroy();
    });

    document.querySelectorAll('.js-accordion').forEach(createAccordion);

    function createAccordion (accordion) {
        let factory = null;
        const initializeMainAccordion = () => {
            if (factory) {
                factory.destroy();
                factory = null;
            }

            factory = accordionsFactory(Array.from(accordion.querySelectorAll('.js-accordion-item')));

            factory.init();
        };

        initializeMainAccordion();

        AccordionsInstances.push(factory);
    }
}