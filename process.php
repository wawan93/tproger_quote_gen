<?php

// Вообще говоря Content-Transfer-Encoding может быть base64



    //получаем сгенерированное изображение
    $data = substr($_POST['imageData'], strpos($_POST['imageData'], ",") + 1);
    $decodedData = base64_decode($data);

    // заставляем браузер показать окно сохранения файла
    header('Content-Description: File Transfer');
    header('Content-Type: image/png');
    header('Content-Disposition: attachment; filename=quote_for_typical_proger.png');
    header('Content-Transfer-Encoding: binary');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    
    echo $decodedData;
?>
