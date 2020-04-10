window.addEventListener('scroll', stickyMobile);

function stickyMobile() {
    if (document.body.clientWidth < 768) {
        console.log(window.scrollY, window.innerHeight);

        if (window.scrollY > (window.innerHeight - 140)) {
            // On fixe le premier encart
            document.querySelector('.left__menu--top').style.position = "fixed";
            document.querySelector('.left__menu--top').style.width = "calc(100vw - 40px)";
            document.querySelector('.left__menu--top').style.marginTop = "calc(-100vh + 160px)";
            document.querySelector('.left__menu--bottom').style.marginTop = (window.innerHeight - 60) + "px";
        }

        if (window.scrollY < (window.innerHeight * 2 - 140)) {
            // On voit le deuxième encart en entier
            document.querySelector('.left__menu--bottom').style.position = "relative";
            document.querySelector('.left__menu--bottom').style.width = "100%";
        }

        if (window.scrollY < (window.innerHeight - 140)) {
            // On voit le premier encart
            document.querySelector('.left__menu--top').style.position = "relative";
            document.querySelector('.left__menu--top').style.width = "100%";
            document.querySelector('.left__menu--top').style.marginTop = "20px";
            document.querySelector('.left__menu--bottom').style.marginTop = "30px";
        }

        if (window.scrollY > (window.innerHeight * 1.9 - 255)) {
            // On range le deuxième encart
            document.querySelector('.left__menu--bottom').style.position = "fixed";
            document.querySelector('.left__menu--bottom').style.width = "calc(100vw - 40px)";
            document.querySelector('.left__menu--bottom').style.marginTop = "calc(-91vh + 195px)";
        }
    }
}