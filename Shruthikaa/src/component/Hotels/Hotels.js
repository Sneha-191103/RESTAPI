import React, { useState, useEffect } from "react";
import NavBar from "../pages/navbar";
import Footer from "../AdminAccess/footer";
import '../css/hotel.css'
import '../logobg.png'
import { getHotels } from "../Service/Api";
import { FaSearch } from "react-icons/fa";
import { GrSearch } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function Hotels() {
  const [hotel, setHotels] = useState([]);
  const [loading, setLoading] = useState(true)
 //const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(''); // State for selected location
  const [searchEnabled, setSearchEnabled] = useState(true); // State to enable/disable search
  const [searchError, setSearchError] = useState('');

  const getHotel= async () => {
    
    try {
      const response = await getHotels()
      setHotels(response.data);
      setLoading(false)
  }

  catch (error) {
      console.log(error);
  }
        
    
}
useEffect(() => {
  getHotel();
}, [])
  const hotels = [
    {
      name:'KFC',
      address:'KFC, SN T10, No 67/71, Brookefields Estates, Dr Krishnasamy Mudaliyar Rd, Puthiyavan Nagar, Sukrawar Pettai, R.S. Puram, Coimbatore, Tamil Nadu 641001',
      image:'https://i.pinimg.com/564x/bd/7b/44/bd7b4479e2aa587eeea39d93dfb49a13.jpg',
      rating:'4',
      location:'coimbatore'
  },
  {
      name:'Annapoorna',
      address:'75, E Arokiasamy Rd, R.S. Puram, Coimbatore, Tamil Nadu 641002',
      image:'https://i.pinimg.com/564x/7b/36/0b/7b360b3dbadbbfdfbdeed591bfcdb832.jpg',
      rating:'3',
      location:'coimbatore'
  },
  {
      name:'Hotel Kokarako',
      address:'Hotel kokarakko, Avinashi Rd, opp. decathlon, Cexus Nagar, Neelambur, Tamil Nadu 641062',
      image:'https://i.pinimg.com/564x/84/0e/a3/840ea3c543522958fa5d59a9b37e7ce2.jpg',
      rating:'4',
      location:'coimbatore'
  },
  {
      name:'Hydrebad Briyani',
      address:'Hyderabad Biryani, 2X87+2QG, Gokhale St, Peranaidu Layout, Ram Nagar, Gandhipuram, Coimbatore, Tamil Nadu 641009',
      image:'https://i.pinimg.com/564x/b8/3b/a9/b83ba9935bd964fd25b7043a6ff5b598.jpg',
      rating:'4',
      location:'coimbatore'
  },
  {
      name:'Sri Krishna Sweets',
      address:'Sri Krishna Sweets, Avinashi Road, Peelamedu, Hope College, Coimbatore, Tamil Nadu',
      image:'https://i.pinimg.com/564x/7d/df/d0/7ddfd0f25a1c58c279e110e5404b2b73.jpg',
      rating:'4',
      location:'coimbatore'
  }
  ];


  // useEffect(() => {
  //   // Trigger search when a location is selected
  //   if (selectedLocation) {
  //     handleSearch();
  //   }
  // }, [selectedLocation]);

  // const handleLocationChange = (value) => {
  //   setSelectedLocation(value);
    
  // };

  // const handleSearch = () => {
  //   if (!selectedLocation) {
  //     setSearchError('Please select a location before searching.');
  //     return;
  //   }

  //   setSearchError(''); // Clear any previous error messages

  //   const filtered = hotel.filter((hotel) =>
  //     Object.values(hotel).some(
  //       (value) =>
  //         value &&
  //         value.toString().toLowerCase().includes(searchQuery.toLowerCase())
  //     ) &&
  //     hotel.location.toLowerCase().includes(selectedLocation.toLowerCase())
  //   );

  //   setFilteredHotels(filtered);
  // };

  return (
    <div>
      <NavBar />
      <div style={{ padding: "50px 50px 50px 50px" }} className="hotels">
        {/* <LocationDropdown
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
        />
        <div>{selectedLocation}</div>
        <SearchBar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          searchEnabled={searchEnabled}
          onSearchQueryChange={(value) => setSearchQuery(value)}
        />
        {searchError && <div className="error-message">{searchError}</div>}
        <br></br> */}
        <div class="card-container">
          {hotel.length === 0 ? (
            <h1><center>No hotels found</center></h1>
          ) : (
            <div class="row">
              {hotel.map((hotel) => (
                <Link to={`/menu/${hotel.hotelName}`} key={hotel.hotelName}>
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        {/* <img src={hotel.image} width="400px" height="300px" alt={hotel.name} /> */}
                        <div>
                          <h1>{hotel.hotelName}{hotel.hid}</h1>
                        </div>
                      </div>
                      <div class="flip-card-back">
                        {/* <div>Location: <b>{hotel.address}</b></div> */}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const LocationDropdown = ({ selectedLocation, onLocationChange }) => {
  return (
    <div className="location-dropdown">
      <select
        value={selectedLocation}
        onChange={(e) => onLocationChange(e.target.value)}
      >
        <option value="">Select location...</option>
        <option value="Coimbatore">Coimbatore</option>
        <option value="Location2">Location 2</option>
        {/* Add more location options as needed */}
      </select>
    </div>
  );
};

const SearchBar = ({ onSearch, searchQuery, searchEnabled, onSearchQueryChange }) => {
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by hotel name..."
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        disabled={!searchEnabled} // Disable input until a location is selected
      />
      <GrSearch onClick={handleSearchClick} style={{ fontSize: '30px' }} className="icon" />
    </div>
  );
};
