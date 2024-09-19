const loadPostTypeForPost = () => {
    fetch("https://softheal-api-drf.onrender.com/post/types/")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            data.forEach((type) => {
                const parent = document.getElementById("post_add_type")
                if (parent) {
                    const option = document.createElement("option")
                    option.value = type.name
                    option.innerHTML = type.name

                    parent.appendChild(option)
                }
            })
        })
}
const loadPostTypeForEdit = () => {
    fetch("https://softheal-api-drf.onrender.com/post/types/")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data)
            data.forEach((type) => {
                const parent = document.getElementById("ed-post-type")
                if (parent) {
                    const option = document.createElement("option")
                    option.value = type.name
                    option.innerHTML = type.name

                    parent.appendChild(option)
                }
            })
        })
}
const addPost = async (event) =>{
    event.preventDefault()

    const form = document.getElementById("add-post")
    const formData = new FormData(form)
    const token = localStorage.getItem("token")
    // console.log(token)

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
            description:formData.get("description"),
            image: imageUrl,
            target: formData.get("target"),
            post_type: formData.get("post_add_type"),
        }
        console.log(postData)

        const response = await fetch("https://softheal-api-drf.onrender.com/post/add/",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(postData),
        })
        const data = await response.json();
        if (response.ok) {
            alert("Post added successfully");
            window.location.href = "./allPost.html"
        } else {
            alert("Failed to add post: " + data.message);
        }
    } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while adding the post");
        }
};
const getPostDetail = () => {
    const post_id = localStorage.getItem("post_id")
    fetch(`https://softheal-api-drf.onrender.com/post/list/${post_id}`)
      .then((res) => res.json())
      .then((post) => {
        document.getElementById("ed-name").value = post.name;
        document.getElementById("ed-description").value = post.description;
        document.getElementById("ed-target").value = post.target;
        document.getElementById("ed-post_add_type").value = post.post_type;
      });
};
const editPost = async (event)=>{
    event.preventDefault()

    const post_id = localStorage.getItem("post_id")
    const form = document.getElementById("edit-post")
    const formData = new FormData(form)
    const token = localStorage.getItem("token")

    const imageFile = document.getElementById('ed-image').files[0]

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

        const editPostData = {
            name:formData.get("ed-name") ,
            description:formData.get("ed-description"),
            image: imageUrl,
            target: formData.get("ed-target"),
            post_type: formData.get("ed-post-type"),    
        }
        console.log(editPostData)
        
        const response = await fetch(`https://softheal-api-drf.onrender.com/post/details/${post_id}/`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(editPostData),
        })
        const data = await response.json();
        if (response.ok) {
            alert("Post updated successfully");
            window.location.href = `./post_details.html?post_id=${post_id}`
        } else {
            alert("Failed to add post: " + data.message);
        }
        
    }catch (error) {
        console.error("Error:", error);
        alert("An error occurred while adding the post");
    };
     
};

const deletePost = (postID) =>{
    const token = localStorage.getItem("token")
    console.log(postID)
    fetch(`https://softheal-api-drf.onrender.com/post/details/${postID}/`,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
    .then((res)=>(window.location.href = "./allPost.html"))
    .catch((err)=> console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
    getPostDetail()
    loadPostTypeForPost()
    loadPostTypeForEdit()
});

