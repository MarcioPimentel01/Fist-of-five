document.getElementById('shareButton').addEventListener('click', async () => {
    const thoughts = document.getElementById('thoughts').value;
    const userId = 1; // Replace with the logged-in user's ID (you may need to get this dynamically)

    if (!thoughts) {
        alert('Please enter your thoughts.');
        return;
    }

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ thoughts, userId }),
    });

    if (response.ok) {
        document.getElementById('thoughts').value = '';
        loadPosts();
    } else {
        const error = await response.json();
        alert('Error: ' + error.message);
    }
});

async function loadPosts() {
    try {
        const response = await fetch('/api/posts');
        const result = await response.json();

        if (result.status === 'success') {
            const posts = result.data;
            const postsContainer = document.getElementById('postsContainer');
            
            postsContainer.innerHTML = posts.map(post => {
                const localTime = new Date(post.createdAt).toLocaleString();
                return `
                    <div class="album box">
                        <div class="status-main">
                            <div class="album-detail">
                                <div class="album-title"><strong>${post.username}</strong> created a new <span>Post</span></div>
                                <div class="album-date">${localTime}</div>
                            </div>
                        </div>
                        <div class="album-content">${post.thoughts}</div>
                        <div class="album-actions">
                            <button onclick="deletePost(${post.id})">Delete</button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        alert('Failed to fetch posts.');
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Post deleted successfully.');
            loadPosts();
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        alert('Failed to delete post.');
    }
}

loadPosts();
