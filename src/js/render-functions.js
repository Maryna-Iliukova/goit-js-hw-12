import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
    <li class="gallery-item">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" class="img" alt="${tags}" />
        <ul class="data-list">
          <li class="data-item">
            <p class="data-text">Likes</p>
            <p class="data-value">${likes}</p>
          </li>
          <li class="data-item">
            <p class="data-text">Views</p>
            <p class="data-value">${views}</p>
          </li>
          <li class="data-item">
            <p class="data-text">Comments</p>
            <p class="data-value">${comments}</p>
          </li>
          <li class="data-item">
            <p class="data-text">Downloads</p>
            <p class="data-value">${downloads}</p>
          </li>
        </ul>
      </a>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}
// ...твій існуючий код...

const loadMoreBtn = document.querySelector('.load-more');
const loadMessage = document.querySelector('.load-message');

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
  loadMessage.classList.add('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}

export function showLoadMessage() {
  loadMessage.classList.remove('hidden');
}

export function hideLoadMessage() {
  loadMessage.classList.add('hidden');
}
