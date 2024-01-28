/*================================================
*
* Name          : Andev Website
* Version       : 2.0
* Author        : Andev
* Author URL    : https://andev.us
*
* Table of Contents :
* 1.  Page Preloader
* 2.  Scroll Spy
* 3.  Scroll Animations
* 4.  Lightbox
* 5.  Sliders
* 6.  Masonry
* 7.  Google Maps
* 8.  Contact Form
*
================================================*/
"use strict";

var $body = $("body");

/*===============================================
  1. Page Preloader
===============================================*/
$(window).on("load", function () {
  $body.addClass("loaded");
});

if ($body.attr("data-preloader") === "light") {
  $body.append(
    $(
      "<div class='preloader'><div><svg class='loader-circular' viewBox='25 25 50 50'><circle class='loader-path' cx='50' cy='50' r='20'/></svg></div></div>"
    )
  );
}
if ($body.attr("data-preloader") === "dark") {
  $body.append(
    $(
      "<div class='preloader dark'><div><svg class='loader-circular' viewBox='25 25 50 50'><circle class='loader-path' cx='50' cy='50' r='20'/></svg></div></div>"
    )
  );
}
if ($body.attr("data-theme") === "dark") {
  $body.addClass("theme-dark");
}

/*===============================================
  2. Scroll Spy
===============================================*/
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: ".icon-menu",
});

/*===============================================
  3. Scroll Animations
===============================================*/
sal({
  duration: 500,
});

/*===============================================
  4. Lightbox
===============================================*/
//
// Lightbox - Image //
//
var $lightboxImage = $(".lightbox-image-link, .lightbox-image-box");

$lightboxImage.each(function () {
  var $this = $(this);
  $this.magnificPopup({
    type: "image",
    fixedContentPos: false,
    removalDelay: 200,
    closeOnContentClick: true,
    image: {
      titleSrc: "data-image-title",
    },
  });
});

/*===============================================
  5. Sliders
===============================================*/
$(".owl-carousel").each(function () {
  var $carousel = $(this);

  var $defaults = {
    rewind: true,
    navText: [
      "<i class='bi bi-arrow-left-short'></i>",
      "<i class='bi bi-arrow-right-short'></i>",
    ],
    autoHeight: true,
    autoplayTimeout: 4000,
    autoplaySpeed: 400,
    autoplayHoverPause: true,
    navSpeed: 300,
    dotsSpeed: 300,
  };

  var $options = {
    items: $carousel.data("owl-items"),
    margin: $carousel.data("owl-margin"),
    loop: $carousel.data("owl-loop"),
    center: $carousel.data("owl-center"),
    nav: $carousel.data("owl-nav"),
    rewind: $carousel.data("owl-rewind"),
    dots: $carousel.data("owl-dots"),
    autoplay: $carousel.data("owl-autoplay"),
  };

  var $responsive = {
    responsive: {
      0: {
        items: $carousel.data("owl-xs"),
      },
      576: {
        items: $carousel.data("owl-sm"),
      },
      768: {
        items: $carousel.data("owl-md"),
      },
      992: {
        items: $carousel.data("owl-lg"),
      },
      1200: {
        items: $carousel.data("owl-xl"),
      },
    },
  };

  if ($carousel.hasClass("portfolio-slider")) {
    var $portfolioCarousel = {
      items: 1,
      URLhashListener: true,
      startPosition: "URLHash",
    };
  }

  $carousel.owlCarousel(
    $.extend($defaults, $options, $responsive, $portfolioCarousel)
  );

  var customPrev = $("#customPrev");
  var customNext = $("#customNext");

  customNext.on("click", function () {
    $carousel.trigger("next.owl.carousel", [300]);
  });
  customPrev.on("click", function () {
    $carousel.trigger("prev.owl.carousel", [300]);
  });
});

/*===============================================
  6. Masonry
===============================================*/
var $masonryGrid = $(".masonry").imagesLoaded(function () {
  $masonryGrid.masonry({
    itemSelector: ".masonry-item",
  });
});

/*===============================================
  7. Contact Form
===============================================*/
$("#contactform").on("submit", function (e) {
  e.preventDefault();

  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();
  var isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email); // Validar formato de e-mail
  var forms = $("#contactform input, #contactform textarea");

  // Limpar mensagens anteriores
  $("#success, #error").removeClass("show-result");

  // Resetar campos com erro-color
  forms.removeClass("error-color");
  
  if (name === "") {
    $("#name").addClass("error-color");
  }
  if (email === "" || !isValidEmail) {
    $("#email").addClass("error-color");
  }
  if (subject === "") {
    $("#subject").addClass("error-color");
  }
  if (message === "") {
    $("#message").addClass("error-color");
  }

  // Verificar se todos os campos são válidos antes de enviar
  if (name && isValidEmail && subject && message) {
    // Desativar o botão de envio para evitar múltiplos envios
    $("#contactform :submit").prop("disabled", true);

    $.ajax({
      url: "../assets/php/mail.php",
      data: $(this).serialize(),
      type: "POST",
      success: function (data) {
        $("#success").addClass("show-result"); // Mostrar mensagem de sucesso
        $("#contactform").each(function () {
          this.reset();
        });
        $("#contactform :submit").prop("disabled", false); // Reativar o botão de envio
      },
      error: function (data) {
        $("#error").addClass("show-result"); // Mostrar mensagem de erro
        $("#contactform :submit").prop("disabled", false); // Reativar o botão de envio
      },
    });
  }
});

