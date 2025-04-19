import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoadMessage,
  hideLoadMessage,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

const savedQuery = localStorage.getItem('query');
if (savedQuery) {
  query = savedQuery;
  searchImages();
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements['text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Enter search term!' });
    return;
  }

  localStorage.setItem('query', query); // Збереження запиту
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();
  showLoadMessage();

  try {
    const { data } = await getImagesByQuery(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({ message: 'Error fetching images.' });
  } finally {
    hideLoader();
    hideLoadMessage();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoadMessage();

  try {
    const { data } = await getImagesByQuery(query, page, perPage);
    createGallery(data.hits);

    smoothScroll();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({ message: 'Error loading more images.' });
  } finally {
    hideLoadMessage();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-item')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function searchImages() {
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const { data } = await getImagesByQuery(query, page, perPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);
    if (totalHits > perPage) {
      showLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({ message: 'Error fetching images.' });
  } finally {
    hideLoader();
  }
}
