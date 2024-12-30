import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms and Conditions</h1>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-red-800 font-medium">Important Disclaimer</h3>
              <p className="text-red-700 mt-2">
                SuperGIF is intended for entertainment purposes only. Users are strictly prohibited from creating content that:
                <ul className="list-disc ml-5 mt-2">
                  <li>Promotes hate speech or discrimination</li>
                  <li>Contains explicit, violent, or inappropriate content</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Violates any local, state, or federal laws</li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing and using SuperGIF, you accept and agree to be bound by these terms and conditions. If you do not agree with any part of these terms, you must not use our service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">2. User Responsibilities</h2>
          <p className="text-gray-600">
            You are responsible for:
            <ul className="list-disc ml-5 mt-2">
              <li>All content created using our service</li>
              <li>Ensuring you have necessary rights to any content you use</li>
              <li>Using the service in compliance with all applicable laws</li>
              <li>Maintaining the security of your access and data</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">3. Prohibited Uses</h2>
          <p className="text-gray-600">
            You must not use SuperGIF to:
            <ul className="list-disc ml-5 mt-2">
              <li>Create or distribute harmful, offensive, or inappropriate content</li>
              <li>Violate any intellectual property rights</li>
              <li>Attempt to bypass any security measures</li>
              <li>Engage in any illegal activities</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">4. Intellectual Property</h2>
          <p className="text-gray-600">
            <ul className="list-disc ml-5 mt-2">
              <li>SuperGIF and its original content are protected by copyright and other intellectual property laws</li>
              <li>Users retain rights to their original content</li>
              <li>Users must not use copyrighted material without permission</li>
              <li>Social media icons and fonts are used under appropriate licenses:
                <ul className="list-disc ml-5 mt-2 text-sm">
                  <li>Font Awesome icons are used under Font Awesome Free License</li>
                  <li>Social media logos and trademarks belong to their respective owners</li>
                  <li>We do not claim ownership of these third-party assets</li>
                  <li>All social sharing features are provided for user convenience and comply with respective platform policies</li>
                </ul>
              </li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">5. Third-Party Services</h2>
          <p className="text-gray-600">
            When using social sharing features:
            <ul className="list-disc ml-5 mt-2">
              <li>Clicking social media share buttons may redirect you to respective platforms</li>
              <li>Each platform's own terms of service and privacy policies will apply</li>
              <li>We are not responsible for data handling on external platforms</li>
              <li>Social sharing is optional and at user's discretion</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">6. Limitation of Liability</h2>
          <p className="text-gray-600">
            SuperGIF is provided "as is" without warranties of any kind. We are not liable for:
            <ul className="list-disc ml-5 mt-2">
              <li>Any damages arising from the use of our service</li>
              <li>Content created or shared by users</li>
              <li>Technical issues or service interruptions</li>
              <li>Loss of data or content</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">7. Termination</h2>
          <p className="text-gray-600">
            We reserve the right to terminate or suspend access to our service immediately, without prior notice, for any violation of these terms.
          </p>
        </section>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            For questions about these terms, please contact us. Return to <Link to="/" className="text-blue-600 hover:underline">home page</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
