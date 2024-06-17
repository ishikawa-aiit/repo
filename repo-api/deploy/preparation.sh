#!/bin/bash
# db migrate
# shellcheck disable=SC2164
cd /var/www/app
# composer
sudo -u nginx composer install --no-dev

# migrate
sudo -u nginx php artisan migrate --force