
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import FAQSection from "./FAQSection";
import "../room-faqs.css";

export default function RoomFAQs() {
  const { t } = useLanguage();

  const ariesFAQ = t.roomDetails?.ariesFAQ?.questions;
  const venusFAQ = t.roomDetails?.venusFAQ?.questions;
  const hasFAQ = (ariesFAQ && ariesFAQ.length > 0) || (venusFAQ && venusFAQ.length > 0);

  if (!hasFAQ) return null;

  return (
    <div className="room-faqs-container">
      <div className="room-faqs-header">
        <h2 className="room-faqs-title">
          {t.roomDetails?.faqSectionTitle || "Frequently Asked Questions"}
        </h2>
        <p className="room-faqs-subtitle">
          {t.roomDetails?.faqSectionSubtitle || "Find answers to common questions about our suites"}
        </p>
      </div>
      <div className="room-faqs-grid">
        <div className="room-faqs-column">
          <FAQSection suiteType="aries" constrained={true} />
        </div>
        <div className="room-faqs-column">
          <FAQSection suiteType="venus" constrained={true} />
        </div>
      </div>
    </div>
  );
}
