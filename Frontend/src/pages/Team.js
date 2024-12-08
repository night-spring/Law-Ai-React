import React from 'react';
import Footer from '../components/Footer';
const teamMembers = [
  {
    name: 'Ayush Agarwal',
    role: 'ML Engineer',
    description: 'Ayush is responsible for developing machine learning models, optimizing algorithms, and ensuring the intelligent behavior of the system.',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQEoRZxKRClhOg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1728018350887?e=1738195200&v=beta&t=9pYtSPhRuABUkyR-VTgAboDui_l4lh5pYoldreKvJx0',
  },
  {
    name: 'Debojit Roy',
    role: 'Backend Developer',
    description: 'Debojit handles the backend, focusing on server-side logic, database management, and API integrations to ensure smooth operations.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQGPRSfGjGir9Q/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1718236956013?e=1738195200&v=beta&t=pscvdlRST4EJhg3Suf5bI6z23YP-LaR_NaCSB2vuQJU',
  },
  {
    name: 'Anubhab Das',
    role: 'UI/UX Designer',
    description: 'Anubhab is responsible for creating intuitive and visually appealing user interfaces, ensuring a seamless and engaging experience for users.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQF5tXgTG8Qp4g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1710860974456?e=1738195200&v=beta&t=6L3G6xbr5ZqwI_vNx0mwH2ujatNnFyHHyAZ2fIzB_b0',
  },
  {
    name: 'Anish Seth',
    role: 'Frontend Developer',
    description: 'Anish brings the UI designs to life with frontend development skills, ensuring responsive layouts, smooth interactions, and an optimized user experience.',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQEcOwOyX562Dg/profile-displayphoto-shrink_400_400/B56ZNu3TrUGgAg-/0/1732731813490?e=1738195200&v=beta&t=Y-SnPMfKVIN8-7tnNxNyjfme3bQdyrGW45fUTAyyZxI',
  },
  {
    name: 'Anushka Adak',
    role: 'Research Analyst',
    description: 'Anushka conducts research, providing insights into market trends and user needs, shaping the strategic direction of the product, and ensuring alignment with business goals and user expectations',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQHou2gK1ISDvA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1694421566208?e=1738195200&v=beta&t=WVinWjnia99PD9IrEEPjI6wG1rkvVRAqpfdBFVDoYTs',
  },
  {
    name: 'Tanisha Gupta',
    role: 'Product Manager',
    description: 'Tanisha provides invaluable guidance and unwavering support, ensuring the team stays focused and their direction aligns seamlessly with industry best practices of the project.',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQF0TX_e-_A-kA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1693753607824?e=1738195200&v=beta&t=LyZwC4tPpARgbD_dId2bqLRR6M-b59PYw_XyPXuJuFM',
  },
];

const Team = () => {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Team Header Section */}
      <header className="text-center py-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6 text-shadow-lg transform hover:scale-105 transition-all duration-300">
          CODE-A-COLA
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-medium max-w-3xl mx-auto leading-relaxed opacity-90 hover:opacity-100 transition-opacity duration-300">
          Brewing solutions for a smarter tomorrow!
        </p>
      </header>
      {/* Team Members Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="container mx-auto">
          <h2 className="text-6xl font-extrabold text-center mb-12 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
            Meet the Dream Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-tr from-purple-800 via-indigo-800 to-blue-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all hover:scale-105 hover:shadow-[0_12px_30px_rgba(138,43,226,0.8)] group duration-700"
              >
                {/* Glowing Neon Background Effect */}
                <div className="absolute inset-0 z-0 blur-3xl opacity-30 group-hover:opacity-70 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
                {/* Profile Image */}
                <div className="relative flex flex-col items-center p-8 z-10">
                  <div className="w-40 h-40 rounded-full overflow-hidden border-[6px] border-gradient-to-tr from-pink-500 via-purple-500 to-blue-500 mb-8 shadow-xl transform group-hover:scale-110 transition duration-500">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Glowing Pulse Effect */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-pink-500 opacity-20 rounded-full animate-pulse group-hover:opacity-50"></div>
                  {/* Name and Role */}
                  <h3 className="text-3xl font-extrabold text-white group-hover:text-pink-500 transition duration-500">
                    {member.name}
                  </h3>
                  <p className="text-xl text-purple-300 mb-3 group-hover:text-blue-300 transition-all">
                    {member.role}
                  </p>
                  <p className="text-base text-gray-300 text-center leading-relaxed group-hover:text-gray-200">
                    {member.description}
                  </p>
                </div>
                {/* Connect Button */}
                <div className="bg-gradient-to-br from-indigo-800 via-purple-700 to-pink-700 p-6 text-center rounded-b-3xl">
                  <button className="relative px-10 py-4 text-indigo-900 font-semibold rounded-full text-lg shadow-2xl bg-gradient-to-r from-white via-gray-200 to-gray-100 transition transform hover:scale-125 hover:bg-gradient-to-r hover:from-pink-100 hover:to-blue-100 hover:text-pink-600">
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-tr from-purple-500 via-pink-500 to-blue-500 opacity-15 blur-xl rounded-full"></span>
                    Connect
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*Footer Section*/}
      <Footer />
    </div>
  );
};

export default Team;