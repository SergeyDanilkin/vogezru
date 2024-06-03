document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.header__square-link').forEach(function(l){
        l.addEventListener('click', function(e){
            if(window.screen.width < 1280) {
                e.preventDefault();

                if(!l.parentNode.classList.contains('open')) {
                    document.querySelectorAll('.header__square').forEach(function(s){
                        s.classList.remove('open');
                        let sub = s.querySelector('.header__sub');
                        if(sub) {
                            sub.classList.add('dnone');
                        }
                    });

                    document.querySelector('body').classList.add('no-scroll');
                }
                else{
                    document.querySelector('body').classList.remove('no-scroll');
                }

                l.parentNode.classList.toggle('open');
                let sub = l.parentNode.querySelector('.header__sub');
                if(sub) {
                    sub.classList.toggle('dnone');
                }

                return false;
            }
        });
    });
    document.querySelectorAll('.parent').forEach(function(p){
        p.querySelector('.header__menu-item').addEventListener('click', function(e){
            e.preventDefault();
            p.classList.toggle('open');
            return false;
        });
    });


    let s = document.querySelector('[data-header-search]');
    if(s) {
        s.addEventListener('click', function(e){
            e.preventDefault();
            document.querySelector('header').classList.toggle('header-search');
            return false;
        });
    }
});