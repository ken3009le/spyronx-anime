// Function to fetch anime images
function fetchAnime(apiUrl) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.images && data.images[0] && data.images[0].url) {
                const imgUrl = data.images[0].url;
                const animeContainer = document.getElementById('animeContainer');

                // Create an image element
                const imgElement = document.createElement('img');
                imgElement.src = imgUrl;
                imgElement.alt = 'Anime Image';
                imgElement.classList.add('animeImage');

                // Add click event to open image in modal
                imgElement.addEventListener('click', function () {
                    const modal = document.getElementById('myModal');
                    const modalImg = document.getElementById('modalImg');
                    modal.style.display = "block";
                    modalImg.src = imgElement.src;
                });

                // Add image to the container
                animeContainer.insertBefore(imgElement, animeContainer.firstChild);
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu:', error);
        });
}

// Event listeners for each category button
const categories = [
    'maid', 'waifu', 'marin-kitagawa', 'mori-calliope', 
    'raiden-shogun', 'oppai', 'selfies', 'uniform', 'kamisato-ayaka'
];

categories.forEach(category => {
    document.getElementById(`get${category.charAt(0).toUpperCase() + category.slice(1)}Btn`).addEventListener('click', function () {
        fetchAnime(`https://api.waifu.im/search?included_tags=${category}`);
    });
});

// Clear all images
document.getElementById('clearBtn').addEventListener('click', function () {
    const animeContainer = document.getElementById('animeContainer');
    animeContainer.innerHTML = ''; // Xóa tất cả ảnh trong container
});

// Modal close functionality
document.getElementById('closeBtn').addEventListener('click', function () {
    document.getElementById('myModal').style.display = "none";
});

// Close modal when clicking outside of the image
window.addEventListener('click', function (event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
});

// Toggle dark mode
document.getElementById('menuBtn').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode'); // Toggle dark mode on body
    const menuBtn = document.getElementById('menuBtn');

    // Change menu icon based on dark mode state
    if (body.classList.contains('dark-mode')) {
        menuBtn.innerHTML = '&#x2630;'; // Change to dark mode icon
    } else {
        menuBtn.innerHTML = '&#x2630;'; // Change to light mode icon (or modify as desired)
    }
});
