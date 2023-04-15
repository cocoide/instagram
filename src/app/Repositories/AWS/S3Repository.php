<?php

namespace App\Repositories\AWS;

use Aws\S3\S3Client;

class S3Repository
{
    public function connectS3()
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

    public function uploadImage(S3Client $client, $bodyFile, string $fileName, string $extention, string $directory)
    {
        $client->putObject([
            'Bucket' => env('AWS_BUCKET'),
            'Key' => "{$directory}/{$fileName}",
            'Body' => $bodyFile,
            'ContentType' => $extention,
            'ACL' => 'public-read',
        ]);
    }
}