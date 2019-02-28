export function PostData(type, userData) {
    let BaseURL = 'http://localhost:5000/login';
    //let BaseURL = 'http://localhost/socialapi/';

    return new Promise((resolve, reject) =>{
    
         
        fetch(BaseURL, {
            method: 'POST',
            body: JSON.stringify(userData)
          })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });

      });
}