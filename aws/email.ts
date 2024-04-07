import AWS from 'aws-sdk';

AWS.config.update({
    region: 'eu-north-1',
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const ses = new AWS.SES({ apiVersion: 'latest' });

interface EmailParams {
    to: string;
    from: string;
    subject: string;
    message: string;
}

interface TokenEmailParams {
    to: string;
    tokenLink: string;
}

export async function sendTokenMail({to, tokenLink}: TokenEmailParams) {
    const params = {
        Source: 'noreply@invoicehub.app',
        Destination: { ToAddresses: [to] },
        Message: {
            Subject: { Data: 'Invoice Hub - Your invoice link' },
            Body: {
                Text: {
                    Data: `You can view, edit and download your invoices here: ${tokenLink}`,
                },
            },
        },
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log('Email sent:', result.MessageId);
        return result.MessageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export async function sendEmail({ to, from, subject, message }: EmailParams) {
    const params = {
        Source: from,
        Destination: { ToAddresses: [to] },
        Message: {
            Subject: { Data: subject },
            Body: { Text: { Data: message } },
        },
    };

    try {
        const result = await ses.sendEmail(params).promise();
        console.log('Email sent:', result.MessageId);
        return result.MessageId;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}