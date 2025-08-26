import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "../styles/main.css";
import { collageImages } from "../data/RoomsImages";

export default function WelcomeSection() {
    const { t } = useLanguage();

   

    const [enlargedImage, setEnlargedImage] = useState(null);

    return (
        <section className="welcome-section">
            <div className="welcome-container">
                <div className="welcome-content">
                    <div className="welcome-text">
                        <h2 className="welcome-title">
                            {t.welcome?.title}
                        </h2>
                        <h3 className="welcome-subtitle">
                            {t.welcome?.subtitle}
                        </h3>
                        <p className="welcome-description">
                            {t.welcome?.description}
                        </p>
                    </div>

                    <div className="welcome-collage">
                        <div className="mosaic-collage-board">
                            {collageImages.map((image, index) => (
                                <div
                                    key={index}
                                    className={`mosaic-tile tile-${index + 1}`}
                                    onClick={() => setEnlargedImage(image)}
                                    style={{ cursor: 'zoom-in' }}
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="mosaic-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {enlargedImage && (
                <div
                    className="image-modal-overlay"
                    onClick={() => setEnlargedImage(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        cursor: 'zoom-out',
                    }}
                >
                    <img
                        src={enlargedImage.src}
                        alt={enlargedImage.alt}
                        style={{
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            borderRadius: '16px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                            background: '#fff',
                        }}
                        onClick={e => e.stopPropagation()}
                    />
                    <button
                        onClick={() => setEnlargedImage(null)}
                        style={{
                            position: 'absolute',
                            top: 24,
                            right: 32,
                            background: 'rgba(0,0,0,0.5)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            fontSize: 24,
                            cursor: 'pointer',
                            zIndex: 10000,
                        }}
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>
            )}
        </section>
    );
}
