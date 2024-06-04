document.addEventListener('DOMContentLoaded', function(){
    let mainSlider = document.querySelector('[data-slider="main-banner"]');
    if (mainSlider) {

            const sliderBanner = new Splide(mainSlider, {
                type: 'loop',
                perPage: 1,
                arrows: true,
                gap:24,
                breakpoints: {
                    1023: {
                        arrows: false,
                    },
                    767: {
                        arrows: false,
                    },
                },
            })

            sliderBanner.on( 'mounted', function () {
                let activeSlide = sliderBanner.Components.Elements.slides[0];
                calcMainSliderArrows(activeSlide);
            });

            sliderBanner.on( 'resized', function (index) {
                let activeSlide = sliderBanner.Components.Elements.slides[sliderBanner.index];
                calcMainSliderArrows(activeSlide);
            });


            sliderBanner.on( 'moved', function (newIndex, prevIndex, destIndex) {
                let activeSlide = sliderBanner.Components.Elements.slides[newIndex];
                calcMainSliderArrows(activeSlide);
            });

            sliderBanner.mount()

    }
});

function calcMainSliderArrows(slide) {
    let left = 0;
    let arrows = document.querySelector('[data-slider="main-banner"]').querySelector('.splide__arrows');
    if(arrows) {
        let btns = slide.querySelector('.mainslider__btns');
        if(btns) {
            let a = btns.querySelector('a');
            if(a) {
                arrows.style.left = a.clientWidth+'px';
            }
        }
    }

}