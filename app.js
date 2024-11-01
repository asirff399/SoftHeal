const loadUserProNav = () => {
    const user_id = localStorage.getItem("user_id");
  
    fetch(`https://soft-heal.vercel.app/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("p-btn-name").innerText = `${data.first_name } ${data.last_name}`
        document.getElementById("p-btn-email").innerText = data.email
      });
    fetch(`https://soft-heal.vercel.app/account/list/?user=${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        data.forEach((cus)=>{
            document.getElementById("p-btn-img").src = `${cus.image}`;
            document.getElementById("p-btn-img2").src = `${cus.image}`;
        })
      });
  };
loadUserProNav()
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = {
        day: 'numeric',
        month: 'long',
    };
    return date.toLocaleString('en-US', options).replace(" at", "");
}
const contactUs = (event) => {
    event.preventDefault();

    const errorContainer = document.getElementById("error-container");
    const errorElement = document.getElementById("error");
    const hideToast = () => {
      setTimeout(() => {
          errorContainer.classList.add("hidden");
      }, 3000);  
    };
    const showError = (message) => {
      errorElement.innerText = message;
      errorContainer.classList.remove("hidden");  
      hideToast(); 
    };

    const form = document.getElementById("contact-us");
    const formData = new FormData(form);
    const postData = {
        name: formData.get("name"),
        email: formData.get("email"),
        body: formData.get("body"),
    };

    console.log(postData);
    const token = localStorage.getItem("token")
        // console.log(token)
    fetch("https://soft-heal.vercel.app/contact_us/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,

            },
            body: JSON.stringify(postData),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            showError("Contact message sent successfully!")
            window.location.href = "./index.html";
        })
        .catch((error) => {
            console.error("Error:", error);
            showError("There was a problem sending your contact message.")
        });
};
const loadAllPost = () =>{
    // document.getElementById("loader").style.display = "block";
    fetch("https://soft-heal.vercel.app/post/list/")
    .then((res)=>res.json())
    .then((data)=>{
        if(data.length > 0){
            
            // document.getElementById("loader").style.display = "none";
            displayAllPost(data)
        }
        else{
            // document.getElementById("nodata").style.display = "block";
            // document.getElementById("loader").style.display = "none";
        }
    })
}
const displayAllPost = (posts) => {
    // console.log(posts)
    const parent = document.getElementById("All-post")
    parent.innerHTML = " "
    if (!parent) {
        console.error('Element with ID "All-post" not found');
        return;
    }
    posts.forEach((post) => {
        // console.log(post)
        const div = document.createElement("div")
        div.classList.add("all-post-card")
        const formattedDate = formatDate(post.created_on);
        div.innerHTML = `
                <div class="w-full my-10 bg-white lg:flex border border-slate-300 rounded-xl overflow-hidden transition-transform ease-in-out duration-500 delay-150 hover:translate-y-1 hover:scale-95 hover:shadow-xl hover:shadow-gray-200 transform-gpu focus:outline-none focus:ring focus:ring-gray-300">
                    <div class="h-64 lg:w-[500px] lg:me-16">
                        <img class="w-full h-full object-cover" src=${post.image} alt="Product Image" />
                    </div>
                    <div class="m-5">
                        <h1><strong class="mb-2 text-2xl lg:text-3xl text-black font-mono font-bold">${post.name.slice(0,30)}</strong> </h1>
                        <p class="font-mono font-semibold text-teal-500 my-3 lg:my-5">${post.description.slice(0,100)}...</p>
                        <p class="text-red-800 text-[13px] font-bold italic my-2">${formattedDate}</p>
                        <div class="flex justify-between mt-5">
                            <button class="bg-orange-500 text-white font-semibold py-2 px-4 rounded"><a href="./post_details.html?post_id=${post.id}">Donate Now <i class="fa-solid fa-arrow-right-long"></i></a></button>
                        </div>
                        
                    </div>
                </div>
        
        `
        parent.appendChild(div)
    })
}
const loadInitialPost = () => {
    // document.getElementById("loader").style.display = "block";
    fetch("https://soft-heal.vercel.app/post/list/")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            if (data.length > 0) {
                // document.getElementById("loader").style.display = "none";
                displayInitialPost(data.slice(0, 4))
            } else {
                // document.getElementById("nodata").style.display = "block";
                // document.getElementById("loader").style.display = "none";
            }
        })
}
loadInitialPost()
const displayInitialPost = (posts) => {
    // console.log(posts)
    const parent = document.getElementById("initial-post")
    if (!parent) {
        console.error('Element with ID "initial-post" not found');
        return;
    }
    posts.forEach((post) => {
        // console.log(post)
        const div = document.createElement("div")
        div.classList.add("post-card")
        const formattedDate = formatDate(post.created_on);
        div.innerHTML = `
                <div class="bg-white border border-slate-300 rounded-xl overflow-hidden transition-transform ease-in-out duration-500 delay-150 hover:translate-y-1 hover:scale-95 hover:shadow-xl hover:shadow-gray-200 transform-gpu focus:outline-none focus:ring focus:ring-gray-300" >
                    <img class="h-48 w-full object-cover object-center" src=${post.image} alt="Product Image" />
                    <div class="p-6">
                        <h1 ><strong class="mb-2 text-xl text-black font-mono font-bold">${post.name}</strong> </h1>
                        <p class="text-red-800 text-[13px] font-bold italic my-2">${formattedDate}</p>
                        <div class="flex justify-between mt-5">
                            <button class="bg-orange-500 text-white font-semibold py-2 px-4 rounded"><a href="./post_details.html?post_id=${post.id}">Donate Now <i class="fa-solid fa-arrow-right-long"></i></a></button>
                        </div>
                        
                    </div>
                </div>
        
        `
        parent.appendChild(div)
    })
}
const loadTeam = () =>{
    fetch("https://soft-heal.vercel.app/team/")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
        data.forEach((team) => {
            const parent = document.getElementById("team")
            if (parent) {
                const div = document.createElement("div")
                div.classList.add("sv-card")
                div.innerHTML = `               
                   <div class="grid grid-cols-3 items-center shadow-xl bg-slate-100 border border-gray-300 p-4 rounded-lg relative" style="width: 320px;">
                        <div class="col-span-2">
                            <img src=${team.image} class="rounded-lg" style="width: 300px;height:190px;" />
                        </div>

                        <div class="bg-white rounded-lg p-4 border border-gray-300 absolute right-4 shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] ">
                            <h4 class="text-gray-800 text-sm font-bold">${team.name}</h4>
                            <p class="text-gray-800 mt-2 text-xs">${team.work}</p>
                        </div>
                    </div>       
                `
                parent.appendChild(div)
            }
        })
    }) 
}
const loadAllService = () =>{
    fetch("https://soft-heal.vercel.app/service/")
    .then((res) => res.json())
    .then((data) => {
        // console.log(data)
        data.forEach((service) => {
            const parent = document.getElementById("service")
            if (parent) {
                const div = document.createElement("div")
                div.classList.add("sv-card")
                div.innerHTML = `               
                   <div class="bg-white border border-gray-300 cursor-pointer rounded-2xl overflow-hidden shadow-xl relative group" style="width: 350px;">
                    <img src=${service.image} alt="Blog Post 1" class="w-full h-96 object-cover " />
                    <div class="p-6 absolute bottom-0 left-0 right-0 bg-white opacity-90">
                        <h3 class="text-xl font-bold text-[#333]">${service.title}</h3>
                        <div class="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                        <p class="text-gray-600 text-sm">${service.description}</p>
                        </div>
                    </div>
                   </div>       
            `
                parent.appendChild(div)
            }
        })
    }) 
}
const addVolunteer = async (event) =>{
    event.preventDefault()

    const errorContainer = document.getElementById("error-container");
    const errorElement = document.getElementById("error");
    const hideToast = () => {
      setTimeout(() => {
          errorContainer.classList.add("hidden");
      }, 3000);  
    };
    const showError = (message) => {
      errorElement.innerText = message;
      errorContainer.classList.remove("hidden");  
      hideToast(); 
    };

    const form = document.getElementById("volunteer")
    const formData = new FormData(form)
    const token = localStorage.getItem("token")

    const imageFile = document.getElementById('image').files[0]

    const imgbbApiKey = 'd66ac61ddd293e9365044261d374f2d1';
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const imageData = new FormData()
    imageData.append('image',imageFile)


    try{
        const imgbbResponse = await fetch(imgbbUrl,{
            method:'POST',
            body: imageData,
        })

        const imgbbData = await imgbbResponse.json()
        const imageUrl = imgbbData.data.url;

        const postData = {
            name:formData.get("name") ,
            email:formData.get("email"),
            image: imageUrl,
            phone: formData.get("phone"),
            gender: formData.get("gender"),
            branch: formData.get("branch"),
        }
        console.log(postData)

        const response = await fetch("https://soft-heal.vercel.app/volunteer/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(postData),
        })
        const data = await response.json();
        if (response.ok) {
            // alert("Register request send successfully");
            showError("Register request send successfully")
            window.location.href = "./index.html"
        } else {
            alert("Failed to add post: " + data.message);
            showError("Failed to add post: " + data.message)
        }
    } catch (error) {
            console.error("Error:", error);
            // alert("An error occurred while adding the post");
            showError("An error occurred while adding the post")
        }
};
function formatDate2(dateStr) {
    const date = new Date(dateStr);
    const options = { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true 
    };
    return date.toLocaleString('en-US', options).replace(" at", "");
}
const postDetails = ()=>{
    const param = new URLSearchParams(window.location.search).get("post_id")
    localStorage.setItem("post_id",param)
    if(param){
        fetch(`https://soft-heal.vercel.app/post/list/${param}`)
        .then((res)=>res.json())
        .then((data)=> {
            // console.log(data)
            const formattedDate2 = formatDate2(data.created_on);
            
            document.getElementById("pd-image").src = data.image
            document.getElementById("pd-name").innerText = data.name
            document.getElementById("pd-description").innerText = data.description
            document.getElementById("pd-target").innerText =`$${data.target}`
            document.getElementById("pd-collected").innerText =`$${data.collected}`
            document.getElementById("pd-type").innerText =`${data.post_type}`
            document.getElementById("pd-created-on").innerText = formattedDate2
        })
    }  
}
const loadAllPostType = () => {
    fetch("https://soft-heal.vercel.app/post/types/")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            data.forEach((type) => {
                const parent = document.getElementById("post-types")
                if (parent) {
                    const div = document.createElement("div")
                    div.classList.add("post-ty")
                    div.innerHTML = `               
                    <li onclick="loadPostCategoryWise('${type.name}')"  class="tab text-gray-600 text-nowrap font-semibold text-[15px] py-2.5 px-5 cursor-pointer transition-transform rounded-2xl hover:bg-gray-100 ease-in-out duration-500 delay-150 hover:translate-y-1 hover:scale-95 hover:shadow-xl hover:shadow-gray-200 transform-gpu focus:outline-none focus:ring focus:ring-gray-300">
                        ${type.name}
                    </li>          
                `
                    parent.appendChild(div)
                }
            })
        })
}
const loadPostCategoryWise = (search) =>{
    // console.log(search)
    // document.getElementById("loader").style.display = "block";
    fetch(`https://soft-heal.vercel.app/post/list/?search=${search? search : "" }`)
    .then((res)=>res.json())
    .then((data)=>{
        // displayPetCategoryWise(data?.results)
        if(data.length > 0){
            
            // document.getElementById("loader").style.display = "none";
            displayAllPost(data)
        }
        else{
            // document.getElementById("nodata").style.display = "block";
            // document.getElementById("loader").style.display = "none";
            
        }
        
    })
}

loadAllService()
loadTeam()
loadAllPostType()
postDetails()
loadAllPost()
loadPostCategoryWise()
    
