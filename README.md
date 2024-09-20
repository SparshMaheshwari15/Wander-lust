# Wanderlust: Discover Your Perfect Getaway

Wanderlust is an innovative travel website designed to simplify the search for your ideal vacation rental. Whether you're looking for a cozy villa, a luxurious property, or a charming home away from home, Wanderlust has you covered. Our platform allows users to:

- **Browse Listings**: Explore a diverse range of properties for rent, each detailed with comprehensive descriptions, high-quality photos, and essential information such as rental prices and taxes.
- **Read Reviews**: Make informed decisions by reading authentic reviews from previous guests, helping you choose the best accommodation for your needs.
  <!-- - **Manage Your Account**: Effortlessly manage your bookings with our user-friendly login, signup, and logout features.
  -->
- **Interactive Maps**: Find properties with ease using our integrated Mapbox feature, which allows you to view listings on an interactive map.
- **Store and Share Photos**: Upload and share beautiful photos of your rental property through Cloudinary, enhancing the visual appeal of listings.

Wanderlust is your gateway to unforgettable travel experiences, offering a seamless and enjoyable journey from search to booking. Embark on your next adventure with us!

## [Live Demo](https://wander-lust-szwb.onrender.com/)

## Technologies Used

- **Frontend**:
  - [EJS](https://github.com/mde/ejs) for templating
  - [Mapbox](https://www.mapbox.com/) for interactive maps
  - [Cloudinary](https://cloudinary.com/) for image storage and sharing
- **Backend**:
  - [Node.js](https://nodejs.org/) for server-side logic
  - [Express](https://expressjs.com/) for web server framework
- **Database**:
  - [MongoDB](https://www.mongodb.com/) for storing listings and user data
- **Authentication**:
  - [Passport.js](http://www.passportjs.org/) for managing user authentication

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   - ``` bash
      git clone https://github.com/SparshMaheshwari15/Wander-lust
     ```
   - ``` bash
     cd wanderlust
     ```
3.  **Install dependencies:**
    - ``` bash
      npm install
      ```
4.  **Set up environment variables:**
    - PORT=3000
    - MONGO_URI=your-mongodb-url
    - CLOUDINARY_URL=your-cloudinary-url
    - MAPBOX_TOKEN=your-mapbox-token
5.  **Start the development server:**
    - ``` bash
      npm start
      ```
6.  **Check MongoDB connection:**
    - Ensure that your MongoDB instance is running and that the connection string (MONGO_URI) in your .env file is correct.
7.  **View in browser:**
    - Open your browser and navigate to http://localhost:3000 to view the website.
  
## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

### Steps to Contribute:

1. **Fork the repository.**
2. **Create your feature branch:**
   - ``` bash
     git checkout -b feature/my-feature
     ```
3. **Commit your changes:**
   - ``` bash
     git commit -m 'Add some feature'
     ```
4. **Push to the branch:**
   - ``` bash
     git push origin feature/my-feature
     ```
5. **Open a pull request.**

