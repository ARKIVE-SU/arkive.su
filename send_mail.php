<?php
// send_mail.php
// Uses PHPMailer for reliable SMTP delivery

// Check config file exists
if (!file_exists(__DIR__ . '/mail_config.php')) {
    die("Error: mail_config.php is missing. Please create it using mail_config.example.php");
}

require_once __DIR__ . '/mail_config.php';

// Include PHPMailer manually
require_once __DIR__ . '/lib/PHPMailer/src/Exception.php';
require_once __DIR__ . '/lib/PHPMailer/src/PHPMailer.php';
require_once __DIR__ . '/lib/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $form_type = isset($_POST['form_type']) ? htmlspecialchars(trim($_POST['form_type'])) : 'unknown';
    $message_body = "";
    $reply_to = "";
    
    // Process "Contact" form
    if ($form_type === 'contact') {
        $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Не указано';
        $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';
        $subject = isset($_POST['subject']) && !empty(trim($_POST['subject'])) ? htmlspecialchars(trim($_POST['subject'])) : 'Новое сообщение с сайта';
        $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : 'Нет текста сообщения';

        $mail_subject = "[ARKIVE.SU] Сообщение от " . $name . " - " . $subject;
        $message_body = "
        <h2>Новое сообщение с формы контактов ARKIVE.SU</h2>
        <p><strong>Имя:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Тема:</strong> {$subject}</p>
        <p><strong>Сообщение:</strong><br/>" . nl2br($message) . "</p>
        ";
        $reply_to = $email;
    } 
    // Process "Newsletter" form
    elseif ($form_type === 'newsletter') {
        $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';
        
        $mail_subject = "[ARKIVE.SU] Новая подписка на новости";
        $message_body = "
        <h2>Новый подписчик ARKIVE.SU</h2>
        <p>Пользователь оставил email для подписки на новости.</p>
        <p><strong>Email:</strong> {$email}</p>
        ";
        $reply_to = $email;
    }
    // Process "Expression of Interest" form
    elseif ($form_type === 'eoi') {
        $org_name = isset($_POST['organization']) ? htmlspecialchars(trim($_POST['organization'])) : 'Не указано';
        $type = isset($_POST['type']) ? htmlspecialchars(trim($_POST['type'])) : 'Не указано';
        $country = isset($_POST['country']) ? htmlspecialchars(trim($_POST['country'])) : 'Не указано';
        $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';
        $description = isset($_POST['description']) ? htmlspecialchars(trim($_POST['description'])) : 'Нет описания';
        
        $mail_subject = "[ARKIVE.SU] Expression of Interest: " . $org_name;
        $message_body = "
        <h2>Новая заявка на участие (Expression of Interest)</h2>
        <p><strong>Организация:</strong> {$org_name}</p>
        <p><strong>Тип:</strong> {$type}</p>
        <p><strong>Страна:</strong> {$country}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Предложение/Описание:</strong><br/>" . nl2br($description) . "</p>
        ";
        $reply_to = $email;
    } else {
        die("Invalid form submission.");
    }

    // Configure PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = $mail_config['host'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $mail_config['username'];
        $mail->Password   = $mail_config['password'];
        $mail->SMTPSecure = $mail_config['encryption'];
        $mail->Port       = $mail_config['port'];
        $mail->CharSet    = 'UTF-8';

        // Recipients
        $mail->setFrom($mail_config['from_email'], $mail_config['from_name']);
        $mail->addAddress($mail_config['recipient']); // Send to the admin

        if (!empty($reply_to)) {
            $mail->addReplyTo($reply_to);
        }

        // Content
        $mail->isHTML(true);
        $mail->Subject = $mail_subject;
        $mail->Body    = $mail_body ?? $message_body;

        $mail->send();
        
        // Success redirect
        $referer = $_SERVER['HTTP_REFERER'];
        $redirect_url = strtok($referer, '?') . "?status=success";
        header("Location: " . $redirect_url);
        exit();
        
    } catch (Exception $e) {
        // Error redirect
        // Uncomment the line below for debugging email issues:
        // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"; exit;
        
        $referer = $_SERVER['HTTP_REFERER'];
        $redirect_url = strtok($referer, '?') . "?status=error";
        header("Location: " . $redirect_url);
        exit();
    }
} else {
    // Block direct access
    header("Location: index.html");
    exit();
}
?>
