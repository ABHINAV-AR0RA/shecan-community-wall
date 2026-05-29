import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MissionCards from './components/MissionCards'
import MessageForm from './components/MessageForm'
import CommunityFeed from './components/CommunityFeed'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-warm-white">
      <Navbar />
      <Hero />
      <About />
      <MissionCards />
      <MessageForm />
      <CommunityFeed />
      <Footer />
    </div>
  )
}
