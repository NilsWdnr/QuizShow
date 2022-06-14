export default async function postService (model,method,data){

  const { REACT_APP_BACKEND_URL } = process.env;

  const rawResponse = await fetch(`${REACT_APP_BACKEND_URL}/${model}/${method}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  const response = await rawResponse.json();

  return response;

}