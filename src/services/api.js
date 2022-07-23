const BASE_URL= 'https://pixabay.com/api/';
const API_KEY= '27687056-f14cdc56d168c42ac76f46ae3'

function fetchGallery (searchQuery, page){
    return fetch(
        `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(response=> {
             if(response.ok){
                 return response.json()
        }
        return Promise.reject(new Error(`Nothing found for your search ${searchQuery}`));
    })
}

const api = {fetchGallery};
export default api;

