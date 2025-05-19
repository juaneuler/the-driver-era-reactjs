import React from 'react'

import 'bootstrap-icons/font/bootstrap-icons.css'

// Hoja de estilos
import "../styles/footer.scss"

const Footer = () => {
  return (
    <footer>
      <div>
        <a href="https://www.instagram.com/thedriverera?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank" rel="noopener noreferrer" className="instagram" aria-label="Instagram">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="https://x.com/thedriverera?s=20" target="_blank" rel="noopener noreferrer" className="twitter" aria-label="Twitter">
          <i className="bi bi-twitter-x"></i>
        </a>
        <a href="https://www.youtube.com/@TheDriverEra" target="_blank" rel="noopener noreferrer" className="youtube" aria-label="YouTube">
          <i className="bi bi-youtube"></i>
        </a>
        <a href="https://open.spotify.com/intl-es/artist/5bmqhxWk9SEFDGIzWpSjVJ?si=345HRlmqTH-4twDPoLpYCw"
          target="_blank" rel="noopener noreferrer" className="spotify" aria-label="Spotify">
          <i className="bi bi-spotify"></i>
        </a>
      </div>
      <p>
        © 2024 | JUAN EULER | ROSS LYNCH | ROCKY LYNCH
      </p>
    </footer>
  )
}

export default Footer