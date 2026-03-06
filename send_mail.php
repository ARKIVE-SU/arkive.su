<?php
// send_mail.php

// Настройки почты
$to = 'hello@arkive.su'; // Ваша новая почта
$subject_prefix = '[ARKIVE.SU] ';

// Проверяем, что запрос пришел методом POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Получаем тип формы (contact, newsletter, eoi)
    $form_type = isset($_POST['form_type']) ? htmlspecialchars(trim($_POST['form_type'])) : 'unknown';

    $message_body = "";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: notice@arkive.su" . "\r\n"; // Отправитель (заглушка)

    // Обработка формы контактов
    if ($form_type === 'contact') {
        $name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : 'Не указано';
        $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';
        $subject = isset($_POST['subject']) && !empty(trim($_POST['subject'])) ? htmlspecialchars(trim($_POST['subject'])) : 'Новое сообщение с сайта';
        $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : 'Нет текста сообщения';

        $mail_subject = $subject_prefix . "Сообщение от " . $name . " - " . $subject;
        
        $message_body = "
        <h2>Новое сообщение с формы контактов ARKIVE.SU</h2>
        <p><strong>Имя:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Тема:</strong> {$subject}</p>
        <p><strong>Сообщение:</strong><br/>" . nl2br($message) . "</p>
        ";
        
        $headers .= "Reply-To: {$email}" . "\r\n";
    } 
    // Обработка подписки на новости
    elseif ($form_type === 'newsletter') {
        $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';
        
        $mail_subject = $subject_prefix . "Новая подписка на новости";
        
        $message_body = "
        <h2>Новый подписчик ARKIVE.SU</h2>
        <p>Пользователь оставил email для подписки на новости.</p>
        <p><strong>Email:</strong> {$email}</p>
        ";
        
        $headers .= "Reply-To: {$email}" . "\r\n";
    }
    // Обработка Expression of Interest
    elseif ($form_type === 'eoi') {
        $org_name = isset($_POST['organization']) ? htmlspecialchars(trim($_POST['organization'])) : 'Не указано';
        $type = isset($_POST['type']) ? htmlspecialchars(trim($_POST['type'])) : 'Не указано';
        $country = isset($_POST['country']) ? htmlspecialchars(trim($_POST['country'])) : 'Не указано';
        $email = isset($_POST['email']) ? htmlspecialchars(trim($_POST['email'])) : 'Не указано';
        $description = isset($_POST['description']) ? htmlspecialchars(trim($_POST['description'])) : 'Нет описания';
        
        $mail_subject = $subject_prefix . "Expression of Interest: " . $org_name;
        
        $message_body = "
        <h2>Новая заявка на участие (Expression of Interest)</h2>
        <p><strong>Организация:</strong> {$org_name}</p>
        <p><strong>Тип:</strong> {$type}</p>
        <p><strong>Страна:</strong> {$country}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Предложение/Описание:</strong><br/>" . nl2br($description) . "</p>
        ";
        
        $headers .= "Reply-To: {$email}" . "\r\n";
    } else {
        die("Invalid form submission.");
    }

    // Отправляем письмо
    if(mail($to, $mail_subject, $message_body, $headers)) {
        // Успешная отправка: перенаправляем обратно с параметром успеха
        $referer = $_SERVER['HTTP_REFERER'];
        $redirect_url = strtok($referer, '?') . "?status=success";
        header("Location: " . $redirect_url);
        exit();
    } else {
        // Ошибка отправки
        $referer = $_SERVER['HTTP_REFERER'];
        $redirect_url = strtok($referer, '?') . "?status=error";
        header("Location: " . $redirect_url);
        exit();
    }
} else {
    // Если зашли напрямую на скрипт
    header("Location: index.html");
    exit();
}
?>
