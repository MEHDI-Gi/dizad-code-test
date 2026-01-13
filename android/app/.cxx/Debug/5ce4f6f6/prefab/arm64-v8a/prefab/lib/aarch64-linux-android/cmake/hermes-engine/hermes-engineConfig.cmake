if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/mehdi/.gradle/caches/8.14.3/transforms/8ed331a6d355aa0d75d513011878df76/transformed/hermes-android-0.81.4-debug/prefab/modules/libhermes/libs/android.arm64-v8a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/mehdi/.gradle/caches/8.14.3/transforms/8ed331a6d355aa0d75d513011878df76/transformed/hermes-android-0.81.4-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

