<?php

namespace App\Services\Post;

use Aws\S3\S3Client;
use Illuminate\Support\Facades\Storage;


class ImageService
{

    public function validateImage($image, $extention)
    {
        $validExtensions = ['png', 'jpg', 'gif', 'jpeg'];
        if (!in_array($extention, $validExtensions, true)) {
            throw new \Exception("{$extention}は対応してないファイル形式です", 402);
        }
        $max_size = 60 * 1024 * 1024;
        if ($image && strlen($image) > $max_size) {
            throw new \Exception(`ファイルサイズが大きすぎます`, 400);
        }
    }

    public function generateFileName($extention)
    {
        $filename = uniqid('', true) . '.' . $extention;
        if (!$filename) {
            throw new \Exception("ファイル名の生成に失敗");
        }
        return $filename;
    }

    public function trimmingBase64String($base64String)
    {
        $parts = explode(',', $base64String);
        return $parts[1];
    }

    public function decodeBase64($base64String)
    {
        $isDecodeString = base64_decode($base64String);
        if (!$isDecodeString) {
            throw new \Exception("base64ファイルのデコードに失敗");
        }
        return $isDecodeString;
    }

    public function setupS3Client()
    {
        $client = new S3Client([
            'version' => 'latest',
            'region' => env('AWS_DEFAULT_REGION'),
            'endpoint' => env('AWS_ENDPOINT'),
            'use_path_style_endpoint' => true,
            'credentials' => [
                'key' => env('AWS_ACCESS_KEY_ID'),
                'secret' => env('AWS_SECRET_ACCESS_KEY'),
            ],
        ]);
        return $client;
    }

    public function uploadToS3(S3Client $client, $bodyFile, $fileName, $extention)
    {
        $client->putObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => 'posts/' . $fileName,
            'Body' => $bodyFile,
            'ContentType' => $extention,
            'ACL' => 'public-read',
        ]);
    }

    public function getURLByFileName($fileName)
    {
        $URL = Storage::disk('s3')->url('posts/' . $fileName);
        if (!$URL) {
            throw new \Exception("URL取得中にエラーが発生");
        }
        return $URL;
    }
}