
import React from 'react';
import { ExternalLink } from 'lucide-react';

const PartnersSection = () => {
  const partners = [
    {
      name: "World Bank",
      logo: "/lovable-uploads/07bc5a34-26a8-4d14-b24d-ebf582a291a2.png",
      url: "https://www.worldbank.org/ext/en/home",
      description: "International financial institution"
    },
    {
      name: "GIZ - Deutsche Gesellschaft für Internationale Zusammenarbeit",
      logo: "/lovable-uploads/03da2489-b5d9-4ef9-a336-17f5577be107.png",
      url: "https://www.giz.de/en/html/index.html",
      description: "German development cooperation"
    },
    {
      name: "Kingdom of the Netherlands",
      logo: "/lovable-uploads/62fc071f-2296-4662-bb53-8ab59daf1917.png",
      url: "https://www.government.nl/",
      description: "Dutch government partnership"
    },
    {
      name: "Federal Ministry of Environment",
      logo: "/lovable-uploads/ac87a574-7382-4e97-ad0a-a35cbd727447.png",
      url: "https://environment.gov.ng/",
      description: "Nigeria's federal environmental authority"
    },
    {
      name: "UNFCCC - United Nations Framework Convention on Climate Change",
      logo: "/lovable-uploads/cc5f4c51-e9a0-4a5e-b220-dea6b8aa2af6.png",
      url: "https://unfccc.int/",
      description: "UN climate change framework"
    },
    {
      name: "Foreign, Commonwealth & Development Office",
      logo: "/lovable-uploads/eaafbd0d-35ea-43bc-b455-53a0c3170af1.png",
      url: "https://www.gov.uk/government/organisations/foreign-commonwealth-development-office",
      description: "UK development office"
    },
    {
      name: "PACE - Partnership for Agile Governance and Climate Engagement",
      logo: "/lovable-uploads/53e28d02-49a9-4eab-b616-e66dcad85211.png",
      url: "https://www.pacenigeria.org/",
      description: "Climate governance partnership"
    },
    {
      name: "UNIDO - United Nations Industrial Development Organization",
      logo: "/lovable-uploads/e89dbfaa-4478-4c75-ab79-53c592abe20c.png",
      url: "https://www.unido.org/",
      description: "UN industrial development"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-white border-t border-gray-200">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ministry of Environment and Climate Change - Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Working together with international and national organizations to build a sustainable future for Kano State and Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="group">
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-4px] border border-gray-100"
              >
                <div className="h-20 flex items-center justify-center mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-kano-primary transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {partner.description}
                  </p>
                  <div className="flex items-center justify-center text-kano-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={14} className="mr-1" />
                    <span className="text-xs font-medium">Visit Website</span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            These partnerships enable us to leverage international expertise, funding, and best practices 
            to address environmental challenges and implement sustainable development initiatives across Kano State.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
