import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <div>
         <footer className="bg-gray-800 text-gray-300 py-8 items-center">
        <div className="container mx-auto px-4 flex justify-between">
          {/* About Us Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">About Us</h3>
            <p className="text-sm">
              Welcome to Prime Job Spot, the leading platform for connecting job seekers
            with top employers. Whether you are a student looking for internships or 
            <br/>a recruiter seeking the best talent, we help make the process seamless and efficient.
            </p>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-3">Contact Us</h3>
            <p className="text-sm">Email: bhaktiagrawal286@gmail.com</p>
            <div className="mt-4 flex">
              <a
                href="https://www.linkedin.com/in/bhakti-agrawal-a88b51214/"
                className="text-gray-400 hover:text-white mx-2"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a
                href="https://github.com/bhaktiagrawal088"
                className="text-gray-400 hover:text-white mx-2"
                aria-label="GitHub"
              >
                <i className="fab fa-github fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom text */}
        <div className="text-center text-gray-500 mt-8">
          <p>&copy; 2024 Prime Job Spot. All rights reserved.</p>
        </div>
      </footer>

      
    </div>
  )
}

export default Footer
