<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daily Report</title>
    <style>
        body {
            font-family: sans-serif;
            line-height: 1.6;
            color: #333;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }

        h1 {
            color: #041C32;
        }

        strong {
            color: #064663;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Daily Summary for {{ $tenant->name }}</h1>

        <p>Hello,</p>

        <p>Here is your daily summary for {{ date('F j, Y') }}:</p>

        <ul>
            <li>New Users Created Today: <strong>{{ $newUsersCount }}</strong></li>
        </ul>

        <p>Thank you for using our service.</p>

        <p>
            Regards,<br>
            {{ config('app.name') }}
        </p>
    </div>
</body>

</html>
