// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. Каждое занятие имеет название, время проведения, максимальное количество участников и текущее количество записанных участников.

// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. Каждое занятие должно отображаться на странице с указанием его названия, времени проведения, максимального количества участников и текущего количества записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. Если максимальное количество участников уже достигнуто, кнопка "Записаться" становится неактивной.

// 4. После успешной записи пользователя на занятие, обновите количество записанных участников и состояние кнопки "Записаться".

// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку "Отменить запись". После отмены записи, обновите количество записанных участников и состояние кнопки.

// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в реальном времени на странице.

// 7. При разработке используйте Bootstrap для стилизации элементов.



// const urlData = "./class_schedule.json"

// async function fetchData(url) {
//     try {
//         const responce = await fetch(url);
//         const data = await responce.json();
//         return data;
//     } catch (error) {
//         console.log(error.message);
//     }
// };

// document.addEventListener('DOMContentLoaded', async () => {
//     const data = await fetchData(urlData);
//     const classBoxsEl = document.querySelector('.class-boxs');
//     console.log(classBoxsEl);
//     data.forEach(classItem => {
//         classBoxsEl.insertAdjacentHTML('beforeend', `
//             <h3 class="title-class">${classItem.class} :</h3>
//             <h4 class="time-class">${classItem.time}</h4>
//             <p class="maxParticipants">Доступно мест: ${classItem.maximumParticipants}</p>
//             <p class="currentParticipants">Участников записалось: ${classItem.registeredParticipants}</p>
//             <button class="addParticipants">Записаться</button>
//             <button class="deleteParticipants">Отменить запись</button>
//         `)
//     });
// });


const classBoxEl = document.querySelector('.box');


const classSchedule = [
    {
        class: "Футбол",
        time: "14:00",
        maximumParticipants: 20,
        registeredParticipants: 0
    },
    {
        class: "Баскетбол",
        time: "15:30",
        maximumParticipants: 10,
        registeredParticipants: 0
    },
    {
        class: "Атлетика",
        time: "17:00",
        maximumParticipants: 30,
        registeredParticipants: 0
    }
];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('classBox')) {
        classBoxEl.innerHTML = localStorage.getItem('classBox');
    } else {
        classSchedule.forEach(classItem => {
            classBoxEl.insertAdjacentHTML('beforeend', `
                <div class="class-boxs">    
                    <h3 class="title-class">${classItem.class} :</h3>
                    <h4 class="time-class">${classItem.time}</h4>
                    <p>Количество участников:</p><span class="maxParticipants">${classItem.maximumParticipants}</span>
                    <p>Участников записалось:</p><span class="currentParticipants">${classItem.registeredParticipants}</span>
                    <button class="addParticipants">Записаться</button>
                    <button class="deleteParticipants">Отменить запись</button>
                </div>
            `)
        });
    }
});

document.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('addParticipants')) {
        const maxParticipantsValue = parseInt(target.closest('.addParticipants').previousElementSibling.previousElementSibling.previousElementSibling.textContent);
        const currentParticipantsValue = parseInt(target.closest('.addParticipants').previousElementSibling.textContent);

        if (currentParticipantsValue < maxParticipantsValue) {
            let countParticipant = currentParticipantsValue + 1;
            const newParticipant = target.closest('.addParticipants').previousElementSibling;
            newParticipant.textContent = countParticipant;

        } else {
            const addBtmEl = target.closest('.addParticipants');
            addBtmEl.disabled = true;
        };

        if (currentParticipantsValue >= 0) {
            const delBtmEl = target.closest('.addParticipants').nextElementSibling;
            delBtmEl.disabled = false;
        };
    };

    localStorage.setItem('classBox', classBoxEl.innerHTML);
});

document.addEventListener('click', function (e) {
    const target = e.target;

    if (target.classList.contains('deleteParticipants')) {

        const currentParticipantsValue = parseInt(target.closest('.deleteParticipants').previousElementSibling.previousElementSibling.textContent);

        if (currentParticipantsValue !== 0) {
            let countParticipant = currentParticipantsValue - 1;
            const newParticipant = target.closest('.deleteParticipants').previousElementSibling.previousElementSibling;
            newParticipant.textContent = countParticipant;
        } else {
            const delBtmEl = target.closest('.deleteParticipants');
            delBtmEl.disabled = true;
        };

        if (currentParticipantsValue > 0) {
            const addBtmEl = target.closest('.deleteParticipants').previousElementSibling;
            addBtmEl.disabled = false;
        };
    };

    localStorage.setItem('classBox', classBoxEl.innerHTML);
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('clear')) {
        localStorage.clear();
    };
    // const zeroParticipants = document.querySelectorAll('.currentParticipants');
    // zeroParticipants.forEach(currentParticipants => {
    //     currentParticipants.textContent = 0;
    // });
});