<?php

namespace Tests\Unit\Service\Auth;

use App\Services\Auth\LoginService;
use App\Repositories\Auth\LoginRepository;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Mockery;
use PHPUnit\Framework\TestCase;

class LoginServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $loginRepositoryMock;
    protected $loginService;

    protected function setUp(): void
    {
        parent::setUp();

        $this->loginRepositoryMock = Mockery::mock(LoginRepository::class);
        $this->loginService = new LoginService($this->loginRepositoryMock);
    }
    protected function tearDown(): void
    {
        parent::tearDown();

        Mockery::close();
    }

    public function testGetOAuthCallbackToken()
    {
        $provider = 'test_provider';

        //ダミーデータ
        $user = new \stdClass;
        $user->getId = function () {
            return 1;
        };
        $user->getEmail = function () {
            return 'test@example.com';
        };

        Socialite::shouldReceive('driver')->once()->andReturnSelf();

        Socialite::shouldReceive('user')->once()->andReturn($user);

        $result = $this->loginService->getOAuthCallbackToken($provider);

        $this->assertEquals($user, $result);
    }
}