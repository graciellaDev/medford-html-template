(() => {
  const MOBILE_WIDTH = 768;
  const DESKTOP_WIDTH = 1023;
  const btn = document.querySelector(".btn-load-more");

  const eventsSwiperMobileParams = {
    paginationClassName: "products-pagination",
    cardsContainerName: "catalog-swiper",
    cardsWrapName: "products",
    card: "products__card",
    hiddenClass: "display-none"
  };

  function getWindowWidth() {
    return Math.max(
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.body.clientWidth,
      document.documentElement.clientWidth
    );
  }

  function activateEventsMobileSwiper(params) {
    const pagination = document.createElement("div");
    pagination.classList.add(params.paginationClassName);
    params.cardsContainer.append(pagination);
    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");
    if(document.querySelector('.' + params.cardsWrapName).classList.contains('grid'))
    document.querySelector('.' + params.cardsWrapName).classList.remove('grid')

    params.cardsSwiper = new Swiper(`.${params.cardsContainerName}`, {
      direction: 'horizontal',
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: {
        el: `.${params.cardsContainerName} .${params.paginationClassName}`,
        type: 'bullets',
        clickable: true,
        bulletClass: 'products-pagination__bullet swiper-pagination-bullet',
        bulletActiveClass: 'products-pagination__bullet_active swiper-pagination-bullet-active'
      },

      on: {
        beforeInit() {
          document.querySelectorAll(`.${params.card}`).forEach((el) => {
            el.classList.add("swiper-slide");
          });
        },

        beforeDestroy() {
          this.slides.forEach((el) => {
            el.classList.remove("swiper-slide");
            el.removeAttribute("role");
            el.removeAttribute("aria-label");
          });

          this.pagination.el.remove();
        }
      }
    });
  }

  function destroyEventsMobileSwiper(params) {
    params.cardsSwiper.destroy();
    params.cardsContainer.classList.remove("swiper-container");
    params.cardsWrap.classList.remove("swiper-wrapper");
    params.cardsWrap.removeAttribute("aria-live");
    params.cardsWrap.removeAttribute("id");
  }

  function setHiddenCards(params, windowWidth) {
    const cards = document.querySelectorAll(`.${params.card}`);
    let quantity = cards.length;

    if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
      quantity = 2;
    }

    if (windowWidth >= DESKTOP_WIDTH) {
      quantity = 4;
    }

    cards.forEach((card, i) => {
      card.classList.remove(params.hiddenClass);
      if (i >= quantity) {
        card.classList.add(params.hiddenClass);
      }
    });
  }

  function showCards(e) {
    const cards = document.querySelectorAll(`.${eventsSwiperMobileParams.card}`);

    e.target.style = "display: none";

    cards.forEach((card) => {
      card.classList.remove(eventsSwiperMobileParams.hiddenClass);
    });
  }

  function checkWindowWidthMobile(params) {
    const currentWidth = getWindowWidth();
    let containerSwiper = document.querySelector('.' + params.cardsWrapName)
    btn.style = "";
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth <= MOBILE_WIDTH &&
      (!params.cardsSwiper || params.cardsSwiper.destroyed)
    ) {
      if(containerSwiper.classList.contains('grid')){
        containerSwiper.classList.remove('grid')
      }
      activateEventsMobileSwiper(params);
    } else if (currentWidth > MOBILE_WIDTH && params.cardsSwiper) {
      destroyEventsMobileSwiper(params);
      if(!containerSwiper.classList.contains('grid')){
        containerSwiper.classList.add('grid')
      }
    }

    setHiddenCards(params, currentWidth);
  }

  checkWindowWidthMobile(eventsSwiperMobileParams);
  btn.addEventListener("click", showCards);

  window.addEventListener("resize", function () {
    checkWindowWidthMobile(eventsSwiperMobileParams);
  });
})();
