let cl = console.log;

let blogsArr = [
  {
    title: "Angular 18",
    content:
      "Removes Modular Structure, Supports standalone components, services ...",
    blogID: "1234"
  },
  {
    title: "Async JS - Promises",
    content:
      "Promises are introduced in es6, it overcome call back hell problem",
    blogID: "5678"
  }
];

const sweetAlert = (msg,iconstr)=>{
  Swal.fire({
    title : msg,
    timer : 2500,
    icon : 'iconstr'
  })
}

const postForm = document.getElementById("postForm");
const titleControl= document.getElementById("title");
const contentControl = document.getElementById("content");
let cardContainer = document.getElementById("cardContainer");

const createBlog = (blogObj) => {
  // API call to add a new blog in to DB
return new Promise((resolve, reject) => {
    setTimeout(() => {
      let error = Math.random() >= .5 ? false : true; // Mocking
      if(!error){
       blogsArr.push(blogObj);
        resolve(blogsArr);
      }else{
        reject('somthing went wrong');
      }
    }, 1000)
  })
}

// Function fetchAllblog 
const fetchAllBlog = () => {
  return new Promise((resolve, reject) => {
    //API call
    setTimeout(() => {
      let error = Math.random() >= .5 ? false : true;
      if(!error){
        resolve(blogsArr)
      }else{
        reject('Something went wrong while fetching data');
      }
    }, 800)
  })
}

//fetchAllBlog()

const createBlogCards = (arr) => {
  if (arr.length == 0) {
    alert('please enter valid data');
  }
  let result = " ";
  arr.foreach((ele) => {
    result += `
                <div class="col-md-4">
            <div class="card">
                <div class="card-header">
                    <h2>${ele.title}</h2>
                </div>
                <div class="card-body">
                    <p class="m-0">
                        ${ele.content}
                    </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-sm btn-outlined-info">Edit</button>
                    <button class="btn btn-sm btn-outlined-danger">Remove</button>
                </div>
            </div>
        </div>
      
      
      `
  })
  cardContainer.innerHTML=result;

}

/*createBlog({
  title: "RxJs",
  content: "asjdjkkf",
  blogId: "400"
})

  .then((res) => {
    cl(res)
    fetchAllBlog() // it returns promise
  })
  // consume promise of fetchAllblog
  .then((res) => {
    cl(res)
    createBlogCards(res);
  })
  .catch((err) => {
   // cl(err)
   swal.fire({
    title:err,
    timer:2500,
    icon:err
   })
  }) */

   const onFormSubmit = async(eve)=>{
    //eve.preventDefault();
    let blogObj = {
        titleVal:titleControl.value,
        contentVal:contentControl.value,
      }

    try{
     
      let res = await createBlog(blogObj);
      cl(res);
      let data = await fetchAllBlog();
      createBlogCards(data)
      cl(data)
      sweetAlert(res,'sucess')
    }catch(err){
      sweetAlert(err,'error')
    }finally{
      postForm.reset ();
    }
   }
 
   onFormSubmit();
  postForm.addEventListener('submit' , onFormSubmit);

