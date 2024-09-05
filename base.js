fetch("navbar.html")
.then(res => res.text())
.then((data) => {
    document.getElementById("navbar").innerHTML= data;
	// Assign navElement
	const navElement = document.getElementById("nav-element")

		const token = localStorage.getItem("token")
		// console.log(token)

		if(token){
			navElement.innerHTML=`			
                <a href="./profile.html" class="text-xl font-mono text-center m-3 hover:border-b-4 hover:border-black p-1 font-extrabold ">PROFILE</a>
			`
		}
		else{
			navElement.innerHTML=`
				<div class="flex font-semibold ">
						<a href="./login.html" class=" text-xl font-mono text-center m-3 hover:border-b-4 hover:border-black p-1 font-extrabold ">LOGIN</a>
						<a href="./registration.html" class=" text-xl font-mono text-center m-3 hover:border-b-4 hover:border-black p-1 font-extrabold ">REGISTER</a>
				</div>
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