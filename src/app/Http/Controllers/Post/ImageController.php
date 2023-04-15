<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Services\Post\ImageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImageController extends Controller
{
    protected $imageService;

    public function __construct(ImageService $imageService)
    {
        $this->imageService = $imageService;
    }

    public function uploadImage(Request $request)
    {
        try {
            if (!Auth::check()) {
                return response()->json("ログインして下さい", 401);
            }

            $base64_image = $request->input('image');
            $extention = $request->input('extention');

            $this->imageService->validateImage($base64_image, $extention);

            $imageData = $this->imageService->trimmingBase64String($base64_image);

            $fileName = $this->imageService->generateFileName($extention);

            $uploadImage = $this->imageService->decodeBase64($imageData);

            $this->imageService->uploadImageToS3($uploadImage, $fileName, $extention);

            return $this->imageService->getURLByFileName($fileName);

        } catch (\Exception $e) {
            return response($e->getMessage(), $e->getCode() ?: 500);
        }
    }
}