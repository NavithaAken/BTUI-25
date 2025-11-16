(function() {
  "use strict";

  
  const body = document.querySelector('body');
  const mobileNavToggleButton = document.querySelector('.mobile-nav-toggle'); 
  const navMenu = document.querySelector('#navmenu');

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    mobileNavToggleButton.classList.toggle('bi-list');
    mobileNavToggleButton.classList.toggle('bi-x');
  }

  
  if (mobileNavToggleButton) {
    mobileNavToggleButton.addEventListener('click', function(e) {
      e.preventDefault();
      mobileNavToggle();
    });
  }

  function toggleScrolled() {
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? body.classList.add('scrolled') : body.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  document.querySelectorAll('#navmenu a').forEach(link => {
    link.addEventListener('click', () => {
      
      if (body.classList.contains('mobile-nav-active') && typeof mobileNavToggle === 'function') {
        mobileNavToggle();
      }
    });
  });

  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);


  new PureCounter();

  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

})();



const countdownDate = new Date("December 18, 2025 14:00:00").getTime();

const timer = setInterval(function() {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (document.getElementById("days")) document.getElementById("days").textContent = days.toString().padStart(2, "0");
  if (document.getElementById("hours")) document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  if (document.getElementById("minutes")) document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  if (document.getElementById("seconds")) document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");

  if (distance < 0) {
    clearInterval(timer);
    if (document.getElementById("countdown-timer")) {
      document.getElementById("countdown-timer").innerHTML = `
        <h2 class="countdown-finish">PULZ'25 Has begun!</h2>
      `;
    }
  }

}, 1000);


let currentDate = new Date();

const events = {
  "2025-12-18": "Anual ICT Day",
  "2026-01-25": "Environmental Challenge",
  "2026-02-10": "Anual Commerce Day",
  "2026-03-03": "Photography Lecture Sessions",
  "2026-03-23": "Photography Exibition",
  "2026-03-10": "Mind Prob 2025"
};

function generateCalendar(month, year) {
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();

  let calendarBody = document.getElementById("calendar-body");
  if (!calendarBody) return; // Exit if calendar body doesn't exist

  calendarBody.innerHTML = "";


  document.getElementById("monthAndYear").innerHTML =
    new Date(year, month).toLocaleString("default", {
      month: "long"
    }) + " " + year;

  let date = 1;

  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");

      if (i === 0 && j < firstDay) {
        cell.innerHTML = "";
      } else if (date > daysInMonth) {
        break;
      } else {
        let formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        cell.innerHTML = date;


        if (events[formattedDate]) {
          cell.classList.add("event-day");


          cell.onclick = () => {
            const eventDetails = document.getElementById("event-details");
            if (eventDetails) {
              eventDetails.innerHTML = `
                <div class="alert alert-info">
                  <strong>${formattedDate}</strong><br>
                  ${events[formattedDate]}
                </div>
              `;
            }
          };
        }

        date++;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }
}

const prevMonthButton = document.getElementById("prevMonth");
const nextMonthButton = document.getElementById("nextMonth");

if (prevMonthButton) {
  prevMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });
}

if (nextMonthButton) {
  nextMonthButton.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
  });
}


generateCalendar(currentDate.getMonth(), currentDate.getFullYear());