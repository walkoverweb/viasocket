import Footer from '@/components/footer/footer';
import Navbar from '@/components/navbar/navbar';
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp';
import { getFooterData, getMetaData, getNavData } from '@/utils/getData';
import { FOOTER_FIELDS, METADATA_FIELDS, NAVIGATION_FIELDS } from '@/const/fields';

export async function getStaticProps() {
    const navData = await getNavData(NAVIGATION_FIELDS);
    const footerData = await getFooterData(FOOTER_FIELDS);
    const metaData = await getMetaData(METADATA_FIELDS, `filter=name='/data-deletion-policy'`);
    return {
        props: {
            navData: navData || [],
            footerData: footerData || [],
            metaData: metaData[0] || {},
        },
    };
}

export default function DataDeletionPolicy({ navData, footerData, metaData }) {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/data-deletion-policy'} />

            <div className="container pt-8">
                <Navbar navData={navData} utm={'/data-deletion-policy'} />
            </div>
            <div className="container mb-4 mt-28">
                <div data-custom-class="body" className="cont gap-6">
                    <div>
                        <strong>
                            <h1 style={{ fontSize: '26px' }}>
                                <span data-custom-class="title">Data Deletion Policy</span>
                            </h1>
                        </strong>
                        <span data-custom-class="body_text">
                            At viaSocket, we respect your privacy and are committed to ensuring that your data is
                            handled securely and transparently. This Data Deletion Policy outlines how users can request
                            the deletion of their data and the processes we follow to comply with such requests.
                        </span>
                    </div>

                    <div></div>
                    <div>
                        <strong>1. Scope of Policy</strong>
                        <p data-custom-class="body_text">
                            This policy applies to all data collected, processed, and stored by viaSocket in connection
                            with our platform and services.
                        </p>
                    </div>
                    <div>
                        <strong>2. Your Right to Delete Your Data</strong>
                        <p data-custom-class="body_text">
                            You have the right to request the deletion of your personal data that viaSocket holds. This
                            includes but is not limited to:
                        </p>
                        <ul>
                            <li>Account information</li>
                            <li>Workflow and integration data</li>
                            <li>Associated files or logs</li>
                        </ul>
                    </div>
                    <div>
                        <strong>3. How to Request Data Deletion</strong>
                        <p data-custom-class="body_text">To request the deletion of your data, you may:</p>
                        <ul>
                            <li>
                                Contact Support: Send an email to{' '}
                                <a className="text-link" href="mailTo:support@viasocket.com">
                                    support@viasocket.com
                                </a>{' '}
                                with the subject line "Data Deletion Request."
                            </li>
                            <li>
                                Provide Information: Include the following details in your email:
                                <ul>
                                    <li>Your registered email address</li>
                                    <li>Workspace name</li>
                                    <li>A brief description of the data you wish to delete</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>4. Verification Process</strong>
                        <p data-custom-class="body_text">
                            To ensure the security of your account and prevent unauthorized deletion requests, we may:
                        </p>
                        <ul>
                            <li>Request verification of your identity</li>
                            <li>Confirm your ownership of the workspace associated with the request</li>
                        </ul>
                    </div>
                    <div>
                        <strong>5. Processing Timeline</strong>
                        <p data-custom-class="body_text">Once your request has been verified, we will:</p>
                        <ul>
                            <li>Acknowledge receipt of your request within 5 business days</li>
                            <li>
                                Complete the deletion process within 30 calendar days, unless retention is required by
                                law or for legitimate business purposes
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>6. Limitations</strong>
                        <p data-custom-class="body_text">Certain data may not be eligible for deletion if:</p>
                        <ul>
                            <li>It is required to comply with legal obligations</li>
                            <li>It is necessary for resolving disputes or enforcing agreements</li>
                            <li>It is part of anonymized datasets that cannot identify you</li>
                        </ul>
                    </div>
                    <div>
                        <strong>7. Effect of Deletion</strong>
                        <p data-custom-class="body_text">
                            Deleting your data may impact your ability to use viaSocket services. Once data is deleted:
                        </p>
                        <ul>
                            <li>It cannot be recovered</li>
                            <li>
                                Any associated workflows or integrations relying on that data will cease to function
                            </li>
                        </ul>
                    </div>
                    <div>
                        <strong>8. Retention Periods</strong>
                        <p data-custom-class="body_text">
                            If you do not submit a deletion request, viaSocket retains your data as outlined in our
                            Privacy Policy. This helps us maintain and improve our services while complying with legal
                            requirements.
                        </p>
                    </div>
                    <div>
                        <strong>9. Changes to This Policy</strong>
                        <p data-custom-class="body_text">
                            We may update this policy from time to time to reflect changes in our practices or for other
                            operational, legal, or regulatory reasons. Any updates will be posted on this page with the
                            date of revision.
                        </p>
                    </div>
                    <div>
                        <p data-custom-class="body_text">Last Updated: 10/01/2025</p>
                        <p data-custom-class="body_text">
                            For questions or concerns about this policy, please contact us at{' '}
                            <a className="text-link" href="mailTo:support@viasocket.com">
                                support@viasocket.com
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>
            <div className="container py-16">
                <Footer footerData={footerData} />
            </div>
        </>
    );
}
