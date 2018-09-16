<?php

   $PLAYERSCORE =  $_POST["TheScore"];
   $FILENAME = $_POST["FileName"];
   $PLAYERNAME = $_POST["TheName"];
   
   $CONTENT = $PLAYERSCORE. ",". $PLAYERNAME. "\n";  
   // 'a' means append , 'w' means write or overwrite if data already exists
   // creates the file in a subfolder, tempFolder. 
   // You need to create the subfolder with a write permission
   $fileHandler = fopen( $FILENAME, 'a') or die("can't open file");

   fwrite($fileHandler, $CONTENT);
   fclose($fileHandler);
   echo "Done. Thanks for Playing!";
?>