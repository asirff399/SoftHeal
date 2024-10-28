const handelRegistration = (event) => {
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

    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
   
    const info = {
        username,
        first_name,
        last_name,
        email,
        password,
        confirm_password,
    };
    console.log(info)

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {          
            
            fetch("https://soft-heal.vercel.app/account/register/",{
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify(info)
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to register!");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                alert("Check your confirmation email!");
                showError("Registration successfull!");
            })
            .catch((error) => {
                console.error(error);
                showError("Registration failed. Please try again.");
            });               
        } else {
          showError("Password must contain eight characters, at least one letter, one number, and one special character.");
        }
    } else {
      showError("Password and confirm password don't match.");
    }
    
};
const getValue=(id)=>{
    const value = document.getElementById(id).value
    return value
}
const handleLogin = (event) =>{
    event.preventDefault()
    const errorContainer = document.getElementById("error-container");
    const errorElement = document.getElementById("error");
    const hideToast = () => {
      setTimeout(() => {
          errorContainer.classList.add("hidden");
      }, 3000);  
    };

    const username = getValue("login-username")
    const password = getValue("login-password")
    console.log(username,password)
    if(username,password){
        fetch("https://soft-heal.vercel.app/account/login/",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({username,password}),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
            if (data.error) {
                errorElement.innerText = data.error;
                errorContainer.classList.remove("hidden");  
                hideToast();
            } 
              if (data.token && data.user_id) {
                  errorElement.innerText = "Logged in Successfully!"
                  errorContainer.classList.remove("hidden"); 
                  hideToast();

                  localStorage.setItem("token", data.token);
                  localStorage.setItem("user_id", data.user_id);
                  window.location.href = "./index.html";
              }
        })
        .catch((err) => {
          errorElement.innerText = "An error occurred. Please try again later.";
          errorContainer.classList.remove("hidden"); 
          console.error("Error during login:", err);
          hideToast();
      });
        
    }else{
      errorElement.innerText = "Please provide both username and password.";
      errorContainer.classList.remove("hidden");
      errorContainer.classList.add("text-red-900");
      hideToast();
    }
}
const handleLogout = () =>{
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
    const token = localStorage.getItem("token")
    fetch("https://soft-heal.vercel.app/account/logout/",{
        method:"POST",
        headers:{
            Authorization:`Token ${token}`,
            "content-type":"application/json",
        },
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        showError('Logged out successfully')
        window.location.href = "./index.html"
    })

}
const loadUserDetails = () => {
    const user_id = localStorage.getItem("user_id");
  
    fetch(`https://soft-heal.vercel.app/users/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("username", data.username);
        // console.log(data)
        if(data)
        {
            document.getElementById("p-first_name").value = data.first_name 
            document.getElementById("p-last_name").value = data.last_name 
            document.getElementById("p-username").value = data.username
            document.getElementById("p-email").value = data.email
        }
      });
    const custom_id = localStorage.getItem("custom_id");
    fetch(`https://soft-heal.vercel.app/account/list/${custom_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        if(data)
        {
          document.getElementById("p-phone").value = data.phone
          document.getElementById("p-address").value = data.address

          document.getElementById("img").src = `${data.image}`;
          document.getElementById("curr-p-img").value = data.image;
          
          document.getElementById("p-balance").innerText = `$${data.balance}`;

          localStorage.setItem('user_type',data.user_type)
            
        }
      });
};
const loadCustomId = () => {
    const user_id = localStorage.getItem("user_id");
    fetch(`https://soft-heal.vercel.app/account/list/?search=${user_id}`)
      .then((res) => res.json())
      .then((data) =>{
        // console.log(data)
        localStorage.setItem("custom_id", data[0].id)   
    })
};
const deposit = (event) => {
    event.preventDefault();
    const form = document.getElementById("deposit-form");
    const formData = new FormData(form);
    const data = {
      amount: formData.get("deposit"),
    };
  
    // console.log(data);
    const token = localStorage.getItem("token");
    fetch("https://soft-heal.vercel.app/transaction/deposit/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Deposit successfully done!");
        window.location.href = "./profile.html";
      })
      
};
document.addEventListener('DOMContentLoaded', function () {
  const element = document.getElementById('deposit-form');
  if (element) {
    element.addEventListener("submit", deposit);
  }
});
// const donation = (event) => {
//     event.preventDefault();
//     const form = document.getElementById("donation-form");
//     const formData = new FormData(form);
//     const data = {
//       amount: formData.get("donation-amount"),
//     };
//     const token = localStorage.getItem("token");
//     const post_id = localStorage.getItem("post_id");

