const arrayList = document.querySelectorAll('.list-item');
const previousBtn = document.querySelector('.previous-slide');
const nextBtn = document.querySelector('.next-slide');
const navigationBlock = document.querySelector('.navPoints');


let currentImageIndex = 0;

function createNavigationPoints() {
    for (let i = 0; i < arrayList.length; i++) {
        navigationBlock.insertAdjacentHTML('beforeend', `
            <button id="${i}" class="point"></button>
        `);
    };
};

function updateSlide() {
    arrayList[currentImageIndex].classList.add('active')
    for (let i = 0; i < arrayList.length; i++) {
        if (i !== currentImageIndex) {
            arrayList[i].classList.remove('active')
        };
    };
};

previousBtn.addEventListener('click', function (e) {
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = arrayList.length - 1;
    };
    updateSlide();

});

nextBtn.addEventListener('click', function (e) {
    currentImageIndex++;
    if (currentImageIndex >= arrayList.length) {
        currentImageIndex = 0;
    };
    updateSlide();

});

navigationBlock.addEventListener('click', function (e) {
    if (e.target.classList.contains('point')) {
        currentImageIndex = parseInt(e.target.getAttribute('id'));
        updateSlide();
    };

});

createNavigationPoints();
updateSlide();
