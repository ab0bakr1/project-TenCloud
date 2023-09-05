const BtnMenu = document.getElementById('btn-menu');
const NavMenu = document.getElementById('nav-menu');
const header = document.getElementById('header');

BtnMenu.addEventListener('click', () => {
    BtnMenu.classList.toggle("active");
    NavMenu.classList.toggle('active');
})

document.querySelectorAll(".nav-link").forEach(n =>n.addEventListener('click', ()=> {
    BtnMenu.classList.remove("active");
    NavMenu.classList.remove("active");    
}));
(function() {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  };
  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  };
  if(header){
    window.addEventListener('scroll', () => {
        if (scrollY > 100) {
            header.style.backgroundColor = "rgba(0, 0, 0, 0.8";
            header.style.transition="all 0.5s ease";
        } else {
            header.style.backgroundColor = "transparent";
        }
    });
    new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 40
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 60
          },
          992: {
            slidesPerView: 5,
            spaceBetween: 120
          }
        }
      }
    )
  };
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-fit')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });
})();  
function validate(){
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;
  let errorMessage = document.getElementById("error-message");
  let sentMessage = document.getElementById("sent-message");
  errorMessage.style.padding = "10px";
  sentMessage.style.padding = "10px";
  let text;
  if (name.length < 1){
    sentMessage.style.display="none";
    text = "Please enter your name";
    errorMessage.style.display="block";
    errorMessage.innerHTML = text;
    return false;
  }
  if (email.length < 1, !email.includes("@"), !email.includes(".")){
    sentMessage.style.display="none";
    text = "Please enter your email";
    errorMessage.style.display="block";
    errorMessage.innerHTML = text;
    return false;
  }
  if (subject.length < 1){
    text = "Please enter your subject";
    sentMessage.style.display="none";
    errorMessage.style.display="block";
    errorMessage.innerHTML = text;
    return false;
  }
  if (message.length < 1){
    sentMessage.style.display="none";
    errorMessage.style.display="block";
    text = "Please enter your message";
    errorMessage.innerHTML = text;
    return false;
  }
  else {
    errorMessage.style.display="none";
    text = "Your message has been sent. Thank you";
    sentMessage.style.display="block"
    sentMessage.innerHTML = text;
    return false;
  };
};

