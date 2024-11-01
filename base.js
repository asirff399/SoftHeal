fetch("navbar.html")
.then(res => res.text())
.then((data) => {
    document.getElementById("navbar").innerHTML= data;
	// Assign navElement
	const navElement = document.getElementById("nav-element")

		const token = localStorage.getItem("token")
		// console.log(token)
    
		if(!token){
			navElement.innerHTML=`
				<div class="flex flex-wrap md:flex-nowrap lg:flex-nowrap font-semibold" >
					<a href="./login.html" class=" md:text-xl lg:text-xl font-mono text-center md:m-3 lg:m-3 hover:border-b-4 hover:border-black p-1 font-extrabold " >LOGIN</a>
					<a href="./registration.html" class=" md:text-xl lg:text-xl font-mono text-center md:m-3 lg:m-3 hover:border-b-4 hover:border-black p-1 font-extrabold ">REGISTER</a>
				</div>
			`
		}

        const navMid = document.getElementById("nav-mid")
        const admin = document.getElementById("admin")
        const userType = localStorage.getItem("user_type")
        const postID = localStorage.getItem("post_id")
            if(userType === "Admin"){
              navMid.innerHTML=`<li class="hover:text-indigo-400"><a href="./addPost.html">Add Post</a></li>`   
              admin.innerHTML= `
                    <a href="./editPost.html?post_id=${postID}" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 ">
                        Edit
                    </a>
                    <button onclick="deletePost(${postID})" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 ">
                        Delete
                    </button>
              `
            }
        


})

fetch("footer.html")
.then(res => res.text())
.then((data) => {
    document.getElementById("footer").innerHTML= data;
})
 
document.addEventListener('DOMContentLoaded', function () {
    let tabs = document.querySelectorAll('.tab');
    let contents = document.querySelectorAll('.tab-content');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            let targetId = tab.id.replace('Tab', 'Content');

            // Hide all content divs
            contents.forEach(function (content) {
                content.classList.add('hidden');
            });

            // Remove active class from all tabs
            tabs.forEach(function (tab) {
                tab.classList.remove('border-blue-600', 'font-bold', 'text-blue-600');
                tab.classList.add('border-transparent', 'text-gray-600', 'font-semibold');
            });

            // Show the target content
            document.getElementById(targetId).classList.remove('hidden');

            // Add active class to the clicked tab
            tab.classList.add('border-blue-600', 'font-bold', 'text-blue-600');
            tab.classList.remove('border-transparent', 'text-gray-600', 'font-semibold');
        });
    });
});