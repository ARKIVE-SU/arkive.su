<?php
/**
 * ARKIVE.SU — Form Mail Handler
 * Receives form data via AJAX POST (JSON) and sends email to hello@arkive.su
 */

// --- Configuration ---
$RECIPIENT = 'hello@arkive.su';
$FROM_EMAIL = 'noreply@arkive.su';
$FROM_NAME  = 'Knowledge Ark Website';

// --- CORS & Method Check ---
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://arkive.su');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

// --- Read & Parse Input ---
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!$data || !isset($data['form_type'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid request']);
    exit;
}

$formType = $data['form_type'];

// --- Build Email Based on Form Type ---
switch ($formType) {

    case 'contact':
        $name    = strip_tags(trim($data['name'] ?? ''));
        $email   = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $subject = strip_tags(trim($data['subject'] ?? 'No subject'));
        $message = strip_tags(trim($data['message'] ?? ''));

        if (!$name || !$email || !$message) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
            exit;
        }

        $mailSubject = "[ARKIVE Contact] $subject";
        $mailBody = buildHtmlEmail("New Contact Message", [
            'Name'    => $name,
            'Email'   => "<a href=\"mailto:$email\">$email</a>",
            'Subject' => $subject,
            'Message' => nl2br(htmlspecialchars($message)),
        ]);
        $replyTo = $email;
        break;

    case 'newsletter':
        $email = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);

        if (!$email) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Invalid email']);
            exit;
        }

        $mailSubject = "[ARKIVE Newsletter] New subscriber";
        $mailBody = buildHtmlEmail("New Newsletter Subscription", [
            'Email' => "<a href=\"mailto:$email\">$email</a>",
        ]);
        $replyTo = $email;
        break;

    case 'eoi':
        $org     = strip_tags(trim($data['organization'] ?? ''));
        $type    = strip_tags(trim($data['type'] ?? ''));
        $country = strip_tags(trim($data['country'] ?? ''));
        $email   = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
        $desc    = strip_tags(trim($data['description'] ?? ''));

        if (!$org || !$type || !$country || !$email) {
            http_response_code(400);
            echo json_encode(['ok' => false, 'error' => 'Missing required fields']);
            exit;
        }

        $mailSubject = "[ARKIVE EOI] $org ($type)";
        $mailBody = buildHtmlEmail("New Expression of Interest", [
            'Organization' => $org,
            'Type'         => $type,
            'Country'      => $country,
            'Email'        => "<a href=\"mailto:$email\">$email</a>",
            'Description'  => nl2br(htmlspecialchars($desc)) ?: '<em>Not provided</em>',
        ]);
        $replyTo = $email;
        break;

    default:
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Unknown form type']);
        exit;
}

// --- Send Email ---
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: $FROM_NAME <$FROM_EMAIL>\r\n";
$headers .= "Reply-To: $replyTo\r\n";
$headers .= "X-Mailer: ARKIVE.SU/1.0\r\n";

$sent = @mail($RECIPIENT, $mailSubject, $mailBody, $headers);

if ($sent) {
    echo json_encode(['ok' => true]);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Mail delivery failed. Please try emailing us directly at hello@arkive.su']);
}


// --- Helper: Build HTML Email ---
function buildHtmlEmail(string $title, array $fields): string {
    $rows = '';
    foreach ($fields as $label => $value) {
        $rows .= "
        <tr>
            <td style='padding:8px 12px; font-weight:600; color:#c9a84c; vertical-align:top; white-space:nowrap;'>$label</td>
            <td style='padding:8px 12px; color:#e0e0e0;'>$value</td>
        </tr>";
    }

    return "
    <!DOCTYPE html>
    <html>
    <body style='margin:0; padding:0; background:#0e1015; font-family:Inter,Arial,sans-serif;'>
        <div style='max-width:600px; margin:20px auto; background:#1a1d27; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.1);'>
            <div style='background:linear-gradient(135deg, #1a1d27, #2a2d37); padding:24px 28px; border-bottom:1px solid rgba(201,168,76,0.3);'>
                <h1 style='margin:0; font-size:20px; color:#c9a84c;'>◆ $title</h1>
                <p style='margin:4px 0 0; font-size:12px; color:#888;'>arkive.su — " . date('Y-m-d H:i:s') . " UTC</p>
            </div>
            <table style='width:100%; border-collapse:collapse; margin:16px 0;'>
                $rows
            </table>
            <div style='padding:16px 28px; border-top:1px solid rgba(255,255,255,0.05); text-align:center;'>
                <p style='margin:0; font-size:11px; color:#666;'>Knowledge Ark Initiative · arkive.su</p>
            </div>
        </div>
    </body>
    </html>";
}
