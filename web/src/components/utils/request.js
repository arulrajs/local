export default async function send(url, method, headers, data, callback, errorback, json=false, addParam) {
    const token  = localStorage.getItem('auth-token')
    const default_headers = {'x-auth-token':token}
    const new_headers = Object.assign({}, default_headers, headers)
    console.log(new_headers)
    return fetch(url, {
      method: method,
      headers: new_headers,
      body: data
    })
    .then(
      response => json?response.json().then(response =>callback(response, addParam)):
      callback(response, addParam)
    )
    .catch(response=>{
      console.error(response)
      console.error(response.status)
      if(response.status >= 400){
        response.redirect('/login')
      }else{
        errorback(response, addParam)
      }
    })
   }