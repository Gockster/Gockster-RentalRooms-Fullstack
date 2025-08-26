import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { ariesSuiteImages } from "../data/RoomsImages";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styles/main.css";
import {
  Home,
  Ruler,
  Wifi,
  Users,
  Bath,
  Snowflake,
  Building,
  ShowerHead,
  Bell,
  Sparkles,
  Calendar,
  Coffee,
  Waves,
  Plane,
  MapPin,
  Car,
  Utensils,
  Zap,
  Clock,
  Wind,
  Plug,
  Shirt,
  TreePine,
  DoorOpen,
  Flame,
  Receipt,
  Luggage,
  Languages,
  ArrowUp
} from "lucide-react";
import Booking from './Booking';
import { useSelector } from 'react-redux';

export default function AriesSuite() {
  const { t, currentLanguage } = useLanguage();
  const images = ariesSuiteImages;
  const [mainImage, setMainImage] = useState(images[0]);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const initialImageCount = 4; // Show first 4 images initially

  const displayedImages = showAllImages ? images : images.slice(0, initialImageCount);
  const enlargedIndex = enlargedImage ? images.indexOf(enlargedImage) : -1;
  const goToNext = (e) => {
    e.stopPropagation();
    if (enlargedIndex !== -1) {
      setEnlargedImage(images[(enlargedIndex + 1) % images.length]);
    }
  };
  const goToPrev = (e) => {
    e.stopPropagation();
    if (enlargedIndex !== -1) {
      setEnlargedImage(images[(enlargedIndex - 1 + images.length) % images.length]);
    }
  };

  const userId = useSelector((state) => state.user.userId);

  return (
    <div className="App">
      <Navbar />
      <main className="room-detail-main">
        <div className="room-detail-container">
          <div className="room-header">
            <div className="room-breadcrumb">
              <a href="/" className="breadcrumb-link">{t.footer?.quickLinks?.home}</a>
              <span className="breadcrumb-separator"></span>
              <a href="/#rooms" className="breadcrumb-link">{t.footer?.quickLinks?.rooms}</a>
              <span className="breadcrumb-separator"></span>
              <span className="breadcrumb-current">
                {currentLanguage === 'en' ? 'Aries Suite' : 'Aries Suite'}
              </span>
            </div>
            <div className="room-title-section">
              <h1 className="room-title">
                {currentLanguage === 'en' ? 'Aries Suite' : 'Aries Suite'}
              </h1>
              <p className="room-subtitle">
                <MapPin size={16} className="map-pin" />
                <a
                  href={t.roomDetails?.ariesAddressLink || "https://www.google.com/maps/place/Kalliarchi+9,+Mykonos+846+00,+Greece"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.roomDetails?.ariesAddress || "Kalliarchi 9, Mykonos Chora, 846 00, Greece"}
                </a>
              </p>
            </div>
          </div>
          <div className="room-content">
            <div className="room-gallery-section">
              <div className="room-main-image">
                <img
                  src={mainImage}
                  alt={currentLanguage === 'en' ? 'Aries Suite' : 'Σουίτα Αρης'}
                  className="main-room-image"
                  onClick={() => {
                    setEnlargedImage(mainImage);
                    setShowAllImages(true); // Show all images when opening lightbox
                  }}
                />
              </div>
              <div className="room-thumbnail-gallery">
                {displayedImages.map((img, idx) => (
                  <img
                    key={img}
                    src={img}
                    alt={`Room view ${idx + 1}`}
                    className={`thumbnail ${mainImage === img ? 'selected' : ''}`}
                    onClick={() => setMainImage(img)}
                    onDoubleClick={() => {
                      setEnlargedImage(img);
                      setShowAllImages(true); // Show all images when opening lightbox
                    }}
                  />
                ))}
                {images.length > initialImageCount && (
                  <div className="show-more-container">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowAllImages(!showAllImages)}
                    >
                      {showAllImages
                        ? (t.roomDetails?.showLess || 'Show Less')
                        : (t.roomDetails?.showMore ? `${t.roomDetails.showMore} (${images.length - initialImageCount} ${t.roomDetails?.more || 'more'})` : `Show More (${images.length - initialImageCount} more)`)}
                    </button>
                  </div>
                )}
              </div>
              {enlargedImage && (
                <div className="lightbox-overlay" style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  background: 'rgba(0,0,0,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1000
                }} onClick={() => setEnlargedImage(null)}>
                  {/* Prev arrow */}
                  <button onClick={goToPrev} style={{
                    position: 'absolute',
                    left: 32,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 48,
                    color: '#fff',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1001
                  }} aria-label="Previous">‹</button>
                  {/* Next arrow */}
                  <button onClick={goToNext} style={{
                    position: 'absolute',
                    right: 32,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 48,
                    color: '#fff',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1001
                  }} aria-label="Next">›</button>
                  <img src={enlargedImage} alt="Enlarged" className="enlarged-image" />
                  <button onClick={() => setEnlargedImage(null)} style={{
                    position: 'absolute',
                    top: 32,
                    right: 32,
                    fontSize: 32,
                    color: '#fff',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1001
                  }} aria-label="Close">×</button>
                  <div style={{
                    position: 'absolute',
                    bottom: 48,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1002
                  }}>
                    <a href="tel:+306955217820" className="btn btn-primary btn-large" style={{ textDecoration: 'none', color: 'white' }}>
                      {t.roomDetails?.forBookingCall || 'For booking call us on'} <span role="img" aria-label="phone">📞</span> +30 6955217820
                      <br />
                      {t.roomDetails?.forBookingCall || 'For booking call us on'} <span role="img" aria-label="phone">📞</span> +30 6947203554
                    </a>
                  </div>
                </div>
              )}
              <div className="room-facilities-hero">
                <h3>{t.roomDetails?.facilities || 'Facilities'}</h3>
                <div className="amenities-grid">
                  <div className="amenity-item">
                    <span className="amenity-icon"><Home size={20} /></span>
                    <span>{t.roomDetails?.entirePlace || 'Entire place to yourself'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Ruler size={20} /></span>
                    <span>{t.roomDetails?.size42 || '42 m² size'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Wifi size={20} /></span>
                    <span>{t.roomDetails?.freeWifi || 'Free WiFi'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><ShowerHead size={20} /></span>
                    <span>{t.roomDetails?.privateBathroom || 'Private Bathroom'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Snowflake size={20} /></span>
                    <span>{t.roomDetails?.airConditioning || 'Air Conditioning'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Building size={20} /></span>
                    <span>{t.roomDetails?.balcony || 'Balcony'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Building size={20} /></span>
                    <span>{t.roomDetails?.terrace || 'Terrace'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Bath size={20} /></span>
                    <span>{t.roomDetails?.bathOrShower || 'Bath or Shower'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Bell size={20} /></span>
                    <span>{t.roomDetails?.frontDesk24 || '24-hour Front Desk'}</span>
                  </div>
                  <div className="amenity-item">
                    <span className="amenity-icon"><Sparkles size={20} /></span>
                    <span>{t.roomDetails?.dailyHousekeeping || 'Daily Housekeeping'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="room-details-section">
              <div className="room-info">
                <h2 className="section-title">
                  {t.roomDetails?.aboutProperty || 'About This Property'}
                  <span className="room-license" style={{ marginLeft: 12, fontSize: 13, color: '#888', fontWeight: 500, verticalAlign: 'middle' }}>
                    {t.licenseLabel} 00001625992
                  </span>
                </h2>

                {/* Property Description */}
                <div className="property-description">
                  <p>
                    {t.roomDetails?.ariesDescription1 || "The entire place is yours. ARIES Suite in Mykonos offers a holiday home with comfortable accommodation featuring 42 m² of space, two bedrooms and two bathrooms."}
                  </p>
                  <p>
                    {t.roomDetails?.ariesDescription2 || "The property features 2 bathrooms with bath or shower, and free toiletries and hair dryer are provided."}
                  </p>
                  <p>
                    {t.roomDetails?.ariesDescription3 || "The reception staff speaks Arabic, Greek and English."}
                  </p>
                  <p>
                    {t.roomDetails?.ariesDescription4 || "Near ARIES Suite you will find popular attractions such as Mykonos Old Port, Mykonos Windmills and Little Venice. Mykonos Airport is 3 km away from the property."}
                  </p>
                </div>

                <h3 className="section-title">
                  {t.roomDetails?.suiteSpecifications || 'Suite Specifications'}
                </h3>
                <div className="room-specs">
                  <div className="spec-item">
                    <span className="spec-icon"><Ruler size={24} /></span>
                    <div className="spec-info">
                      <h4>{t.roomDetails?.size || 'Size'}</h4>
                      <p>42 m²</p>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon"><Home size={24} /></span>
                    <div className="spec-info">
                      <h4>{t.roomDetails?.bedrooms || 'Bedrooms'}</h4>
                      <p>{t.roomDetails?.twoBedroomsTwo || '2 Bedrooms'}</p>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon"><ShowerHead size={24} /></span>
                    <div className="spec-info">
                      <h4>{t.roomDetails?.bathrooms || 'Bathrooms'}</h4>
                      <p>{t.roomDetails?.twoBathrooms || '2 Private Bathrooms'}</p>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon"><Users size={24} /></span>
                    <div className="spec-info">
                      <h4>{t.roomDetails?.guests || 'Guests'}</h4>
                      <p>{t.roomDetails?.upToGuests || 'Up to 4 people'}</p>
                    </div>
                  </div>
                </div>
                <div className="room-pricing">
                  <h3>{t.roomDetails?.pricing || 'Pricing'}</h3>
                  <div className="price-info">
                    <span className="price">{t.gallery?.priceLabels?.from || 'from'} 380€{t.gallery?.priceLabels?.night || '/night'}</span>
                  </div>
                  <div className="availability-status available">
                    <span className="status-indicator"></span>
                    <span>{t.gallery?.availabilityLabels?.Available || 'Available'}</span>
                  </div>
                </div>
                {!enlargedImage && (
                  <div className="room-actions">
                    <a href="tel:+306955217820" className="btn btn-primary btn-large" style={{ textDecoration: 'none', color: 'white' }}>
                      {t.roomDetails?.forBookingCall || 'For booking call us on'} <span role="img" aria-label="phone">📞</span> +30 6955217820
                      <br />
                      {t.roomDetails?.forBookingCall || 'For booking call us on'} <span role="img" aria-label="phone">📞</span> +30 6947203554
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ margin: '32px 0' }}>
          <Booking roomId="1" userId={userId} />
        </div>

        {/* Property Area Section - Full Width */}
        <div style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          backgroundColor: '#f8f9fa',
          padding: '60px 20px',
          marginTop: '40px',
          marginBottom: '0'
        }}>
          <div className="nearby-attractions">
            <h2>
              {t.roomDetails?.propertyArea || 'Property Area'}
            </h2>

            <div className="attractions-grid">
              {/* Nearby Attractions */}
              <div className="attractions-section">
                <h3>
                  <Building size={24} className="section-icon" />
                  {t.roomDetails?.whatsNearby || "What's nearby"}
                </h3>
                <div className="attractions-list">
                  <div className="attraction-item">
                    <span>{t.roomDetails?.littleVenice || 'Little Venice'}</span>
                    <span className="attraction-distance">150 μ.</span>
                  </div>
                  <div className="attraction-item">
                    <span>{t.roomDetails?.meletopoulouGarden || 'Meletopoulou Municipal Garden'}</span>
                    <span className="attraction-distance">150 μ.</span>
                  </div>
                  <div className="attraction-item">
                    <span>{t.roomDetails?.mykonosWindmills || 'Mykonos Windmills'}</span>
                    <span className="attraction-distance">350 μ.</span>
                  </div>
                  <div className="attraction-item">
                    <span>{t.roomDetails?.archaeologicalMuseum || 'Archaeological Museum of Mykonos'}</span>
                    <span className="attraction-distance">500 μ.</span>
                  </div>
                  <div className="attraction-item">
                    <span>{t.roomDetails?.fabricaSquare || 'Fabrica Square'}</span>
                    <span className="attraction-distance">500 μ.</span>
                  </div>
                  <div className="attraction-item">
                    <span>{t.roomDetails?.tholosTomb || 'Tholos Tomb of Mykonos'}</span>
                    <span className="attraction-distance">1,6 χλμ.</span>
                  </div>
                  <div className="attraction-item">
                    <span>{t.roomDetails?.armenistisLighthouse || 'Armenistis Lighthouse'}</span>
                    <span className="attraction-distance">5 χλμ.</span>
                  </div>
                  <div className="attraction-item">
                    <span>{t.roomDetails?.neolithicSettlement || 'Neolithic Settlement of Ftelia Mykonos'}</span>
                    <span className="attraction-distance">6 χλμ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.gyziCastle || 'Gyzi Castle'}</span>
                    <span style={{ color: '#666' }}>7 χλμ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.roomDetails?.stadiumDistrict || 'Stadium District'}</span>
                    <span style={{ color: '#666' }}>10 χλμ.</span>
                  </div>
                </div>
              </div>

              {/* Restaurants & Cafes */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#28a745', display: 'flex', alignItems: 'center' }}>
                  <Coffee size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.restaurantsCafes || 'Restaurants & Cafes'}
                </h3>
                <div style={{ fontSize: '15px', lineHeight: '1.8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.cafeBarRoom101 || 'Cafe/Bar Room 101'}</span>
                    <span style={{ color: '#666' }}>20 μ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.cafeBarBoutique || 'Cafe/Bar Boutique di Vito'}</span>
                    <span style={{ color: '#666' }}>3 μ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.roomDetails?.cafeBarPaloma || 'Cafe/Bar Paloma Bar'}</span>
                    <span style={{ color: '#666' }}>20 μ.</span>
                  </div>
                </div>
              </div>

              {/* Nearby Beaches */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#17a2b8', display: 'flex', alignItems: 'center' }}>
                  <Waves size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.nearbyBeaches || 'Nearby Beaches'}
                </h3>
                <div style={{ fontSize: '15px', lineHeight: '1.8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.agiaAnnaBeach || 'Agia Anna Beach'}</span>
                    <span style={{ color: '#666' }}>200 μ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.agiosCharalamposBeach || 'Agios Charalampos Beach'}</span>
                    <span style={{ color: '#666' }}>550 μ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.megaliAmmosBeach || 'Megali Ammos Beach'}</span>
                    <span style={{ color: '#666' }}>950 μ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.korfosBeach || 'Korfos Beach'}</span>
                    <span style={{ color: '#666' }}>1,6 χλμ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.roomDetails?.tourlosBeach || 'Tourlos Beach'}</span>
                    <span style={{ color: '#666' }}>1,7 χλμ.</span>
                  </div>
                </div>
              </div>

              {/* Nearest Airports */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#dc3545', display: 'flex', alignItems: 'center' }}>
                  <Plane size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.nearestAirports || 'Nearest Airports'}
                </h3>
                <div style={{ fontSize: '15px', lineHeight: '1.8' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.mykonosAirport || 'Mykonos Airport'}</span>
                    <span style={{ color: '#666' }}>1,9 χλμ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>{t.roomDetails?.syrosAirport || 'Syros Airport'}</span>
                    <span style={{ color: '#666' }}>42 χλμ.</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t.roomDetails?.naxosAirport || 'Naxos State Airport'}</span>
                    <span style={{ color: '#666' }}>49 χλμ.</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#666', fontStyle: 'italic' }}>
                {t.roomDetails?.distanceDisclaimer || 'Approximate shortest walking or driving distances are shown. Actual distances may differ.'}
              </p>
            </div>
          </div>
        </div>

        {/* ARIES Suite Amenities Section - Full Width */}
        <div style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          backgroundColor: '#ffffff',
          padding: '60px 20px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', color: '#333' }}>
              {t.roomDetails?.ariesSuiteAmenities || 'ARIES Suite Amenities'}
            </h2>




            {/* Most Popular Amenities */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff', textAlign: 'center' }}>
                <Sparkles size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                {t.roomDetails?.mostPopularAmenities || 'Most Popular Amenities'}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <Wifi size={20} style={{ marginRight: '10px', color: '#28a745' }} />
                  <span>{t.roomDetails?.freeWiFiAmenity || 'Free Wi-Fi'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                  <Bell size={20} style={{ marginRight: '10px', color: '#28a745' }} />
                  <span>{t.roomDetails?.reception24Amenity || '24-hour Reception'}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>

              {/* Perfect for your stay */}
              <div style={{
                backgroundColor: '#f8f9fa',
                padding: '25px',
                borderRadius: '12px',
                border: '1px solid #e0e0e0'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff', display: 'flex', alignItems: 'center' }}>
                  <Home size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.perfectForStay || 'Perfect for your stay'}
                </h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ShowerHead size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.privateBathroomAmenity || 'Private Bathroom'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Snowflake size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.airConditioning || 'Air Conditioning'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Building size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.balcony || 'Balcony'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Wifi size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.freeWifi || 'Free Wi-Fi'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Building size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.terrace || 'Terrace'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bath size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.bathOrShowerAmenity || 'Bath or Shower'}</span>
                  </div>
                </div>
              </div>

              {/* Parking */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#dc3545', display: 'flex', alignItems: 'center' }}>
                  <Car size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.parking || 'Parking'}
                </h3>
                <p style={{ margin: '0', color: '#666' }}>
                  {t.roomDetails?.noParkingAvailable || 'No parking available.'}
                </p>
              </div>

              {/* Internet */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#28a745', display: 'flex', alignItems: 'center' }}>
                  <Wifi size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.internet || 'Internet'}
                </h3>
                <p style={{ margin: '0', color: '#666' }}>
                  {t.roomDetails?.wifiAvailableInfo || 'Wi-Fi is available throughout and is not charged.'}
                </p>
              </div>

              {/* Kitchen */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#ff8c00', display: 'flex', alignItems: 'center' }}>
                  <Utensils size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.kitchen || 'Kitchen'}
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Utensils size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.diningTable || 'Dining table'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Zap size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.electricKettle || 'Electric kettle'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Building size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.refrigerator || 'Refrigerator'}</span>
                  </div>
                </div>
              </div>

              {/* Bedroom */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', color: '#6f42c1', display: 'flex', alignItems: 'center' }}>
                  <Home size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.bedroom || 'Bedroom'}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Clock size={18} style={{ marginRight: '10px', color: '#666' }} />
                  <span>{t.roomDetails?.alarmClock || 'Alarm clock'}</span>
                </div>
              </div>

              {/* Bathroom */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#17a2b8', display: 'flex', alignItems: 'center' }}>
                  <ShowerHead size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.bathroom || 'Bathroom'}
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Building size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.toiletPaper || 'Toilet paper'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Sparkles size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.towels || 'Towels'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bath size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.bathOrShowerAmenity || 'Bath or shower'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ShowerHead size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.privateBathroomAmenity || 'Private bathroom'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Sparkles size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.freeToiletries || 'Free toiletries'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Wind size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.hairDryer || 'Hair dryer'}</span>
                  </div>
                </div>
              </div>

              {/* Living Room */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#795548', display: 'flex', alignItems: 'center' }}>
                  <Home size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.livingRoom || 'Living Room'}
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Utensils size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.diningArea || 'Dining area'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Home size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.sofa || 'Sofa'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Home size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.seatingArea || 'Seating area'}</span>
                  </div>
                </div>
              </div>

              {/* Room Amenities */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#e91e63', display: 'flex', alignItems: 'center' }}>
                  <Home size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.roomAmenities || 'Room Amenities'}
                </h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Plug size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.socketNearBed || 'Socket near bed'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Shirt size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.heatedClothesRack || 'Heated clothes rack'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Shirt size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.clothesDryingRack || 'Clothes drying rack'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TreePine size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.woodenOrParquetFlooring || 'Wooden or parquet flooring'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Building size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.tiledMarbleFlooring || 'Tiled/marble flooring'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DoorOpen size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.privateEntrance || 'Private entrance'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Flame size={18} style={{ marginRight: '10px', color: '#666' }} />
                    <span>{t.roomDetails?.heating || 'Heating'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Additional Services */}
            <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>

              {/* Reception Services */}
              <div style={{
                backgroundColor: '#e3f2fd',
                padding: '25px',
                borderRadius: '12px'
              }}>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1976d2', display: 'flex', alignItems: 'center' }}>
                  <Bell size={20} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.receptionServices || 'Reception Services'}
                </h4>
                <div style={{ display: 'grid', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Receipt size={16} style={{ marginRight: '8px', color: '#666' }} />
                    {t.roomDetails?.invoiceProvision || 'Invoice provision possible'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Luggage size={16} style={{ marginRight: '8px', color: '#666' }} />
                    {t.roomDetails?.luggageStorage || 'Luggage storage (extra charge)'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Clock size={16} style={{ marginRight: '8px', color: '#666' }} />
                    {t.roomDetails?.expressCheckInOut || 'Express check-in/out (extra charge)'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Bell size={16} style={{ marginRight: '8px', color: '#666' }} />
                    {t.roomDetails?.reception24Hours || '24-hour reception'}
                  </div>
                </div>
              </div>

              {/* Cleaning Services */}
              <div style={{
                backgroundColor: '#e8f5e8',
                padding: '25px',
                borderRadius: '12px'
              }}>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#2e7d32', display: 'flex', alignItems: 'center' }}>
                  <Sparkles size={20} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.cleaningServices || 'Cleaning Services'}
                </h4>
                <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center' }}>
                  <Sparkles size={16} style={{ marginRight: '8px', color: '#666' }} />
                  {t.roomDetails?.dailyHousekeepingExtra || 'Daily housekeeping (extra charge)'}
                </div>
              </div>

              {/* Languages */}
              <div style={{
                backgroundColor: '#fff3e0',
                padding: '25px',
                borderRadius: '12px'
              }}>
                <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#f57c00', display: 'flex', alignItems: 'center' }}>
                  <Languages size={20} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.communicationLanguages || 'Communication Languages'}
                </h4>
                <div style={{ display: 'grid', gap: '5px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Languages size={16} style={{ marginRight: '8px', color: '#666' }} />
                    {t.roomDetails?.arabic || 'Arabic'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Languages size={16} style={{ marginRight: '8px', color: '#666' }} />
                    {t.roomDetails?.greek || 'Greek'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Languages size={16} style={{ marginRight: '8px', color: '#666' }} />
                    {t.roomDetails?.english || 'English'}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Property Rules Section - Full Width */}
        <div style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          backgroundColor: '#f8f9fa',
          padding: '60px 20px',
          borderTop: '1px solid #e0e0e0'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', color: '#333' }}>
              {t.roomDetails?.propertyRulesPolicies || 'Property Rules & Policies'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>

              {/* Check-in/Check-out */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#007bff', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.checkInOut || 'Check-in/Check-out'}
                </h3>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    {t.roomDetails?.checkInTime || 'Check-in'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                    {t.roomDetails?.checkInHours || 'From 3:00 PM to 8:00 PM'}
                  </p>
                  <p style={{ fontSize: '13px', color: '#888', fontStyle: 'italic' }}>
                    {t.roomDetails?.checkInAdvanceNotice || 'You must inform the property in advance about your arrival time.'}
                  </p>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    {t.roomDetails?.checkOutTime || 'Check-out'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {t.roomDetails?.checkOutHours || 'From 8:00 AM to 12:00 PM'}
                  </p>
                </div>
              </div>



              {/* Children and Beds */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#28a745', display: 'flex', alignItems: 'center' }}>
                  <Home size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.childrenBeds || 'Children and Beds'}
                </h3>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    {t.roomDetails?.childrenPolicies || 'Children Policies'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {t.roomDetails?.childrenNotAllowed || 'Children are not allowed.'}
                  </p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    {t.roomDetails?.cribExtraBedPolicies || 'Crib and Extra Bed Policies'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {t.roomDetails?.noCribsExtraBeds || 'This property does not have cribs and extra beds available.'}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
                    {t.roomDetails?.noAgeRestrictions || 'No Age Restrictions'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {t.roomDetails?.noAgeRestrictionsCheckIn || 'There are no age restrictions for check-in.'}
                  </p>
                </div>
              </div>

              {/* Property Policies */}
              <div style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#6f42c1', display: 'flex', alignItems: 'center' }}>
                  <Building size={24} style={{ marginRight: '10px' }} />
                  {t.roomDetails?.propertyPolicies || 'Property Policies'}
                </h3>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <Wind size={18} style={{ marginRight: '8px', color: '#dc3545' }} />
                    {t.roomDetails?.smokingPolicy || 'Smoking Policy'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {t.roomDetails?.smokingNotAllowed || 'Smoking is not allowed.'}
                  </p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <Sparkles size={18} style={{ marginRight: '8px', color: '#dc3545' }} />
                    {t.roomDetails?.parties || 'Parties'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {t.roomDetails?.partiesNotAllowed || 'Parties or events are not allowed.'}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                    <Home size={18} style={{ marginRight: '8px', color: '#dc3545' }} />
                    {t.roomDetails?.pets || 'Pets'}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    {t.roomDetails?.petsNotAllowed || 'Pets are not allowed.'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* Go to Top Button */}
      <div className="go-to-top-container">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="go-to-top-btn"
        >
          <ArrowUp size={20} />
        </button>
      </div>

      <Footer />
    </div>
  );
}
