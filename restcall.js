import axios from "axios";


//function to login with rest api
export async function login(email, password)
{
  console.log('data')
  const user = { email: email, password: password };
  

  await axios.post("http://localhost:8280/users/login",user, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }
  }).then(response =>
    {
    const data = response.data;
    console.log(data)
    if(!data.user){
      alert("Invalid email or password");
      window.location.href = "/";
      return;
    }else{
      alert("Login successfully");
      sessionStorage.setItem('logged', 'true');
      sessionStorage.setItem('loggedName', data.user.name);
      sessionStorage.setItem('loggedEmail', data.user.email);
      sessionStorage.setItem('loggedRole', data.user.role);
      sessionStorage.setItem('loggedUID', data.user.id);
  
      const name = sessionStorage.getItem('loggedName');
      console.log(name + " logged in!");
      
      window.location.href='/dashboard';
    }


    });
}


//function to register with rest api
export async function register(user)
{
  await axios.post("http://localhost:8280/users/create", user).then(response =>
  {
    console.log(user)
    const data = response.data;
    console.log(response.data)
    if (data.includes("emailexist"))
    {
      alert("This email already exist!");
      return;
    }else if(data.includes("user added")){
      alert("Registered successfully!");
      window.location.href="/"
    }else{
      alert("Something wrong, please try later!.")
    }

    
    });


}


//function to add item with rest api
export async function addItem(item)
{
  await axios.post("http://localhost:8280/products/create", item).then(response =>
  {
    
    alert("Item added: "+response.data.name);
    
    });
}


export async function getAllItems()
{
  await axios.get("http://localhost:8280/products/").then(response =>
  {
    const data = response.data;
    itemArray=[]

    const uid=sessionStorage.getItem("loggedUID");
    const array = Object.keys(data);


    for (key in array)
    
      if (data[key].uid == uid)
      {
        itemArray.push(data[key])
      }
    
  });
  
  console.log(itemArray);

  return itemArray;
}



export async function getAllItemsRaw()
{

  var data = null;

  await fetch("http://localhost:8280/products/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(this.state),
  })
    .then((response) =>
    {
      response.json().then(data => ({
        data: data,
        status: response.status
      })).then(res =>
      {
        console.log(res.data)
        data=res.data
      })
        
    });
  
  
  return data;
        
} 
  
