<?php
    $uploads_dir = '/';
    foreach ($_FILES["file"]["name"] as $key => $error) {
        if ($error == UPLOAD_ERR_OK) {
            $tmp_name = $_FILES["file"]["tmp_name"][$key];
            // basename() may prevent filesystem traversal attacks;
            // further validation/sanitation of the filename may be appropriate
            $name = basename($_FILES["file"]["name"][$key]);
            move_uploaded_file($tmp_name, "$uploads_dir/$name");
        }
    }
?>
