document.addEventListener('DOMContentLoaded', () => {

    // --- Різдвяний таймер ---
    const currentYear = new Date().getFullYear();
    const christmasDate = new Date(`December 25, ${currentYear} 00:00:00`).getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const gap = christmasDate - now;

        if (gap < 0) {
            const promoElement = document.querySelector('.christmas-promo');
            if (promoElement) { // Перевірка, чи елемент існує
                promoElement.innerHTML = '<div class="promo-title">🎄 З Різдвом Христовим! 🎄</div>';
            }
            return;
        }

        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const d = Math.floor(gap / day);
        const h = Math.floor((gap % day) / hour);
        const m = Math.floor((gap % hour) / minute);
        const s = Math.floor((gap % minute) / second);

        document.getElementById('days').innerText = d < 10 ? '0' + d : d;
        document.getElementById('hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0' + m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0' + s : s;
    }

    // Запускаємо таймер одразу та кожну секунду
    updateTimer();
    setInterval(updateTimer, 1000);


    // --- Логіка мобільного меню ---
    const navSlide = () => {
        const burger = document.querySelector('.hamburger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            burger.classList.toggle('toggle');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            });
        });
    }
    navSlide(); // Викликаємо функцію мобільного меню


    // --- Логіка великого слайдера "Про нас" ---
    const initAboutSlider = () => {
        const wrapper = document.querySelector('.slider-wrapper');
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        let slideIndex = 0;
        const totalSlides = slides.length;

        const showSlide = (index) => {
            if (index < 0) {
                slideIndex = totalSlides - 1;
            } else if (index >= totalSlides) {
                slideIndex = 0;
            } else {
                slideIndex = index;
            }
            wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
        };

        prevBtn.addEventListener('click', () => {
            showSlide(slideIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            showSlide(slideIndex + 1);
        });

        setInterval(() => {
            showSlide(slideIndex + 1);
        }, 5000);
    };
    initAboutSlider(); // Викликаємо функцію слайдера "Про нас"


    // --- Логіка Слайдерів для кожного товару ---
    const productSliders = {};

    document.querySelectorAll('.product-slider-wrapper').forEach(wrapper => {
        const productId = wrapper.dataset.productId;
        const slides = wrapper.querySelectorAll('.product-slide');

        let currentSlideIndex = 0;
        const totalSlides = slides.length;

        productSliders[productId] = {
            currentSlideIndex: currentSlideIndex,
            totalSlides: totalSlides,
            wrapper: wrapper
        };
    });

    const showProductSlide = (productId, direction) => {
        const sliderData = productSliders[productId];
        if (!sliderData) return;

        sliderData.currentSlideIndex += direction;

        if (sliderData.currentSlideIndex < 0) {
            sliderData.currentSlideIndex = sliderData.totalSlides - 1;
        } else if (sliderData.currentSlideIndex >= sliderData.totalSlides) {
            sliderData.currentSlideIndex = 0;
        }

        sliderData.wrapper.style.transform = `translateX(-${sliderData.currentSlideIndex * 100}%)`;
    };

    document.querySelectorAll('.prev-prod-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            showProductSlide(productId, -1);
        });
    });

    document.querySelectorAll('.next-prod-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            showProductSlide(productId, 1);
        });
    });

}); // Кінець DOMContentLoaded

// --- Ці функції знаходяться ПОЗА DOMContentLoaded, бо вони викликаються з HTML (onclick) ---

// Функція вибору товару та прокрутки до форми
function selectProduct(productId) {
    const selectBox = document.getElementById('product-select');
    if(selectBox) {
        selectBox.value = productId;
    }
    const orderSection = document.getElementById('order');
    orderSection.scrollIntoView({ behavior: 'smooth' });
}

// Функція для кнопки "Інформація" (i)
function toggleInfo(element) {
    const overlay = element.parentElement.querySelector('.info-overlay');
    overlay.classList.toggle('show');
}
