const postContainer = document.querySelector('#posts-container')
const loaderContainer = document.querySelector('.loader')
const filterInput = document.querySelector('#filter')

let page = 1;

const getInfo = async () => {
	
	const response = 
	await
		fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)

	return response.json()
}

const generatePostsTemplate = posts =>  posts.map((item) => {return `
		<div class="post">
			<div class="number">${item.id}</div>
			<div class="post-info">
				<h2 class="post-title">${item.title}</h2>
				<p class="post-body">${item.body}</p>	
			</div>		
		</div>`
		}).join('')

const addPostIntoDOM =  async () => {
	const posts = await getInfo()	
	const postsTemplate = generatePostsTemplate(posts)
	
	postContainer.innerHTML += postsTemplate	
	}
	
const getNextPosts = () => {
	
	setTimeout(()=> {
		page++
		addPostIntoDOM()
	},300)}

const removeLoader = () => {
	setTimeout (() => {
	loaderContainer.classList.remove('show')
	getNextPosts()	
	}, 1000)
}

const showLoader = () => {
	loaderContainer.classList.add('show')
	removeLoader()
}

const handleScrollPageBottom = () => {
	const {clientHeight, scrollHeight, scrollTop} = document.documentElement
	const isPageBottomAlmostReached = scrollTop + clientHeight
		>= scrollHeight - 10
	
	if (isPageBottomAlmostReached) {
		showLoader()
	}
}

const showPostIfMatchValue = inputValue => post => {
		const postTitle = post.querySelector('.post-title').textContent.toLowerCase()
		const postBody = post.querySelector('.post-body').textContent.toLowerCase()
		const postContainsInputValue = postTitle.includes(inputValue) 
			|| postBody.includes(inputValue)
			
	if(postContainsInputValue) {
		post.style.display = 'flex'
		return
	}
	
	post.style.display = "none"

	}

const handleInputValue = event => {
	const inputValue = event.target.value.toLowerCase()
	const posts = document.querySelectorAll('.post')
	
	posts.forEach(showPostIfMatchValue(inputValue))
}

addPostIntoDOM ()

window.addEventListener('scroll', handleScrollPageBottom )
filterInput.addEventListener('input',handleInputValue)


