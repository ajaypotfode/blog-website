
import { Resend } from 'resend';
import NotificationTemplate from '@/emails/NotificationTemplate';
// import { render } from '@react-email/components';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendNotification = async (subscriberEmail: string, blogTitle: string, blogId: string, auther: string): Promise<boolean> => {
    try {

        const { error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: subscriberEmail,
            subject: `see The Blog Created By ${auther}`,
            react: NotificationTemplate({
                blogTitle,
                blogUrl: `http://localhost:3000/blog-details/${blogId}`
            })

        });

        if (error) {
            console.log("error While sending Email: ", error);

            return false
        }

        // console.log("succes While sending Email: ", data);
        return true
    } catch (error) {
        console.log("error is in Catrch:", error);
        return false

    }
}