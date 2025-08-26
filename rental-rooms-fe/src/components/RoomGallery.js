import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { galleryImages } from "../data/RoomsImages";
import { useNavigate } from "react-router-dom";
import RoomFAQs from "./RoomFAQs";
import "../styles/main.css";

export default function RoomGallery() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredRooms = galleryImages.filter(room => {
    const search = searchTerm.toLowerCase();
    // Get translated titles/descriptions from translations
    const translatedTitle = t.gallery.rooms?.[room.id - 1]?.title?.toLowerCase() || '';
    const translatedDesc = t.gallery.rooms?.[room.id - 1]?.description?.toLowerCase() || '';
    const matchesSearch =
      room.titleKey.toLowerCase().includes(search) ||
      room.descriptionKey.toLowerCase().includes(search) ||
      translatedTitle.includes(search) ||
      translatedDesc.includes(search) ||
      (room.id && room.id.toString().toLowerCase().includes(search));

    let matchesPrice = true;
    if (priceFilter === "280") {
      matchesPrice = room.basePrice === 280;
    } else if (priceFilter === "380") {
      matchesPrice = room.basePrice === 380;
    }
    return matchesSearch && matchesPrice;
  }); // Show all rooms without limit

  // Map gallery room IDs to route paths
  const getRoomPath = (roomId) => {
    const roomMap = {
      1: "AriesSuite",
      2: "VenusSuite"
    };
    return roomMap[roomId] || "AriesSuite";
  };

  const handleRoomClick = (roomId) => {
    const roomPath = getRoomPath(roomId);
    navigate(`/rooms/${roomPath}`);
    // Scroll to top when navigating to room details
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="room-gallery-star">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="room-gallery-star">★</span>);
    }
    return stars;
  };

  const formatPrice = (basePrice) => {
    // Build translated price string using basePrice and translation labels
    const from = t.gallery?.priceLabels?.from || 'from';
    const night = t.gallery?.priceLabels?.night || '/night';
    return `${from} ${basePrice}€${night}`;
  };

  return (
    <div className="room-gallery-container">
      <h1 className="room-gallery-heading">{t.gallery.heading}</h1>
      
      {/* Search and Filter Section */}
      <div className="room-gallery-filter-section">
        <div className="room-gallery-search-container">
          <input
            type="text"
            placeholder={t.gallery.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="room-gallery-search-input"
          />
        </div>
        <div className="room-gallery-filter-container">
          <label className="room-gallery-filter-label">{t.gallery.priceFilter}</label>
          <select 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)}
            className="room-gallery-filter-select"
          >
            <option value="all">{t.gallery.priceOptions.all}</option>
            <option value="280">€280</option>
            <option value="380">€380</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <div className="room-gallery-results-count">
        {t.gallery.resultsCount(filteredRooms.length)}
      </div>

      <div className="room-gallery-grid">
        {filteredRooms.map((room) => {          
          return (
            <div key={room.id} className="room-gallery-column">
              <div 
                className="room-gallery-card"
                onMouseEnter={() => setHoveredCard(room.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="room-gallery-image-container">
                  <img 
                    src={room.image} 
                    alt={t.gallery.rooms[room.id - 1]?.title || room.titleKey} 
                    className="room-gallery-image" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRoomClick(room.id)}
                  />
                  <div className="room-gallery-price-tag">{formatPrice(room.basePrice)}</div>
                  <div className="room-gallery-availability-tag">{t.gallery.availabilityLabels?.[room.availabilityKey] || room.availabilityKey}</div>
                </div>
                <div className="room-gallery-card-content">
                  <h2 className="room-gallery-title">{t.gallery.rooms[room.id - 1]?.title || room.titleKey}</h2>
                  <div className="room-gallery-rating">
                    {renderStars(room.rating)}
                    <span className="room-gallery-rating-text">{room.rating}</span>
                  </div>
                  {/* Description removed for cleaner card look */}
                  <div className="room-gallery-amenities">
                    {room.amenities.map((amenity, index) => (
                      <span key={index} className="room-gallery-amenity-tag">
                        {t.gallery.amenityLabels?.[amenity] || amenity}
                      </span>
                    ))}
                  </div>
                  <div className="room-gallery-button-container">
                    <button 
                      className="room-gallery-view-button"
                      onClick={() => handleRoomClick(room.id)}
                    >
                      {t.gallery.viewButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* FAQ Section for both suites */}
      <RoomFAQs />
      
      {filteredRooms.length === 0 && (
        <div className="room-gallery-no-results">
          <h3>{t.gallery.noResults.title}</h3>
          <p>{t.gallery.noResults.subtitle}</p>
        </div>
      )}
    </div>
  );
}