// Remover a classe 'error-color' quando o usuário começa a digitar
$("#contactform input, #contactform textarea").on("input", function() {
  if ($(this).hasClass("error-color")) {
    $(this).removeClass("error-color");
  }
});



function decryptEffect(element) {
  const texts = element.dataset.texts.split(",");
  let textIndex = 0;

  function animateText(originalText) {
      const duration = 100;
      const phases = 3;
      let index = 0;
      let phaseCount = 0;

      function randomChar() {
          const chars = "abcdefghijklmnopqrstuvwxyz";
          return chars.charAt(Math.floor(Math.random() * chars.length));
      }

      function reEncrypt() {
          if(index > 0) {
              element.textContent = 
                  element.textContent.substring(0, index - 1) +
                  randomChar() + 
                  Array.from({ length: originalText.length - index + 1 }, () =>
                      randomChar()
                  ).join("");
              index--;
              setTimeout(reEncrypt, duration);
          } else {
              // Se não há mais textos, reinicie textIndex para 0
              if (++textIndex >= texts.length) {
                  textIndex = 0;
              }
              setTimeout(() => animateText(texts[textIndex]), duration);
          }
      }

      function update() {
          if (index < originalText.length) {
              if (phaseCount < phases) {
                  element.textContent =
                      element.textContent.substring(0, index) +
                      randomChar() +
                      Array.from({ length: originalText.length - index - 1 }, () =>
                          randomChar()
                      ).join("");
                  phaseCount++;
                  setTimeout(update, duration);
              } else {
                  element.textContent =
                      element.textContent.substring(0, index) +
                      originalText[index] +
                      Array.from({ length: originalText.length - index - 1 }, () =>
                          randomChar()
                      ).join("");
                  index++;
                  phaseCount = 0;
                  setTimeout(update, duration);
              }
          } else {
              setTimeout(reEncrypt, 2000);
          }
      }

      element.textContent = Array.from({ length: originalText.length }, () =>
          randomChar()
      ).join("");
      setTimeout(update, duration);
  }

  animateText(texts[textIndex]);
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener('DOMContentLoaded', (event) => {
  const elementsToDecrypt = document.querySelectorAll('.text-decrypt');

  function checkAndDecrypt() {
      elementsToDecrypt.forEach(element => {
          if (isInViewport(element) && !element.dataset.decrypted) {
              element.dataset.decrypted = 'true'; // Marque como descriptografado, mas ainda assim permita o loop
              decryptEffect(element);
          }
      });
  }

  window.addEventListener('scroll', checkAndDecrypt);
  checkAndDecrypt();
});

function typeEffect(element) {
  const texts = element.dataset.texts.split(",");
  let textIndex = 0;

  function animateText(originalText) {
      const duration = 1;
      const phases = 1;
      let index = 0;
      let phaseCount = 0;

      function randomChar() {
          const chars = "";
          return chars.charAt(Math.floor(Math.random() * chars.length));
      }

      function reType() {
          if(index > 0) {
              element.textContent = 
                  element.textContent.substring(0, index - 1) + "<" +
                  randomChar() + 
                  Array.from({ length: originalText.length - index + 1 }, () =>
                      randomChar()
                  ).join("");
              index--;
              setTimeout(reType, duration/2);
          } else {
              // Se não há mais textos, reinicie textIndex para 0
              if (++textIndex >= texts.length) {
                  textIndex = 0;
              }
              setTimeout(() => animateText(texts[textIndex]), duration);
          }
      }

      function update() {
          if (index < originalText.length) {
              if (phaseCount < phases) {
                  element.textContent =
                      element.textContent.substring(0, index) + ">" +
                      randomChar() +
                      Array.from({ length: originalText.length - index - 1 }, () =>
                          randomChar()
                      ).join("");
                  phaseCount++;
                  setTimeout(update, duration);
              } else {
                  element.textContent =
                      element.textContent.substring(0, index) +
                      originalText[index] +
                      Array.from({ length: originalText.length - index - 1 }, () =>
                          randomChar()
                      ).join("");
                  index++;
                  phaseCount = 0;
                  setTimeout(update, duration);
              }
          } else {
              setTimeout(reType, 2000);
          }
      }

      element.textContent = Array.from({ length: originalText.length }, () =>
          randomChar()
      ).join("");
      setTimeout(update, duration);
  }

  animateText(texts[textIndex]);
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

document.addEventListener('DOMContentLoaded', (event) => {
  const elementsToDecrypt = document.querySelectorAll('.text-type');

  function checkAndDecrypt() {
      elementsToDecrypt.forEach(element => {
          if (isInViewport(element) && !element.dataset.decrypted) {
              element.dataset.decrypted = 'true'; // Marque como descriptografado, mas ainda assim permita o loop
              typeEffect(element);
          }
      });
  }

  window.addEventListener('scroll', checkAndDecrypt);
  checkAndDecrypt();
});