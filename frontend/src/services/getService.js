export default async function getService(model,method,param=null){
  
  const { REACT_APP_BACKEND_URL } = process.env;
  
  const rawResponse = await fetch(`${REACT_APP_BACKEND_URL}/${model}/${method}${param ? "/" + param : ""}`);
  
  const response = await rawResponse.json();

  return response;
}