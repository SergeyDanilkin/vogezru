document.addEventListener('DOMContentLoaded', function(){
    let typeSliders = document.querySelectorAll('[data-slider="types"]');
    if (typeSliders.length > 0) {
        typeSliders.forEach(function(s){
            const sliderBanner = new Splide(s, {
                type: 'loop',
                perPage: 4,
                arrows: true,
                gap: 24,
                breakpoints: {
                    1439: {
                        perPage: 3,
                        arrows: false,
                        
                    },                    
                    1024: {
                        perPage: 2,
                        arrows: false,
                        
                    },
                    767: {
                        gap: 24,
                        perPage: 1,
                        arrows: false,
                    },
                },
            })

            sliderBanner.mount()
        });
    }
});