
let page = 1;
const myAccessKey = 'RMw7sV-PqdhspbfYdvmf7FUdqwSa4FxBmXYW4flqUZc';

const photoBox = document.querySelector('.photoBox');
const likeContainer = document.querySelector('.likeContainer');
const likeButton = document.querySelector('.likeButton');

async function fetchPhotos() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=${myAccessKey}`);
        const photos = await response.json();
        return photos;
    } catch (error) {
        console.error("Ошибка при загрузке фото:", error);
        return [];
    }
}

async function loadMorePhotos() {
    const photos = await fetchPhotos();

    if (photos.length > 0) {
        const randomIndex = Math.floor(Math.random() * 9);

        const img = document.createElement('img');
        img.src = photos[randomIndex].urls.small;
        img.alt = photos[randomIndex].alt_description;

        const photographerName = document.createElement('p');
        photographerName.textContent = `Фотограф: ${photos[randomIndex].user.name}`;

        const likesCounter = document.createElement('p');
        likesCounter.textContent = photos[randomIndex].likes;

        photoBox.append(img);
        likeContainer.prepend(photographerName);
        likeContainer.append(likesCounter);

        page++;
    }
}

likeButton.addEventListener('click', function (e) {
    e.target.nextElementSibling.textContent = parseInt(e.target.nextElementSibling.textContent) + 1;
});

loadMorePhotos();

