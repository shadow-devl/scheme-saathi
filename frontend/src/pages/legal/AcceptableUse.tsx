import LegalLayout from '../../components/LegalLayout';

export default function AcceptableUse() {
  return (
    <LegalLayout title="Acceptable Use Policy" lastUpdated="10 September 2026">
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Overview</h2>
          <p>
            This Acceptable Use Policy ("AUP") outlines the acceptable and prohibited uses of the Scheme Saathi 
            platform. By using the platform, you agree to comply with this AUP.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Prohibited Activities</h2>
          <p>You may not use the Scheme Saathi platform to:</p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>Violate any local, state, national, or international law or regulation.</li>
            <li>Transmit any material that is abusive, harassing, tortious, defamatory, vulgar, pornographic, obscene, libelous, or otherwise objectionable.</li>
            <li>Transmit any unsolicited or unauthorized advertising, promotional materials, junk mail, spam, chain letters, or any other form of solicitation.</li>
            <li>Upload or distribute any computer viruses, worms, or any software intended to damage or alter a computer system or data.</li>
            <li>Attempt to gain unauthorized access to the platform, other users' accounts, or computer systems or networks connected to the platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Enforcement</h2>
          <p>
            Scheme Saathi reserves the right, but does not assume the obligation, to investigate any violation 
            of this AUP or misuse of the platform. We may report any activity that we suspect violates any law 
            or regulation to appropriate law enforcement officials, regulators, or other appropriate third parties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Reporting Violations</h2>
          <p>
            If you become aware of any violation of this AUP, you are required to immediately notify us at 
            <a href="mailto:security@schemesaathi.com" className="text-primary hover:underline ml-1">security@schemesaathi.com</a>.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
}
