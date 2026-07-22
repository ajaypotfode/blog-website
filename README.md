<!-- Send Email of Blog Creation to the Subscribers -->

Added Send Notification Functionality to Subscribers During Blog Generation via Email

The email functionality is implemented in the /util/sendEmail.ts file.

Update the from field (currently set as 'Acme <onboarding@resend.dev>') with your own verified domain email.

This is important because Resend may restrict sending emails to addresses other than the one registered or verified with your domain



<!-- Note Inportant -->
This functionality may not work when generating the live project link, as Resend could restrict sending emails to addresses that are not registered or if not having verified domain.