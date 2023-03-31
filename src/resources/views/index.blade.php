<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Home</title>
        @viteReactRefresh
        @vite(['resources/js/index.tsx','resources/css/app.css'])
    </head>
    <body>
        <div id="index"></div>
    </body>