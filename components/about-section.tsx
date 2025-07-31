import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-[#0A0A0A]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">About Me</h2>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">The person behind the lens</p>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gold shadow-lg shadow-gold/20">
              <Image
                src="/images/Dp.jpg"
                alt="Photographer profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Aryan Rana</h3>
            <p className="text-gray-400 mb-6 text-lg">
              I fkin love you meri jaaan. Mwaaaaaah 😘
            </p>

            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/7Frames_aryan/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] p-3 rounded-full text-white hover:bg-gold hover:text-black transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://in.pinterest.com/drunken_monk/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] p-3 rounded-full text-white hover:bg-gold hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5 w-5 fill-current">
                  <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
                </svg>
                <span className="sr-only">Pinterest</span>
              </Link>
              <Link
                href="https://www.youtube.com/@aryster007"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] p-3 rounded-full text-white hover:bg-gold hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-5 w-5 fill-current">
                  <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/>
                </svg>
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/aryanrana007/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] p-3 rounded-full text-white hover:bg-gold hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5 fill-current">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://open.spotify.com/user/31iv3nhnffqhbim7dyylpnprrexm?si=9fbd475451f14688"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] p-3 rounded-full text-white hover:bg-gold hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="h-5 w-5 fill-current">
                  <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/>
                </svg>
                <span className="sr-only">Spotify</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
