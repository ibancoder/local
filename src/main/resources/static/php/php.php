<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $secret = 'TU_CLAVE_SECRETA'; // Tu clave secreta de reCAPTCHA
  $response = $_POST['g-recaptcha-response'];
  $remoteip = $_SERVER['REMOTE_ADDR'];

  $url = 'https://www.google.com/recaptcha/api/siteverify';
  $data = array(
    'secret' => $secret,
    'response' => $response,
    'remoteip' => $remoteip
  );

  $options = array(
    'http' => array (
      'method' => 'POST',
      'header' => 'Content-type: application/x-www-form-urlencoded',
      'content' => http_build_query($data)
    )
  );

  $context = stream_context_create($options);
  $result = file_get_contents($url, false, $context);
  $resultJson = json_decode($result);

  if ($resultJson->success != true) {
    echo 'Captcha incorrecto, por favor inténtelo de nuevo.';
  } else {
    echo 'Captcha verificado con éxito.';
    // Aquí va tu código para procesar el formulario
  }
}
?>
