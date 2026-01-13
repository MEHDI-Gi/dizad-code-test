if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "C:/Users/amatek/.gradle/caches/8.14.3/transforms/1f4909b518f4f855296154926424cc3f/transformed/hermes-android-0.81.4-release/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "C:/Users/amatek/.gradle/caches/8.14.3/transforms/1f4909b518f4f855296154926424cc3f/transformed/hermes-android-0.81.4-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

