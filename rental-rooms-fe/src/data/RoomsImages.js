// Room images data for the rental rooms application

export const heroImages = [
    {
        url: "/images/RoomsImages/room-nana-01.jpg",
        title: "Welcome to Nana's Rooms",
        subtitle: "Authentic Mykonos accommodations in the heart of Chora"
    },
    {
        url: "/images/RoomsImages/room-nana-04.webp",
        title: "Comfortable & Stylish",
        subtitle: "Modern amenities with traditional Cycladic charm"
    },
    {
        url: "/images/RoomsImages/room-nana-05.webp",
        title: "Perfect Location",
        subtitle: "Steps away from Mykonos town's vibrant nightlife"
    },
    {
        url: "/images/RoomsImages/room-nana-52.jpg",
        title: "Cozy Retreats",
        subtitle: "Your home away from home in beautiful Mykonos"
    },
    {
        url: "/images/RoomsImages/room-nana-20.jpg",
        title: "Island Living",
        subtitle: "Experience the magic of Greek island hospitality"
    },
    {
        url: "/images/RoomsImages/room-nana-51.jpg",
        title: "Unforgettable Stays",
        subtitle: "Create memories that will last a lifetime"
    }
];

export const ariesSuiteImages = [
    '/images/AriesSuiteImages/702526181.jpg',
    '/images/AriesSuiteImages/694316674.jpg',
    '/images/AriesSuiteImages/694316677.jpg',
    '/images/AriesSuiteImages/694316680.jpg',
    '/images/AriesSuiteImages/694316685.jpg',
    '/images/AriesSuiteImages/694316688.jpg',
    '/images/AriesSuiteImages/694316693.jpg',
    '/images/AriesSuiteImages/694316669.jpg',
    '/images/AriesSuiteImages/694316697.jpg',
    '/images/AriesSuiteImages/694316700.jpg',
    '/images/AriesSuiteImages/694316704.jpg',
    '/images/AriesSuiteImages/694316706.jpg',
    '/images/AriesSuiteImages/694791749.jpg',
    '/images/AriesSuiteImages/694792234.jpg',
    '/images/AriesSuiteImages/694792456.jpg',
    '/images/AriesSuiteImages/702516530.jpg',
    '/images/AriesSuiteImages/702517626.jpg',
    '/images/AriesSuiteImages/702518229.jpg',
    '/images/AriesSuiteImages/702524775.jpg',
    '/images/AriesSuiteImages/702524904.jpg',
    '/images/AriesSuiteImages/702525647.jpg',
    '/images/AriesSuiteImages/702526042.jpg',
    '/images/AriesSuiteImages/702526067.jpg',
    '/images/AriesSuiteImages/702526149.jpg',
    '/images/AriesSuiteImages/702526881.jpg',
    '/images/AriesSuiteImages/702526920.jpg',
];

export const venusSuiteImages = [
    '/images/VenusSuiteImages/456521685.jpg',
    '/images/VenusSuiteImages/456522156.jpg',
    '/images/VenusSuiteImages/456522406.jpg',
    '/images/VenusSuiteImages/456522482.jpg',
    '/images/VenusSuiteImages/456523743.jpg',
    '/images/VenusSuiteImages/456524322.jpg',
    '/images/VenusSuiteImages/693917436.jpg',
    '/images/VenusSuiteImages/693919085.jpg',
    '/images/VenusSuiteImages/693920045.jpg',
    '/images/VenusSuiteImages/693921018.jpg',
    '/images/VenusSuiteImages/694289325.jpg',
    '/images/VenusSuiteImages/694298135.jpg',
    '/images/VenusSuiteImages/694298246.jpg',
    '/images/VenusSuiteImages/694298569.jpg',
    '/images/VenusSuiteImages/694298685.jpg',
    '/images/VenusSuiteImages/694298714.jpg',
    '/images/VenusSuiteImages/694298798.jpg',
    '/images/VenusSuiteImages/694298911.jpg',
    '/images/VenusSuiteImages/694299028.jpg',
    '/images/VenusSuiteImages/694300456.jpg',
    '/images/VenusSuiteImages/694303489.jpg',
    '/images/VenusSuiteImages/702512349.jpg',
];

export const galleryImages = [
    {
        id: 1,
        titleKey: "aries-suite",
        descriptionKey: "aries-suite", 
        image: "/images/AriesSuiteImages/694316674.jpg",
        basePrice: 380,
        amenities: ["Free Wi-Fi", "Air Conditioning", "24/7 Reception", "Entire place to yourself", "Private Bathroom"],
        rating: 4.9,
        availabilityKey: "Available"
    },
    {
        id: 2,
        titleKey: "venus-suite",
        descriptionKey: "venus-suite",
        image: "/images/VenusSuiteImages/456521685.jpg",
        basePrice: 280,
        amenities: ["Free Wi-Fi", "Air Conditioning", "Balcony", "Entire place to yourself"],
        rating: 4.8,
        availabilityKey: "Available"
    }
];

export const collageImages = [
    { src: "/images/RoomsImages/room-nana-03.jpg", alt: "Modern Interior" },
    { src: "/images/RoomsImages/room-nana-08.jpg", alt: "Relaxing View" },
    { src: "/images/RoomsImages/room-nana-46.jpg", alt: "Family Room" },
    { src: "/images/RoomsImages/room-nana-22.jpg", alt: "Comfortable Space" },
    { src: "/images/RoomsImages/room-nana-29.jpg", alt: "Comfortable Space" },
    { src: "/images/RoomsImages/room-nana-30.jpg", alt: "Premium Amenities" },


];


export default {
    heroImages,
    galleryImages,
    collageImages,
    ariesSuiteImages,
    venusSuiteImages
};
