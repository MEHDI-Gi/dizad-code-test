if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/mid/.gradle/caches/8.13/transforms/4aed1d310476660c06acc0c3b4bb343e/transformed/hermes-android-0.81.4-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/mid/.gradle/caches/8.13/transforms/4aed1d310476660c06acc0c3b4bb343e/transformed/hermes-android-0.81.4-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

