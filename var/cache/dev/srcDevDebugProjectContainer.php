<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\Container4DoZ284\srcDevDebugProjectContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/Container4DoZ284/srcDevDebugProjectContainer.php') {
    touch(__DIR__.'/Container4DoZ284.legacy');

    return;
}

if (!\class_exists(srcDevDebugProjectContainer::class, false)) {
    \class_alias(\Container4DoZ284\srcDevDebugProjectContainer::class, srcDevDebugProjectContainer::class, false);
}

return new \Container4DoZ284\srcDevDebugProjectContainer(array(
    'container.build_hash' => '4DoZ284',
    'container.build_id' => 'f118e8c1',
    'container.build_time' => 1542820321,
), __DIR__.\DIRECTORY_SEPARATOR.'Container4DoZ284');
