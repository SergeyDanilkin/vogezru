document.addEventListener('DOMContentLoaded', function(){
    initSpoiler();
});
window.addEventListener('resize', function(event){
    initSpoiler();
});

function initSpoiler() {
    document.querySelectorAll('[data-spoiler]').forEach(function(b) {
        if(b.querySelector('p').clientHeight > 100) {
            b.classList.add('hide');

            let btn = b.querySelector('span[data-close-text]');

            btn.innerText = btn.dataset.openText;


            b.querySelector('span[data-close-text]').addEventListener('click', function (e) {
                e.preventDefault();

                b.classList.toggle('hide');
                b.classList.toggle('open');

                if(b.classList.contains('open')) {
                    btn.innerText = btn.dataset.closeText;
                }
                else {
                    btn.innerText = btn.dataset.openText;
                    
                }

                return false;
            });
        }
        else{
            b.classList.remove('hide');
            b.classList.remove('open');
        }
    });
}

