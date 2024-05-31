document.addEventListener('DOMContentLoaded', function(){
    let typeSliders = document.querySelectorAll('[data-slider="types"]');
    if (typeSliders.length > 0) {
        typeSliders.forEach(function(s){
            const sliderBanner = new Splide(s, {
                type: 'slide',
                perPage: 4,
                arrows: true,
                gap: 24,
                autoHeight: false,
                height: '100%',
                breakpoints: {
                    1024: {
                        perPage: 2,
                        arrows: false,
                        
                    },
                    767: {
                        gap: 0,
                        perPage: 1,
                        arrows: false,
                    },
                },
            })

            sliderBanner.mount()
        });
    }
});