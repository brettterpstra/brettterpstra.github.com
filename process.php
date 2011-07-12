<?php

function clean_input($str,$tags=true){
  if ($tags)
    $str = strip_tags(stripslashes(rtrim($str)));
  else
    $str = stripslashes(rtrim($str));
  return $str;
}

// Get the user IP for tracking
function get_ip() {
	if ( isset($_SERVER) ) {
		if ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'])) {
			$ip_address = $_SERVER['HTTP_X_FORWARDED_FOR'];
		} elseif ( isset( $_SERVER['HTTP_CLIENT_IP'])) {
			$ip_address = $_SERVER['HTTP_CLIENT_IP'];
		} else {
			$ip_address = $_SERVER['REMOTE_ADDR'];
		}
	} else {
		if ( getenv('HTTP_X_FORWARDED_FOR') ) {
			$ip_address = getenv('HTTP_X_FORWARDED_FOR');
		} elseif ( getenv('HTTP_CLIENT_IP') ) {
			$ip_address = getenv('HTTP_CLIENT_IP');
		} else {
			$ip_address = getenv('REMOTE_ADDR');
		}
	}
	// Return the IP address
	return $ip_address;
}

if ( !( isset( $_POST['marky_stage'])) ) {
	return false;
} elseif ( !( isset( $_POST['marky_orig_referer'])) ) {
	return false;
}


$name = clean_input($_POST['name']);
$email = clean_input($_POST['email']);
$message = clean_input($_POST['message'],false)."\n".get_ip();

$to = "me@brettterpstra.com";
$from = $email;
$today = date("d/m/Y H:i:s");
$subject = '[BrettTerpstra] Message from '.$name.' ('.$today.')';
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";
$message = "Message: ".$message;

@mail($to, $subject, $message, $headers);

$return['msg'] = 'Email sent.';

die( json_encode($return));

?>
