<?php
if (isset($_POST["submit_ticket"])) {
    extract($_POST);
    print_r($_POST);
    $message = "<p>Firstname: $first_name</p>
        <p>Lastname: $last_name</p>
            <p>Email: $email</p>
              <p>Phone Number: $phone_number</p>
              <p>Seller Type: $seller_type</p>
              <p>Country: $country</p>
               <p>Coin: $coin</p>
                  <p>Market Price: $mkt_price</p>
                  <p>Sell Price: $sell_price</p>
                     <p>Quantity: $quantity</p>
    ";

    if (mail("nsudekenechi2@gmail.com", "New Ticket Submited", $message, "From: support@phanex.org")) {
        header("location: ./about.html?email=s");
    } else {
        header("location: ./about.html?email=f");
    }
}
?>