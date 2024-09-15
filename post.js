// const loadTypeForPost = () =>{
//     fetch("https://softheal-api-drf.onrender.com/post/types/",{
//         method:"GET",
//         headers:{"Content-Type":"application/json" },
//     })
//     .then((res)=>res.json())
//     .then((data)=>{
//         console.log(data)
//         data.forEach((item)=>{
//             const parent = document.getElementById("post_type")
//             const option = document.createElement("option")
//             option.value = item.name
//             option.innerHTML = item.name
//             parent.appendChild(option)
//         })
//     })
// }

// const addPost = async (event) =>{
//     event.preventDefault()

//     const form = document.getElementById("add-post")
//     const formData = new FormData(form)
//     const token = localStorage.getItem("token")
//     // console.log(token)

//     const imageFile = document.getElementById('image').files[0]

//     const imgbbApiKey = 'd66ac61ddd293e9365044261d374f2d1';
//     const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

//     const imageData = new FormData()
//     imageData.append('image',imageFile)


//     try{
//         const imgbbResponse = await fetch(imgbbUrl,{
//             method:'POST',
//             body: imageData,
//         })

//         const imgbbData = await imgbbResponse.json()
//         const imageUrl = imgbbData.data.url;

//         const postData = {
//             name:formData.get("name") ,
//             description:formData.get("description"),
//             image: imageUrl,
//             target: formData.get("target"),
//             post_type: formData.get("post_type"),
//         }
//         console.log(postData)

//         const response = await fetch("https://exipet-drf-api.onrender.com/pet/post/",{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json",
//                 "Authorization": `Token ${token}`,
//             },
//             body: JSON.stringify(postData),
//         })
//         const data = await response.json();
//         if (response.ok) {
//             alert("Post added successfully");
//             window.location.href = "./allPet.html"
//         } else {
//             alert("Failed to add post: " + data.message);
//         }
//     } catch (error) {
//             console.error("Error:", error);
//             alert("An error occurred while adding the post");
//         }
// };

// // const getPostDetail = () => {
// //     const pet_id = localStorage.getItem("pet_id")
// //     fetch(`https://exipet-drf-api.onrender.com/pet/post/${pet_id}`)
// //       .then((res) => res.json())
// //       .then((post) => {
        
// //         document.getElementById("ed-pet-type").value = post.pet_type;
// //         document.getElementById("ed-name").value = post.name;
// //         document.getElementById("ed-description").value = post.description;
// //         // document.getElementById("ed-image").value = post.image;
// //         document.getElementById("ed-adoption_status").value = post.adoption_status;
// //         document.getElementById("ed-gender").value = post.gender;
// //         document.getElementById("ed-age").value = post.age;
// //         document.getElementById("ed-price").value = post.price;
// //       });
// // };


// // const editPost = async (event)=>{
// //     event.preventDefault()

// //     const pet_id = localStorage.getItem("pet_id")
// //     const form = document.getElementById("edit-post")
// //     const formData = new FormData(form)
// //     const token = localStorage.getItem("token")

// //     const imageFile = document.getElementById('ed-image').files[0]

// //     const imgbbApiKey = 'd66ac61ddd293e9365044261d374f2d1';
// //     const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

// //     const imageData = new FormData()
// //     imageData.append('image',imageFile)

// //     try{
// //         const imgbbResponse = await fetch(imgbbUrl,{
// //             method:'POST',
// //             body: imageData,
// //         })

// //         const imgbbData = await imgbbResponse.json()
// //         const imageUrl = imgbbData.data.url;

// //         const editPostData = {
// //             pet_type: parseInt(formData.get("ed-pet-type")),
// //             name:formData.get("ed-name") ,
// //             description:formData.get("ed-description"),
// //             image: imageUrl,
// //             adoption_status: formData.get("ed-adoption_status"),
// //             gender: formData.get("ed-gender"),
// //             age: formData.get("ed-age"),
// //             price: formData.get("ed-price") ,    
// //         }
// //         console.log(editPostData)
        
// //         const response = await fetch(`https://exipet-drf-api.onrender.com/pet/post/${pet_id}/`,{
// //             method:"PUT",
// //             headers:{
// //                 "Content-Type":"application/json",
// //                 "Authorization": `Token ${token}`,
// //             },
// //             body: JSON.stringify(editPostData),
// //         })
// //         const data = await response.json();
// //         if (response.ok) {
// //             alert("Post updated successfully");
// //             window.location.href = "./allPet.html"
// //         } else {
// //             alert("Failed to add post: " + data.message);
// //         }
        
// //     }catch (error) {
// //         console.error("Error:", error);
// //         alert("An error occurred while adding the post");
// //     };
     
// // };

// const deletePost = () =>{
//     const token = localStorage.getItem("token")
//     const post_id = localStorage.getItem("post_id")

//     fetch(`https://softheal-api-drf.onrender.com/post/details/${post_id}/`,{
//         method:"DELETE",
//         headers:{
//             "Content-Type": "application/json",
//             "Authorization": `Token ${token}`,
//         },
//     })
//     .then((res)=>(window.location.href = "./allPost.html"))
//     .catch((err)=> console.log(err));
// }

// document.addEventListener("DOMContentLoaded", () => {
//     // getPostDetail()
//     loadTypeForPost()
// });
