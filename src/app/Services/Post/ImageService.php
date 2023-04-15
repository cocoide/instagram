<?php

namespace App\Services\Post;

use App\Repositories\AWS\S3Repository;
use Illuminate\Support\Facades\Storage;


class ImageService
{
    protected $s3Repository;

    public function __construct(S3Repository $s3Repository)
    {
        $this->s3Repository = $s3Repository;
    }

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

    public function uploadImageToS3($bodyFile, $fileName, $extention)
    {
        $client = $this->s3Repository->connectS3();
        $this->s3Repository->uploadImage($client, $bodyFile, $fileName, $extention, "posts");
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