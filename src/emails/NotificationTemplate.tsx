
import { Link } from '@react-email/components';
import * as React from 'react';

type BlogNotificationProps = {
    blogTitle: string;
    //   blogExcerpt: string;
    blogUrl: string;
};

const NotificationTemplate = ({
    blogTitle,
    blogUrl
}: BlogNotificationProps) => {
    return (
        <html>
            <body>
                <h1>New Blog Dropped Just!!</h1>
                <h4>{blogTitle}</h4>
                <Link
                    href={blogUrl}
                    style={{
                        display: 'inline-block',
                        marginTop: '20px',
                        padding: '10px 16px',
                        backgroundColor: '#4f46e5',
                        color: '#ffffff',
                        borderRadius: '5px',
                        textDecoration: 'none',
                    }}
                >
                    Read Full Blog
                </Link>
            </body>
        </html>
    );
}

export default NotificationTemplate