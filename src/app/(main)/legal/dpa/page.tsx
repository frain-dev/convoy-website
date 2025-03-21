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
            Last updated: March, 19, 2025
          </p>
        </motion.div>
      </section>

      {/* DPA Content */}
      <div className="max-w-4xl mx-auto px-20px mobile-min:px-16px py-60px">
        <div className="prose prose-lg">
          <section className="mb-40px">
            <p className="text-16 text-gray-700 mb-16px">
              This Data Processing Addendum ("DPA") is entered into between Convoy ("Processor" or "Service Provider") and the User ("Controller" or "Business"), collectively referred to as the "Parties," and forms an integral part of the Terms of Service or other applicable agreement governing the use of Convoy's services (the "Agreement").
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              This DPA outlines the responsibilities and obligations of the Parties regarding the processing of personal data under applicable data protection laws, including but not limited to the General Data Protection Regulation (GDPR), the UK Data Protection Act 2018, the California Consumer Privacy Act (CCPA), and other relevant privacy laws. It includes provisions on data processing, security measures, international data transfers, and data subject rights.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">1. Definitions</h2>
            <p className="text-16 text-gray-700 mb-16px">
              1.1 <strong>"Applicable Data Protection Laws"</strong>: Refers to all laws and regulations relating to privacy and data protection, including GDPR, UK GDPR, CCPA, and any other applicable laws governing personal data processing.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.2 <strong>"Personal Data"</strong>: Any information relating to an identified or identifiable natural person as defined under the GDPR, CCPA, or other applicable laws.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.3 <strong>"Processing"</strong>: Any operation or set of operations performed on Personal Data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, dissemination, alignment, restriction, erasure, or destruction.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.4 <strong>"Sub-Processor"</strong>: Any third party engaged by Convoy to process Personal Data on behalf of the User.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              1.5 <strong>"Standard Contractual Clauses (SCCs)"</strong>: The contractual clauses adopted by the European Commission for the lawful transfer of Personal Data outside the EEA.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">2. Scope and Role of the Parties</h2>
            <p className="text-16 text-gray-700 mb-16px">
              2.1 <strong>Roles of the Parties</strong>: The User acts as the Controller, and Convoy acts as the Processor in relation to Personal Data. Where applicable, Convoy may act as a "Service Provider" under the CCPA.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              2.2 <strong>Processing Purposes</strong>: Convoy processes Personal Data solely to provide webhook delivery and related services, in accordance with documented User instructions. Convoy shall not process Personal Data for any other purposes.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">3. Data Processing Obligations</h2>
            <p className="text-16 text-gray-700 mb-16px">
              3.1 <strong>Controller Instructions</strong>: Convoy shall process Personal Data only in accordance with the User's documented instructions unless required by law. If Convoy is required by law to process Personal Data beyond the agreed instructions, it shall notify the User unless legally prohibited.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              3.2 <strong>Confidentiality</strong>: Convoy ensures that personnel authorized to process Personal Data are subject to confidentiality obligations.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              3.3 <strong>Security Measures</strong>: Convoy implements appropriate technical and organizational measures to protect Personal Data against unauthorized access, loss, alteration, or destruction, including:
            </p>
            <ul className="list-disc pl-24px mb-16px">
              <li className="text-16 text-gray-700 mb-8px">Encryption of data at rest and in transit</li>
              <li className="text-16 text-gray-700 mb-8px">Access controls and authentication mechanisms</li>
              <li className="text-16 text-gray-700 mb-8px">Continuous security monitoring and logging</li>
              <li className="text-16 text-gray-700 mb-8px">Regular security audits and penetration testing</li>
            </ul>
            <p className="text-16 text-gray-700 mb-16px">
              3.4 <strong>Assistance to the Controller</strong>: Convoy shall assist the User in ensuring compliance with GDPR obligations, including responding to Data Subject requests and conducting data protection impact assessments.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
		    3.5 <strong>Controller Attestation Requirement:</strong> The User/Controller warrants that the personal data provided to Convoy has been collected and processed in accordance with GDPR requirements, including obtaining valid consent from data subjects where required, or having another lawful basis and providing necessary privacy notices. The User/Controller further acknowledges responsibility for the lawfulness of the data provided.
	    </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">4. Sub-Processing</h2>
            <p className="text-16 text-gray-700 mb-16px">
              4.1 <strong>Authorized Sub-Processors</strong>: The User authorizes Convoy to engage Sub-Processors for service delivery. Convoy shall ensure Sub-Processors meet the same data protection obligations.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              4.2 <strong>Notice of Changes</strong>: Convoy shall provide advance notice of new Sub-Processors. The User may object to new Sub-Processors based on reasonable privacy concerns.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              4.3 A list of Convoy's current authorized Sub-Processors (the “List”) is available to the User at <a href="https://trust.getconvoy.io/subprocessors" className="text-primary-500 hover:underline">https://trust.getconvoy.io/subprocessors</a>. Such List may be updated by Convoy from time to time.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              4.4. If the User reasonably objects to an engagement in accordance with Section 4.2, and Convoy cannot provide a commercially reasonable alternative within a reasonable period of time, the User may discontinue the use of the affected Service by providing written notice to Convoy. Discontinuation shall not relieve the User of any fees owed to Convoy under the Main Agreement.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              4.5. If the User does not object to the engagement of a Sub-Processor in accordance with Section 4.2 within fourteen (14) days of notice by Convoy, that Sub-Processor will be deemed an authorized Sub-Processor for the purposes of this DPA.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              4.6. Convoy shall only disclose the personal data to a Sub-Processor on documented instructions from the User or in alignment with this DPA.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">5. International Data Transfers</h2>
            <p className="text-16 text-gray-700 mb-16px">
              5.1 <strong>Data Residency</strong>: Convoy operates separate environments in the EU and the US. EU Personal Data is processed within the EU.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              5.2 <strong>Standard Contractual Clauses (SCCs)</strong>: If data transfers outside the EU are necessary, Convoy shall rely on SCCs as the legal basis.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
	      5.3 <strong>Description of Transfers</strong>: This section outlines the processing activities that Convoy will carry out on behalf of the User, as detailed in Appendix A below.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
		    5.4 <strong>Notification of Conflicting Local Laws:</strong> Convoy will promptly notify the User if it becomes aware of any local laws, regulations, or practices in its country of operation that may prevent it from fulfilling its obligations under the Standard Contractual Clauses. In such cases, Convoy will cooperate with the User to assess the impact and, where required, implement appropriate supplementary safeguards to ensure the protection of personal data.
	    </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">6. Data Subject Rights</h2>
            <p className="text-16 text-gray-700 mb-16px">
              6.1 <strong>User Assistance</strong>: Convoy shall assist the User in responding to data subject requests under GDPR and CCPA.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              6.2 <strong>Deletion Requests</strong>: Convoy shall delete Personal Data upon request from the user unless legally required to retain it.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
	      6.3 <strong>Requests Notification:</strong> Convoy will promptly notify the User/Controller of any data subject request (including rectification, erasure, objection, or restriction) received directly, unless prohibited by law. Convoy will not respond to such requests without written instruction from the User/Controller.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">7. Data Breach Notification</h2>
            <p className="text-16 text-gray-700 mb-16px">
              7.1 <strong>Incident Response</strong>: Convoy shall notify the User without undue delay upon becoming aware of a Personal Data Breach.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              7.2 <strong>Breach Details</strong>: The notification shall include the nature of the breach, affected data, mitigation steps, and recommendations.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">8. Retention and Deletion</h2>
            <p className="text-16 text-gray-700 mb-16px">
              8.1 <strong>Data Retention</strong>: Personal Data is retained for the duration of the User's active account. Webhook data retention is configurable by the User.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              8.2 <strong>Data Deletion</strong>: Upon termination of services, Convoy shall delete or return Personal Data within 60 days unless required by law to retain it.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">9. Governing Law</h2>
            <p className="text-16 text-gray-700 mb-16px">
              9.1 <strong>Applicable Law</strong>: This DPA is governed by the laws of the <strong>State of California</strong> unless EU data protection laws require otherwise.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              9.2 <strong>Dispute Resolution</strong>: Any disputes shall be resolved through arbitration or as agreed in the primary Agreement.
            </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">10. Compliance Monitoring & Review</h2>
            <p className="text-16 text-gray-700 mb-16px">
              10.1 <strong>Regular Compliance Reviews</strong>: Convoy will conduct periodic reviews to ensure continued compliance with applicable data protection laws and the Standard Contractual Clauses (SCCs). Any amendments to the SCCs, changes in applicable Data Protection Laws, or outcomes of internal compliance reviews will be reflected in updates to this DPA.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
	      10.2 <strong>DPA Changes</strong>: Convoy reserves the right to amend or update this DPA at any time to reflect changes in legal requirements, business practices, or SCC amendments.
	    </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">11. General</h2>

              <p className="text-16 text-gray-700 mb-16px">
