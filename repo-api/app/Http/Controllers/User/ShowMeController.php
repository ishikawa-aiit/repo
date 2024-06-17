<?php

declare(strict_types=1);

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

/**
 * ユーザー情報を返す
 */
class ShowMeController extends Controller
{
    /**
     * ユーザー情報を返す
     *
     * @param \Illuminate\Http\Request $request
     * @return UserResource
     */
    public function __invoke(Request $request): UserResource
    {
        /** @var \App\Models\User $user */
        $user = $request->user();

        $user->loadMissing('setting.team');

        return new UserResource($user);
    }
}
