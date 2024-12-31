import React from 'react';
import Layout from '@/components/Layout';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-blue-800 font-medium">Privacy First Approach</h3>
              <p className="text-blue-700 mt-2">
                SuperGIF operates entirely in your browser. We do not collect, store, or process any personal information. Your privacy is our top priority.
              </p>
            </div>
          </div>
        </div>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">1. Information Collection</h2>
          <p className="text-gray-600">
            We want to be completely transparent about our data practices:
            <ul className="list-disc ml-5 mt-2">
              <li>No personal information is collected</li>
              <li>No cookies are used</li>
              <li>No user tracking is implemented</li>
              <li>No data is sent to our servers</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">2. Local Processing</h2>
          <p className="text-gray-600">
            All operations are performed locally:
            <ul className="list-disc ml-5 mt-2">
              <li>GIF generation happens entirely in your browser</li>
              <li>No content is uploaded to any server</li>
              <li>All generated content remains on your device</li>
              <li>Browser storage is only used for temporary processing</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">3. Third-Party Services</h2>
          <p className="text-gray-600">
            Important information about external services:
            <ul className="list-disc ml-5 mt-2">
              <li>We don't integrate with any third-party analytics services</li>
              <li>No social media trackers are present on our site</li>
              <li>No advertisements are displayed</li>
              <li>No external content delivery networks are used</li>
            </ul>
          </p>
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h3 className="text-yellow-800 font-medium">Social Media Integration Notice</h3>
            <p className="text-yellow-700 mt-2">
              Our application includes social media sharing buttons that:
              <ul className="list-disc ml-5 mt-2">
                <li>Only activate when explicitly clicked</li>
                <li>May redirect you to respective social media platforms</li>
                <li>Do not automatically share any data with social media platforms</li>
                <li>Are implemented using Font Awesome icons under appropriate licensing</li>
              </ul>
              When using social sharing features, please be aware that:
              <ul className="list-disc ml-5 mt-2">
                <li>External platforms have their own privacy policies</li>
                <li>Sharing actions are entirely user-initiated</li>
                <li>You can choose which platforms to share content on</li>
                <li>We don't track or store your sharing activities</li>
              </ul>
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">4. Data Security</h2>
          <p className="text-gray-600">
            Your security is ensured through:
            <ul className="list-disc ml-5 mt-2">
              <li>Local-only processing of all content</li>
              <li>No data transmission to external servers</li>
              <li>No storage of user information</li>
              <li>Secure HTTPS connection for website access</li>
            </ul>
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">5. User Rights</h2>
          <p className="text-gray-600">
            As we don't collect any personal data, you maintain complete control over your content and privacy. You have the right to:
            <ul className="list-disc ml-5 mt-2">
              <li>Create content without any data collection</li>
              <li>Use the service anonymously</li>
              <li>Clear your browser data at any time</li>
              <li>Know that your content remains private</li>
            </ul>
          </p>
        </section>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            For privacy-related questions, please contact us. Return to <Link to="/" className="text-blue-600 hover:underline">home page</Link>.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
