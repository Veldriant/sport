var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    breakpoints: {
      1200:{
          slidesPerView: 4
      },
      990:{
          slidesPerView: 3.5
      },
      0:{
        slidesPerView: 1.5
      },
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    

$(document).ready(function(){
    $(".button-mob a").click(function(){
        $(".overlay").fadeToggle(200);
       $(this).toggleClass('btn-open').toggleClass('btn-close');
    });
});
$('.overlay').on('click', function(){
    $(".overlay").fadeToggle(200);   
    $(".button-mob a").toggleClass('btn-open').toggleClass('btn-close');
    open = false;
});