<?php
    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    // 
    require_once('class.phpmailer.php');
    

    // és on tenim la configració del .ini per seguretat no ternir-ho amb el mateix fitxer php
    $config = parse_ini_file('config.ini', true);


    //verifiquem que les dades s'han enviat amb el POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        //recollim les dades del formulari
        $nom = htmlspecialchars($_POST['nom']);
        $cognom = htmlspecialchars($_POST['cognom']);
        $email = htmlspecialchars($_POST['email']);
        $telefon = htmlspecialchars($_POST['telefon']);
        $consulta = htmlspecialchars($_POST['consulta']);

        // crear el cost del missatge
        $body = "Consulta per Refugi Lobita\n";
        $body .= "Nom: $nom\n";
        $body .= "Cognom: $cognom\n";
        $body .= "Email: $email\n";
        $body .= "Tel&egrave;fon: $telefon\n\n";
        $body .= "Consulta:\n$consulta";

        // configuració del PHPMailer a partir de les dades del .ini
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->Host       = $config['mail']['host'];
        $mail->SMTPAuth   = true;
        $mail->SMTPDebug  = 2;
       // $mail->SMTPSecure = $config['mail']['smtp_secure'];
        $mail->Port       = $config['mail']['port'];
        $mail->Username   = $config['mail']['username'];
        $mail->Password   = $config['mail']['password'];


        // Configurar remitent i destinatari
        $mail->SetFrom($email, "$nom $cognom");
        $mail->AddReplyTo($email, "$nom $cognom");

        // Asunto del missatge
        $mail->Subject = "Consulta de $nom $cognom";

        // Configurar el body del missatge
        $mail->Body = $body;

        // Direcció de desti
        $mail->AddAddress("eiglesiast@sitinformatica.es", "Eduard Iglesias");

        // Enviar correu y verificar si té errors
        if(!$mail->Send()) {
            echo "Error a l'enviar el missatge: " . $mail->ErrorInfo;
            header("Location: http://178.156.55.174:8085/contacte.html"); // ens reenvia a la pàgina de contactes
            exit; // i sortim del script
        } else {
            echo "El correu ha estat enviat correctament.";
            header("Location: http://178.156.55.174:8085/contacte.html"); // ens reenvia a la pàgina de contactes
            exit; // i sortim del script
        }
    } else {
        echo "Error: No hem rebut les dades.";
    }
?>
