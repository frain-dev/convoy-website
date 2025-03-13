'use client';
import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DPA() {
  // Set page title
  useEffect(() => {
    document.title = 'Convoy - Data Processing Addendum (DPA)';
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
          <h1 className="desktop:text-center font-medium text-32 desktop:text-[40px] mb-24px max-w-[1020px] desktop:m-auto">Data Processing Addendum (DPA)</h1>
          <p className="desktop:text-center text-[#666] text-14 desktop:text-16 max-w-[683px] m-auto mb-48px font-medium">
            Last updated: June 1, 2024
          </p>
        </motion.div>
      </section>

      {/* DPA Content */}
      <div className="max-w-4xl mx-auto px-20px mobile-min:px-16px py-60px">
        <div className="prose prose-lg">
          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">1. Introduction</h2>
            <p className="text-16 text-gray-700 mb-16px">
              This Data Processing Addendum ("DPA") forms part of the Agreement between Convoy Technologies Inc. ("Convoy", "we", "us") and the Customer as defined in the Agreement ("Customer", "you"). This DPA reflects the parties' agreement with respect to the processing of Customer Personal Data by Convoy on behalf of Customer in connection with the Services.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              All capitalized terms not defined herein shall have the meaning set forth in the Agreement.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">2. Definitions</h2>
            <p className="text-16 text-gray-700 mb-16px">
              For the purposes of this DPA, the following terms shall have the meanings set out below:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">
                <strong>"Customer Personal Data"</strong> means any Personal Data that Convoy processes on behalf of Customer in connection with Convoy's provision of the Services.
              </li>
              <li className="text-16 text-gray-700 mb-8px">
                <strong>"Data Protection Laws"</strong> means all data protection and privacy laws applicable to the processing of Personal Data under the Agreement, including, where applicable, EU Data Protection Law.
              </li>
              <li className="text-16 text-gray-700 mb-8px">
                <strong>"EU Data Protection Law"</strong> means (i) Regulation 2016/679 of the European Parliament and of the Council on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection Regulation) ("GDPR"); and (ii) Directive 2002/58/EC concerning the processing of personal data and the protection of privacy in the electronic communications sector.
              </li>
              <li className="text-16 text-gray-700 mb-8px">
                <strong>"Personal Data"</strong> means any information relating to an identified or identifiable natural person.
              </li>
              <li className="text-16 text-gray-700 mb-8px">
                <strong>"Security Incident"</strong> means any unauthorized or unlawful breach of security that leads to the accidental or unlawful destruction, loss, alteration, unauthorized disclosure of or access to Customer Personal Data.
              </li>
              <li className="text-16 text-gray-700 mb-8px">
                <strong>"Services"</strong> means the services and other activities to be provided by Convoy to Customer pursuant to the Agreement.
              </li>
              <li className="text-16 text-gray-700 mb-8px">
                <strong>"Subprocessor"</strong> means any processor engaged by Convoy to assist in fulfilling its obligations with respect to providing the Services pursuant to the Agreement or this DPA.
              </li>
            </ul>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">3. Processing of Customer Personal Data</h2>
            <p className="text-16 text-gray-700 mb-16px">
              Convoy shall process Customer Personal Data only for the purposes described in this DPA and only in accordance with Customer's documented lawful instructions. The parties agree that this DPA and the Agreement set out the Customer's complete and final instructions to Convoy in relation to the processing of Customer Personal Data.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              Convoy shall promptly inform Customer if, in Convoy's opinion, any instructions from Customer infringe any applicable Data Protection Laws.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">4. Data Security</h2>
            <p className="text-16 text-gray-700 mb-16px">
              Convoy shall implement and maintain appropriate technical and organizational security measures to protect Customer Personal Data from Security Incidents and to ensure the security and confidentiality of Customer Personal Data. These measures include, at a minimum:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">Encryption of personal data during transit and at rest</li>
              <li className="text-16 text-gray-700 mb-8px">Ability to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services</li>
              <li className="text-16 text-gray-700 mb-8px">Ability to restore the availability and access to personal data in a timely manner in the event of a physical or technical incident</li>
              <li className="text-16 text-gray-700 mb-8px">A process for regularly testing, assessing, and evaluating the effectiveness of technical and organizational measures for ensuring the security of the processing</li>
            </ul>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">5. Subprocessing</h2>
            <p className="text-16 text-gray-700 mb-16px">
              Customer agrees that Convoy may engage Subprocessors to process Customer Personal Data on Customer's behalf. Convoy shall ensure that any Subprocessor it engages to process Customer Personal Data has entered into a written agreement that requires the Subprocessor to abide by terms no less protective than those provided in this DPA.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              Convoy shall make available to Customer a current list of Subprocessors for the Services, including the identities of those Subprocessors and their country of location. Convoy shall update the list of Subprocessors on its website prior to adding or replacing a Subprocessor.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">6. International Transfers</h2>
            <p className="text-16 text-gray-700 mb-16px">
              Convoy may transfer and process Customer Personal Data anywhere in the world where Convoy, its Affiliates or its Subprocessors maintain data processing operations. Convoy shall at all times provide an adequate level of protection for the Customer Personal Data processed, in accordance with the requirements of Data Protection Laws.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">7. Return or Deletion of Data</h2>
            <p className="text-16 text-gray-700 mb-16px">
              Upon termination or expiration of the Agreement, Convoy shall, at Customer's election, delete or return to Customer all Customer Personal Data in Convoy's possession or control, except to the extent Convoy is required by applicable law to retain some or all of the Customer Personal Data.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">8. Assistance</h2>
            <p className="text-16 text-gray-700 mb-16px">
              Convoy shall provide reasonable assistance to Customer with:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">Responding to individuals exercising their rights under applicable Data Protection Laws</li>
              <li className="text-16 text-gray-700 mb-8px">Implementing appropriate technical and organizational measures to ensure a level of security appropriate to the risk</li>
              <li className="text-16 text-gray-700 mb-8px">Conducting privacy impact assessments and prior consultations with supervisory authorities, if required</li>
              <li className="text-16 text-gray-700 mb-8px">Investigating and remediating Security Incidents</li>
            </ul>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">9. Contact Information</h2>
            <p className="text-16 text-gray-700 mb-16px">
              For questions about this DPA or to exercise your rights, please contact us at:
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              <a href="mailto:privacy@getconvoy.io" className="text-primary-500 hover:underline">privacy@getconvoy.io</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 