//     fetch(`https://soft-heal.vercel.app/post/donate/${post_id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Token ${token}`,
//       },
//       body: JSON.stringify(data),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         alert("Donated successfully!");
//         window.location.href = "./profile.html";
//       })    
// };

const updateProfile = async (event) =>{
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

    const token = localStorage.getItem("token")

    const imageFile = document.getElementById('p-img').files[0]

    const imgbbApiKey = 'd66ac61ddd293e9365044261d374f2d1';
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`;

    const imageData = new FormData()
    imageData.append('image',imageFile)
    let imageUrl = ''
    try{
        if(imageFile){
          const imgbbResponse = await fetch(imgbbUrl,{
            method:'POST',
            body: imageData,
          })
          const imgbbData = await imgbbResponse.json()
          imageUrl = imgbbData.data.url;

        }else{
          imageUrl = document.getElementById('curr-p-img').value;
        }
        const userData = {
          user: {
              username: document.getElementById('p-username').value,
              first_name: document.getElementById('p-first_name').value,
              last_name: document.getElementById('p-last_name').value,
              email: document.getElementById('p-email').value
          },
          custom_user: {
              image: imageUrl, 
              phone: document.getElementById('p-phone').value,
              address: document.getElementById('p-address').value,
          }
        }
        const updateResponse = await fetch("https://soft-heal.vercel.app/account/profile/update/",{
          method:"PUT",
          headers:{
            "content-type":"application/json",
            "Authorization":`Token ${token}`,
          },
          body:JSON.stringify(userData),
        })
        const updateData = await updateResponse.json()
        if (updateResponse.ok) {
          console.log('Profile Updated:', updateData);
          showError('Profile updated successfully!')
        } else {
            throw new Error(updateData.detail || 'Failed to update profile'); 
        }
        console.log('Profile Updated:',updateData)
    }catch(error){
      console.error('Error updating profile:',error)
      showError('Error updating profile:',error)
    }
}
const changePass = (event) => {
  event.preventDefault();

  const oldPassword = document.getElementById("old_password").value;
  const newPassword = document.getElementById("new_password").value;
  const token = localStorage.getItem("token");
  // console.log(token);
  const data = {
    old_password: oldPassword,
    new_password: newPassword,
  };
  // console.log(data);

  fetch("https://soft-heal.vercel.app/account/profile/pass_change/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      window.location.href = "./profile.html"
      alert("Password Changed successfully!")
    });
};
// document.addEventListener('DOMContentLoaded', function () {
//   const element = document.getElementById('donation-form');
//   if (element) {
//     element.addEventListener("submit", donation);
//   }
// });
document.addEventListener('DOMContentLoaded', function() {
  loadCustomId()
  loadUserDetails()
});


// const handleReview = async (event) =>{
//     event.preventDefault()
//     const pet_id = new URLSearchParams(window.location.search).get("pet_id")
//     const userId = localStorage.getItem("user_id")
//     const token = localStorage.getItem("token")
//     const message = getValue("message")
//     const ratingValue = getValue("rating")

//     const starRatings = ['✮', '✮✮', '✮✮✮', '✮✮✮✮', '✮✮✮✮✮'];
//     const rating = starRatings[ratingValue - 1];

//     if (!pet_id || !userId || !message || !rating) {
//         console.error("Missing required fields.");
//         return;
//     }

//     const rData = {
//         pet:pet_id,
//         reviewer:userId,
//         body:message,
//         rating:rating,
//     }
//     // console.log(rData)

//     try {
//         const response = await fetch("https://exipet-drf-api.onrender.com/customer/create_review/", {
//             method: "POST",
//             headers:{
//                 "content-type":"application/json",
//                 "Authorization": `Token ${token}`,
//             },
//             body: JSON.stringify(rData),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Error submitting review:", errorData);
//             alert("Failed to submit review: " + JSON.stringify(errorData)); 
//         } else {
//             const data = await response.json();
//             console.log("Review submitted successfully:", data);
//             alert("Review submitted successfully!");
//         }
//     } catch (error) {
//         console.error("Network error:", error);
//         alert("Network error occurred");
//     }
// } 