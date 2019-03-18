FROM php:7.2-fpm

RUN apt-get update

RUN set -xe \
    && apt-get install -y --no-install-recommends apt-utils \
    && apt-get install -y zlib1g-dev libpq-dev git libicu-dev libxml2-dev \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql \
    && docker-php-ext-install zip xml \
    && docker-php-ext-install pdo_mysql

RUN curl --insecure https://getcomposer.org/composer.phar -o /usr/bin/composer && chmod +x /usr/bin/composer

RUN set -xe && apt-get install -y libmemcached11 libmemcachedutil2 build-essential libmemcached-dev libz-dev

RUN set -xe \
    && pecl config-set php_ini /usr/local/etc/php/php.ini \
    && pear config-set http_proxy http://192.168.77.11:3128 \
    && pecl install -f memcached \
    && echo extension=memcached.so >> /usr/local/etc/php/conf.d/memcached.ini

# Set timezone
RUN rm /etc/localtime
RUN ln -s /usr/share/zoneinfo/Europe/Moscow /etc/localtime
RUN "date"

WORKDIR /var/www/symfony