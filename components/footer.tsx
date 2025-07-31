import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-gray-800 w-full max-w-full overflow-x-hidden">
      <div className="container mx-auto px-4 w-full max-w-full">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-full">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="font-bold text-xl text-white">
              7Frames_aryan
            </Link>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              Capturing moments and preserving memories through the art of photography.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="/support" className="text-sm text-gold hover:text-yellow-400 transition-colors">
                Support My Work
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://www.instagram.com/7Frames_aryan/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] p-2 text-white hover:bg-gold hover:text-black transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.017 0C8.396 0 7.928.01 7.628.052 7.328.095 7.083.184 6.851.369c-.233.185-.397.442-.491.696-.095.254-.145.532-.145.82v.001c0 .264.037.52.109.776.072.256.177.497.313.719.136.222.302.426.495.609.193.183.413.34.653.464.24.124.498.217.768.274.27.057.548.084.828.084h4.462c.28 0 .558-.027.828-.084.27-.057.528-.15.768-.274.24-.124.46-.281.653-.464.193-.183.359-.387.495-.609.136-.222.241-.463.313-.719.072-.256.109-.512.109-.776v-.001c0-.288-.05-.566-.145-.82-.094-.254-.258-.511-.491-.696C16.917.184 16.672.095 16.372.052 16.072.01 15.604 0 12.017 0zm0 1.802c3.403 0 3.793.012 5.135.072.777.035 1.199.166 1.481.276.372.145.638.318.917.597.28.28.452.546.597.917.11.282.24.704.276 1.481.06 1.342.073 1.732.073 5.135s-.013 3.793-.073 5.135c-.036.777-.166 1.199-.276 1.481-.145.372-.318.638-.597.917-.28.28-.546.452-.917.597-.282.11-.704.24-1.481.276-1.342.06-1.732.073-5.135.073s-3.793-.013-5.135-.073c-.777-.036-1.199-.166-1.481-.276a2.478 2.478 0 01-.917-.597 2.478 2.478 0 01-.597-.917c-.11-.282-.24-.704-.276-1.481-.06-1.342-.073-1.732-.073-5.135s.013-3.793.073-5.135c.036-.777.166-1.199.276-1.481.145-.372.318-.638.597-.917.28-.28.546-.452.917-.597.282-.11.704-.24 1.481-.276 1.342-.06 1.732-.073 5.135-.073z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.017 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12.017 16a4 4 0 110-8 4 4 0 010 8z" clipRule="evenodd" />
                  <circle cx="18.406" cy="5.594" r="1.44" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://in.pinterest.com/drunken_monk/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#111] p-2 text-white hover:bg-gold hover:text-black transition-colors"
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
                className="bg-[#111] p-2 text-white hover:bg-gold hover:text-black transition-colors"
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
                className="bg-[#111] p-2 text-white hover:bg-gold hover:text-black transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="h-5 w-5 fill-current">
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} 7Frames_aryan. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
