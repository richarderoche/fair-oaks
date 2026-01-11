import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaSoundcloud,
  FaSpotify,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

const SocialIcon = (name: { name: string; text: string }) => {
  switch (name.name) {
    case 'Facebook':
      return <FaFacebookF />
    case 'Instagram':
      return <FaInstagram />
    case 'Soundcloud':
      return <FaSoundcloud />
    case 'Spotify':
      return <FaSpotify />
    case 'Tiktok':
      return <FaTiktok />
    case 'Twitter':
      return <FaXTwitter />
    case 'Threads':
      return <FaThreads />
    case 'YouTube':
      return <FaYoutube />
    case 'Github':
      return <FaGithub />
    case 'Linkedin':
      return <FaLinkedinIn />
    case 'None':
      return (
        <span className="leading-none whitespace-nowrap ts-h3 px-[.25em]">
          {name.text}
        </span>
      )
  }
}

export default SocialIcon
