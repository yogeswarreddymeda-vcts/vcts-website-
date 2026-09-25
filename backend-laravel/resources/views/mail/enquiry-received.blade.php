<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New website enquiry</title></head>
<body style="font-family: Arial, sans-serif; color: #142b45; line-height: 1.6;">
    <h1>New website enquiry</h1>
    <p>A visitor has submitted the contact form.</p>
    <table cellpadding="8" style="border-collapse: collapse; text-align: left;">
        <tr><th scope="row">Full name</th><td>{{ $enquiry->full_name }}</td></tr>
        <tr><th scope="row">Work email</th><td>{{ $enquiry->work_email }}</td></tr>
        <tr><th scope="row">Phone number</th><td>{{ $enquiry->phone_number ?: 'Not provided' }}</td></tr>
        <tr><th scope="row">Company / Organization</th><td>{{ $enquiry->company_name ?: 'Not provided' }}</td></tr>
        <tr><th scope="row">Submitted (UTC)</th><td>{{ $enquiry->created_at->utc()->format('Y-m-d H:i:s') }}</td></tr>
    </table>
    <h2>Message</h2>
    <p style="white-space: pre-wrap;">{{ $enquiry->message }}</p>
    <p>Reply to this email to contact the visitor directly.</p>
</body>
</html>
