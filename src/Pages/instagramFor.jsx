import React, { useState, useEffect } from "react"

const FilledHeart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="red" // You can customize the color
    width="24px"
    height="24px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.77 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.27-3.4 5.75-8.55 11.54L12 21.35z" />
  </svg>
)

const OutlinedHeart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="red" // You can customize the color
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="24px"
    height="24px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 21.35l-1.45-1.32C5.4 14.25 2 11.77 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C16.09 3.81 17.76 3 19.5 3 22.58 3 25 5.42 25 8.5c0 3.27-3.4 5.75-8.55 11.54L12 21.35z" />
  </svg>
)

// src/utils/Utils.js
export const handleLikeClick = (kinolar, kinoid, userId) => {
  // Find the movie with the given kinoid
  const updatedKinolar = kinolar.map((kino) => {
    if (kino.id === kinoid) {
      // Check if the user has already liked the movie
      const isLiked = kino.likedUsers.includes(userId)

      if (isLiked) {
        // If liked, unlike the movie
        return {
          ...kino,
          likes: kino.likes - 1,
          likedUsers: kino.likedUsers.filter((id) => id !== userId),
        }
      } else {
        // If not liked, like the movie
        return {
          ...kino,
          likes: kino.likes + 1,
          likedUsers: [...kino.likedUsers, userId],
        }
      }
    }
    return kino
  })

  return updatedKinolar
}

const Kinolar = () => {
  const [kinolar, setKinolar] = useState([
    { id: 1, title: "Inception", likes: 0, likedUsers: [] },
    { id: 2, title: "The Shawshank Redemption", likes: 0, likedUsers: [] },
    { id: 3, title: "The Dark Knight", likes: 0, likedUsers: [] },
    // Boshqa fake kinolar...
  ])

  const [userId, setUserId] = useState("")

  useEffect(() => {
    const localStorageKinolar = localStorage.getItem("kinolar")
    if (localStorageKinolar) {
      setKinolar(JSON.parse(localStorageKinolar))
    }

    const storedUserId = localStorage.getItem("crm-admin")
    if (storedUserId) {
      setUserId(storedUserId)
    } else {
      const newUserId = Date.now().toString()
      localStorage.setItem("crm-admin", newUserId)
      setUserId(newUserId)
    }
  }, [])

  const handleLikeClickWrapper = (kinoid) => {
    const updatedKinolar = handleLikeClick(kinolar, kinoid, userId)

    setKinolar(updatedKinolar)
    localStorage.setItem("kinolar", JSON.stringify(updatedKinolar))
  }

  const getInstagramFriendlyNames = () => {
    return kinolar.map((kino) => kino.title.replace(/\s/g, "_")).join("_")
  }

  const shareOnInstagram = () => {
    const postText = `Check out my favorite movies: ${getInstagramFriendlyNames()}! 🎬🍿 #MyMovieList #MovieLover`
    const instagramLink = `https://www.instagram.com/your_instagram_username/`
    const hashtags = `#movies #favorites`
    const shareUrl = `https://instagram.com/share?url=${instagramLink}&text=${encodeURIComponent(
      postText + " " + hashtags
    )}`

    window.open(shareUrl, "_blank")
  }

  return (
    <div>
      <h1>My Movie List</h1>
      <ul>
        {kinolar.map((kino) => (
          <li key={kino.id}>
            <span>{kino.title}</span>
            <button onClick={() => handleLikeClickWrapper(kino.id)}>
              {kino.likedUsers.includes(userId) ? (
                <span>
                  <FilledHeart /> Like
                </span>
              ) : (
                <span>
                  <OutlinedHeart /> Unlike
                </span>
              )}{" "}
              ({kino.likes})
            </button>
          </li>
        ))}
      </ul>
      <p>
        Follow me for more movie updates! <i className="fab fa-instagram"></i>{" "}
        <a
          href="https://www.instagram.com/your_instagram_username/"
          target="_blank"
          rel="noopener noreferrer"
        >
          @your_instagram_username
        </a>
      </p>
      <button onClick={shareOnInstagram}>Share on Instagram</button>
    </div>
  )
}

export default Kinolar
