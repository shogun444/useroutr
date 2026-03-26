import React from "react";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Useroutr",
    "url": "https://useroutr.com",
    "logo": "https://useroutr.com/logo.svg",
    "sameAs": [
      "https://twitter.com/useroutr",
      "https://github.com/useroutr",
      "https://linkedin.com/company/useroutr"
    ],
    "description": "Unified payment infrastructure for fiat and crypto. Accept any currency, settle globally in seconds on Stellar."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Useroutr Protocol",
    "applicationCategory": "FinancialApplication",
    "operatingSystem": "Web",
    "abstract": "One API for fiat and crypto payments. Accept cards, bank transfers, and digital assets — settle globally in seconds.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
