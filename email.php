<?php
if (isset($_POST["submit_ticket"])) {
    extract($_POST);
    print_r($_POST);
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: sender@example.com" . "\r\n";
    $message = "
    <html>
    <head></head>
    <body>
        <p>Firstname: $first_name</p>
        <p>Lastname: $last_name</p>
            <p>Email: $email</p>
              <p>Phone Number: $phone_number</p>
              <p>Seller Type: $seller_type</p>
              <p>Country: $country</p>
               <p>Coin: $coin</p>
                  <p>Market Price: $mkt_price</p>
                  <p>Sell Price: $sell_price</p>
                     <p>Quantity: $quantity</p>
    </body>
    </html>
    ";

    if (mail("nsudekenechi2@gmail.com", "New Ticket Submited", $message, "From: support@phanex.org")) {
        header("location: ./about.html?email=s");
    } else {
        header("location: ./about.html?email=f");
    }
}
?>