export function customFetch(url, options = {}) {
  return fetch(url, options)
    .then((response) => {
      if (response.status == '401') {
        window.location.href = '/Login';
      }
      return response;
    })
    .catch((error) => {
      console.error('Fetch Error', error);
    });
}
