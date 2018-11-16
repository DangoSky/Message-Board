<?php
	if(isset($_REQUEST['title'])){
		$file = $_REQUEST['title']. '.txt';
		if($_REQUEST['action'] === 'send') {
			$arr = Array();
			if (file_exists($file)) {
				$old = json_decode(file_get_contents($file));
				foreach ($old as $msg) {
					array_push($arr, $msg);
				}
			}
			$msg = json_decode($_REQUEST['arr']);
			array_push($arr, $msg);
			file_put_contents($file, json_encode($arr));
			
 	     /* $previous = file_get_contents($file);
 			$previous = $previous. $_REQUEST['arr'];
 			file_put_contents($file, $previous); */
		//    file_put_contents($file, $_REQUEST['arr']);
		
		 /* fopen($file, "a+");
			fwrite($file, $_REQUEST['arr']);
			fclose($file); */
		}
		if($_REQUEST['action'] === 'get') {
			if(file_exists($file)) {
				print(file_get_contents($file));
			}
		}
	}