Convoy’s liability under or in connection with this DPA, including under the SCCs, is subject to the exclusions and limitations on liability contained in the Main Agreement.
	      </p>

              <p className="text-16 text-gray-700 mb-16px">
If any provision of this DPA is, for any reason, held to be invalid or unenforceable, the other provisions of the DPA will remain enforceable.
	      </p>

              <p className="text-16 text-gray-700 mb-16px">
This DPA is the final, complete and exclusive agreement of the parties with respect to the subject matter hereof and supersedes and merges all prior discussions and agreements between the parties with respect to such subject matter.
	      </p>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">Appendix A: Data Processing Details</h2>
            <p className="text-16 text-gray-700 mb-16px">
              This appendix outlines the subject matter, duration, and scope of processing activities as required under Article 28(3) of the GDPR. Convoy maintains records of processing activities and ensures regulatory compliance.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              This DPA, including its annexes and SCCs, forms an essential part of the Agreement between Convoy and the User, ensuring compliance with all applicable data protection laws.
            </p>
            <p className="text-16 text-gray-700 mb-16px">
              <strong>Description of Transfers (SCC Annex I)</strong>
            </p>
            <div className="overflow-x-auto mb-16px">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-16 font-semibold text-left">Specification</th>
                    <th className="border border-gray-300 px-4 py-2 text-16 font-semibold text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Data Subjects</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">Administrative users, end customers, third-party providers.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Categories of Personal Data</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">Name, email, IP address, authentication data, webhook payloads, metadata.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Sensitive Data</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">Not applicable unless customers include such data.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Frequency of Transfers</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">Continuous and on-demand webhook processing.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Nature of Processing</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">Webhook transmission, event routing, logging, monitoring.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Purpose of Transfer</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">Delivering webhook services securely and reliably.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Data Retention</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">Data is retained based on user configuration or deleted upon request.</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 text-16 font-medium">Supervisory Authority</td>
                    <td className="border border-gray-300 px-4 py-2 text-16">The EU member state's data protection authority where the User is based.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-40px">
            <h2 className="text-24 font-semibold text-gray-900 mb-16px">Contact Information</h2>
            <p className="text-16 text-gray-700 mb-16px">
              For questions about this DPA or to exercise your rights, please contact us at <a href="mailto:security@getconvoy.io" className="text-primary-500 hover:underline">security@getconvoy.io</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 
