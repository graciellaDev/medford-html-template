//calculation of the cost by default in the calculator
let patients = document.getElementById('patients'),
    coastAdmission = document.getElementById('coast'),
    numberDays = document.getElementById('number'),
    rangePatients = document.getElementById('range-patients'),
    rangeCoast = document.getElementById('range-coast'),
    rangeNumber = document.getElementById('range-number'),
    resultMultiplication = document.querySelector('.result'),
    screenWidth = window.screen.width

function multiplication(output, first, second, thirdth) {
    output.textContent = Number(first.value) * Number(second.value) * Number(thirdth.value) + ' руб'
}

function onInputInputCalculator(rangeInputEl, inputEl, resultEl) {
    rangeInputEl.addEventListener('input', function() {
        console.log(this.value)
        inputEl.value = this.value
        multiplication(resultMultiplication, patients, coastAdmission, numberDays)
    })
}

function addAttributeReadonly(elInput, nameAttribute) {
    if(!elInput.getAttribute(nameAttribute)){
        elInput.setAttribute(nameAttribute, '')
    }
}

function deleteAttributeReadonly(elInput, nameAttribute) {
    if(elInput.getAttribute(nameAttribute) === '' || elInput.getAttribute(nameAttribute)){
        elInput.removeAttribute(nameAttribute)
    }
}

if(screenWidth <= 768) {
    addAttributeReadonly(patients, 'readonly')
    addAttributeReadonly(coastAdmission, 'readonly')
    addAttributeReadonly(numberDays, 'readonly')
}

window.addEventListener('resize', () => {
    let newScreenWidth = Number(window.screen.width)
    if(newScreenWidth <= 768) {
        addAttributeReadonly(patients, 'readonly')
        addAttributeReadonly(coastAdmission, 'readonly')
        addAttributeReadonly(numberDays, 'readonly')
    }
    if(newScreenWidth > 768) {
        deleteAttributeReadonly(patients, 'readonly')
        deleteAttributeReadonly(coastAdmission, 'readonly')
        deleteAttributeReadonly(numberDays, 'readonly')
    }
})

multiplication(resultMultiplication, patients, coastAdmission, numberDays)
onInputInputCalculator(rangePatients, patients, resultMultiplication)
onInputInputCalculator(rangeCoast, coastAdmission, resultMultiplication)
onInputInputCalculator(rangeNumber, numberDays, resultMultiplication)


// accordion JQuery
// JQuery accordion
$(".accordion").accordion({
    heightStyle: "content",
    active: 1,
    collapsible: true
  });

// add background on accordion`s active item 
document.querySelectorAll('.accordion-title').forEach(function(el) {
    el.addEventListener('click', () => {
        if(!el.parentNode.classList.contains('accordion__item_bg-light-blue')){
            let activeAccordionItem = document.querySelector('.accordion__item_bg-light-blue')
            if(activeAccordionItem){
                activeAccordionItem.classList.remove('accordion__item_bg-light-blue')
            }
            el.parentNode.classList.add('accordion__item_bg-light-blue')
        }
        else {
            el.parentNode.classList.remove('accordion__item_bg-light-blue')
        }
        
    })
}) 

// add swiper on mob and delete on desktop
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

function activateEventsMobileSwiper(params, space) {
    const pagination = document.createElement("div");
    pagination.classList.add(params.paginationClassName);
    params.cardsContainer.append(pagination);
    params.cardsContainer.classList.add("swiper-container");
    params.cardsWrap.classList.add("swiper-wrapper");

    params.cardsSwiper = new Swiper(`.${params.cardsContainerName}`, {
      direction: 'horizontal',
      clickable: true,
      slidesPerView: 1,
      spaceBetween: space,

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

  function checkWindowWidthMobile(params, space) {
    const currentWidth = getWindowWidth();
   
    params.cardsContainer = document.querySelector(
      `.${params.cardsContainerName}`
    );
    params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

    if (
      currentWidth <= MOBILE_WIDTH &&
      (!params.cardsSwiper || params.cardsSwiper.destroyed)
    ) {
      
      activateEventsMobileSwiper(params, space);
    } else if (currentWidth > MOBILE_WIDTH && params.cardsSwiper) {
      destroyEventsMobileSwiper(params);
      
    }

  }

  const MOBILE_WIDTH = 768;
  const DESKTOP_WIDTH = 1023; 

  const servicesSwiperMobileParams = {
    cardsContainerName: "services__container",
    cardsWrapName: "services-list",
    card: "services-list__item"
  };

  const conditionsSwiperMobileParams = {
    cardsContainerName: "conditions__container",
    cardsWrapName: "icon-cards",
    card: "icon-cards__item"
  };

  checkWindowWidthMobile(servicesSwiperMobileParams, 10);
  checkWindowWidthMobile(conditionsSwiperMobileParams, 10);

  window.addEventListener("resize", function () {
    checkWindowWidthMobile(servicesSwiperMobileParams, 10);
    checkWindowWidthMobile(conditionsSwiperMobileParams, 10);
  });

  // open modal form
  let body = document.querySelector('body')
      modalForm = document.querySelector('.modal-form'),
      form = document.querySelector('.contact-form_modal')
      divCloseModalForm = document.querySelector('.contact-form__close'),
      buttonHeader = document.querySelector('.header__btn'),
      buttonHero = document.querySelector('.btn-hero')

function openModalForm(formClose) {
  body.classList.add('hidden')
  formClose.classList.remove('modal-form-none')
  setTimeout(function() {
    form.classList.remove('contact-form_right')
    setTimeout(function() {
      divCloseModalForm.classList.remove('contact-form__close_div-none')
    }, 300)
  }, 300)
  
}

buttonHeader.addEventListener('click', () => {
  openModalForm(modalForm)
})
buttonHero.addEventListener('click', () => {
  openModalForm(modalForm)
})

// close modal form
function closeModalForm(formOpen) {
  divCloseModalForm.classList.add('contact-form__close_div-none')
  setTimeout(function() {
    form.classList.add('contact-form_right')
    setTimeout(function() {
      body.classList.remove('hidden')
      formOpen.classList.add('modal-form-none')
    }, 300)
  }, 300)
  
}

divCloseModalForm.addEventListener('click', () => {
  closeModalForm(modalForm)
})

let overlay = document.querySelector('.modal-form')
overlay.addEventListener('click', function(event) {
  if(event.target.classList.contains('modal-form')){
    closeModalForm(modalForm)
  }
})

// open modal form for product



