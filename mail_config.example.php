<?php
// mail_config.example.php - Template for email configuration
// Rename this to mail_config.php and fill in your details on the server.
// Do NOT commit real passwords to this file.

$mail_config = [
    // SMTP Server Settings
    'host' => 'mail.example.com',      
    'username' => 'hello@example.com', 
    'password' => 'YOUR_PASSWORD_HERE',
    'port' => 465,                   
    'encryption' => 'ssl',           
    
    // Sender Information
    'from_email' => 'hello@example.com',
    'from_name' => 'Website System',
    
    // Where forms should actually be sent
    'recipient' => 'hello@example.com' 
];
?>
