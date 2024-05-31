document.addEventListener('DOMContentLoaded', function(){
    let mainSlider = document.querySelector('[data-slider="main-banner"]');
    if (mainSlider) {

            const sliderBanner = new Splide(mainSlider, {
                type: 'fade',
                perPage: 1,
                arrows: true,
                breakpoints: {
                    767: {
                        arrows: false,
                    },
                },
            })

            sliderBanner.mount()


    }
});