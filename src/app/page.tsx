'use client';

import { useState } from 'react';
import ContactForm from '@/components/ContactForm';
import DomainList from '@/components/DomainList';
import '@/styles/globals.css';

const domainCategories = [
  {
    id: 'futurnrg',
    title: 'Future Energy',
    domains: [
      'futurenergies.com',
      'futurenergie.com',
      'energiefuture.com',
      'futurenergy.com',
      'futurenergie.ca',
      'futurenergie.org',
      'futurenergies.ca',
      'futurenergies.org',
      'futurenergy.ca'
    ]
  },
  {
    id: 'btu-nrg',
    title: 'BTU Energie',
    domains: [
      'btuenergie.com',
      'btuenergies.com'
    ]
  },
  {
    id: 'epure-nrg',
    title: 'ePure Energie',
    domains: [
      'epurenergie.com',
      'epurenergies.com',
      'epurenergy.com'
    ]
  },
  {
    id: 'paradise-nrg',
    title: 'Paradise Energie',
    domains: [
      'paradisenergie.com',
      'paradisenergies.com',
      'paradisenergy.com'
    ]
  },
  {
    id: 'natural-nrg',
    title: 'Natural Energies',
    domains: [
      'energienaturelle.com',
      'naturalenergies.com',
      'energiesnaturelles.com'
    ]
  },
  {
    id: 'your-nrg',
    title: 'Your Energies',
    domains: [
      'yourenergies.com',
      'yourenergie.com'
    ]
  },
  {
    id: 'arbeit',
    title: 'Arbeit',
    domains: [
      'arbeit4u.com',
      'arbeitathome.com',
      'arbeitatwork.com',
      'arbeitforu.com',
      'arbeitforyou.com',
      'arbeithouse.com',
      'arbeitsystem.com',
      'arbeitsysteme.com'
    ]
  },
  {
    id: 'building',
    title: 'Building',
    domains: [
      'nubuilding.com',
      'selfhouse.com',
      'angelhome.com'
    ]
  },
  {
    id: 'boatel',
    title: 'Floating Hotel',
    domains: [
      'boastel.com',
      'floastel.com',
      'baostel.ca',
      'boastel.ca',
      'floastel.ca'
    ]
  },
  {
    id: 'capital',
    title: 'Capital / Investissement',
    domains: [
      'distresscapitals.com',
      'returncapitals.com',
      'returninvestment.ca',
      'distresscapital.ca',
      'returncapital.ca'
    ]
  },
  {
    id: 'fondaction',
    title: 'Super Fondations',
    domains: [
      'superfondations.ca',
      'superfondations.com'
    ]
  },
  {
    id: 'misc',
    title: 'Miscellaneous',
    domains: [
      'houmph.com',
      'houmphe.com',
      'houph.com',
      'uetro.com'
    ]
  }
];

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>('');

  const handleDomainClick = (domain: string) => {
    setSelectedDomain(domain);
    setShowForm(true);
  };

  return (
    <>
      <div id="sale_banner">
        <h1>Domains for sale</h1>
      </div>
      
      <div className="wrapper">
        <section id="intro">
          <h2>Purchase the following domain names!</h2>
          <h3>You can buy them individually or as a family.</h3>
          <p>Click on a domain name to contact me or by using <a href="http://godaddy.ca">GoDaddy</a></p>
        </section>

        {domainCategories.map((category) => (
          <DomainList
            key={category.id}
            id={category.id}
            title={category.title}
            domains={category.domains}
            onDomainClick={handleDomainClick}
          />
        ))}
      </div>

      <ContactForm
        isVisible={showForm}
        onClose={() => setShowForm(false)}
        selectedDomain={selectedDomain}
      />

      <section id="footer">
        <p>Page crafted by <a href="http://www.symboles.ca" target="_blank">Symbole Branding.</a></p>
      </section>
    </>
  );
}