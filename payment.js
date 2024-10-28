async function payment(event) {
    event.preventDefault();

    const form = document.getElementById("donation-form");
    const formData = new FormData(form);
    const amount = formData.get("donation-amount");
    const token = localStorage.getItem("token");
    const postID = localStorage.getItem("post_id");

    if (!token || !postID) {
        console.error("Token or post ID is missing.");
        return;
    }

    const data = { amount };

    try {
        const response = await fetch(`https://soft-heal.vercel.app/transaction/payment/initiate/${postID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        
        if (response.ok && responseData.gateway_url) {
            window.location.href = responseData.gateway_url;
        } else {
            console.error(responseData.error || "Payment initiation failed.");
        }
    } catch (error) {
        console.error("Error initiating payment:", error);
    }
}

