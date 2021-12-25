function fetchImages(search, page) {
  const myKey = '24617843-72c68f87ed3d0c63f61468751';
  const URL = 'https://pixabay.com/api/?q=';
  console.log(page);
  return fetch(`${URL}${search}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12
`).then(response => {
    return response.json();
  });
}

const api = {
  fetchImages,
};

export default api;
