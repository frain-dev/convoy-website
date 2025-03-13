'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  // Set page title
  useEffect(() => {
    document.title = 'Convoy - Privacy Policy';
  }, []);

  return (
    <div className="mb-100px">
      {/* Page Header */}
      <section className="pt-100px desktop:pt-150px px-20px flex items-center flex-col max-w-[1280px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              delay: 0,
              ease: [0.44, 0, 0, 1]
            }
          }}
          viewport={{
            amount: 'some',
            once: true
          }}
          className="w-full flex flex-col items-start sm-old:items-center justify-center desktop:gap-6">
          <h1 className="desktop:text-center font-medium text-32 desktop:text-[40px] mb-24px max-w-[1020px] desktop:m-auto">Privacy Policy</h1>
          <p className="desktop:text-center text-[#666] text-14 desktop:text-16 max-w-[683px] m-auto mb-48px font-medium">
            Last updated: June 1, 2023
          </p>
        </motion.div>
      </section>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-20px mobile-min:px-16px py-60px">
        <div className="prose prose-lg">
          <section className="mb-40px">
            <p className="text-16 text-gray-700 mb-16px">
              This privacy notice explains how Convoy and its affiliates ("Company") collect, use, store
              and share Personal Data (as defined below) in relation to the Company's websites,
              products, services, and experiences (together, the "Services").
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">1. Applicability</h2>
            <p className="text-16 text-gray-700 mb-16px">
              1.1. This Privacy Notice ("PN") is in effect as of the date set forth below.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.2. You ("User") are not under any legal obligation to submit Personal Data to the
              Company. However, in case the User chooses not to submit Personal Data to the Company,
              the User may not be able to become a User and/or use certain Services.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.3. The Company may change this PN from time to time, therefore the User should
              check back periodically. The Company will post any changes to this PN on its websites (the
              "Site"). If the Company makes any changes to this PN that materially affect the Company's
              practices with regard to the Personal Data the Company previously collected from the User,
              the Company will endeavor to provide the User with notice in advance of such change by
              highlighting the change on the Site. The Company will seek the User's prior consent to any
              material changes, if and where this is required by Applicable Data Protection Laws (as
              defined below).
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.4. This PN does not apply to any content processed and/or stored by the User when
              using the Services. Also, the PN does not apply to any products, services, websites, links or
              any other content that is offered on the Services by third parties. The User is advised to
              check the terms of use, privacy policies of such third parties.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.5. For the purposes of (i) the General Data Protection Regulation (2016/679) ("GDPR"),
              including any subordinate or implementing legislation, (ii) the EU-US Privacy Shield
              ("Privacy Shield"), and (iii) the California Consumer Privacy Act of 2018, Cal. Civ. Code
              1798.100 et seq. ("CCPA"), as applicable (collectively, the "Applicable Data Protection
              Laws"), the Company is acting as a processor/service provider, and the User is acting as
              the controller/business, as applicable.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.6. For the purpose of this PN "Personal Data" shall mean personal data or personal
              information, as applicable in the Applicable Data Protection Law, or any other applicable
              data protection laws.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">2. Personal Data collected by the Company</h2>
            <h3 className="text-20 font-semibold text-gray-900 mb-12px">2.1. Information provided by the User</h3>
            <p className="text-16 text-gray-700 mb-16px">
              Company collects any data the User provides the Company with, including but not limited to:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">2.1.1. The User's contact details (e.g. name, email address, phone number);</li>
              <li className="text-16 text-gray-700 mb-8px">2.1.2. The User's payment information (e.g. credit card and bank account information);</li>
              <li className="text-16 text-gray-700 mb-8px">2.1.3. The User password and other authentication and security credential information;</li>
              <li className="text-16 text-gray-700 mb-8px">2.1.4. Any communication between the User and the Company, e.g. emails, phone conversations, chat sessions.</li>
            </ul>
            
            <h3 className="text-20 font-semibold text-gray-900 mb-12px">2.2. Information collected automatically</h3>
            <p className="text-16 text-gray-700 mb-16px">
              The Company automatically collects data when the User visits, interacts with, or uses the Services, including but not limited to:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">2.2.1. identifiers and information contained in cookies;</li>
              <li className="text-16 text-gray-700 mb-8px">2.2.2. The User's settings preferences, backup information;</li>
              <li className="text-16 text-gray-700 mb-8px">2.2.3. Uniform Resource Locators (URL) clickstream to, through, and from the Company's website and Services;</li>
              <li className="text-16 text-gray-700 mb-8px">2.2.4. Content the User viewed or searched for, page response times, and page interaction information (such as scrolling, clicks, and mouse-overs);</li>
              <li className="text-16 text-gray-700 mb-8px">2.2.5. network and connection information, such as the Internet protocol (IP) address and information about the User's Internet service provider;</li>
              <li className="text-16 text-gray-700 mb-8px">2.2.6. computer and device information, such as browser type and version, operating system, or time zone setting; the location of the device;</li>
            </ul>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">3. The Company's Use of Personal Data</h2>
            <p className="text-16 text-gray-700 mb-16px">
              3.1. The Company processes the User's Personal Data to operate, provide, and improve the Services, including but not limited to:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">3.1.1. creating and managing the User profiles;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.2. contacting the User by the Company and communicating with the User with respect to the Services, e.g. by phone, email, chat; responding inquiries from the User;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.3. Informing the User about updates or offers;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.4. personalizing the Services, i.e. identifying the User's interests and recommending offers that might be of interest to the User;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.5. marketing and promoting Company's Services;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.6. providing assistance and support;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.7. fulfilling the User requests; meeting contractual or legal obligations;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.8. protecting the Users security, e.g. preventing and detecting fraud;</li>
              <li className="text-16 text-gray-700 mb-8px">3.1.9. internal purposes, e.g. troubleshooting, data analysis, testing, and statistical purposes.</li>
            </ul>
            <p className="text-16 text-gray-700 mb-16px">
              3.2. The Company may ask for the User's consent to use the User's personal data for a specific purpose which will be provided to the User.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              3.3. The Company does not use any Personal Data other than as necessary to execute the Services.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">4. Cookies</h2>
            <p className="text-16 text-gray-700 mb-16px">
              4.1. The Company uses tracking mechanisms such as cookies in order to provide the Services.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              4.2. By clicking on a link to a third-party website or service, a third party may also transmit cookies to the User. This PN does not cover the use of cookies by any third parties, and Company is not responsible for such third parties' privacy policies and practices.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              4.3. The Company uses Google Analytics. Please click on www.google.com/policies/privacy/partners/ in order to find out how Google Analytics collects and processes data.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">5. Sharing Personal Data of the User for Legal Purposes</h2>
            <p className="text-16 text-gray-700 mb-16px">
              5.1. The Company may be required to retain or disclose personal information in order to:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">5.1.1. comply with applicable laws or regulations;</li>
              <li className="text-16 text-gray-700 mb-8px">5.1.2. comply with a court order, subpoena, or other legal processes;</li>
              <li className="text-16 text-gray-700 mb-8px">5.1.3. respond to a lawful request by a government authority, law enforcement agency, or similar government body (whether situated in User's jurisdiction or elsewhere);</li>
              <li className="text-16 text-gray-700 mb-8px">5.1.4. engage with third-party service providers and/or sub-contractors which provide services for the Company's business operations, a list of which can be received upon request.</li>
              <li className="text-16 text-gray-700 mb-8px">5.1.5. disclose to third parties aggregated or de-identified information about Users for marketing, advertising, research, or other purposes;</li>
              <li className="text-16 text-gray-700 mb-8px">5.1.6. disclose and/or transfer data to another entity if the Company is acquired by or merged with another company, if the Company sells or transfer a business unit or assets to another company, as part of a bankruptcy proceeding, or as part of any other similar business transfer;</li>
              <li className="text-16 text-gray-700 mb-8px">5.1.7. The Company believes release is appropriate to comply with the law, enforce or apply the Company's terms and other agreements, or protect the rights, property, or security of the Company, Users, or others. This includes exchanging information with other companies and organizations for fraud prevention and detection and credit risk reduction.</li>
            </ul>
            <p className="text-16 text-gray-700 mb-16px">
              5.2. When the Company shares the User's data with third parties as specified above, the Company requires such recipients to agree to only use the Personal Data the Company shares with them in accordance with this PN and the Company's contractual specifications and for no other purpose than those determined by the Company in line with this Privacy Policy.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">6. Sharing User Information with Third-Party Software License Provider</h2>
            <p className="text-16 text-gray-700 mb-16px">
              It shall hereby be clarified that the Company will not share any User information regarding products and services with any 3rd party software license provider unless the User agreed to such disclosure of information when purchasing such products and services.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">7. Security</h2>
            <p className="text-16 text-gray-700 mb-16px">
              The Company has taken appropriate technical and organisational measures to protect the information Company collects about the User from loss, misuse, unauthorized access, disclosure, alteration, destruction, and any other form of unauthorized processing. The User should be aware, however, that no data security measures can guarantee 100% security.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">8. Users in The European Economic Area (EEA)</h2>
            <h3 className="text-20 font-semibold text-gray-900 mb-12px">8.1. Legal Basis for Processing of Personal Data</h3>
            <p className="text-16 text-gray-700 mb-16px">
              The Company will only process the User's Personal Data if it has one or more of the following legal bases for doing so:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">8.1.1. Contractual Necessity: processing of Personal Data is necessary to enter into a contract with User, to perform Company's contractual obligations to the User under the terms of Use ("TOU"), to provide the Services, to respond to requests from the User, or to provide the User with customer support;</li>
              <li className="text-16 text-gray-700 mb-8px">8.1.2. Legitimate Interest: The Company has a legitimate interest to process the User's Personal Data;</li>
              <li className="text-16 text-gray-700 mb-8px">8.1.3. Legal Obligation: processing of the User's Personal Data is necessary to comply with relevant law and legal obligations, including to respond to lawful requests and orders; or</li>
              <li className="text-16 text-gray-700 mb-8px">8.1.4. Consent: processing of the User's Personal Data with the User's consent.</li>
            </ul>
            
            <h3 className="text-20 font-semibold text-gray-900 mb-12px">8.2. The User's Rights regarding Personal Data</h3>
            <p className="text-16 text-gray-700 mb-16px">
              8.2.1. Subject to Applicable Data Protection Laws, the User has certain rights with respect to the User's Personal Data, including the following:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">8.2.1.1. The User may ask whether Company holds Personal Data about the User and request copies of such Personal Data and information about how it is processed;</li>
              <li className="text-16 text-gray-700 mb-8px">8.2.1.2. The User may request that inaccurate Personal Data is corrected;</li>
              <li className="text-16 text-gray-700 mb-8px">8.2.1.3. The User may request the deletion of certain Personal Data;</li>
              <li className="text-16 text-gray-700 mb-8px">8.2.1.4. The User may request the Company to cease or restrict the processing of Personal Data where the processing is inappropriate;</li>
              <li className="text-16 text-gray-700 mb-8px">8.2.1.5. When the User consents to processing the User's Personal Data for a specified purpose by Company, the User may withdraw the User's consent at any time, and Company will stop any further processing of the User's data for that purpose.</li>
            </ul>
            <p className="text-16 text-gray-700 mb-16px">
              8.2.2. In certain circumstances, the Company may not be able to fully comply with the User's request, such as if it is frivolous or extremely impractical, if it jeopardizes the rights of others, or if it is not required by law, however, in those circumstances, the Company will still respond to notify the User of such a decision.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              8.2.3. The User can exercise the User's rights of access, rectification, erasure, restriction, objection, and data portability by contacting the Company at info@frain.dev. In some cases, the Company may need the User to provide the Company with additional information, which may include Personal Data, if necessary to verify the User's identity and the nature of the User's request.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">9. Users in California, USA</h2>
            <p className="text-16 text-gray-700 mb-16px">
              9.1. The Company will at all times comply with all Applicable data protection laws (including the CCPA) and only process Personal Data on User's behalf.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              9.2. The Company will (i) not collect, retain, use, or disclose Personal Data for any purpose other than for the specific purposes set out in the Company terms of use and the Data Processing Agreement between Company and the User; (ii) not sell Personal Data (as defined under the CCPA); and (iii) put in place appropriate technical and organizational measures to protect Personal Data against unauthorized or unlawful processing or accidental destruction, loss or damage.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">10. Personal Data of Children</h2>
            <p className="text-16 text-gray-700 mb-16px">
              The Company's Services are not intended for children. Children under 18 years of age, may use the Services only with the involvement of a parent or guardian.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">11. Questions regarding User's Personal Data?</h2>
            <p className="text-16 text-gray-700 mb-16px">
              If the User has any questions about this Privacy Notice or the Company data practices generally, please contact us using the following information:
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              <a href="mailto:info@frain.dev" className="text-primary-500 hover:underline">info@frain.dev</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 