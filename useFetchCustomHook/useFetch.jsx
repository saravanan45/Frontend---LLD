const cache = {};

async function fetchWithCache(url, options = {}) {

  const key = JSON.stringify({
    url,
    options,
  });

  if (cache[key]) {
    return cache[key];
  }

  const promise = fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }

      return response.json();
    })
    .catch((err) => {
      delete cache[key];
      throw err;
    });

  cache[key] = promise;

  return promise;
}

// component usage

// const result = await fetchWithCache("/users");
// return result;





