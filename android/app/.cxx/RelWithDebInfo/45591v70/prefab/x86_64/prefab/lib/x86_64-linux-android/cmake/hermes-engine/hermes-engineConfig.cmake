if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/home/mid/.gradle/caches/8.13/transforms/e8a623bc443f501051766bb31faa40ca/transformed/hermes-android-0.81.4-release/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/home/mid/.gradle/caches/8.13/transforms/e8a623bc443f501051766bb31faa40ca/transformed/hermes-android-0.81.4-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

